import React from 'react';
import { motion } from 'framer-motion';

const PersonalInfoForm = ({ personalInfo, updatePersonalInfo }) => {
  return (
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
    </motion.div>
  );
};

export default PersonalInfoForm;
