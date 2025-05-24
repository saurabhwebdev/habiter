import { useAuth } from "@/lib/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthNavBar from "@/components/AuthNavBar";
import MobileNavBar from "@/components/MobileNavBar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  LogOut, 
  Moon, 
  Bell, 
  Shield, 
  HelpCircle, 
  FileText, 
  ChevronRight 
} from "lucide-react";

const Settings = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <AuthNavBar />
      <main className="flex-1 pt-16 pb-20">
        <div className="px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm text-muted-foreground">
              Manage your app preferences
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-medium mb-4">Appearance</h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Moon className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                  </div>
                  <Switch id="dark-mode" />
                </div>
              </div>
              
              <Separator />
              
              <div className="p-4">
                <h2 className="text-lg font-medium mb-4">Notifications</h2>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="reminders">Daily Reminders</Label>
                  </div>
                  <Switch id="reminders" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="achievements">Achievement Alerts</Label>
                  </div>
                  <Switch id="achievements" defaultChecked />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-medium mb-2">Help & Support</h2>
              </div>
              
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start px-4 py-3 h-auto">
                  <HelpCircle className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span>FAQ</span>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Button>
                
                <Button variant="ghost" className="w-full justify-start px-4 py-3 h-auto">
                  <FileText className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span>Terms of Service</span>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Button>
                
                <Button variant="ghost" className="w-full justify-start px-4 py-3 h-auto">
                  <Shield className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span>Privacy Policy</span>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Button>
              </div>
            </div>
            
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </main>
      <MobileNavBar />
    </div>
  );
};

export default Settings; 