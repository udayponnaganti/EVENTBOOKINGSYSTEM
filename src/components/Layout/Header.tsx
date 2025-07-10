import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Calendar, BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/logo-1.png" 
              alt="LPU Logo" 
              className="h-10 w-10 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold">LPU Events</h1>
              <p className="text-sm text-blue-200">Lovely Professional University</p>
            </div>
          </Link>
          
          {isAuthenticated && user && (
            <div className="flex items-center space-x-6">
              <Link
                to="/bookings"
                className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                <span>My Bookings</span>
              </Link>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-blue-200">{user.registrationNumber}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;