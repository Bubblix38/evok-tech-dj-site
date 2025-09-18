import { useState } from "react";
import Footer from "../Footer";

export default function FooterExample() {
  const [isDarkMode] = useState(true);
  
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 p-8">
          <div className="text-center">
            <h2 className="font-display font-bold text-2xl mb-4 text-foreground">Footer Component</h2>
            <p className="text-muted-foreground font-body">
              Complete footer with brand info, navigation, and contact details
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}