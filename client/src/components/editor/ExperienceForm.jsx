import { motion } from 'framer-motion';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

const ExperienceForm = ({ experience, addExperience, updateExperience, removeExperience }) => {
  return (
    <motion.div
      key="experience"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 w-full max-w-10xl mx-auto px-4 sm:px-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-1">Work Experience</h2>
          <p className="text-xs sm:text-sm text-slate-500">Add your professional experience, internships, or jobs.</p>
        </div>
        <button
          onClick={addExperience}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {experience.length === 0 && (
        <div className="text-center py-8 sm:py-12 text-slate-500">
          <Briefcase className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm sm:text-base">No experience added yet. Click "Add" to get started!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {experience.map((exp, index) => (
        <div key={index} className="glass-card-dark p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] space-y-4 relative">
          <button
            onClick={() => removeExperience(index)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 sm:pt-0">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Position</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => updateExperience(index, 'position', e.target.value)}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                placeholder="Tech Corp"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateExperience(index, 'location', e.target.value)}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                placeholder="Remote"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Start</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                  className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                  placeholder="Jan 2024"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">End</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                  className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                  placeholder="Present"
                />
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Description</label>
              <textarea
                rows="3"
                value={exp.description}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm resize-none"
                placeholder="Describe your responsibilities and achievements..."
              ></textarea>
            </div>
          </div>
        </div>
      ))}
      </div>
    </motion.div>
  );
};

export default ExperienceForm;
