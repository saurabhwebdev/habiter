import React from 'react';

interface EmailTemplateProps {
  type: 'confirmation' | 'reset' | 'welcome';
  actionUrl: string;
  username?: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ 
  type, 
  actionUrl, 
  username = 'there' 
}) => {
  const getSubject = () => {
    switch (type) {
      case 'confirmation': return 'Confirm your email address';
      case 'reset': return 'Reset your password';
      case 'welcome': return 'Welcome to Habiter';
      default: return 'Action required';
    }
  };

  const getHeading = () => {
    switch (type) {
      case 'confirmation': return 'Confirm your email address';
      case 'reset': return 'Reset your password';
      case 'welcome': return `Welcome to Habiter, ${username}!`;
      default: return 'Action required';
    }
  };

  const getActionText = () => {
    switch (type) {
      case 'confirmation': return 'Confirm email address';
      case 'reset': return 'Reset password';
      case 'welcome': return 'Get started';
      default: return 'Continue';
    }
  };

  const getContent = () => {
    switch (type) {
      case 'confirmation': 
        return "Please confirm your email address to complete your Habiter account setup. This helps us verify you're a real person and secures your account.";
      case 'reset': 
        return "We received a request to reset your password. If you didn't make this request, you can safely ignore this email.";
      case 'welcome': 
        return "Thank you for joining Habiter! We're excited to help you build better habits, one day at a time.";
      default: 
        return "Please take action on your account.";
    }
  };

  // This is just the template - in a real implementation, this would be rendered server-side
  // or through an email service provider's template system
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#ffffff',
      color: '#000000'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '300',
          letterSpacing: '0.5px'
        }}>Habiter</h1>
      </div>
      
      <div style={{
        border: '1px solid rgba(0, 0, 0, 0.1)',
        padding: '30px',
        marginBottom: '30px'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '400',
          marginBottom: '20px'
        }}>{getHeading()}</h2>
        
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'rgba(0, 0, 0, 0.7)',
          marginBottom: '30px'
        }}>
          Hello {username},
        </p>
        
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'rgba(0, 0, 0, 0.7)',
          marginBottom: '30px'
        }}>
          {getContent()}
        </p>
        
        <div style={{
          textAlign: 'center',
          marginTop: '30px',
          marginBottom: '30px'
        }}>
          <a href={actionUrl} style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            padding: '12px 24px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>
            {getActionText()}
          </a>
        </div>
        
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'rgba(0, 0, 0, 0.5)',
          marginTop: '30px'
        }}>
          If the button above doesn't work, copy and paste this URL into your browser:
        </p>
        
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'rgba(0, 0, 0, 0.7)',
          wordBreak: 'break-all'
        }}>
          {actionUrl}
        </p>
      </div>
      
      <div style={{
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: '14px',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        paddingTop: '20px'
      }}>
        <p>© 2024 Habiter. Build better habits, one day at a time.</p>
        <p style={{ marginTop: '10px' }}>
          If you didn't create an account with Habiter, please ignore this email.
        </p>
      </div>
    </div>
  );
};

// Example usage (for documentation purposes):
// <EmailTemplate 
//   type="confirmation" 
//   actionUrl="https://habiter.app/confirm-email?token=abc123" 
//   username="John" 
// />

export default EmailTemplate; 