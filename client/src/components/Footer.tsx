import { Music, Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Music className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-card-foreground">
                EVOK TECH DJ
              </span>
            </div>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              Premium music packs featuring remixed classics and modern beats. 
              Relive the golden era of music with fresh, contemporary sound from EVOK TECH DJ.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-card-foreground">Quick Links</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                Music Packs
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                New Releases
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                Featured Artists
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                Contact
              </a>
            </nav>
          </div>

          {/* Genres */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-card-foreground">Genres</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                90s Remix
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                House & Techno
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                Latin Fusion
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                Dance Pop
              </a>
            </nav>
          </div>

          {/* Coming Soon */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-card-foreground">Coming Soon</h3>
            <div className="space-y-2 text-muted-foreground font-body text-sm">
              <p>Wedding Pack Series</p>
              <p>90s REMIX Pack Vol. 2</p>
              <p>Year by Year (Best of) Series</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-muted-foreground text-sm font-body">
                <Mail className="w-4 h-4" />
                <span>info@evoktech.dj</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm font-body">
                <Globe className="w-4 h-4" />
                <span>www.evoktech.dj</span>
              </div>
            </div>
            
            <div className="text-muted-foreground text-sm font-body">
              © 2025 EVOK TECH DJ. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}