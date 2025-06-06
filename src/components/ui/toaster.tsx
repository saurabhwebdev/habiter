import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useEffect, useState } from "react"

// Simple timer toast component
const TimerToast = ({ children, id, ...props }: { 
  children: React.ReactNode; 
  id: string; 
  [key: string]: any 
}) => {
  const [width, setWidth] = useState(100);
  const { dismiss } = useToast();
  const DURATION = 3000; // 3 seconds
  
  useEffect(() => {
    // Start with 100% width
    setWidth(100);
    
    // Update every 30ms (smoother animation)
    const intervalId = setInterval(() => {
      setWidth((prevWidth) => {
        // Decrease by about 3.33% each 100ms (to reach 0 in 3 seconds)
        const newWidth = prevWidth - 1;
        return newWidth > 0 ? newWidth : 0;
      });
    }, 30);
    
    // Auto dismiss after duration
    const timeoutId = setTimeout(() => {
      if (id) dismiss(id);
    }, DURATION);
    
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [id, dismiss]);
  
  return (
    <Toast {...props}>
      {children}
      <div 
        className="absolute bottom-0 left-0 h-2 bg-primary transition-all duration-100 ease-linear"
        style={{ width: `${width}%` }}
      />
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
