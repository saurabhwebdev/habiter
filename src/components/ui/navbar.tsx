import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart, Settings, LogOut, HelpCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export const Navbar = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  const isMainDashboard = location.pathname === '/dashboard';
  
  return (
    <header className="border-b border-black/10 py-4 sticky top-0 bg-white z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          {!isMainDashboard && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="mr-2 text-black/70 hover:text-black hover:bg-black/5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-2xl font-bold tracking-tight">
            {isMainDashboard ? 'Habiter' : 
              location.pathname === '/settings' ? 'Settings' : 
              location.pathname === '/statistics' ? 'Statistics' : 
              location.pathname === '/help' ? 'Help' : 'Habiter'}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/statistics')}
            className={`text-black/70 hover:text-black hover:bg-black/5 ${location.pathname === '/statistics' ? 'bg-black/10' : ''}`}
          >
            <BarChart className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/help')}
            className={`text-black/70 hover:text-black hover:bg-black/5 ${location.pathname === '/help' ? 'bg-black/10' : ''}`}
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/settings')}
            className={`text-black/70 hover:text-black hover:bg-black/5 ${location.pathname === '/settings' ? 'bg-black/10' : ''}`}
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleSignOut}
            className="text-black/70 hover:text-black hover:bg-black/5"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}; 