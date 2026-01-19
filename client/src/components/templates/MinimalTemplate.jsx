import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Linkedin, Twitter, Mail, MapPin, ExternalLink,
  Calendar, BookOpen, Briefcase, Code, Layers, Award
} from 'lucide-react';

const MinimalTemplate = ({ portfolio, user, isDark }) => {
  const { personalInfo, education, experience, projects, skills, socialLinks } = portfolio;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-amber-50'}`}>
      {/* Hero - Full width with centered content */}
      <section className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-gradient-to-r from-amber-100 to-orange-100'} border-b-4 ${isDark ? 'border-amber-500' : 'border-amber-400'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`w-40 h-40 mx-auto mb-6 ${isDark ? 'bg-amber-900/30' : 'bg-white'} border-4 ${isDark ? 'border-amber-500' : 'border-amber-400'} shadow-2xl`}
          >
            {personalInfo?.profilePhoto ? (
              <img src={personalInfo.profilePhoto} alt={personalInfo.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl font-black text-amber-600">{personalInfo?.name?.charAt(0)}</span>
              </div>
            )}
          </motion.div>
          
          <h1 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`} style={{letterSpacing: '-0.02em'}}>
            {personalInfo?.name}
          </h1>
          <p className={`text-2xl font-semibold mb-6 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
            {personalInfo?.role}
          </p>
          
          <p className={`max-w-2xl mx-auto text-lg leading-relaxed mb-8 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {personalInfo?.bio}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {personalInfo?.email && (
              <a href={`mailto:${personalInfo.email}`} 
                className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700'} border-2 ${isDark ? 'border-amber-500' : 'border-amber-400'} hover:bg-amber-400 hover:text-white transition-all font-medium`}>
                <Mail className="w-4 h-4" /> {personalInfo.email}
              </a>
            )}
            {personalInfo?.location && (
              <span className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700'} border-2 ${isDark ? 'border-slate-700' : 'border-slate-300'} font-medium`}>
                <MapPin className="w-4 h-4" /> {personalInfo.location}
              </span>
            )}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-3">
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" 
                className={`p-3 ${isDark ? 'bg-slate-800 hover:bg-amber-600' : 'bg-white hover:bg-amber-400'} border-2 ${isDark ? 'border-slate-700' : 'border-slate-300'} hover:border-amber-400 transition-all`}>
                <Github className="w-5 h-5" />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                className={`p-3 ${isDark ? 'bg-slate-800 hover:bg-amber-600' : 'bg-white hover:bg-amber-400'} border-2 ${isDark ? 'border-slate-700' : 'border-slate-300'} hover:border-amber-400 transition-all`}>
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                className={`p-3 ${isDark ? 'bg-slate-800 hover:bg-amber-600' : 'bg-white hover:bg-amber-400'} border-2 ${isDark ? 'border-slate-700' : 'border-slate-300'} hover:border-amber-400 transition-all`}>
                <Twitter className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Experience - Zigzag Timeline */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'} border-b-4 ${isDark ? 'border-amber-500' : 'border-amber-400'} pb-4 inline-block`} style={{letterSpacing: '-0.02em'}}>
          Experience
        </h2>
        <div className="space-y-8">
          {experience?.length > 0 ? experience.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className={`flex ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-6 items-start`}
            >
              <div className={`flex-1 p-6 ${isDark ? 'bg-slate-900 border-2 border-slate-800' : 'bg-white border-2 border-amber-200'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{exp.position}</h3>
                    <p className={`font-semibold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{exp.company}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-bold ${isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'} border ${isDark ? 'border-amber-700' : 'border-amber-300'}`}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{exp.description}</p>
              </div>
              <div className={`w-12 h-12 flex items-center justify-center ${isDark ? 'bg-amber-600' : 'bg-amber-400'} border-4 ${isDark ? 'border-slate-900' : 'border-amber-50'} shrink-0 mt-4`}>
                <Briefcase className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          )) : (
            <p className={`text-center ${isDark ? 'text-slate-500' : 'text-slate-400'} italic`}>No experience added yet.</p>
          )}
        </div>
      </section>

      {/* Skills - Grid with borders */}
      <section className={`py-16 ${isDark ? 'bg-slate-900' : 'bg-white'} border-y-4 ${isDark ? 'border-amber-500' : 'border-amber-400'}`}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`} style={{letterSpacing: '-0.02em'}}>
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills?.length > 0 ? skills.map((skill, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-4 text-center border-2 ${
                  skill.level === 'Expert' ? (isDark ? 'border-amber-500 bg-amber-900/30' : 'border-amber-400 bg-amber-50') :
                  skill.level === 'Advanced' ? (isDark ? 'border-orange-500 bg-orange-900/30' : 'border-orange-400 bg-orange-50') :
                  skill.level === 'Intermediate' ? (isDark ? 'border-yellow-500 bg-yellow-900/30' : 'border-yellow-400 bg-yellow-50') :
                  (isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-300 bg-slate-50')
                } hover:scale-105 transition-transform`}
              >
                <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{skill.name}</div>
                <div className={`text-xs mt-1 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{skill.level}</div>
              </motion.div>
            )) : (
              <p className={`col-span-full text-center ${isDark ? 'text-slate-500' : 'text-slate-400'} italic`}>No skills added yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Projects - Masonry Grid */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'} border-b-4 ${isDark ? 'border-amber-500' : 'border-amber-400'} pb-4 inline-block`} style={{letterSpacing: '-0.02em'}}>
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects?.length > 0 ? projects.map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 border-4 ${isDark ? 'border-slate-800 bg-slate-900' : 'border-amber-300 bg-white'} hover:border-amber-400 transition-all group`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                <div className="flex gap-2">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                      className={`p-2 ${isDark ? 'bg-slate-800' : 'bg-amber-100'} border-2 ${isDark ? 'border-slate-700' : 'border-amber-300'} hover:bg-amber-400 hover:text-white transition-all`}>
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                      className={`p-2 ${isDark ? 'bg-amber-600' : 'bg-amber-400'} text-white hover:bg-amber-500 transition-all`}>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <p className={`mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech, j) => (
                  <span key={j} className={`px-3 py-1 text-xs font-bold border-2 ${isDark ? 'border-amber-500 text-amber-400' : 'border-amber-400 text-amber-700'}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )) : (
            <p className={`col-span-full text-center ${isDark ? 'text-slate-500' : 'text-slate-400'} italic`}>No projects added yet.</p>
          )}
        </div>
      </section>

      {/* Education - Simple List */}
      <section className={`py-16 ${isDark ? 'bg-slate-900' : 'bg-gradient-to-r from-amber-100 to-orange-100'} border-t-4 ${isDark ? 'border-amber-500' : 'border-amber-400'}`}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`} style={{letterSpacing: '-0.02em'}}>
            Education
          </h2>
          <div className="space-y-6">
            {education?.length > 0 ? education.map((edu, i) => (
              <motion.div 
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 ${isDark ? 'bg-slate-950 border-2 border-slate-800' : 'bg-white border-2 border-amber-200'}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {edu.degree} in {edu.fieldOfStudy}
                    </h3>
                    <p className={`font-semibold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{edu.institution}</p>
                    {edu.description && (
                      <p className={`mt-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{edu.description}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 text-sm font-bold ${isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'} border ${isDark ? 'border-amber-700' : 'border-amber-300'}`}>
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
              </motion.div>
            )) : (
              <p className={`text-center ${isDark ? 'text-slate-500' : 'text-slate-400'} italic`}>No education added yet.</p>
            )}
          </div>
        </div>
      </section>

      <div className={`py-8 text-center ${isDark ? 'bg-slate-950' : 'bg-amber-50'} border-t-4 ${isDark ? 'border-amber-500' : 'border-amber-400'}`}>
        <p className={`text-sm font-bold ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
          Made with <span className={`${isDark ? 'text-amber-400' : 'text-amber-600'}`}>FirstPortfolio</span>
        </p>
      </div>
    </div>
  );
};

export default MinimalTemplate;
