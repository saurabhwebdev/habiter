import React, { useState } from 'react';
import EmailTemplate from '@/components/EmailTemplate';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EmailPreview = () => {
  const [emailType, setEmailType] = useState<'confirmation' | 'reset' | 'welcome'>('confirmation');
  const [username, setUsername] = useState('John');
  const [actionUrl, setActionUrl] = useState('https://habiter.app/confirm-email?token=abc123');

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-black/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Email Templates Preview</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="space-y-6 border border-black/10 p-6">
            <h2 className="text-xl font-medium mb-4">Email Settings</h2>
            
            <div className="space-y-2">
              <Label htmlFor="emailType">Email Type</Label>
              <Select value={emailType} onValueChange={(value) => setEmailType(value as any)}>
                <SelectTrigger id="emailType">
                  <SelectValue placeholder="Select email type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmation">Confirmation Email</SelectItem>
                  <SelectItem value="reset">Password Reset</SelectItem>
                  <SelectItem value="welcome">Welcome Email</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="border-black/20 focus:border-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actionUrl">Action URL</Label>
              <Input 
                id="actionUrl" 
                value={actionUrl} 
                onChange={(e) => setActionUrl(e.target.value)}
                className="border-black/20 focus:border-black"
              />
            </div>
          </div>

          {/* Email Preview */}
          <div className="col-span-2 border border-black/10 p-6 overflow-auto">
            <h2 className="text-xl font-medium mb-4">Email Preview</h2>
            <div className="border border-black/10 p-4">
              <EmailTemplate 
                type={emailType}
                actionUrl={actionUrl}
                username={username}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmailPreview; 