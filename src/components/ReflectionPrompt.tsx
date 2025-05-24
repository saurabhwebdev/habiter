import { useState, useEffect } from "react";
import { ReflectionPrompt as ReflectionPromptType, Quote } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useReflections } from "@/hooks/useReflections";
import { Lightbulb, Quote as QuoteIcon, RefreshCw } from "lucide-react";

interface ReflectionPromptProps {
  category?: string;
  habitId?: string;
}

const ReflectionPrompt = ({ category, habitId }: ReflectionPromptProps) => {
  const { 
    currentPrompt, 
    currentQuote, 
    loading, 
    fetchRandomPrompt, 
    fetchRandomQuote, 
    submitReflection 
  } = useReflections();
  
  const [response, setResponse] = useState("");
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    fetchRandomPrompt(category);
    fetchRandomQuote(category);
  }, [category]);

  const handleRefreshPrompt = () => {
    fetchRandomPrompt(category);
  };

  const handleRefreshQuote = () => {
    fetchRandomQuote(category);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (response.trim() && currentPrompt) {
      submitReflection(response, habitId);
      setResponse("");
    }
  };

  const toggleView = () => {
    setShowQuote(!showQuote);
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            {showQuote ? "Daily Inspiration" : "Daily Reflection"}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={toggleView}>
            {showQuote ? "Show Reflection" : "Show Quote"}
          </Button>
        </div>
        <CardDescription>
          {showQuote 
            ? "Motivational quotes to inspire your journey" 
            : "Reflect on your habits and progress"
          }
        </CardDescription>
      </CardHeader>

      {showQuote ? (
        <CardContent>
          {currentQuote ? (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md relative">
                <QuoteIcon className="h-8 w-8 text-muted-foreground opacity-20 absolute top-2 left-2" />
                <blockquote className="pl-6 italic">
                  "{currentQuote.text}"
                </blockquote>
                <footer className="text-right mt-2 text-sm font-medium">
                  — {currentQuote.author}, <span className="text-muted-foreground">{currentQuote.source === 'atomic_habits' ? 'Atomic Habits' : 'Easy Way to Stop Smoking'}</span>
                </footer>
              </div>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefreshQuote}
                  className="flex items-center"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  New Quote
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No quotes available.</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefreshQuote}
                className="mt-2"
              >
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardContent>
            {currentPrompt ? (
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
                  <p className="text-lg font-medium">{currentPrompt.question}</p>
                </div>
                <Textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Write your reflection here..."
                  rows={6}
                  required
                />
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRefreshPrompt}
                    className="flex items-center"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    New Prompt
                  </Button>
                  <Button type="submit" size="sm">
                    Save Reflection
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No prompts available.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefreshPrompt}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </form>
      )}
    </Card>
  );
};

export default ReflectionPrompt; 