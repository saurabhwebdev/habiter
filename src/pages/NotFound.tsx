import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { MotivationalMessage } from "@/components/MotivationalMessage";
import { MapPin, ArrowRight, Compass } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout showNavbar={false}>
      <div className="min-h-screen bg-white text-black flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          {/* 404 Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="text-[120px] font-light tracking-tight text-black/10">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Compass className="h-20 w-20 text-black/70 animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-light">Page not found</h1>
            <p className="text-black/70">
              We couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-black/60">
              <MapPin className="h-4 w-4" />
              <span>Requested path: {location.pathname}</span>
            </div>
            
            <div className="py-4">
              <a 
                href="/" 
                className="inline-flex items-center px-6 py-3 border border-black hover:bg-black hover:text-white transition-all duration-300 rounded-md"
              >
                <span className="text-sm font-medium">Return to Dashboard</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
          
          {/* Motivational Message */}
          <div className="pt-6">
            <div className="text-center mb-4">
              <h2 className="text-lg font-medium">While you're here...</h2>
              <p className="text-sm text-black/70">Take a moment for some inspiration</p>
            </div>
            <MotivationalMessage />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
