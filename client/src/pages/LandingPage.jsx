import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Smartphone, Zap, Palette } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { setShowRegisterModal, user } = useAuth();
  const handlemodel = () => {
    (user) ? window.location.href = "/dashboard" : setShowRegisterModal(true);
  }

  return (
    <div className="min-h-screen mesh-gradient-dark text-white selection:bg-indigo-500/30 font-sans">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6 backdrop-blur-sm">
                ✨ The ultimate portfolio builder for students
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-outfit">
                Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Stunning</span> Portfolio in Minutes
              </h1>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed font-medium">
                Zero coding required. Simply fill in your details, choose a template, and get a professional public URL to share with recruiters.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={handlemodel} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/25 group">
                  Start Building Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
               
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 border-t border-white/5 bg-black/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-indigo-400" />,
                title: "Real-time Editor",
                desc: "See your changes instantly with live preview."
              },
              {
                icon: <Palette className="w-6 h-6 text-purple-400" />,
                title: "Designer Templates",
                desc: "Choose from a curated collection of modern, recruiter-friendly templates."
              },
              {
                icon: <Smartphone className="w-6 h-6 text-pink-400" />,
                title: "Mobile Ready",
                desc: "Your portfolio will look amazing on any device - desktop, tablet, or mobile."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] glass-card-dark hover:border-indigo-500/30 transition-all group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-outfit">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 bg-slate-800 rounded-md flex items-center justify-center font-bold text-xs text-white">BYP</div>
            <span className="text-sm font-semibold text-slate-400">© 2026 Build Your Portfolio</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
