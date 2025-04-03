
import { useState, useEffect } from "react";
import { Bot } from "lucide-react";

export function AnimatedLogo() {
  const [animate, setAnimate] = useState(false);
  const [pulse, setPulse] = useState(false);
  
  useEffect(() => {
    // Initial animation
    setAnimate(true);
    
    // Add pulsing effect after initial animation
    const pulseTimer = setTimeout(() => {
      setPulse(true);
    }, 1000);
    
    // Loop the animation with a pause
    const interval = setInterval(() => {
      setAnimate(false);
      
      // Brief pause before reanimating
      setTimeout(() => setAnimate(true), 300);
    }, 12000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(pulseTimer);
    };
  }, []);
  
  return (
    <div className="flex justify-center mb-3">
      <div className={`
        relative p-3 rounded-full
        transition-all duration-1000 ease-in-out
        ${animate ? "bg-primary/20 scale-100" : "bg-primary/10 scale-95"}
      `}>
        <Bot 
          className={`
            w-12 h-12 text-primary 
            transition-all duration-1000
            ${animate ? "rotate-0 opacity-100" : "rotate-45 opacity-80"}
          `} 
        />
        <div className={`
          absolute inset-0 rounded-full bg-primary/5
          ${pulse ? "animate-pulse" : ""}
        `}></div>
        
        {/* Orbital effect */}
        <div className={`
          absolute inset-0 rounded-full
          border border-primary/20
          transition-all duration-1000
          ${animate ? "scale-[1.5] opacity-0" : "scale-100 opacity-30"}
        `}></div>
      </div>
    </div>
  );
}
