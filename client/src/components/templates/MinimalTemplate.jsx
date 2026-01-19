import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Linkedin, Twitter, Mail, MapPin, ExternalLink,
  Calendar, BookOpen, Briefcase, Code, Layers, Award,
  ChevronRight, ArrowUpRight, Zap, Target
} from 'lucide-react';

const MinimalTemplate = ({ portfolio, user, isDark }) => {
  const { personalInfo, education, experience, projects, skills, socialLinks } = portfolio;

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#050505] text-white' : 'bg-slate-50 text-slate-900'} selection:bg-orange-500 selection:text-white font-sans`}>
      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-24">
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* 1. Profile / Hero (Large Bento) */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className={`md:col-span-8 p-8 lg:p-12 rounded-[2.5rem] ${isDark ? 'bg-[#0f0f0f] border border-white/5' : 'bg-white border border-slate-200'} shadow-sm relative overflow-hidden group`}
          >
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
                <div className={`w-32 h-32 lg:w-40 lg:h-40 rounded-[2rem] overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'} ring-4 ${isDark ? 'ring-white/5' : 'ring-slate-50'}`}>
                  {personalInfo?.profilePhoto ? (
                    <img src={personalInfo.profilePhoto} alt={personalInfo.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-400 to-rose-500">
                      <span className="text-5xl font-black text-white">{personalInfo?.name?.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-4 font-outfit uppercase italic">
                    {personalInfo?.name}
                  </h1>
                  <p className={`text-xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'} italic`}>
                    {personalInfo?.role}
                  </p>
                </div>
              </div>
              <p className={`text-xl lg:text-2xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'} font-medium max-w-2xl`}>
                {personalInfo?.bio}
              </p>
            </div>
            {/* Background design */}
            <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[80px] opacity-20 ${isDark ? 'bg-orange-500' : 'bg-orange-300'}`} />
          </motion.section>

          {/* 2. Contact Info (Small Bento) */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className={`md:col-span-4 p-8 rounded-[2.5rem] ${isDark ? 'bg-[#0f0f0f] border border-white/5' : 'bg-white border border-slate-200'} shadow-sm flex flex-col justify-between`}
          >
            <div className="space-y-6">
              <h2 className={`text-xs font-black uppercase tracking-[0.3em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Contact & Location</h2>
              <div className="space-y-4">
                {personalInfo?.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 transition-colors hover:text-orange-500">
                    <Mail className="w-5 h-5 opacity-50" />
                    <span className="font-bold underline underline-offset-4 decoration-2 decoration-orange-500/30 truncate">{personalInfo.email}</span>
                  </a>
                )}
                {personalInfo?.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 opacity-50" />
                    <span className="font-bold">{personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-8">
              {[
                { icon: Github, href: socialLinks?.github },
                { icon: Linkedin, href: socialLinks?.linkedin },
                { icon: Twitter, href: socialLinks?.twitter }
              ].map((social, i) => social.href && (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={`p-4 rounded-2xl ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'} transition-all`}>
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.section>

          {/* 3. Skills (Medium Bento) */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className={`md:col-span-5 p-8 rounded-[2.5rem] ${isDark ? 'bg-[#0f0f0f] border border-white/5' : 'bg-white border border-slate-200'} shadow-sm`}
          >
            <h2 className="text-2xl font-black mb-8 italic flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-500" /> TOP SKILLS
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills?.length > 0 ? skills.map((skill, i) => (
                <span key={i} className={`px-4 py-2 rounded-xl text-sm font-black uppercase tracking-tighter ${isDark ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-700'} border ${isDark ? 'border-white/5' : 'border-slate-200'} group hover:bg-orange-500 hover:text-white transition-colors cursor-default`}>
                  {skill.name}
                </span>
              )) : <span className="opacity-50 italic">No skills added.</span>}
            </div>
          </motion.section>

          {/* 4. Experience Timeline (Large Bento - Scrollable) */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className={`md:col-span-7 p-8 rounded-[2.5rem] ${isDark ? 'bg-[#0f0f0f] border border-white/5' : 'bg-white border border-slate-200'} shadow-sm max-h-[500px] overflow-y-auto custom-scrollbar`}
          >
            <h2 className="text-2xl font-black mb-8 italic flex items-center gap-2 sticky top-0 bg-inherit pb-4 z-10">
              <Target className="w-6 h-6 text-orange-500" /> EXP. LOG
            </h2>
            <div className="space-y-8">
              {experience?.length > 0 ? experience.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-orange-500/20 last:border-0 pb-2">
                  <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full bg-orange-500" />
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-black uppercase tracking-tight text-lg leading-tight">{exp.position}</h3>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-200 text-slate-500'}`}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-orange-500 font-bold mb-3 italic">{exp.company}</p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'} font-medium`}>{exp.description}</p>
                </div>
              )) : <p className="opacity-50 italic">No experience logged.</p>}
            </div>
          </motion.section>

          {/* 5. Featured Projects (Big Bento Grid) */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="md:col-span-12"
          >
            <div className="flex items-center justify-between mb-8 px-4">
              <h2 className="text-3xl font-black italic tracking-tighter uppercase">SELECTED WORKS</h2>
              <div className="h-px flex-1 mx-8 bg-current opacity-10" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects?.length > 0 ? projects.map((project, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className={`p-8 rounded-[2.5rem] ${isDark ? 'bg-[#0f0f0f] border border-white/5' : 'bg-white border border-slate-200'} shadow-sm group relative overflow-hidden`}
                >
                  <div className="flex justify-between items-start mb-12">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-slate-100'} group-hover:bg-orange-500 group-hover:text-white transition-all`}>
                      <Layers className="w-6 h-6" />
                    </div>
                    <div className="flex gap-2 translate-y-[-10px] translate-x-[10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-orange-500 text-white rounded-full">
                          <ArrowUpRight className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase">{project.title}</h3>
                  <p className={`text-sm mb-8 leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech, j) => (
                      <span key={j} className="text-[10px] font-black uppercase tracking-widest opacity-40">{tech}</span>
                    ))}
                  </div>
                  
                  {/* Decorative number */}
                  <div className={`absolute bottom-[-20px] right-[-10px] text-8xl font-black italic ${isDark ? 'text-white/5' : 'text-slate-100'} pointer-events-none group-hover:text-orange-500/10 transition-colors`}>
                    0{i+1}
                  </div>
                </motion.div>
              )) : <div className="col-span-full text-center py-20 opacity-30 italic">No projects showcased yet.</div>}
            </div>
          </motion.section>

          {/* 6. Education (Medium Bento) */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.5 }}
            className={`md:col-span-12 p-12 rounded-[2.5rem] ${isDark ? 'bg-[#0f0f0f] border border-white/5' : 'bg-white border border-slate-200'} shadow-sm`}
          >
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Education</h2>
                <p className={`font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Academic profile and certifications.</p>
              </div>
              <div className="space-y-10">
                {education?.length > 0 ? education.map((edu, i) => (
                  <div key={i} className="flex gap-6">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${isDark ? 'bg-white/5 text-orange-500' : 'bg-orange-50 text-orange-600'}`}>
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold uppercase tracking-tight mb-1">{edu.degree} in {edu.fieldOfStudy}</h4>
                      <p className="font-black text-orange-500 italic mb-2">{edu.institution}</p>
                      <span className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{edu.startYear} — {edu.endYear}</span>
                    </div>
                  </div>
                )) : <p className="opacity-50 italic">No education listed.</p>}
              </div>
            </div>
          </motion.section>

        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-current opacity-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs font-black uppercase tracking-[0.4em] opacity-40">
            FIRSTPORTFOLIO ARCHIVE © 2024
          </div>
          <div className="flex gap-4">
            <span className="text-xs font-black uppercase tracking-widest italic text-orange-500">Built to be stunning.</span>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default MinimalTemplate;
