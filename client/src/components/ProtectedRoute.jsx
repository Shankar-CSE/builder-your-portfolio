import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading, setShowLoginModal, setShowRegisterModal } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      setShowRegisterModal(false);
      setShowLoginModal(true);
      navigate('/');
    }
  }, [user, loading, setShowLoginModal, setShowRegisterModal, navigate]);
  if (loading) {
    return (
      <div className="min-h-screen mesh-gradient-dark flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return user ? children : null;
};

export default ProtectedRoute;
