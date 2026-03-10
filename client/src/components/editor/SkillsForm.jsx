import React from 'react';
import { motion } from 'framer-motion';
import { Code, Plus, X } from 'lucide-react';

const SkillsForm = ({ skills, addSkill, updateSkill, removeSkill }) => {
  return (
    <motion.div
      key="skills"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 max-w-2xl"
    >
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
    </motion.div>
  );
};

export default SkillsForm;
