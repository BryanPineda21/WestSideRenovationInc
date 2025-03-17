"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Award, CheckCircle, Clock, Phone, Hammer, Paintbrush, Wrench, HomeIcon} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

// Service cards data
const services = [
  {
    title: "Interior Remodeling",
    description: "Transform your living spaces with our expert interior remodeling services.",
    icon: <HomeIcon className="h-10 w-10 text-primary" />,
    link: "/services/interior-remodeling",
  },
  {
    title: "Custom Carpentry",
    description: "Bespoke woodwork crafted with precision and attention to detail.",
    icon: <Hammer className="h-10 w-10 text-primary" />,
    link: "/services/custom-carpentry",
  },
  {
    title: "Painting",
    description: "Professional painting services for a fresh, flawless finish.",
    icon: <Paintbrush className="h-10 w-10 text-primary" />,
    link: "/services/painting",
  },
  {
    title: "Electrical",
    description: "Safe, reliable electrical services for your home or business.",
    icon: <Wrench className="h-10 w-10 text-primary" />,
    link: "/services/electrical",
  },
];

// Testimonials data
const testimonials = [
  {
    quote: "Westside Renovation transformed our outdated kitchen into a stunning modern space we love to cook in!",
    author: "Sarah M.",
    location: "Manhattan",
  },
  {
    quote: "Professional, punctual, and precise. The team delivered exactly what they promised and on schedule.",
    author: "David T.",
    location: "Brooklyn",
  },
  {
    quote: "The attention to detail in the custom cabinetry was remarkable. Truly exceptional craftsmanship.",
    author: "Jennifer L.",
    location: "Queens",
  },
];

// Project images for carousel (replace with your actual images)
const projectImages = [
  {
    src: "/api/placeholder/1200/600",
    alt: "Modern kitchen renovation with marble countertops",
    title: "Luxury Kitchen Remodel",
    location: "Upper East Side",
  },
  {
    src: "/api/placeholder/1200/600",
    alt: "Custom built bathroom with walk-in shower",
    title: "Master Bathroom Renovation",
    location: "Brooklyn Heights",
  },
  {
    src: "/api/placeholder/1200/600",
    alt: "Open concept living room design",
    title: "Open Concept Living Space",
    location: "Tribeca",
  },
  {
    src: "/floorsanding.jpeg",
    alt: "Floor painting and restoration in a home",
    title: "Floor Restoration and Painting",
    location: "Upper West Side",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full mt-14">
      {/* Hero Section with Motto */}
      <section className="relative w-full bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white pt-24 md:pt-32">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-0"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              Westside Renovation Inc
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Crafting</span> Spaces That Inspire
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Turning your vision into reality with precision, quality, and dedication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0">
                Schedule a Consultation
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Our Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="w-full py-12 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Award className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Licensed & Insured</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fully licensed contractors with complete insurance coverage
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <CheckCircle className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We're not happy until you're completely satisfied with our work
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Clock className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">On-Time, Every Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We respect your schedule and deliver projects on time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Carousel */}
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Browse our recent transformations and get inspired for your next renovation project
            </p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {projectImages.map((project, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <p className="text-gray-200">{project.location}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>

      {/* Our Services */}
      <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400">Our Services</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive renovation and construction services tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="pb-2">
                  <div className="mb-2">{service.icon}</div>
                  <CardTitle className="dark:text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base dark:text-gray-300">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href={service.link} className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center">
                    Learn more
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" className="dark:text-white dark:border-gray-600 dark:hover:bg-gray-700" size="lg">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">What Our Clients Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-50 dark:bg-gray-800 border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 text-4xl text-blue-600 dark:text-blue-400">"</div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                    {testimonial.quote}
                  </p>
                  <div className="flex flex-col">
                    <span className="font-semibold dark:text-white">{testimonial.author}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.location}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a professional consultation. Let's bring your vision to life!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-blue-700 hover:bg-gray-100 dark:hover:bg-gray-200">
              <Phone className="mr-2 h-5 w-5" />
              (646) 239-1844
            </Button>
            <Button size="lg" className="bg-white/20 hover:bg-white/30 border-2 border-white">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Company Motto/Tagline Banner */}
      <section className="w-full py-10 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-light italic tracking-wide">
            "Building Quality. Crafting Excellence. Renovating Dreams."
          </h2>
          <p className="mt-4 text-gray-300">
            Westside Renovation Inc. — Proudly serving New York since 1995
          </p>
        </div>
      </section>
    </div>
  );
}