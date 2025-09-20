import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Music } from "lucide-react";
import { Link } from "wouter";

interface HeaderProps {
  // Removed theme-related props
}

export default function Header({}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Music className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                EVOK TECH DJ
              </span>
            </div>

            {/* Desktop Navigation - Centralized */}
            <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
              <Link href="/" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-body text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Home
              </Link>
              <Link href="/videos" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-body text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Vídeos
              </Link>
              <a href="/curso-dj" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-body text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Curso de DJ
              </a>
              <a href="#" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-body text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Contact
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
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
            <nav className="md:hidden py-6 border-t border-border">
              <div className="flex flex-col gap-4">
                <Link href="/" className="mx-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-body text-sm font-medium tracking-wide transition-all duration-300 text-center shadow-lg">
                  Home
                </Link>
                <Link href="/videos" className="mx-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-body text-sm font-medium tracking-wide transition-all duration-300 text-center shadow-lg">
                  Vídeos
                </Link>
                <a href="/curso-dj" className="mx-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-body text-sm font-medium tracking-wide transition-all duration-300 text-center shadow-lg">
                  Curso de DJ
                </a>
                <a href="#" className="mx-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-body text-sm font-medium tracking-wide transition-all duration-300 text-center shadow-lg">
                  Contact
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}