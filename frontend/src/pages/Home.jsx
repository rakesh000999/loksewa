import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="text-blue-600 mb-4 text-2xl">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    {/* Hero Section */}
    <div className="text-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 backdrop-blur-3xl"></div>
      </div>
      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
          Bridging the Digital Divide
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
          Helping rural Nepal communities access learning and government resources
          even with limited connectivity.
        </p>
        <Link
          to="/register"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          Get Started
        </Link>
      </div>
    </div>

    {/* Features Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon="📚"
          title="Comprehensive Study Materials"
          description="Access a vast library of curated content for Loksewa preparation, available offline."
        />
        <FeatureCard
          icon="🎯"
          title="Practice Tests"
          description="Test your knowledge with our extensive collection of practice questions and mock exams."
        />
        <FeatureCard
          icon="💡"
          title="Smart Learning"
          description="Personalized learning paths and progress tracking to optimize your preparation."
        />
      </div>
    </div>

    {/* Call to Action */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="mb-8 text-blue-100 max-w-2xl mx-auto">
          Join thousands of aspirants who have successfully prepared for Loksewa examinations using our platform.
        </p>
        <Link
          to="/register"
          className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          Create Free Account
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
