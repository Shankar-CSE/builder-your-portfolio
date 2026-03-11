import React from 'react';
import { motion } from 'framer-motion';
import { Check, Layout, Minus, Sparkles } from 'lucide-react';

const templateOptions = [
  { value: 'modern', label: 'Modern', description: 'Clean & professional', icon: Layout, gradient: 'from-indigo-500 to-blue-500' },
  { value: 'minimal', label: 'Minimal', description: 'Simple & elegant', icon: Minus, gradient: 'from-slate-400 to-slate-600' },
  { value: 'creative', label: 'Creative', description: 'Bold & expressive', icon: Sparkles, gradient: 'from-pink-500 to-purple-500' },
];

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
            <div className="t-card p-6 rounded-[2rem]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold mb-1">Public Portfolio</h3>
                  <p className="text-sm text-slate-500">Make your portfolio visible to everyone</p>
                </div>
                <button
                  onClick={() => updateSettings('isPublic', !settings.isPublic)}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    settings.isPublic ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
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

            <div className="t-card p-6 rounded-[2rem]">
              <h3 className="font-bold mb-3">Theme</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateSettings('theme', 'light')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    settings.theme === 'light'
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5'
                  }`}
                >
                  <div className="w-full h-16 bg-white border border-black/10 rounded-lg mb-2"></div>
                  <p className="text-sm font-medium">Light</p>
                </button>
                <button
                  onClick={() => updateSettings('theme', 'dark')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    settings.theme === 'dark'
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5'
                  }`}
                >
                  <div className="w-full h-16 bg-slate-900 rounded-lg mb-2"></div>
                  <p className="text-sm font-medium">Dark</p>
                </button>
              </div>
            </div>

            <div className="t-card p-6 rounded-[2rem]">
              <h3 className="font-bold mb-3">Template</h3>
              <div className="grid grid-cols-3 gap-3">
                {templateOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = templateId === opt.value;
                  return (
                    <motion.button
                      key={opt.value}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setTemplateId(opt.value)}
                      className={`relative p-4 rounded-xl border-2 transition-all text-center ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                          : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/10 dark:hover:bg-white/10'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${opt.gradient} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-sm font-semibold">{opt.label}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{opt.description}</p>
                    </motion.button>
                  );
                })}
              </div>
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
                className="w-full t-input rounded-xl px-4 py-3 backdrop-blur-sm"
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
                className="w-full t-input rounded-xl px-4 py-3 backdrop-blur-sm"
                placeholder="https://linkedin.com/in/yourusername"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-2">Twitter</label>
              <input
                type="url"
                name="twitter"
                value={socialLinks.twitter}
                onChange={updateSocialLinks}
                className="w-full t-input rounded-xl px-4 py-3 backdrop-blur-sm"
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
                className="w-full t-input rounded-xl px-4 py-3 backdrop-blur-sm"
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
