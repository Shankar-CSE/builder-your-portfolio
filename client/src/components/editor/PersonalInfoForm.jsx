import React from 'react';
import { motion } from 'framer-motion';
import { Code, Plus, X } from 'lucide-react';

const levelOptions = [
  { value: 'Beginner', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', activeColor: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' },
  { value: 'Intermediate', color: 'bg-sky-500/20 text-sky-400 border-sky-500/30', activeColor: 'bg-sky-500 text-white shadow-lg shadow-sky-500/25' },
  { value: 'Advanced', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', activeColor: 'bg-amber-500 text-white shadow-lg shadow-amber-500/25' },
  { value: 'Expert', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30', activeColor: 'bg-rose-500 text-white shadow-lg shadow-rose-500/25' },
];

const LevelPills = ({ value, onChange }) => (
  <div className="flex flex-wrap gap-1.5">
    {levelOptions.map((opt) => {
      const isActive = value === opt.value;
      return (
        <motion.button
          key={opt.value}
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(opt.value)}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all border ${
            isActive
              ? opt.activeColor
              : `${opt.color} hover:opacity-80`
          }`}
        >
          {opt.value}
        </motion.button>
      );
    })}
  </div>
);

const PersonalInfoForm = ({ personalInfo, updatePersonalInfo, skills, addSkill, updateSkill, removeSkill }) => {
  return (
    <motion.div
      key="personal"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Personal Information */}
        <div className="space-y-6">
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
            value={personalInfo.name} 
            onChange={updatePersonalInfo}
            className="w-full t-input rounded-xl px-4 py-3 backdrop-blur-sm"
            placeholder="John Doe"
          />
        </div>
        
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Current Role / Headline</label>
          <input 
            type="text" 
            name="role" 
            value={personalInfo.role} 
            onChange={updatePersonalInfo}
            className="w-full t-input rounded-xl px-4 py-3 backdrop-blur-sm"
            placeholder="Full Stack Developer & Student"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Short Bio</label>
          <textarea 
            name="bio" 
            rows="4"
            value={personalInfo.bio} 
            onChange={updatePersonalInfo}
            className="w-full t-input rounded-xl px-4 py-3 backdrop-blur-sm resize-none"
            placeholder="Tell recruiters about yourself..."
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Email</label>
          <input 
            type="email" 
            name="email" 
            value={personalInfo.email} 
            onChange={updatePersonalInfo}
            className="w-full t-input rounded-xl px-4 py-3 backdrop-blur-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Location</label>
          <input 
            type="text" 
            name="location" 
            value={personalInfo.location} 
            onChange={updatePersonalInfo}
            className="w-full t-input rounded-xl px-4 py-3 backdrop-blur-sm"
            placeholder="New York, NY"
          />
        </div>
          </div>
        </div>

        {/* Right Column - Skills */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold mb-1">Skills</h2>
              <p className="text-sm text-slate-500">Add your technical and soft skills.</p>
            </div>
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm font-bold text-white flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

        {skills.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Code className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No skills added yet. Click "Add" to get started!</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="t-card p-4 rounded-[1.5rem] flex items-center gap-3 relative">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(index, 'name', e.target.value)}
                  className="w-full t-input rounded-lg px-3 py-2 text-sm"
                  placeholder="React.js"
                />
                <LevelPills
                  value={skill.level}
                  onChange={(val) => updateSkill(index, 'level', val)}
                />
              </div>
              <button
                onClick={() => removeSkill(index)}
                className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      </div>
    </motion.div>
  );
};

export default PersonalInfoForm;
