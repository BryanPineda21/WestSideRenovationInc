'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  X,
  Save,
  Star,
  Calendar,
  MapPin,
  Tag,
  FileText,
  Image as ImageIcon,
  Camera,
  FolderOpen,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { projectService, Project } from '@/lib/firebase-admin';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

interface ProjectFormProps {
  project?: Project | null;
}

interface FormErrors {
  title?: string;
  description?: string;
  location?: string;
  category?: string;
  completedDate?: string;
}

const categories = [
  'Interior Remodeling',
  'Custom Carpentry',
  'Painting',
  'Electrical',
  'Plumbing',
  'Bathroom Renovation',
  'Kitchen Remodeling',
  'Flooring',
  'Other',
];

const ProjectForm: React.FC<ProjectFormProps> = ({ project }) => {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const isEditing = !!project;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    location: project?.location || '',
    category: project?.category || categories[0],
    featured: project?.featured || false,
    completedDate: project?.completedDate
      ? project.completedDate.toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [images, setImages] = useState<string[]>(project?.images || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/admin/login');
    }
  }, [authLoading, isAdmin, router]);

  // Don't render if still loading auth or not admin
  if (authLoading || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.completedDate) errors.completedDate = 'Completion date is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue,
    }));
    
    // Clear error for this field
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear messages
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setErrorMessage(null);

    try {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter(file => file.type.startsWith('image/'));
      
      if (validFiles.length === 0) {
        throw new Error('Please select valid image files');
      }

      const uploadPromises = validFiles.map(file => 
        projectService.uploadImage(file, project?.id)
      );

      const newUrls = await Promise.all(uploadPromises);
      const successfulUploads = newUrls.filter(url => url);

      if (successfulUploads.length > 0) {
        setImages(prev => [...prev, ...successfulUploads]);
        setSuccessMessage(`Successfully uploaded ${successfulUploads.length} image(s)`);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to upload images');
    } finally {
      setUploading(false);
      // Reset file inputs
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (cameraInputRef.current) cameraInputRef.current.value = '';
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const handleRemoveImage = async (imageUrl: string, index: number) => {
    try {
      // Only delete from storage if it's a Firebase URL
      if (imageUrl.includes('firebase') || imageUrl.includes('storage.googleapis.com')) {
        await projectService.deleteImage(imageUrl);
      }
      
      setImages(prev => prev.filter((_, i) => i !== index));
      setSuccessMessage('Image removed successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error removing image:', error);
      // Remove from UI anyway
      setImages(prev => prev.filter((_, i) => i !== index));
      setErrorMessage('Image removed from project, but may still exist in storage');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setErrorMessage('Please fill out all required fields');
      return;
    }

    setSaving(true);
    setErrorMessage(null);

    try {
      const projectData = {
        ...formData,
        images: images.filter(url => url && url.trim() !== ''),
        completedDate: new Date(formData.completedDate),
      };

      if (isEditing && project?.id) {
        await projectService.updateProject(project.id, projectData);
        setSuccessMessage('Project updated successfully!');
      } else {
        await projectService.createProject(projectData);
        setSuccessMessage('Project created successfully!');
      }

      // Redirect after short delay to show success message
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error saving project:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="bg-blue-50/90 dark:bg-blue-900/90 backdrop-blur-sm border border-blue-200 dark:border-blue-800 rounded-xl mb-8 p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push('/admin/dashboard')}
              className="text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {isEditing ? 'Edit Project' : 'Create Project'}
              </h1>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {isEditing ? 'Update project details' : 'Add a new project to your portfolio'}
              </p>
            </div>
            <div className="w-20" />
          </div>
        </header>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <p className="text-sm text-green-600 dark:text-green-300">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-sm text-red-600 dark:text-red-300">{errorMessage}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Information */}
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/90 dark:bg-blue-900/90 backdrop-blur-sm shadow-sm">
            <div className="h-1 bg-gradient-to-r from-blue-600 to-sky-500" />
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <FileText className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-300" />
                Project Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Title *
                  </label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Modern Kitchen Renovation"
                    className="border-blue-200 dark:border-blue-800"
                    required
                  />
                  {formErrors.title && (
                    <p className="text-sm text-red-500">{formErrors.title}</p>
                  )}
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 dark:text-blue-300" />
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Manhattan, NY"
                      className="pl-10 border-blue-200 dark:border-blue-800"
                      required
                    />
                  </div>
                  {formErrors.location && (
                    <p className="text-sm text-red-500">{formErrors.location}</p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Category *
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 dark:text-blue-300" />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-blue-200 dark:border-blue-800 rounded-md bg-background text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  {formErrors.category && (
                    <p className="text-sm text-red-500">{formErrors.category}</p>
                  )}
                </div>

                {/* Completion Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Completion Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 dark:text-blue-300" />
                    <Input
                      type="date"
                      name="completedDate"
                      value={formData.completedDate}
                      onChange={handleInputChange}
                      className="pl-10 border-blue-200 dark:border-blue-800"
                      required
                    />
                  </div>
                  {formErrors.completedDate && (
                    <p className="text-sm text-red-500">{formErrors.completedDate}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 mt-6">
                <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Description *
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the project details, challenges, and results..."
                  className="min-h-[120px] border-blue-200 dark:border-blue-800"
                  required
                />
                {formErrors.description && (
                  <p className="text-sm text-red-500">{formErrors.description}</p>
                )}
              </div>

              {/* Featured checkbox */}
              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-blue-200 focus:ring-blue-600"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  Featured Project
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Project Images */}
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/90 dark:bg-blue-900/90 backdrop-blur-sm shadow-sm">
            <div className="h-1 bg-gradient-to-r from-blue-600 to-sky-500" />
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-gray-900 dark:text-white">
                <div className="flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-300" />
                  Project Images
                </div>
                <Badge variant="outline" className="border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-300">
                  {images.length} uploaded
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Upload Area */}
              <div
                className={cn(
                  'border-2 border-dashed rounded-xl p-6 text-center transition-colors',
                  dragOver
                    ? 'border-blue-600 bg-blue-100/50 dark:bg-blue-900/50'
                    : 'border-blue-200 dark:border-blue-800 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30',
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <ImageIcon className="w-10 h-10 mx-auto text-blue-600 dark:text-blue-300" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Upload Images
                  </h3>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    Drag and drop images or select from your device
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                      disabled={uploading}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                    >
                      <FolderOpen className="w-4 h-4 mr-2" />
                      Gallery
                    </Button>
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileInputChange}
                      className="hidden"
                      disabled={uploading}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => cameraInputRef.current?.click()}
                      disabled={uploading}
                      className="border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Camera
                    </Button>
                  </div>
                  {uploading && (
                    <div className="mt-4">
                      <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-300">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Uploading...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Grid */}
              {images.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-300" />
                    Images ({images.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((imageUrl, index) => (
                      <div
                        key={`${imageUrl}-${index}`}
                        className="relative group aspect-square rounded-lg overflow-hidden border border-blue-200 dark:border-blue-800"
                      >
                        <Image
                          src={imageUrl}
                          alt={`Project image ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        />
                        {index === 0 && (
                          <Badge className="absolute top-2 left-2 bg-blue-600 text-white">
                            Main
                          </Badge>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(imageUrl, index)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/dashboard')}
              className="border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:from-blue-700 hover:to-sky-600"
              disabled={saving || uploading}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Update' : 'Create'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;