import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Check if we're on the home page
    if (window.location.pathname !== '/') {
      // If not on home page, navigate to home first, then scroll
      window.location.href = `/#${id}`;
      return;
    }

    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // Account for header height
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'py-3 bg-white/90 backdrop-blur-md border-b border-gray-200/20 shadow-sm'
          : 'py-5 bg-transparent',
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <NavLink 
          to="/" 
          className={cn(
            "text-xl font-serif font-medium tracking-tight transition-all duration-300 hover:opacity-80",
            isScrolled ? "text-foreground" : "text-white"
          )}
        >
          ShibaVik.io
        </NavLink>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks scrollToSection={scrollToSection} isScrolled={isScrolled} />
        </div>
        
          <button 
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={cn(
              "block w-6 transition-all duration-300",
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            )}>
              <span className={cn(
                "block w-6 h-0.5 mb-1.5 transition-colors duration-300",
                isScrolled ? "bg-foreground" : "bg-white"
              )} />
              <span className={cn(
                "block w-6 h-0.5 mb-1.5 transition-colors duration-300",
                isScrolled ? "bg-foreground" : "bg-white"
              )} />
              <span className={cn(
                "block w-4 h-0.5 transition-colors duration-300",
                isScrolled ? "bg-foreground" : "bg-white"
              )} />
            </span>
          </button>
      </div>
      
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 transition-transform duration-500 ease-in-out transform md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button 
          className="absolute top-5 right-5 p-2"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <span className="block w-6 h-0.5 bg-foreground transform rotate-45 translate-y-0.5" />
          <span className="block w-6 h-0.5 bg-foreground transform -rotate-45" />
        </button>
        
        <nav className="flex flex-col space-y-6 text-lg">
          <NavLink 
            to="/" 
            className={({ isActive }) => cn(
              "hover:text-orangery-500 transition-colors",
              isActive && "text-orangery-500 font-semibold"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <button 
            className="text-left hover:text-orangery-500 transition-colors"
            onClick={() => {
              scrollToSection('trading-simulator');
              setIsMobileMenuOpen(false);
            }}
          >
            Simulator
          </button>
          <NavLink
            to="/portfolio"
            className={({ isActive }) => cn(
              "text-left hover:text-orangery-500 transition-colors",
              isActive && "text-orangery-500 font-semibold"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) => cn(
              "text-left hover:text-orangery-500 transition-colors",
              isActive && "text-orangery-500 font-semibold"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            History
          </NavLink>
          <button 
            className="text-left hover:text-orangery-500 transition-colors"
            onClick={() => {
              scrollToSection('nft');
              setIsMobileMenuOpen(false);
            }}
          >
            NFT
          </button>
          <button 
            className="text-left hover:text-orangery-500 transition-colors"
            onClick={() => {
              scrollToSection('settings');
              setIsMobileMenuOpen(false);
            }}
          >
            Settings
          </button>
          <NavLink
            to="/auth"
            className={({ isActive }) => cn(
              "text-left hover:text-orangery-500 transition-colors",
              isActive && "text-orangery-500 font-semibold"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Registration
          </NavLink>
        </nav>
      </div>
    </header>
  );
};


interface NavLinksProps {
  scrollToSection: (id: string) => void;
  isScrolled: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ scrollToSection, isScrolled }) => (
  <>
    <button 
      className={cn(
        "text-sm font-medium transition-all duration-300",
        isScrolled 
          ? "text-foreground hover:text-orangery-500" 
          : "text-white hover:text-orangery-300"
      )}
      onClick={() => scrollToSection('home')}
    >
      Home
    </button>
    <button 
      className={cn(
        "text-sm font-medium transition-all duration-300",
        isScrolled 
          ? "text-foreground hover:text-orangery-500" 
          : "text-white hover:text-orangery-300"
      )}
      onClick={() => scrollToSection('trading-simulator')}
    >
      Simulator
    </button>
    <NavLink
      to="/portfolio" 
      className={cn(
        "text-sm font-medium transition-all duration-300",
        isScrolled 
          ? "text-foreground hover:text-orangery-500" 
          : "text-white hover:text-orangery-300"
      )}
    >
      Portfolio
    </NavLink>
    <NavLink
      to="/history" 
      className={cn(
        "text-sm font-medium transition-all duration-300",
        isScrolled 
          ? "text-foreground hover:text-orangery-500" 
          : "text-white hover:text-orangery-300"
      )}
    >
      History
    </NavLink>
    <button 
      className={cn(
        "text-sm font-medium transition-all duration-300",
        isScrolled 
          ? "text-foreground hover:text-orangery-500" 
          : "text-white hover:text-orangery-300"
      )}
      onClick={() => scrollToSection('nft')}
    >
      NFT
    </button>
    <button 
      className={cn(
        "text-sm font-medium transition-all duration-300",
        isScrolled 
          ? "text-foreground hover:text-orangery-500" 
          : "text-white hover:text-orangery-300"
      )}
      onClick={() => scrollToSection('settings')}
    >
      Settings
    </button>
    <NavLink
      to="/auth" 
      className={cn(
        "text-sm font-medium transition-all duration-300",
        isScrolled 
          ? "text-foreground hover:text-orangery-500" 
          : "text-white hover:text-orangery-300"
      )}
    >
      Registration
    </NavLink>
  </>
);

export default Header;
