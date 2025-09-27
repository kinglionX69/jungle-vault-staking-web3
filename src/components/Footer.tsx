
import React from 'react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const links = [
    { name: "About", href: "#" },
    { name: "Docs", href: "#" },
    { name: "Telegram", href: "#", icon: "📱" },
    { name: "Twitter", href: "#", icon: "🐦" }
  ];

  return (
    <footer className="bg-gradient-to-t from-card to-background border-t border-border relative">
      {/* Jungle leaves decorative bar */}
      <div className="h-2 bg-accent"></div>
      
      {/* Top decorative leaves */}
      <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2">
        <div className="flex space-x-4 text-2xl">
          <span className="animate-float">🌿</span>
          <span className="animate-float" style={{ animationDelay: '0.5s' }}>🍃</span>
          <span className="animate-float" style={{ animationDelay: '1s' }}>🌿</span>
          <span className="animate-float" style={{ animationDelay: '1.5s' }}>🍃</span>
          <span className="animate-float" style={{ animationDelay: '2s' }}>🌿</span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo/Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl sm:text-4xl">🦁</span>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">Jungle Vault : Emojicoin</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md mb-6">
              The premier emojicoin staking platform on Aptos. 
              Stake your emojicoins in our mystical jungle vaults and earn like royalty.
            </p>
            
            {/* Social icons */}
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://t.me/proudlionsclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <Button 
                  variant="pixel" 
                  size="icon" 
                  className="text-xl hover:scale-110 transition-transform"
                >
                  📱
                </Button>
              </a>
              <a 
                href="https://x.com/proudlionstudio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Button 
                  variant="pixel" 
                  size="icon" 
                  className="text-xl hover:scale-110 transition-transform"
                >
                  🐦
                </Button>
              </a>
              <a 
                href="https://discord.gg/proudlionsclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <Button 
                  variant="pixel" 
                  size="icon" 
                  className="text-xl hover:scale-110 transition-transform"
                >
                  💬
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">🔗 Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors duration-300 flex items-center space-x-2 touch-target focus-ring rounded-md p-1 -m-1"
                  >
                    {link.icon && <span className="text-base">{link.icon}</span>}
                    <span className="text-sm sm:text-base">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">🌿 Ecosystem</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-accent transition-colors duration-300 touch-target focus-ring rounded-md p-1 -m-1 text-sm sm:text-base"
                >
                  🏊 Pools
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-accent transition-colors duration-300 touch-target focus-ring rounded-md p-1 -m-1 text-sm sm:text-base"
                >
                  📊 Analytics
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-accent transition-colors duration-300 touch-target focus-ring rounded-md p-1 -m-1 text-sm sm:text-base"
                >
                  🎯 Governance
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-accent transition-colors duration-300 touch-target focus-ring rounded-md p-1 -m-1 text-sm sm:text-base"
                >
                  🛡️ Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border mt-8 sm:mt-12 pt-6 sm:pt-8">
          {/* Proud Lion Studios Attribution */}
          <div className="flex justify-center items-center mb-6">
            <div className="flex items-center gap-3 jungle-card bg-jungle-800/20 border-jungle-400/30 px-4 py-3 rounded-lg">
              <img 
                src="/lovable-uploads/fd19c32b-881e-4c95-89ae-c1ea2d02ec7c.png" 
                alt="Proud Lion Studios Logo"
                className="w-8 h-8 rounded-full"
              />
              <div className="text-center">
                <p className="text-jungle-200 text-sm font-medium">Developed by</p>
                <p className="text-jungle-100 text-base font-bold">Proud Lion Studios (UAE)</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © 2024 Jungle Vault : Emojicoin. Built with 🦍 power on Aptos.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
              <a 
                href="/privacy-policy" 
                className="text-muted-foreground hover:text-accent text-sm transition-colors touch-target focus-ring rounded-md p-1 -m-1"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms-of-service" 
                className="text-muted-foreground hover:text-accent text-sm transition-colors touch-target focus-ring rounded-md p-1 -m-1"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
