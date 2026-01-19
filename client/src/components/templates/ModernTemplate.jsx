import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Linkedin, Twitter, Mail, MapPin, ExternalLink,
  Calendar, BookOpen, Briefcase, Code, Layers, Award
} from 'lucide-react';

const ModernTemplate = ({ portfolio, user, isDark }) => {
  const { personalInfo, education, experience, projects, skills, socialLinks } = portfolio;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Sidebar - Fixed on desktop */}
        <motion.aside 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`lg:w-1/3 lg:sticky lg:top-0 lg:h-screen ${isDark ? 'bg-slate-950' : 'bg-white'} p-8 lg:p-12 flex flex-col justify-between border-r ${isDark ? 'border-slate-800' : 'border-indigo-100'}`}
        >
          <div>
            {/* Profile Section */}
            <div className="mb-8">
              <div className={`w-32 h-32 rounded-2xl ${isDark ? 'bg-indigo-900/30' : 'bg-gradient-to-br from-indigo-500 to-purple-600'} flex items-center justify-center mb-6 shadow-xl`}>
                {personalInfo?.profilePhoto ? (
                  <img src={personalInfo.profilePhoto} alt={personalInfo.name} className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <span className="text-5xl font-black text-white">{personalInfo?.name?.charAt(0)}</span>
                )}
              </div>
              
              <h1 className={`text-4xl font-black mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {personalInfo?.name}
              </h1>
              <p className="text-xl font-bold text-indigo-600 mb-4">{personalInfo?.role}</p>
              
              <div className="space-y-2 mb-6">
                {personalInfo?.email && (
                  <a href={`mailto:${personalInfo.email}`} className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} hover:text-indigo-600 transition-colors`}>
                    <Mail className="w-4 h-4" /> {personalInfo.email}
                  </a>
                )}
                {personalInfo?.location && (
                  <p className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <MapPin className="w-4 h-4" /> {personalInfo.location}
                  </p>
                )}
              </div>

              {/* Bio */}
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-8`}>
                {personalInfo?.bio}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className={`${isDark ? 'bg-slate-900' : 'bg-indigo-50'} p-4 rounded-xl text-center`}>
                  <div className="text-2xl font-black text-indigo-600">{projects?.length || 0}</div>
                  <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Projects</div>
                </div>
                <div className={`${isDark ? 'bg-slate-900' : 'bg-purple-50'} p-4 rounded-xl text-center`}>
                  <div className="text-2xl font-black text-purple-600">{skills?.length || 0}</div>
                  <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Skills</div>
                </div>
                <div className={`${isDark ? 'bg-slate-900' : 'bg-blue-50'} p-4 rounded-xl text-center`}>
                  <div className="text-2xl font-black text-blue-600">{experience?.length || 0}</div>
                  <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Years</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" 
                className={`p-3 ${isDark ? 'bg-slate-900 hover:bg-slate-800' : 'bg-indigo-100 hover:bg-indigo-200'} rounded-xl transition-colors`}>
                <Github className="w-5 h-5" />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                className={`p-3 ${isDark ? 'bg-slate-900 hover:bg-slate-800' : 'bg-blue-100 hover:bg-blue-200'} rounded-xl transition-colors`}>
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                className={`p-3 ${isDark ? 'bg-slate-900 hover:bg-slate-800' : 'bg-purple-100 hover:bg-purple-200'} rounded-xl transition-colors`}>
                <Twitter className="w-5 h-5" />
              </a>
            )}
          </div>
        </motion.aside>

        {/* Right Content - Scrollable */}
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          {/* Experience */}
          <section className="mb-16">
            <h2 className={`text-3xl font-black mb-8 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Briefcase className="w-7 h-7 text-indigo-600" /> Experience
            </h2>
            <div className="space-y-6">
              {experience?.length > 0 ? experience.map((exp, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${isDark ? 'bg-slate-950' : 'bg-white'} p-6 rounded-2xl ${isDark ? 'border border-slate-800' : 'shadow-lg shadow-indigo-100/50'}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{exp.position}</h3>
                      <p className="text-indigo-600 font-semibold">{exp.company}</p>
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{exp.description}</p>
                </motion.div>
              )) : (
                <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'} italic`}>No experience added yet.</p>
              )}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-16">
            <h2 className={`text-3xl font-black mb-8 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Layers className="w-7 h-7 text-purple-600" /> Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects?.length > 0 ? projects.map((project, i) => (
                <motion.div 
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${isDark ? 'bg-slate-950' : 'bg-white'} p-6 rounded-2xl ${isDark ? 'border border-slate-800' : 'shadow-lg shadow-purple-100/50'} group hover:-translate-y-1 transition-transform`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                    <div className="flex gap-2">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                          className={`p-2 ${isDark ? 'bg-slate-900' : 'bg-slate-100'} rounded-lg hover:bg-indigo-600 hover:text-white transition-colors`}>
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'} mb-4`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech, j) => (
                      <span key={j} className={`px-3 py-1 text-xs font-semibold rounded-lg ${isDark ? 'bg-slate-900 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )) : (
                <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'} italic`}>No projects added yet.</p>
              )}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-16">
            <h2 className={`text-3xl font-black mb-8 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Code className="w-7 h-7 text-blue-600" /> Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills?.length > 0 ? skills.map((skill, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`px-4 py-2 rounded-full font-semibold ${
                    skill.level === 'Expert' ? (isDark ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-600 text-white') :
                    skill.level === 'Advanced' ? (isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-600 text-white') :
                    skill.level === 'Intermediate' ? (isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-600 text-white') :
                    (isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700')
                  }`}
                >
                  {skill.name}
                </motion.div>
              )) : (
                <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'} italic`}>No skills added yet.</p>
              )}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className={`text-3xl font-black mb-8 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <BookOpen className="w-7 h-7 text-emerald-600" /> Education
            </h2>
            <div className="space-y-6">
              {education?.length > 0 ? education.map((edu, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${isDark ? 'bg-slate-950' : 'bg-white'} p-6 rounded-2xl ${isDark ? 'border border-slate-800' : 'shadow-lg shadow-emerald-100/50'}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {edu.degree} in {edu.fieldOfStudy}
                      </h3>
                      <p className="text-emerald-600 font-semibold">{edu.institution}</p>
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {edu.startYear} - {edu.endYear}
                    </span>
                  </div>
                  {edu.description && (
                    <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{edu.description}</p>
                  )}
                </motion.div>
              )) : (
                <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'} italic`}>No education added yet.</p>
              )}
            </div>
          </section>

          <div className={`mt-16 pt-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} text-center`}>
            <p className={`text-sm font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              Made with <span className="text-indigo-600">FirstPortfolio</span>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModernTemplate;
