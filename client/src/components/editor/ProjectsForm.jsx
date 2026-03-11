import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Plus, Trash2 } from 'lucide-react';

const ProjectsForm = ({ projects, addProject, updateProject, updateProjectTechStack, removeProject }) => {
  return (
    <motion.div
      key="projects"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 w-full max-w-10xl mx-auto px-4 sm:px-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-1">Projects</h2>
          <p className="text-xs sm:text-sm text-slate-500">Showcase your best work and projects.</p>
        </div>
        <button
          onClick={addProject}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-8 sm:py-12 text-slate-500">
          <Layers className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm sm:text-base">No projects added yet. Click "Add" to get started!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {projects.map((project, index) => (
        <div key={index} className="glass-card-dark p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] space-y-4 relative">
          <button
            onClick={() => removeProject(index)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 gap-4 pt-6 sm:pt-0">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Project Title</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => updateProject(index, 'title', e.target.value)}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                placeholder="My Awesome Project"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Description</label>
              <textarea
                rows="3"
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm resize-none"
                placeholder="Describe what this project does and what problems it solves..."
              ></textarea>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Tech Stack (comma or space separated)</label>
              <input
                type="text"
                value={project.techStack?.join(', ') || ''}
                onChange={(e) => updateProjectTechStack(index, e.target.value)}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                placeholder="React Node.js MongoDB or React, Node.js, MongoDB"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">GitHub Link</label>
                <input
                  type="url"
                  value={project.githubLink}
                  onChange={(e) => updateProject(index, 'githubLink', e.target.value)}
                  className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                  placeholder="https://github.com/..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Live Link</label>
                <input
                  type="url"
                  value={project.liveLink}
                  onChange={(e) => updateProject(index, 'liveLink', e.target.value)}
                  className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </motion.div>
  );
};

export default ProjectsForm;
