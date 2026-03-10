import React from 'react';
import { motion } from 'framer-motion';

const SocialLinksForm = ({ socialLinks, updateSocialLinks }) => {
  return (
    <motion.div
      key="social"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 max-w-2xl"
    >
      <div>
        <h2 className="text-xl font-bold mb-1">Social Links</h2>
        <p className="text-sm text-slate-500 mb-6">Add your social media and professional profiles.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">GitHub</label>
          <input
            type="url"
            name="github"
            value={socialLinks.github}
            onChange={updateSocialLinks}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://github.com/yourusername"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            value={socialLinks.linkedin}
            onChange={updateSocialLinks}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://linkedin.com/in/yourusername"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Twitter</label>
          <input
            type="url"
            name="twitter"
            value={socialLinks.twitter}
            onChange={updateSocialLinks}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://twitter.com/yourusername"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Portfolio Website</label>
          <input
            type="url"
            name="portfolio"
            value={socialLinks.portfolio}
            onChange={updateSocialLinks}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SocialLinksForm;
