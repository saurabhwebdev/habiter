import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Unregister any existing service workers to fix cache errors
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) {
      registration.unregister().then(() => {
        console.log('Service worker unregistered successfully');
      }).catch(error => {
        console.error('Error unregistering service worker:', error);
      });
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);
