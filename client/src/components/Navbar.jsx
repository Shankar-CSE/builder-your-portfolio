import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { setShowLoginModal, setShowRegisterModal } = useAuth();

  return (
     <nav className="fixed h-20 pt-2 item-center justify-center top-0 w-full z-50 border-b border-white/5 bg-slate-950/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">BYP</div>
              <span className="text-xl font-bold tracking-tight font-outfit">Build Your Portfolio</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
              <button onClick={() => setShowLoginModal(true)} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Login</button>
              <button onClick={() => setShowRegisterModal(true)} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Navbar