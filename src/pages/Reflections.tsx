import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import AuthNavBar from "@/components/AuthNavBar";
import MobileNavBar from "@/components/MobileNavBar";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import { Lightbulb, BookOpen, CheckCircle } from "lucide-react";

const Reflections = () => {
  const { currentUser } = useAuth();
  const [activePrompt, setActivePrompt] = useState(0);
  
  // Sample reflection prompts - in a real app, these would come from your backend
  const reflectionPrompts = [
    {
      id: "1",
      question: "How has your identity shifted since starting your habit journey?",
      category: "identity" as const
    },
    {
      id: "2",
      question: "What environmental changes have been most effective in supporting your habits?",
      category: "environment" as const
    },
    {
      id: "3",
      question: "What obstacles are you facing with your current habits?",
      category: "obstacles" as const
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <AuthNavBar />
      <main className="flex-1 pt-16 pb-20">
        <div className="px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Daily Reflections</h1>
            <p className="text-sm text-muted-foreground">
              Deepen your habit practice through reflection
            </p>
          </div>
          
          <div className="mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-6">
              <div className="flex items-center space-x-2 text-purple-500 mb-2">
                <Lightbulb className="h-5 w-5" />
                <h2 className="text-lg font-medium">Today's Reflection</h2>
              </div>
              <ReflectionPrompt />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                Past Reflections
              </h3>
              
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-sm font-medium mb-1">
                      {reflectionPrompts[i % 3].question}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sample reflection response {i}. This would be the user's actual reflection entry from the database.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <MobileNavBar />
    </div>
  );
};

export default Reflections; 