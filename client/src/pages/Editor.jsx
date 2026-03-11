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
  Layers, 
  Globe, 
  Settings as SettingsIcon,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import PersonalInfoForm from '../components/editor/PersonalInfoForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm from '../components/editor/EducationForm';
import ProjectsForm from '../components/editor/ProjectsForm';
import SocialLinksForm from '../components/editor/SocialLinksForm';
import SettingsForm from '../components/editor/SettingsForm';

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
    certifications: [],
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
      } catch {
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

  const updateSocialLinks = (e) => {
    const { name, value } = e.target;
    setPortfolio({
      ...portfolio,
      socialLinks: { ...portfolio.socialLinks, [name]: value }
    });
  };

  const updateSettings = (key, value) => {
    setPortfolio({
      ...portfolio,
      settings: { ...portfolio.settings, [key]: value }
    });
  };

  // Experience handlers
  const addExperience = () => {
    setPortfolio({
      ...portfolio,
      experience: [...portfolio.experience, { company: '', position: '', location: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...portfolio.experience];
    updated[index][field] = value;
    setPortfolio({ ...portfolio, experience: updated });
  };

  const removeExperience = (index) => {
    setPortfolio({
      ...portfolio,
      experience: portfolio.experience.filter((_, i) => i !== index)
    });
  };

  // Education handlers
  const addEducation = () => {
    setPortfolio({
      ...portfolio,
      education: [...portfolio.education, { institution: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '', description: '' }]
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...portfolio.education];
    updated[index][field] = value;
    setPortfolio({ ...portfolio, education: updated });
  };

  const removeEducation = (index) => {
    setPortfolio({
      ...portfolio,
      education: portfolio.education.filter((_, i) => i !== index)
    });
  };

  // Skills handlers
  const addSkill = () => {
    setPortfolio({
      ...portfolio,
      skills: [...portfolio.skills, { name: '', level: 'Beginner' }]
    });
  };

  const updateSkill = (index, field, value) => {
    const updated = [...portfolio.skills];
    updated[index][field] = value;
    setPortfolio({ ...portfolio, skills: updated });
  };

  const removeSkill = (index) => {
    setPortfolio({
      ...portfolio,
      skills: portfolio.skills.filter((_, i) => i !== index)
    });
  };

  // Projects handlers
  const addProject = () => {
    setPortfolio({
      ...portfolio,
      projects: [...portfolio.projects, { title: '', description: '', techStack: [], githubLink: '', liveLink: '', image: '' }]
    });
  };

  const updateProject = (index, field, value) => {
    const updated = [...portfolio.projects];
    updated[index][field] = value;
    setPortfolio({ ...portfolio, projects: updated });
  };

  const updateProjectTechStack = (index, techString) => {
    const updated = [...portfolio.projects];
    // Split by comma or space, trim, and filter out empty strings
    updated[index].techStack = techString
      .split(/[,\s]+/)  // Split by comma or whitespace (one or more)
      .map(t => t.trim())
      .filter(t => t);
    setPortfolio({ ...portfolio, projects: updated });
  };

  const removeProject = (index) => {
    setPortfolio({
      ...portfolio,
      projects: portfolio.projects.filter((_, i) => i !== index)
    });
  };

  const tabs = [
    { id: 'personal', label: 'Personal', icon: <User className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
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
    <div className="min-h-screen mesh-gradient-dark text-white font-sans selection:bg-indigo-500/30">
      {/* Editor - Full Width */}
      <div className="w-full flex flex-col h-screen">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-6 border-b border-white/5 bg-slate-950/20 backdrop-blur-xl shrink-0 z-50">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-lg hidden sm:block font-outfit tracking-tight">Editor</h1>
          </div>
          
          <div className="flex items-center gap-3">
            {saveStatus === 'success' && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-s text-emerald-400 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Saved
              </motion.div>
            )}
            <button 
              onClick={handleSave} 
              disabled={saving}
              className="px-7 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2 hover:shadow-indigo-500/40 transform active:scale-95"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center h-20 overflow-x-auto no-scrollbar border-b border-white/5 bg-slate-950/10 backdrop-blur-sm shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex w-full items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id 
                  ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5 justify-center' 
                  : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5 justify-center hover:border-white/10'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto w-full flex items-start justify-center px-4 sm:px-8 py-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'personal' && (
              <PersonalInfoForm
                personalInfo={portfolio.personalInfo}
                updatePersonalInfo={updatePersonalInfo}
                skills={portfolio.skills}
                addSkill={addSkill}
                updateSkill={updateSkill}
                removeSkill={removeSkill}
              />
            )}
            
            {activeTab === 'experience' && (
              <ExperienceForm
                experience={portfolio.experience}
                addExperience={addExperience}
                updateExperience={updateExperience}
                removeExperience={removeExperience}
              />
            )}

            {activeTab === 'education' && (
              <EducationForm
                education={portfolio.education}
                addEducation={addEducation}
                updateEducation={updateEducation}
                removeEducation={removeEducation}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsForm
                projects={portfolio.projects}
                addProject={addProject}
                updateProject={updateProject}
                updateProjectTechStack={updateProjectTechStack}
                removeProject={removeProject}
              />
            )}

            {activeTab === 'social' && (
              <SocialLinksForm
                socialLinks={portfolio.socialLinks}
                updateSocialLinks={updateSocialLinks}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsForm
                settings={portfolio.settings}
                templateId={portfolio.templateId}
                updateSettings={updateSettings}
                setTemplateId={(value) => setPortfolio({ ...portfolio, templateId: value })}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Editor;
