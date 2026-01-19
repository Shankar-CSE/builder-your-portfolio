import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import portfolioService from '../api/portfolioService';
import { 
  Plus, 
  ExternalLink, 
  Edit3, 
  Settings, 
  LogOut, 
  User, 
  CheckCircle2, 
  Eye,
  BarChart3,
  Layout,
  Copy,
  Check
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await portfolioService.getMyPortfolio();
        setPortfolio(data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCopyURL = async () => {
    const portfolioURL = `${window.location.origin}/u/${user?.username}`;
    try {
      await navigator.clipboard.writeText(portfolioURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Sidebar / Topbar */}
      <nav className="border-b border-white/5 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">F</div>
              <span className="font-bold hidden sm:block">FirstPortfolio</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold">
                  {user?.name?.charAt(0)}
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
            <p className="text-slate-400">Welcome back! Manage your portfolio and track its performance.</p>
          </div>
          
          <Link 
            to="/editor" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20"
          >
            {portfolio ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {portfolio ? 'Edit Portfolio' : 'Create Portfolio'}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Status Card */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6">
                <Layout className="w-24 h-24 text-white/5 -rotate-12" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-indigo-400 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest">Live Portfolio</span>
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                </div>
                
                {portfolio ? (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Your portfolio is live!</h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="px-4 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm font-mono text-slate-300 w-full sm:w-auto overflow-hidden text-ellipsis italic">
                        firstportfolio.com/u/{user?.username}
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <a 
                          href={`/u/${user?.username}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-sm font-semibold"
                        >
                          <Eye className="w-4 h-4" /> View
                        </a>
                        <button 
                          onClick={handleCopyURL}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-sm font-semibold"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-4">You haven't built your portfolio yet.</h2>
                    <p className="text-slate-400 mb-6">Get started by choosing a template and adding your details. It only takes a few minutes.</p>
                  </>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">+12%</span>
                </div>
                <div className="text-2xl font-bold mb-1">248</div>
                <div className="text-sm text-slate-400 font-medium">Total Views</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">+5%</span>
                </div>
                <div className="text-2xl font-bold mb-1">12</div>
                <div className="text-sm text-slate-400 font-medium">Link Clicks</div>
              </div>
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className="space-y-6">
            <div className="bg-indigo-600 rounded-3xl p-6 text-white relative overflow-hidden group">
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              <h3 className="text-lg font-bold mb-2 relative z-10">Go Pro ✨</h3>
              <p className="text-indigo-100 text-sm mb-4 relative z-10">Unlock premium templates, custom domains, and AI-powered content generation.</p>
              <button className="w-full py-2 bg-white text-indigo-600 font-bold rounded-xl text-sm relative z-10 hover:bg-indigo-50 transition-colors">
                Upgrade Now
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Checklist</h3>
              <ul className="space-y-4">
                {[
                  { label: "Personal Info", done: !!portfolio?.personalInfo },
                  { label: "Experience", done: portfolio?.experience?.length > 0 },
                  { label: "Projects", done: portfolio?.projects?.length > 0 },
                  { label: "Social Links", done: !!portfolio?.socialLinks },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.done ? 'bg-indigo-500' : 'bg-white/10'}`}>
                      {item.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm ${item.done ? 'text-slate-300' : 'text-slate-500 italic'}`}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
