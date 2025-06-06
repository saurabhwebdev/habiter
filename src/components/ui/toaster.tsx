import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useEffect } from "react"

// Define keyframes for the animation in a style tag that will be added to the head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes shrinkWidth {
      0% { width: 100%; }
      100% { width: 0%; }
    }
    .toast-progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background-color: hsl(var(--primary));
      animation: shrinkWidth 3000ms linear forwards;
      width: 100%;
    }
  `;
  document.head.appendChild(style);
}

// Simple timer toast component
const TimerToast = ({ children, id, ...props }: { 
  children: React.ReactNode; 
  id: string; 
  [key: string]: any 
}) => {
  const { dismiss } = useToast();
  const DURATION = 3000; // 3 seconds
  
  useEffect(() => {
    // Auto dismiss after duration
    const timeoutId = setTimeout(() => {
      if (id) dismiss(id);
    }, DURATION);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [id, dismiss]);
  
  return (
    <Toast {...props}>
      {children}
      <div className="toast-progress-bar" />
    </Toast>
  );
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <TimerToast key={id} id={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </TimerToast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
