import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Brain, Users, Calendar, BarChart as Chart, BookOpen, MessageSquare } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <Icon className="w-6 h-6 text-indigo-600" />
        <h3 className="ml-3 text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

interface DeveloperCardProps {
  name: string;
  role: string;
  image: string;
}

function DeveloperCard({ name, role, image }: DeveloperCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-600">{role}</p>
      </div>
    </div>
  );
}

export function HomePage() {
  const features = [
    {
      icon: Code,
      title: "Coding Practice",
      description: "Access thousands of curated DSA problems with detailed solutions and explanations."
    },
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Get personalized study plans and recommendations based on your progress."
    },
    {
      icon: Users,
      title: "Mock Interviews",
      description: "Practice with peers and AI-powered mock interviews to build confidence."
    },
    {
      icon: Calendar,
      title: "Application Tracker",
      description: "Never miss a deadline with our smart application tracking system."
    },
    {
      icon: Chart,
      title: "Progress Analytics",
      description: "Track your improvement with detailed performance analytics."
    },
    {
      icon: MessageSquare,
      title: "Expert Mentorship",
      description: "Get guidance from industry professionals at top tech companies."
    }
  ];

  const developers = [
    {
      name: "Ranjan Singh",
      role: "Lead Developer",
      image: "https://t3.ftcdn.net/jpg/09/64/89/18/360_F_964891898_SuTIP6H2AVZkBuUG2cIpP9nvdixORKpM.jpg"
    },
    {
      name: "Utsav Singh",
      role: "Frontend Specialist",
      image: "https://t3.ftcdn.net/jpg/09/64/89/18/360_F_964891898_SuTIP6H2AVZkBuUG2cIpP9nvdixORKpM.jpg"
    },
    {
      name: "Om Singh",
      role: "Backend Engineer",
      image: "https://t3.ftcdn.net/jpg/09/64/89/18/360_F_964891898_SuTIP6H2AVZkBuUG2cIpP9nvdixORKpM.jpg"
    },
    {
      name: "Vikas Tiwari",
      role: "UI/UX Designer",
      image: "https://t3.ftcdn.net/jpg/09/64/89/18/360_F_964891898_SuTIP6H2AVZkBuUG2cIpP9nvdixORKpM.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Ace Your SDE Placements
              <span className="block text-indigo-600">With Confidence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Your all-in-one platform for structured interview preparation, coding practice, and placement tracking.
            </p>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 inline-flex items-center"
            >
              Start Preparing Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Students Struggle with Placements</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Breaking into SDE roles is challenging. We help you overcome the common hurdles and prepare effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      {/* Developers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our talented developers work tirelessly to create the best learning experience for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {developers.map((developer, index) => (
            <DeveloperCard
              key={index}
              name={developer.name}
              role={developer.role}
              image={developer.image}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Transform Your Placement Prep?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of students preparing smarter, not harder!
          </p>
          <Link
            to="/signup"
            className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center"
          >
            Sign Up Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>Features</li>
                <li>Pricing</li>
                <li>Testimonials</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>Blog</li>
                <li>Documentation</li>
                <li>Community</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>GitHub</li>
                <li>Discord</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 text-center text-gray-400">
            <p>&copy; 2025 SDE Placement Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
