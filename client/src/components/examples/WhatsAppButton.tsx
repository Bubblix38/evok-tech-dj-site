import { useState } from "react";
import WhatsAppButton from "../WhatsAppButton";

export default function WhatsAppButtonExample() {
  const [isDarkMode] = useState(false); // Sempre modo light
  
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background">
        <div className="p-8">
          <div className="text-center">
            <h2 className="font-display font-bold text-2xl mb-4 text-foreground">WhatsApp Contact Button</h2>
            <p className="text-muted-foreground font-body">
              Floating contact button appears in the bottom right corner
            </p>
          </div>
        </div>
        
        <WhatsAppButton 
          phoneNumber="59895905365"
          message="Hi! I'm interested in the 90s REMIX Pack. Can you provide more information?"
        />
      </div>
    </div>
  );
}