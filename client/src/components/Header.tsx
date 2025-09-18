import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, Music } from "lucide-react";
import { Link } from "wouter";

interface HeaderProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export default function Header({ onThemeToggle, isDarkMode = true }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Music className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              EVOK TECH DJ
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-body">
              Home
            </Link>
            <Link href="/funk-videos" className="text-foreground hover:text-primary transition-colors font-body">
              Funk Videos
            </Link>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-body">
              Curso de DJ
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-body">
              Contact
            </a>
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              data-testid="button-theme-toggle"
              className="hover-elevate"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover-elevate"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu-toggle"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-foreground hover:text-primary transition-colors font-body">
                Home
              </Link>
              <Link href="/funk-videos" className="text-foreground hover:text-primary transition-colors font-body">
                Funk Videos
              </Link>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-body">
                Curso de DJ
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-body">
                Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}