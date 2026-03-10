import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Loader2, AlertCircle, AtSign, X } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register, showRegisterModal, setShowRegisterModal, setShowLoginModal } = useAuth();
  const navigate = useNavigate();

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setShowRegisterModal(false);
    };
    if (showRegisterModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [showRegisterModal, setShowRegisterModal]);

  // Reset form when modal opens
  useEffect(() => {
    if (showRegisterModal) {
      setFormData({ name: '', email: '', password: '', username: '' });
      setError('');
    }
  }, [showRegisterModal]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.username
    );
    
    if (result.success) {
      setShowRegisterModal(false);
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const switchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  if (!showRegisterModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setShowRegisterModal(false)}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-[modalIn_0.25s_ease-out]">
        <div className="glass-card-dark py-8 px-4 shadow-2xl rounded-[2rem] sm:px-10 relative">
          {/* Close button */}
          <button
            onClick={() => setShowRegisterModal(false)}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex justify-center items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">BYP</div>
              <span className="text-2xl font-bold text-white tracking-tight font-outfit">Build Your Portfolio</span>
            </div>
            <h2 className="text-center text-3xl font-extrabold text-white font-outfit">Create your account</h2>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="reg-name" className="block text-sm font-medium text-slate-300 pl-1">
                Full Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 h-5 text-slate-500" />
                </div>
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-11 pr-3 py-3 border border-white/10 rounded-2xl bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm hover:border-white/20"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-username" className="block text-sm font-medium text-slate-300 pl-1">
                Username
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <AtSign className="h-5 h-5 text-slate-500" />
                </div>
                <input
                  id="reg-username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-11 pr-3 py-3 border border-white/10 rounded-2xl bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm hover:border-white/20"
                  placeholder="johndoe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-slate-300 pl-1">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 h-5 text-slate-500" />
                </div>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-11 pr-3 py-3 border border-white/10 rounded-2xl bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm hover:border-white/20"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium text-slate-300 pl-1">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 h-5 text-slate-500" />
                </div>
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-11 pr-3 py-3 border border-white/10 rounded-2xl bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm hover:border-white/20"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-2xl shadow-lg shadow-indigo-500/20 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Create Account'
                )}
              </button>
              <p className="mt-2 text-center text-sm text-slate-400">
                Already have an account?{' '}
                <button type="button" onClick={switchToLogin} className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
