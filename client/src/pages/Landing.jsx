import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import ScrollReveal from 'scrollreveal';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, Zap, Shield, Sparkles } from 'lucide-react';

const Landing = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Redirect logged-in users to dashboard
    if (!loading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  useEffect(() => {
    // GSAP Hero Animation
    const tl = gsap.timeline();
    
    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    })
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
      .from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3');

    // ScrollReveal for sections
    if (typeof window !== 'undefined' && window.ScrollReveal) {
      ScrollReveal().reveal('.reveal-section', {
        distance: '50px',
        duration: 1000,
        easing: 'ease-out',
        origin: 'bottom',
        interval: 200,
      });
    }
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with modern technologies for optimal performance',
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'JWT authentication and encrypted data storage',
    },
    {
      icon: Sparkles,
      title: 'Beautiful UI',
      description: 'Modern design with smooth animations and interactions',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent"
          >
            Modern Task Management
          </motion.h1>
          <motion.p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-600 mb-8"
          >
            Organize your work, boost productivity, and achieve your goals with our beautiful task management platform
          </motion.p>
          {!user && (
            <motion.div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 rounded-xl glass-effect text-gray-700 font-semibold hover:bg-white/90 transition-all transform hover:scale-105"
              >
                Sign In
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-gray-800 reveal-section"
        >
          Why Choose TaskFlow?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="reveal-section glass-effect p-8 rounded-2xl card-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <feature.icon className="w-12 h-12 text-primary-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="glass-effect rounded-3xl p-12 text-center max-w-3xl mx-auto reveal-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <CheckCircle className="w-16 h-16 text-primary-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who are already managing their tasks efficiently
          </p>
          {!user && (
            <Link
              to="/register"
              className="inline-block px-8 py-4 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Create Your Account
            </Link>
          )}
          {user && (
            <Link
              to="/dashboard"
              className="inline-block px-8 py-4 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Go to Dashboard
            </Link>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2024 TaskFlow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;

