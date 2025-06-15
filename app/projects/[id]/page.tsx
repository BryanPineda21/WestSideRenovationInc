'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Star,
  Share2,
  Phone,
  Mail,
  X,
  ZoomIn,
  Hammer,
  Clock,
  Users,
  Twitter,
  Facebook,
  Link as LinkIcon,
} from 'lucide-react';
import { projectService, Project } from '@/lib/firebase-admin';
import { cn } from '@/lib/utils';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

// Loading spinner component
const LoadingSpinner = () => (
  <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="relative w-12 h-12 mx-auto">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 animate-spin rounded-full" />
      </div>
      <p className="text-gray-800 dark:text-gray-200 font-medium">Loading project...</p>
    </div>
  </div>
);

// Error state component
const ErrorState = () => (
  <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
    <div className="text-center space-y-6 max-w-md mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project Not Found</h1>
      <p className="text-gray-800 dark:text-gray-200">
        The project you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/projects">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>
      </Button>
    </div>
  </div>
);

// Image lightbox component
const ImageLightbox = React.memo(
  ({
    images,
    selectedIndex,
    isOpen,
    onClose,
    onSelect,
  }: {
    images: string[];
    selectedIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onSelect: (index: number) => void;
  }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={onClose}
          role="dialog"
          aria-label="Image lightbox"
        >
          <div className="relative w-full h-full max-w-7xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Main image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={images[selectedIndex]}
                alt={`Gallery image ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Thumbnail strip with scroll indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <div className="relative max-w-full overflow-x-auto snap-x snap-mandatory scrollbar-hidden">
                <div className="flex gap-2 bg-black/60 p-2 rounded-lg">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => onSelect(index)}
                      className={cn(
                        'relative flex-shrink-0 w-16 h-16 rounded overflow-hidden snap-center',
                        selectedIndex === index && 'ring-2 ring-blue-500',
                      )}
                      aria-label={`View image ${index + 1}`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
                {/* Gradient scroll indicators */}
                <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  ),
);

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      loadProject(params.id as string);
    }
  }, [params.id]);

  const loadProject = async (projectId: string) => {
    try {
      const [projectData, allProjects] = await Promise.all([
        projectService.getProjectById(projectId),
        projectService.getAllProjects(),
      ]);

      if (projectData) {
        setProject(projectData);
        const related = allProjects
          .filter((p) => p.id !== projectId && p.category === projectData.category)
          .slice(0, 3);
        setRelatedProjects(related);
      }
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error('Failed to load project', { description: 'Please try again later' });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = useCallback(
    async (platform?: 'twitter' | 'facebook' | 'copy') => {
      if (!project) return;

      const url = window.location.href;
      const title = project.title;
      const text = project.description;

      if (platform === 'twitter') {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          '_blank',
        );
      } else if (platform === 'facebook') {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank',
        );
      } else if (platform === 'copy' || !platform) {
        try {
          await navigator.clipboard.writeText(url);
          toast.success('Link copied to clipboard!', { description: 'Share this project with others' });
        } catch (error) {
          console.error('Failed to copy link:', error);
          toast.error('Failed to copy link', { description: 'Please try again' });
        }
      }
    },
    [project],
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          setLightboxOpen(false);
          break;
        case 'ArrowLeft':
          setSelectedImageIndex((prev) =>
            prev === 0 ? (project?.images?.length || 1) - 1 : prev - 1,
          );
          break;
        case 'ArrowRight':
          setSelectedImageIndex((prev) =>
            prev === (project?.images?.length || 1) - 1 ? 0 : prev + 1,
          );
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, project?.images]);

  if (loading) return <LoadingSpinner />;
  if (!project) return <ErrorState />;

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Secondary Navigation */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-blue-200 dark:border-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleShare('twitter')} className="flex items-center">
                  <Twitter className="w-4 h-4 mr-2 text-blue-600" />
                  Share on Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare('facebook')} className="flex items-center">
                  <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                  Share on Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare('copy')} className="flex items-center">
                  <LinkIcon className="w-4 h-4 mr-2 text-blue-600" />
                  Copy Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-12">
              {/* Project Header */}
              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-800"
                    >
                      <Hammer className="w-3 h-3 mr-1" />
                      {project.category}
                    </Badge>
                    {project.featured && (
                      <Badge className="bg-gradient-to-r from-blue-100 to-sky-100 text-blue-600 border-blue-200 dark:from-blue-900/30 dark:to-sky-900/30 dark:text-blue-300 dark:border-blue-800">
                        <Star className="w-3 h-3 mr-1" />
                        Featured Project
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    {project.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 text-gray-800 dark:text-gray-200">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-300" />
                      <span className="font-medium">{project.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-300" />
                      <span className="font-medium">
                        Completed{' '}
                        {new Date(project.completedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Image Carousel */}
              {project.images && project.images.length > 0 && (
                <motion.div variants={fadeInUp}>
                  <Card className="border-blue-200 dark:border-blue-800 overflow-hidden shadow-lg">
                    <Carousel className="w-full" opts={{ dragFree: true }}>
                      <CarouselContent>
                        {project.images.map((image, index) => (
                          <CarouselItem key={index}>
                            <div
                              className="relative aspect-[16/10] cursor-pointer"
                              onClick={() => {
                                setSelectedImageIndex(index);
                                setLightboxOpen(true);
                              }}
                            >
                              <Image
                                src={image}
                                alt={`${project.title} - Image ${index + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                priority={index === 0}
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors">
                                <ZoomIn className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {project.images.length > 1 && (
                        <>
                          <CarouselPrevious className="left-4 bg-blue-50/90 hover:bg-blue-100 dark:bg-blue-900/90 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300" />
                          <CarouselNext className="right-4 bg-blue-50/90 hover:bg-blue-100 dark:bg-blue-900/90 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300" />
                        </>
                      )}
                    </Carousel>
                  </Card>
                </motion.div>
              )}

              {/* Project Details and CTA */}
              <motion.div variants={fadeInUp}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Project Description */}
                  <div className="lg:col-span-2">
                    <Card className="border-blue-200 dark:border-blue-800 shadow-lg bg-blue-50 dark:bg-blue-900/30 h-full">
                      <CardHeader>
                        <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center">
                          <Hammer className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-300" />
                          Project Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{project.description}</p>
                        </div>
                        <div className="border-t border-blue-200 dark:border-blue-800 pt-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Project Information</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center text-gray-800 dark:text-gray-200">
                              <Clock className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-300" />
                              <span>Duration: 2-3 weeks</span>
                            </div>
                            <div className="flex items-center text-gray-800 dark:text-gray-200">
                              <Users className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-300" />
                              <span>Team size: 3-4 craftsmen</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* CTA Section */}
                  <div className="lg:col-span-1">
                    <Card
                      className="border-blue-200 dark:border-blue-800 shadow-lg bg-gradient-to-br from-blue-100 to-sky-100 dark:from-blue-900/30 dark:to-sky-900/30 h-full sticky top-20"
                    >
                      <CardHeader>
                        <CardTitle className="text-xl text-gray-900 dark:text-white">Start Your Project</CardTitle>
                        <p className="text-gray-800 dark:text-gray-200 text-sm">
                          Ready to transform your space? Let's discuss your vision.
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button
                          size="lg"
                          className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-lg"
                          asChild
                        >
                          <Link href="/contact">Get Free Quote</Link>
                        </Button>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-blue-300 text-blue-600 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30"
                            asChild
                          >
                            <a href="tel:+16462391844">
                              <Phone className="w-4 h-4 mr-2" />
                              Call (646) 239-1844
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-blue-300 text-blue-600 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30"
                            asChild
                          >
                            <a href="mailto:info@westsideren.com">
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </a>
                          </Button>
                        </div>
                        <div className="pt-4 border-t border-blue-200 dark:border-blue-800">
                          <p className="text-xs text-gray-800 dark:text-gray-200 text-center">
                            Licensed & Insured • Free Estimates
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <motion.div variants={fadeInUp} className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Similar Projects</h2>
                    <p className="text-gray-800 dark:text-gray-200">
                      Explore more of our {project.category.toLowerCase()} work
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedProjects.map((relatedProject) => (
                      <Card
                        key={relatedProject.id}
                        className="border-blue-200 dark:border-blue-800 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 group"
                      >
                        {relatedProject.images && relatedProject.images.length > 0 && (
                          <div className="relative h-48">
                            <Image
                              src={relatedProject.images[0]}
                              alt={relatedProject.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <CardContent className="p-6 space-y-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                              {relatedProject.title}
                            </h3>
                            <p className="text-gray-800 dark:text-gray-200 text-sm line-clamp-2">
                              {relatedProject.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className="text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-800"
                            >
                              {relatedProject.category}
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                              asChild
                            >
                              <Link href={`/projects/${relatedProject.id}`}>View Project</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-4 left-4 right-4 lg:hidden z-40">
        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-lg"
          asChild
        >
          <Link href="/contact">Get Free Quote</Link>
        </Button>
      </div>

      {/* Image Lightbox */}
      {project.images && (
        <ImageLightbox
          images={project.images}
          selectedIndex={selectedImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onSelect={setSelectedImageIndex}
        />
      )}
    </div>
  );
}
