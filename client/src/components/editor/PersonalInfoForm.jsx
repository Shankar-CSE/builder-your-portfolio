import React from 'react';
import { motion } from 'framer-motion';
import { Code, Plus, X } from 'lucide-react';

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
            className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
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
            className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
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
            className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm resize-none"
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
            className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Location</label>
          <input 
            type="text" 
            name="location" 
            value={personalInfo.location} 
            onChange={updatePersonalInfo}
            className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
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
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
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
            <div key={index} className="glass-card-dark p-4 rounded-[1.5rem] flex items-center gap-3 relative">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(index, 'name', e.target.value)}
                  className="w-full bg-slate-950/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50"
                  placeholder="React.js"
                />
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(index, 'level', e.target.value)}
                  className="w-full bg-slate-950/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
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
