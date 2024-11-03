import React from 'react';
import HeroSection from '../components/about/hero-section';
import FeatureSection from '../components/about/feature-section';
import TeamMember from '../components/about/team-members';
import TestimonialCard from '../components/about/testimonial-card';
import Header from '../components/layouts/Header'; // Ensure you have a Header component
import Footer from '../components/layouts/Footer'; // Ensure you have a Footer component
import Link from 'next/link';

const AboutPage: React.FC = () => {
  const teamMembers = [
    { name: "Jane Doe", role: "CEO & Founder", imageUrl: "/placeholder.svg?height=96&width=96" },
    { name: "John Smith", role: "CTO", imageUrl: "/placeholder.svg?height=96&width=96" },
    { name: "Alice Johnson", role: "Head of Security", imageUrl: "/placeholder.svg?height=96&width=96" },
    { name: "Bob Williams", role: "Customer Success Manager", imageUrl: "/placeholder.svg?height=96&width=96" },
  ];

  const testimonials = [
    {
      quote: "I-CAST made our union elections seamless and transparent. Highly recommended!",
      author: "Sarah Thompson",
      organization: "National Teachers Union"
    },
    {
      quote: "The real-time results feature saved us countless hours in vote counting.",
      author: "Michael Chen",
      organization: "Student Government Association"
    },
    {
      quote: "Security was our top priority, and I-CAST delivered beyond our expectations.",
      author: "Emily Rodriguez",
      organization: "Corporate Board Elections Inc."
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <FeatureSection />

        {/* Team Section */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 text-center bg-gray-200 dark:bg-gray-800 rounded-lg p-8 shadow-md">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-8 text-lg">Experience the future of online voting with I-CAST.</p>
          <Link 
            href="/register" 
            className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Sign Up Now
          </Link>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default AboutPage;
