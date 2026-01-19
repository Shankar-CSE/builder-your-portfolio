import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import portfolioService from '../api/portfolioService';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  ExternalLink,
  Loader2,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  Wrench,
  Layers
} from 'lucide-react';

const PublicPortfolio = () => {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await portfolioService.getPublicPortfolio(username);
        setData(response);
      } catch (err) {
        setError(err.response?.data?.message || 'Portfolio not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-slate-900">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-slate-600 mb-8">{error}</p>
        <Link to="/" className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors">
          Go Home
        </Link>
      </div>
    );
  }

  const { portfolio, user } = data;
  const { personalInfo, education, experience, projects, skills, socialLinks, settings } = portfolio;
  
  // Determine if dark theme is enabled
  const isDark = settings?.theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'} selection:bg-indigo-100 selection:text-indigo-900`}>
      {/* Hero Section */}
      <section className={`relative py-20 lg:py-32 overflow-hidden ${isDark ? 'border-b border-white/10' : 'border-b border-slate-100'}`}>
        <div className={`absolute top-0 right-0 w-1/3 h-full ${isDark ? 'bg-white/5' : 'bg-slate-50'} -skew-x-12 translate-x-1/2 pointer-events-none`} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className={`w-32 h-32 md:w-48 md:h-48 rounded-[40px] ${isDark ? 'bg-white/5' : 'bg-slate-100'} flex items-center justify-center border-4 ${isDark ? 'border-slate-800' : 'border-white'} shadow-xl overflow-hidden shrink-0`}>
                {personalInfo?.profilePhoto ? (
                  <img src={personalInfo.profilePhoto} alt={personalInfo.name} className="w-full h-full object-cover" />
                ) : (
                  <span className={`text-4xl md:text-6xl font-black ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>{personalInfo?.name?.charAt(0)}</span>
                )}
              </div>
              <div className="text-center md:text-left">
                <h1 className={`text-5xl md:text-7xl font-black tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {personalInfo?.name}
                </h1>
                <p className="text-xl md:text-2xl font-bold text-indigo-600 mb-6">{personalInfo?.role}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  {personalInfo?.email && (
                    <a href={`mailto:${personalInfo.email}`} className={`flex items-center gap-2 ${isDark ? 'text-slate-400 hover:text-indigo-400' : 'text-slate-500 hover:text-indigo-600'} font-medium transition-colors`}>
                      <Mail className="w-4 h-4" /> {personalInfo.email}
                    </a>
                  )}
                  {personalInfo?.location && (
                    <span className={`flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium tracking-tight`}>
                      <MapPin className="w-4 h-4" /> {personalInfo.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className={`py-20 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50/50'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className={`text-xs font-black uppercase tracking-[0.3em] ${isDark ? 'text-slate-600' : 'text-slate-400'} mb-8 flex items-center gap-3`}>
              <span className="w-8 h-[2px] bg-indigo-600"></span> About
            </h2>
            <p className={`text-xl md:text-2xl ${isDark ? 'text-slate-300' : 'text-slate-700'} leading-relaxed font-medium italic`}>
              "{personalInfo?.bio}"
            </p>
          </div>
        </div>
      </section>

      {/* Experience & Education */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Experience */}
            <div>
              <h2 className="text-2xl font-black mb-12 flex items-center gap-4">
                <Briefcase className="w-6 h-6 text-indigo-600" /> Experience
              </h2>
              <div className="space-y-12">
                {experience?.length > 0 ? experience.map((exp, i) => (
                  <div key={i} className={`relative pl-8 ${isDark ? 'border-l-2 border-white/10' : 'border-l-2 border-slate-100'}`}>
                    <div className={`absolute top-0 left-[-9px] w-4 h-4 rounded-full ${isDark ? 'bg-slate-950' : 'bg-white'} border-2 border-indigo-600`} />
                    <div className="mb-2 flex items-center gap-2 text-sm font-bold text-indigo-600 uppercase tracking-wider">
                      <Calendar className="w-3 h-3" /> {exp.startDate} - {exp.endDate}
                    </div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-1`}>{exp.position}</h3>
                    <div className={`text-lg font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-4`}>{exp.company}</div>
                    <p className={`${isDark ? 'text-slate-500' : 'text-slate-500'} leading-relaxed`}>{exp.description}</p>
                  </div>
                )) : (
                  <p className={`${isDark ? 'text-slate-600' : 'text-slate-400'} italic`}>No experience added yet.</p>
                )}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-2xl font-black mb-12 flex items-center gap-4">
                <BookOpen className="w-6 h-6 text-indigo-600" /> Education
              </h2>
              <div className="space-y-12">
                {education?.length > 0 ? education.map((edu, i) => (
                  <div key={i} className={`relative pl-8 ${isDark ? 'border-l-2 border-white/10' : 'border-l-2 border-slate-100'}`}>
                    <div className={`absolute top-0 left-[-9px] w-4 h-4 rounded-full ${isDark ? 'bg-slate-950 border-2 border-slate-600' : 'bg-white border-2 border-slate-400'}`} />
                    <div className={`mb-2 flex items-center gap-2 text-sm font-bold ${isDark ? 'text-slate-600' : 'text-slate-400'} uppercase tracking-wider`}>
                      <Calendar className="w-3 h-3" /> {edu.startYear} - {edu.endYear}
                    </div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-1`}>{edu.degree} in {edu.fieldOfStudy}</h3>
                    <div className={`text-lg font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-4`}>{edu.institution}</div>
                    <p className={`${isDark ? 'text-slate-500' : 'text-slate-500'} leading-relaxed`}>{edu.description}</p>
                  </div>
                )) : (
                  <p className={`${isDark ? 'text-slate-600' : 'text-slate-400'} italic`}>No education added yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className={`py-24 ${isDark ? 'bg-slate-900' : 'bg-slate-900'} text-white`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-black mb-16 flex items-center gap-4">
            <Wrench className="w-6 h-6 text-indigo-400" /> Skills & Expertise
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {skills?.length > 0 ? skills.map((skill, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                <span className="text-lg font-bold mb-2">{skill.name}</span>
                <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">{skill.level}</span>
              </div>
            )) : (
              <p className="text-slate-500 italic col-span-full">No skills added yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-black mb-16 flex items-center gap-4">
            <Layers className="w-6 h-6 text-indigo-600" /> Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {projects?.length > 0 ? projects.map((project, i) => (
              <div key={i} className={`group p-8 rounded-[40px] ${isDark ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-slate-50 border border-slate-100 hover:bg-white'} hover:border-indigo-100 transition-all hover:shadow-2xl hover:shadow-indigo-500/5 overflow-hidden relative`}>
                <div className="mb-6 flex justify-between items-start">
                  <div className={`w-16 h-16 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-white'} flex items-center justify-center ${isDark ? 'border border-white/10' : 'border border-slate-100'} shadow-sm group-hover:scale-110 transition-transform`}>
                    <Layers className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div className="flex gap-3">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={`p-3 ${isDark ? 'bg-white/5' : 'bg-white'} rounded-full ${isDark ? 'border border-white/10' : 'border border-slate-100'} hover:text-indigo-600 transition-colors shadow-sm`}>
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-3">{project.title}</h3>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed mb-6`}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech, j) => (
                    <span key={j} className={`px-4 py-2 ${isDark ? 'bg-white/5' : 'bg-white'} rounded-full text-xs font-bold ${isDark ? 'text-slate-300 border border-white/10 group-hover:border-indigo-500/30' : 'text-slate-500 border border-slate-100 group-hover:border-indigo-100'} group-hover:text-indigo-600 transition-colors`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )) : (
              <p className={`${isDark ? 'text-slate-600' : 'text-slate-400'} italic col-span-full`}>No projects added yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-20 ${isDark ? 'border-t border-white/10 bg-slate-900/30' : 'border-t border-slate-100 bg-slate-50/30'}`}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <h2 className="text-xl font-black mb-2">Let's Connect</h2>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'}`}>I'm always open to new opportunities and collaborations.</p>
          </div>
          <div className="flex gap-4">
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className={`p-4 ${isDark ? 'bg-white/5' : 'bg-white'} rounded-full ${isDark ? 'border border-white/10' : 'border border-slate-100'} hover:text-indigo-600 transition-all hover:scale-110 shadow-sm`}>
                <Github className={`w-6 h-6 ${isDark ? 'text-white' : 'text-slate-900'}`} />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className={`p-4 ${isDark ? 'bg-white/5' : 'bg-white'} rounded-full ${isDark ? 'border border-white/10' : 'border border-slate-100'} hover:text-indigo-600 transition-all hover:scale-110 shadow-sm`}>
                <Linkedin className={`w-6 h-6 ${isDark ? 'text-white' : 'text-slate-900'}`} />
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className={`p-4 ${isDark ? 'bg-white/5' : 'bg-white'} rounded-full ${isDark ? 'border border-white/10' : 'border border-slate-100'} hover:text-indigo-600 transition-all hover:scale-110 shadow-sm`}>
                <Twitter className={`w-6 h-6 ${isDark ? 'text-white' : 'text-slate-900'}`} />
              </a>
            )}
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-16 text-center">
            <p className={`text-xs font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>
                MADE WITH <span className="text-indigo-400">FIRSTPORTFOLIO</span>
            </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicPortfolio;
