import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-6 lg:gap-10">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">HabitFlow</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/about")}
          >
            About
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
