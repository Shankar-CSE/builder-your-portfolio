import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut } from 'lucide-react';


function Navbar() {

    const navigate = useNavigate();

  const { setShowLoginModal, setShowRegisterModal,user,logout } = useAuth();

const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
     <nav className=" h-20 pt-2 item-center justify-center top-0 w-full z-50 border-b border-white/5 bg-slate-950/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">BYP</div>
              <span className="text-xl font-bold tracking-tight font-outfit">Build Your Portfolio</span>
            </div>


 {user ? (
               <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold shadow-inner">
                  {user?.name?.charAt(0)}
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-white/5 rounded-lg"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
            ) : (


            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
              <button onClick={() => setShowLoginModal(true)} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Login</button>
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