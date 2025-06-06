import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signUp(email, password);
      if (error) throw error;
      
      setSubmitted(true);
      toast({
        title: "Success!",
        description: "Check your email for the confirmation link.",
      });
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Please try again with a different email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 border border-black/10">
        <div className="text-center">
          <Link to="/">
            <h1 className="text-3xl font-light tracking-tight hover:text-black/70 transition-colors">Habiter</h1>
          </Link>
          <p className="mt-2 text-black/70">
            {submitted ? 'Check your email' : 'Create your account'}
          </p>
        </div>

        {submitted ? (
          <div className="space-y-6">
            <div className="p-6 border border-black/10 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-black/5 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h2 className="text-xl font-medium">Verification email sent</h2>
              <p className="text-black/70">
                We've sent a verification email to <strong>{email}</strong>.
                Please check your inbox and click the link to complete your registration.
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="w-full border-black/20 hover:bg-black hover:text-white"
              >
                Use a different email
              </Button>
              
              <div className="text-center text-sm">
                <p className="text-black/70">
                  Already verified?{' '}
                  <Link to="/login" className="text-black hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="border-black/20 focus:border-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="border-black/20 focus:border-black"
                />
                <p className="text-xs text-black/50">Must be at least 6 characters</p>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-black text-white hover:bg-black/90"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>

            <div className="text-center text-sm">
              <p className="text-black/70">
                Already have an account?{' '}
                <Link to="/login" className="text-black hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup; 