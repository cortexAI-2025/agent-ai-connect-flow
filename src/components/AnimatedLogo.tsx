
import { useState, useEffect } from "react";
import { Bot } from "lucide-react";

export function AnimatedLogo() {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
    
    // Optional: loop the animation
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 100);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex justify-center mb-3">
      <div className={`
        relative p-3 rounded-full bg-primary/10
        transition-all duration-700 ease-in-out
        ${animate ? "scale-100" : "scale-95"}
      `}>
        <Bot 
          className={`
            w-12 h-12 text-primary 
            transition-all duration-700
            ${animate ? "rotate-0 opacity-100" : "rotate-45 opacity-80"}
          `} 
        />
        <div className={`
          absolute inset-0 rounded-full bg-primary/5
          animate-pulse
        `}></div>
      </div>
    </div>
  );
}
