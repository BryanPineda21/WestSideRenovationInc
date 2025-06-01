"use client";


import React from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Hammer, 
  Home, 
  ChefHat, 
  Bath, 
  Layers, 
  Award, 
  Users, 
  Sparkles, 
  ChevronRight,
  Clock,
  MessageSquareQuote,
  Mail,
  Image,
  Shield
} from "lucide-react";

interface Skill {
  name: string;
  value: number;
  icon: React.ReactNode;
}

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

const About: React.FC = () => {
  const skills: Skill[] = [
    { name: "Custom Carpentry", value: 95, icon: <Hammer className="w-5 h-5 text-blue-500" /> },
    { name: "Home Renovation", value: 90, icon: <Home className="w-5 h-5 text-blue-500" /> },
    { name: "Kitchen Remodeling", value: 85, icon: <ChefHat className="w-5 h-5 text-blue-500" /> },
    { name: "Bathroom Renovation", value: 88, icon: <Bath className="w-5 h-5 text-blue-500" /> },
    { name: "Deck Construction", value: 92, icon: <Layers className="w-5 h-5 text-blue-500" /> }
  ];

  const timelineEvents: TimelineEvent[] = [
    { year: 2012, title: "Foundation", description: "Westside Renovation was founded with a vision to transform homes with exceptional craftsmanship." },
    { year: 2015, title: "Growth", description: "Completed our 50th renovation project, establishing a reputation for quality and attention to detail." },
    { year: 2019, title: "Specialization", description: "Focused on custom carpentry solutions, becoming known for unique woodworking designs." },
    { year: 2023, title: "Milestone", description: "Celebrated over 200 successful projects and expanded our service area." }
  ];

  // Animation variants
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section - with modern blue overlay and image */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/70">
          {/* Replace with actual high-quality image of your work */}
          <div className="absolute inset-0 bg-[url('/images/hero-placeholder.jpg')] bg-cover bg-center opacity-60"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-blue-600/30 backdrop-blur-sm text-blue-100 rounded-full px-4 py-1 inline-block mb-4 border border-blue-400/30"
          >
            Established 2012
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg"
          >
            About Westside Renovation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-100 max-w-2xl drop-shadow-md"
          >
            Crafting exceptional spaces with precision and passion
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-16 sm:px-6 lg:px-8">
        {/* Our Story Section with Founder Portrait */}
        <section className="mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
            <Separator className="w-24 mx-auto bg-blue-500 h-1 mb-6" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-center">
            <motion.div 
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Westside Renovation was founded in 2012 with a simple yet powerful vision: to transform houses into homes that truly reflect the personalities and lifestyles of the people who live in them.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                As a small team of dedicated craftspeople, we take immense pride in our meticulous attention to detail and commitment to excellence. Every project receives our full attention and craftsmanship.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Through every project, we remain committed to our founding principles of quality, integrity, and customer satisfaction. We don't just build structures; we create living spaces that tell your story.
              </p>
              <div className="pt-4 flex items-center">
                <Shield className="h-6 w-6 text-blue-500 mr-2" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Fully licensed and insured</span>
              </div>
            </motion.div>
            
            {/* Founder portrait */}
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-xl flex flex-col items-center justify-center p-8 h-auto py-12 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 p-1.5 shadow-xl mb-8">
                <Avatar className="w-64 h-64 rounded-full overflow-hidden">
                  <AvatarImage src="/marcos.png" alt="Founder of Westside Renovation" className="object-cover" />
                  <AvatarFallback className="text-5xl bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200">MP</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Marcos Pineda</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">Founder & Master Craftsman</p>
              </div>
              <div className="mt-6 bg-white/90 dark:bg-black/60 p-5 rounded-lg shadow-md backdrop-blur-sm">
                <p className="italic text-gray-700 dark:text-gray-300 flex items-start">
                  <MessageSquareQuote className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                  "We don't just build structures, we craft homes that tell your story."
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Timeline Journey Section */}
        <section className="mb-20">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-blue-500 mr-2" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Our Journey</h2>
            </div>
            <Separator className="w-24 mx-auto bg-blue-500 h-1 mb-6" />
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              From our humble beginnings to where we are today, every project has shaped our craft and expertise.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline center line - hidden on mobile, visible on md+ */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-300 to-blue-500 dark:from-blue-700 dark:to-blue-900 rounded-full"></div>
            
            <motion.div 
              className="space-y-12 md:space-y-24"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={event.year} 
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} md:justify-between`}
                  variants={fadeIn}
                >
                  {/* Mobile timeline line */}
                  <div className="absolute left-4 top-0 h-full w-1 bg-gradient-to-b from-blue-300 to-blue-500 dark:from-blue-700 dark:to-blue-900 rounded-full md:hidden"></div>
                  
                  {/* Mobile timeline circle */}
                  <div className="absolute left-4 top-6 transform -translate-x-1/2 w-8 h-8 rounded-full bg-blue-500 border-4 border-white dark:border-gray-900 z-10 md:hidden flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{event.year.toString().substring(2)}</span>
                  </div>
                  
                  <div className={`w-full pl-10 md:pl-0 md:w-5/12 ${index % 2 === 1 && 'md:order-1'}`}>
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                      <CardContent className="p-6">
                        <Badge variant="outline" className="mb-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{event.year}</Badge>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Desktop timeline circle - hidden on mobile */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-500 border-4 border-white dark:border-gray-900 z-10 items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-white">{event.year}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Team Section - Simplified */}
        <section className="mb-20">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-blue-500 mr-2" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Our Team</h2>
            </div>
            <Separator className="w-24 mx-auto bg-blue-500 h-1 mb-6" />
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              We believe that small teams deliver better results. Our focused team of skilled craftspeople provides personalized attention to every project.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Founder card - simplified version since he's already featured above */}
            <motion.div variants={fadeIn} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="p-6 flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <Avatar className="w-16 h-16 rounded-full border-2 border-blue-500">
                    <AvatarImage src="/marcos.png" alt="Marcos Pineda" className="object-cover" />
                    <AvatarFallback className="text-xl bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200">MP</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Marcos Pineda</h3>
                  <p className="text-gray-700 dark:text-gray-400">Founder & Master Craftsman</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Master Carpenter</Badge>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Designer</Badge>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Assistant craftsperson */}
            <motion.div variants={fadeIn} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="p-6 flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <Avatar className="w-16 h-16 rounded-full border-2 border-blue-500">
                    <AvatarImage src="/luis.png" alt="Assistant Craftsperson" className="object-cover" />
                    <AvatarFallback className="text-xl bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200">AC</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Luis Pineda</h3>
                  <p className="text-gray-700 dark:text-gray-400">Skilled Carpentry Support</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Finishing</Badge>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Installation</Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Our Values Section */}
        <section className="mb-20">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-blue-500 mr-2" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Our Values</h2>
            </div>
            <Separator className="w-24 mx-auto bg-blue-500 h-1 mb-6" />
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              At the core of Westside Renovation are values that guide every decision we make and every project we undertake.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 overflow-hidden h-full">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-6">
                    <Sparkles className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Craftsmanship</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We never compromise on quality. From the materials we select to the techniques we employ, excellence in craftsmanship is our standard.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 overflow-hidden h-full">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Personal Touch</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    As a small team, we provide personalized attention to every client, ensuring your renovation reflects your unique vision and needs.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 overflow-hidden h-full">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-6">
                    <Clock className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Reliability</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We deliver on our promises—completing projects on time, within budget, and to the highest standards of quality.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Expertise Section - Modernized */}
        <section className="mb-20">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center justify-center mb-4">
              <Hammer className="w-8 h-8 text-blue-500 mr-2" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Our Expertise</h2>
            </div>
            <Separator className="w-24 mx-auto bg-blue-500 h-1 mb-6" />
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              With years of experience in the industry, we've honed our skills to deliver exceptional results across various renovation specialties.
            </p>
          </motion.div>
          
          <motion.div 
            className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill.name} 
                  className="space-y-2"
                  variants={fadeIn}
                  custom={index}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {skill.icon}
                      <span className="font-medium text-gray-900 dark:text-white ml-2">{skill.name}</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">{skill.value}%</span>
                  </div>
                  <div className="relative h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Call to Action - Simplified */}
        <motion.section 
          className="text-center rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 p-12 shadow-xl text-white relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-[url('/api/placeholder/800/400')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 relative z-10 drop-shadow-md">Ready to Transform Your Space?</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 relative z-10">
            Contact us today for a free consultation. Let's bring your renovation dreams to life!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4 relative z-10">
            <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-white group transition-all duration-300 flex items-center gap-2 px-6">
              <Mail className="w-5 h-5 group-hover:animate-pulse" />
              Contact Us
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 px-6">
              (646) 239-1844
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;