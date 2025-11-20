import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import ScrollReveal from 'scrollreveal';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { CheckCircle, Zap, Shield, Sparkles } from 'lucide-react';

const Landing = () => {
  const { user, loading } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  // All hooks must be called before any conditional returns
  useEffect(() => {
    // Redirect logged-in users to dashboard
    if (!loading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Only run animations if not loading
    if (loading) return;

    // GSAP Hero Animation
    const tl = gsap.timeline();
    
    if (titleRef.current) {
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });
    }
    
    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5');
    }
    
    if (ctaRef.current) {
      tl.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3');
    }

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
  }, [loading]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

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
    <div className="min-h-screen" style={{ isolation: 'isolate' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="container mx-auto px-4 py-20 md:py-32 max-w-6xl relative z-10" style={{ isolation: 'isolate' }}>
        <div className="text-center max-w-7xl mx-auto relative z-10" style={{ isolation: 'isolate' }}>
          <motion.h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight gradient-text-safe p-4"
            style={{ 
              backgroundImage: darkMode 
                ? 'linear-gradient(to right, #7dd3fc, #38bdf8, #818cf8)' 
                : 'linear-gradient(to right, #0284c7, #0ea5e9, #6366f1)',
              textShadow: 'none',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              filter: 'none',
              backdropFilter: 'none',
              transform: 'translateZ(0)',
              willChange: 'auto',
              isolation: 'isolate',
              position: 'relative',
              zIndex: 10
            }}
          >
            Modern Task Management
          </motion.h1>
          <motion.p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 font-medium leading-relaxed max-w-3xl mx-auto"
            style={{ 
              textShadow: 'none',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              filter: 'none',
              backdropFilter: 'none',
              transform: 'translateZ(0)',
              willChange: 'auto',
              isolation: 'isolate',
              position: 'relative',
              zIndex: 10
            }}
          >
            Organize your work, boost productivity, and achieve your goals with our beautiful task management platform
          </motion.p>
          {!user && (
            <motion.div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="inline-block px-8 py-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-md hover:shadow-lg"
                >
                  Sign In
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <motion.h2
          className="text-5xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100 reveal-section"
        >
          Why Choose TaskFlow?
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 text-center mb-16 reveal-section"
        >
          Everything you need to stay organized and productive
        </motion.p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="reveal-section glass-effect-strong p-8 rounded-2xl card-hover group"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <motion.div
          className="glass-effect-strong rounded-3xl p-12 md:p-16 text-center reveal-section relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-indigo-500/5"></div>
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 font-medium">
              Join thousands of users who are already managing their tasks efficiently
            </p>
            {!user && (
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Create Your Account
                </Link>
              </motion.div>
            )}
            {user && (
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/dashboard"
                  className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Go to Dashboard
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2024 TaskFlow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;

