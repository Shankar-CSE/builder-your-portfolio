import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { LogOut, Sun, Moon } from 'lucide-react';


function Navbar() {

    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

  const { setShowLoginModal, setShowRegisterModal,user,logout } = useAuth();

const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
     <nav className="t-nav h-20 pt-2 item-center justify-center top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">BYP</div>
              <span className="text-xl font-bold tracking-tight font-outfit text-slate-900 dark:text-white">Build Your Portfolio</span>
            </div>


 {user ? (
               <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl transition-all text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="flex items-center gap-2 px-3 py-2 bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/10 backdrop-blur-md">
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <span className="text-sm font-medium text-slate-800 dark:text-white">{user?.name?.toUpperCase()}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hover:bg-black/5 dark:hover:bg-white/5 rounded-lg"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
            ) : (


            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Features</a>
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl transition-all text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setShowLoginModal(true)} className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Login</button>
              <button onClick={() => setShowRegisterModal(true)} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                Get Started
              </button>
            </div>
            )}
          </div>
        </div>
      </nav>
    )
}

export default Navbar;