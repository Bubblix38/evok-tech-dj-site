import { useState } from "react";
import Header from "../Header";

export default function HeaderExample() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background">
        <Header 
          isDarkMode={isDarkMode}
          onThemeToggle={() => {
            setIsDarkMode(!isDarkMode);
            console.log("Theme toggled:", !isDarkMode ? "dark" : "light");
          }} 
        />
        <div className="p-8">
          <p className="text-muted-foreground font-body">Header component with theme toggle and responsive navigation</p>
        </div>
      </div>
    </div>
  );
}