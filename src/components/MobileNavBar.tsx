import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BarChart, BookOpen, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNavBar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      name: "Cravings",
      href: "/cravings",
      icon: BarChart,
      active: pathname === "/cravings",
    },
    {
      name: "Reflections",
      href: "/reflections",
      icon: BookOpen,
      active: pathname === "/reflections",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      active: pathname === "/settings",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full transition-colors",
              item.active 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 mb-1",
              item.active ? "text-primary" : "text-muted-foreground"
            )} />
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavBar; 