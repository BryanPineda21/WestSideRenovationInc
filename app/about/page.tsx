import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function About(){
  const skills = [
    { name: "Custom Carpentry", value: 95 },
    { name: "Home Renovation", value: 90 },
    { name: "Kitchen Remodeling", value: 85 },
    { name: "Bathroom Renovation", value: 88 },
    { name: "Deck Construction", value: 92 }
  ];

  const timelineEvents = [
    { year: 2012, title: "Foundation", description: "Westside Renovation Inc was founded with a vision to transform homes with exceptional craftsmanship." },
    { year: 2015, title: "Growth", description: "Expanded our team to 15 skilled craftspeople and completed our 100th renovation project." },
    { year: 2018, title: "Recognition", description: "Received the Regional Excellence in Construction Award for our commitment to quality." },
    { year: 2021, title: "Innovation", description: "Pioneered eco-friendly renovation practices in our local community." },
    { year: 2023, title: "Milestone", description: "Celebrated over 500 successful projects and expanded our service area." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section - with extra top padding for navbar */}
      <div className="relative h-96 w-full overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-0 bg-black/50">
          {/* You would replace this with an actual image of your projects */}
          <div className="absolute inset-0 bg-[url('/images/hero-placeholder.jpg')] bg-cover bg-center opacity-60"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">About Westside Renovation</h1>
          <p className="text-lg sm:text-xl text-gray-100 max-w-2xl">Crafting exceptional spaces with precision and passion since 2012</p>
        </div>
      </div>

      {/* Main Content - with improved responsive padding */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-16 sm:px-6 lg:px-8">
        
        {/* Our Story Section - improved mobile spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 mb-16 sm:mb-24">
          <div className="space-y-6">
            <Badge className="mb-2" variant="outline">EST. 2012</Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Our Story</h2>
            <Separator className="w-24 bg-amber-500 h-1" />
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Westside Renovation Inc was founded with a simple yet powerful vision: to transform houses into homes that truly reflect the personalities and lifestyles of the people who live in them.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Starting with a small team of dedicated craftspeople, we've grown to become one of the most trusted renovation companies in the region, known for our meticulous attention to detail and commitment to excellence.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Through every project, we remain committed to our founding principles of quality, integrity, and customer satisfaction.
            </p>
            <Button className="mt-4 bg-amber-500 hover:bg-amber-600">Our Projects</Button>
          </div>
          
          {/* Founder section with Shadcn Avatar */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-b from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-700 h-[500px] flex flex-col items-center justify-center p-8">
            <Avatar className="w-64 h-64 border-4 border-amber-500 shadow-xl mb-6">
              <AvatarImage src="/images/founder.jpg" alt="Founder of Westside Renovation" />
              <AvatarFallback className="text-5xl bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-200">JD</AvatarFallback>
            </Avatar>
            <div className="text-center mt-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Marcos Pineda</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">Founder & Master Craftsman</p>
            </div>
            <div className="mt-6 bg-white/80 dark:bg-black/50 p-4 rounded-lg shadow-md">
              <p className="italic text-gray-700 dark:text-gray-300">"We don't just build structures, we craft homes that tell your story."</p>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <Separator className="w-24 mx-auto bg-amber-500 h-1 mb-6" />
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              At the core of Westside Renovation are values that guide every decision we make and every project we undertake.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Quality</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We never compromise on quality. From the materials we select to the techniques we employ, excellence is our standard.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Customer Focus</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We listen carefully to our clients' needs and desires, ensuring that every renovation reflects their unique vision.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Innovation</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We continuously seek new techniques, materials, and design approaches to deliver cutting-edge renovations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Expertise Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Expertise</h2>
            <Separator className="w-24 mx-auto bg-amber-500 h-1 mb-6" />
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              With years of experience in the industry, we've honed our skills to deliver exceptional results across various renovation specialties.
            </p>
          </div>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">{skill.value}%</span>
                </div>
                <Progress value={skill.value} className="h-2 bg-gray-200 dark:bg-gray-700 "/>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section - improved mobile layout */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Journey</h2>
            <Separator className="w-24 mx-auto bg-amber-500 h-1 mb-6" />
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              From our humble beginnings to where we are today, every step of our journey has shaped us into the company we are proud to be.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline center line - hidden on mobile, visible on md+ */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-200 dark:bg-amber-800"></div>
            
            <div className="space-y-8 md:space-y-16">
              {timelineEvents.map((event, index) => (
                <div key={event.year} className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} md:justify-between`}>
                  {/* Mobile timeline line */}
                  <div className="absolute left-4 top-0 h-full w-1 bg-amber-200 dark:bg-amber-800 md:hidden"></div>
                  
                  {/* Mobile timeline circle */}
                  <div className="absolute left-4 top-6 transform -translate-x-1/2 w-6 h-6 rounded-full bg-amber-500 border-4 border-white dark:border-gray-900 z-10 md:hidden"></div>
                  
                  <div className={`w-full pl-10 md:pl-0 md:w-5/12 ${index % 2 === 1 && 'md:order-1'}`}>
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-4 sm:p-6">
                        <Badge variant="outline" className="mb-2">{event.year}</Badge>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Desktop timeline circle - hidden on mobile */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-amber-500 border-4 border-white dark:border-gray-900 z-10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action - made more responsive */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Ready to Transform Your Space?</h2>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8">
            Let's work together to bring your renovation dreams to life. Contact us today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 transition-colors">Contact Us</Button>
            <Button size="lg" variant="outline" className="dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors">View Portfolio</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

