import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart, Settings, LogOut, HelpCircle, ArrowLeft, Book, Archive, Trophy } from 'lucide-react';
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
    <header className="border-b border-black/10 py-3 sticky top-0 bg-white z-10">
      <div className="w-auto px-3 flex justify-between items-center">
        <div className="flex items-center pl-1">
          {!isMainDashboard && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="mr-1 text-black/70 hover:text-black hover:bg-black/5 h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          {isMainDashboard && (
            <img src="/habiterlogo.svg" alt="Habiter Logo" height={28} style={{ height: 28, width: 'auto', marginRight: 8 }} />
          )}
          <h1 className="text-xl font-bold tracking-tight">
            {isMainDashboard ? '' : 
              location.pathname === '/settings' ? 'Settings' : 
              location.pathname === '/statistics' ? 'Statistics' : 
              location.pathname === '/journal' ? 'Journal' :
              location.pathname === '/archive' ? 'Archive' :
              location.pathname === '/leaderboard' ? 'Leaderboard' :
              location.pathname === '/help' ? 'Help' : 'Habiter'}
          </h1>
        </div>
        <div className="flex items-center space-x-2 pr-1">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/statistics')}
            className={`text-black/70 hover:text-black hover:bg-black/5 ${location.pathname === '/statistics' ? 'bg-black/10' : ''} h-8 w-8`}
          >
            <BarChart className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/journal')}
            className={`text-black/70 hover:text-black hover:bg-black/5 ${location.pathname === '/journal' ? 'bg-black/10' : ''} h-8 w-8`}
          >
            <Book className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/archive')}
            className={`text-black/70 hover:text-black hover:bg-black/5 ${location.pathname === '/archive' ? 'bg-black/10' : ''} h-8 w-8`}
          >
            <Archive className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/leaderboard')}
            className={`text-black/70 hover:text-black hover:bg-black/5 ${location.pathname === '/leaderboard' ? 'bg-black/10' : ''} h-8 w-8`}
          >
            <Trophy className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/help')}
            className={`text-black/70 hover:text-black hover:bg-black/5 ${location.pathname === '/help' ? 'bg-black/10' : ''} h-8 w-8`}
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/settings')}
            className={`text-black/70 hover:text-black hover:bg-black/5 ${location.pathname === '/settings' ? 'bg-black/10' : ''} h-8 w-8`}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleSignOut}
            className="text-black/70 hover:text-black hover:bg-black/5 h-8 w-8"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}; 