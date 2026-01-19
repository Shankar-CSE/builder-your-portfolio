import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import portfolioService from '../api/portfolioService';
import { 
  ChevronLeft, 
  Save, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Layers, 
  Globe, 
  Eye,
  Settings as SettingsIcon,
  Loader2,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

const Editor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [portfolio, setPortfolio] = useState({
    personalInfo: { name: user?.name || '', bio: '', role: '', profilePhoto: '', email: user?.email || '', phone: '', location: '' },
    education: [],
    skills: [],
    projects: [],
    experience: [],
    socialLinks: { github: '', linkedin: '', twitter: '', portfolio: '' },
    settings: { theme: 'light', isPublic: true },
    templateId: 'modern'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await portfolioService.getMyPortfolio();
        if (data) setPortfolio(data);
      } catch (error) {
        console.log('No existing portfolio found, starting fresh');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await portfolioService.upsertPortfolio(portfolio);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error('Save failed:', error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const updatePersonalInfo = (e) => {
    const { name, value } = e.target;
    setPortfolio({
      ...portfolio,
      personalInfo: { ...portfolio.personalInfo, [name]: value }
    });
  };

  const tabs = [
    { id: 'personal', label: 'Personal', icon: <User className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Code className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Layers className="w-4 h-4" /> },
    { id: 'social', label: 'Social', icon: <Globe className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      {/* Left Sidebar - Form */}
      <div className="w-full lg:w-1/2 flex flex-col border-r border-white/5 bg-slate-950">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-lg hidden sm:block">Editor</h1>
          </div>
          
          <div className="flex items-center gap-3">
            {saveStatus === 'success' && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Saved
              </motion.div>
            )}
            <button 
              onClick={handleSave} 
              disabled={saving}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-white/5 bg-slate-950/30 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id 
                  ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5' 
                  : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'personal' && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 max-w-2xl"
              >
                <div>
                  <h2 className="text-xl font-bold mb-1">Personal Information</h2>
                  <p className="text-sm text-slate-500 mb-6">This information will be displayed at the top of your portfolio.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={portfolio.personalInfo.name} 
                      onChange={updatePersonalInfo}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Current Role / Headline</label>
                    <input 
                      type="text" 
                      name="role" 
                      value={portfolio.personalInfo.role} 
                      onChange={updatePersonalInfo}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="Full Stack Developer & Student"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Short Bio</label>
                    <textarea 
                      name="bio" 
                      rows="4"
                      value={portfolio.personalInfo.bio} 
                      onChange={updatePersonalInfo}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                      placeholder="Tell recruiters about yourself..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={portfolio.personalInfo.email} 
                      onChange={updatePersonalInfo}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Location</label>
                    <input 
                      type="text" 
                      name="location" 
                      value={portfolio.personalInfo.location} 
                      onChange={updatePersonalInfo}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="New York, NY"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab !== 'personal' && (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  {tabs.find(t => t.id === activeTab)?.icon}
                </div>
                <h3 className="text-lg font-bold">Coming Soon</h3>
                <p className="text-slate-500 max-w-xs">I'm currently implementing this section. Please check back in a few minutes!</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right - Live Preview */}
      <div className="hidden lg:block lg:w-1/2 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 w-full z-10 p-4 flex justify-between items-center pointer-events-none">
          <span className="px-3 py-1 bg-slate-950/80 backdrop-blur text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/5 text-slate-400">Live Preview</span>
          <div className="flex gap-2 pointer-events-auto">
             <button className="p-2 bg-slate-950/80 backdrop-blur rounded-lg border border-white/5 hover:bg-slate-800 transition-colors">
               <Eye className="w-4 h-4 text-slate-400" />
             </button>
          </div>
        </div>

        <div className="h-full overflow-y-auto p-12 bg-white text-slate-900 rounded-s-[40px] shadow-2xl origin-top transition-transform duration-500 scale-[0.98]">
          {/* Preview Content Stub */}
          <div className="max-w-xl mx-auto py-10">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center border-2 border-slate-50">
                <ImageIcon className="w-8 h-8 text-slate-300" />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight mb-2">{portfolio.personalInfo.name || 'Your Name'}</h1>
                <p className="text-lg font-medium text-indigo-600">{portfolio.personalInfo.role || 'Professional Role'}</p>
              </div>
            </div>

            <div className={`space-y-6 mb-10 transition-opacity ${portfolio.personalInfo.bio ? 'opacity-100' : 'opacity-20'}`}>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">About Me</h2>
              <p className="text-slate-600 leading-relaxed text-lg italic underline decoration-indigo-500/20 underline-offset-8">
                {portfolio.personalInfo.bio || 'Your bio will appear here as you type in the editor on the left. Tell the world about your passion and skills.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 text-center">Projects</h3>
                <div className="text-3xl font-black text-center">0</div>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 text-center">Experience</h3>
                <div className="text-3xl font-black text-center">0</div>
              </div>
            </div>
            
            <div className="mt-12 pt-12 border-t border-slate-100 flex justify-between items-center">
               <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                 <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                 <div className="w-8 h-8 rounded-full bg-slate-100"></div>
               </div>
               <p className="text-xs font-bold text-slate-300">MADE WITH FIRSTPORTFOLIO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
