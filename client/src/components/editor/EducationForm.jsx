import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

const EducationForm = ({ education, addEducation, updateEducation, removeEducation }) => {
  return (
    <motion.div
      key="education"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 w-full max-w-10xl mx-auto px-4 sm:px-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-1">Education</h2>
          <p className="text-xs sm:text-sm text-slate-500">Add your academic qualifications.</p>
        </div>
        <button
          onClick={addEducation}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {education.length === 0 && (
        <div className="text-center py-8 sm:py-12 text-slate-500">
          <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm sm:text-base">No education history added yet. Click "Add" to get started!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {education.map((edu, index) => (
        <div key={index} className="glass-card-dark p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] space-y-4 relative">
          <button
            onClick={() => removeEducation(index)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 sm:pt-0">
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                placeholder="University Name"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                placeholder="Bachelor's"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Field of Study</label>
              <input
                type="text"
                value={edu.fieldOfStudy}
                onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                placeholder="Computer Science"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Start</label>
                <input
                  type="text"
                  value={edu.startYear}
                  onChange={(e) => updateEducation(index, 'startYear', e.target.value)}
                  className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                  placeholder="2020"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">End</label>
                <input
                  type="text"
                  value={edu.endYear}
                  onChange={(e) => updateEducation(index, 'endYear', e.target.value)}
                  className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                  placeholder="2024"
                />
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Description</label>
              <textarea
                rows="2"
                value={edu.description}
                onChange={(e) => updateEducation(index, 'description', e.target.value)}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm resize-none"
                placeholder="Optional: achievements, GPA, honors..."
              ></textarea>
            </div>
          </div>
        </div>
      ))}
      </div>
    </motion.div>
  );
};

export default EducationForm;
