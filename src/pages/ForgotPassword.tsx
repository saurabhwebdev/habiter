import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      
      setSubmitted(true);
      toast({
        title: "Email sent",
        description: "Check your inbox for the password reset link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
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
          <p className="mt-2 text-black/70">Reset your password</p>
        </div>

        {submitted ? (
          <div className="space-y-6">
            <Alert className="border-black/10 bg-black/5">
              <AlertDescription>
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your email and follow the instructions to reset your password.
              </AlertDescription>
            </Alert>
            <div className="text-center">
              <Link to="/login">
                <Button variant="outline" className="border-black/20 hover:bg-black hover:text-white">
                  Return to login
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
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

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white hover:bg-black/90"
            >
              {loading ? 'Sending...' : 'Send reset link'}
            </Button>

            <div className="text-center text-sm">
              <p className="text-black/70">
                Remember your password?{' '}
                <Link to="/login" className="text-black hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword; 