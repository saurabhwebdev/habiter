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

// Custom component that shows a timer bar
const ToastWithTimer = ({ children, duration = 3000, ...props }: any) => {
  const [progress, setProgress] = useState(100)
  
  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration
    
    const timer = setInterval(() => {
      const now = Date.now()
      const timeLeft = Math.max(0, endTime - now)
      const percent = (timeLeft / duration) * 100
      
      setProgress(percent)
      
      if (now >= endTime) {
        clearInterval(timer)
      }
    }, 10)
    
    return () => clearInterval(timer)
  }, [duration])
  
  return (
    <Toast {...props}>
      {children}
      <div className="absolute bottom-0 left-0 h-1 bg-primary" style={{ width: `${progress}%`, transition: 'width 10ms linear' }} />
    </Toast>
  )
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <ToastWithTimer key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </ToastWithTimer>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
