import React from 'react';
import { motion } from 'framer-motion';

const SettingsForm = ({ settings, templateId, updateSettings, setTemplateId, socialLinks, updateSocialLinks }) => {
  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column - Settings */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Portfolio Settings</h2>
            <p className="text-sm text-slate-500 mb-6">Customize your portfolio visibility and appearance.</p>
          </div>

          <div className="space-y-6">
            <div className="glass-card-dark p-6 rounded-[2rem]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold mb-1">Public Portfolio</h3>
                  <p className="text-sm text-slate-500">Make your portfolio visible to everyone</p>
                </div>
                <button
                  onClick={() => updateSettings('isPublic', !settings.isPublic)}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    settings.isPublic ? 'bg-indigo-600' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.isPublic ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="glass-card-dark p-6 rounded-[2rem]">
              <h3 className="font-bold mb-3">Theme</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateSettings('theme', 'light')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    settings.theme === 'light'
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <div className="w-full h-16 bg-white rounded-lg mb-2"></div>
                  <p className="text-sm font-medium">Light</p>
                </button>
                <button
                  onClick={() => updateSettings('theme', 'dark')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    settings.theme === 'dark'
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <div className="w-full h-16 bg-slate-900 rounded-lg mb-2"></div>
                  <p className="text-sm font-medium">Dark</p>
                </button>
              </div>
            </div>

            <div className="glass-card-dark p-6 rounded-[2rem]">
              <h3 className="font-bold mb-3">Template</h3>
              <select
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50"
              >
                <option value="modern">Modern</option>
                <option value="minimal">Minimal</option>
                <option value="creative">Creative</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column - Social Links */}
        <div className="space-y-6 pt-2">
          <div>
            <h2 className="text-xl font-bold mb-1">Social Links</h2>
            <p className="text-sm text-slate-500 mb-6">Add your social media and professional profiles.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2">GitHub</label>
              <input
                type="url"
                name="github"
                value={socialLinks.github}
                onChange={updateSocialLinks}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2">LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={socialLinks.linkedin}
                onChange={updateSocialLinks}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                placeholder="https://linkedin.com/in/yourusername"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2 ">Twitter</label>
              <input
                type="url"
                name="twitter"
                value={socialLinks.twitter}
                onChange={updateSocialLinks}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                placeholder="https://twitter.com/yourusername"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2">Portfolio Website</label>
              <input
                type="url"
                name="portfolio"
                value={socialLinks.portfolio}
                onChange={updateSocialLinks}
                className="w-full bg-slate-950/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-white/20 focus:bg-slate-950/50 backdrop-blur-sm"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsForm;
