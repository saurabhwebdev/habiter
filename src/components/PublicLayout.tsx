import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PublicLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ 
  children,
  title
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Simple header for public pages */}
      <header className="border-b border-black/10 py-4 sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <Button 
                variant="ghost" 
                size="icon"
                className="mr-2 text-black/70 hover:text-black hover:bg-black/5"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-sm">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-black text-white hover:bg-black/80 text-sm">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Simple footer */}
      <footer className="border-t border-black/5 py-6">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-black/50 text-sm">
              © 2024 Habiter
            </p>
            <div className="flex gap-4 text-sm text-black/70">
              <Link to="/privacy" className="hover:text-black">Privacy</Link>
              <Link to="/terms" className="hover:text-black">Terms</Link>
              <Link to="/help" className="hover:text-black">Help</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}; 