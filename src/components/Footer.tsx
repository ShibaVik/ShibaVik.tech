
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer id="contact" className={cn('py-20 md:py-32 bg-gray-50 border-t border-gray-100', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Stay Connected with ShibaVik</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Follow us for the latest updates on our trading platform and memecoin launches
            </p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href="https://twitter.com/Nft_ShibaVik"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center transition-colors group shadow-sm"
                title="𝕏 (Twitter)"
              >
                <img src="/src/assets/x-logo.png" alt="𝕏" className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://linkedin.com/in/sullyvan-milhau-92945a2b1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center transition-colors group shadow-sm"
                title="LinkedIn"
              >
                <img src="/lovable-uploads/a3d05521-8a36-44d1-a5ec-8b4fa38f160b.png" alt="LinkedIn" className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://opensea.io/ShibaVik"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center transition-colors group shadow-sm"
                title="OpenSea"
              >
                <img src="/lovable-uploads/aff37192-08d1-43f3-8bad-47bcd838cdea.png" alt="OpenSea" className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://github.com/ShibaVik"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center transition-colors group shadow-sm"
                title="GitHub"
              >
                <img src="/lovable-uploads/cf7c815d-01c5-426a-af9f-26812957b1fc.png" alt="GitHub" className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </FadeIn>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-serif font-medium tracking-tight">
              ShibaVik.io
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              Simulator developed by MS-ShibaVik
            </p>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <button
              onClick={() => scrollToSection('home')} 
              className="text-sm hover:text-orangery-500 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('thesis')} 
              className="text-sm hover:text-orangery-500 transition-colors"
            >
              Platform
            </button>
            <button
              onClick={() => scrollToSection('investment')} 
              className="text-sm hover:text-orangery-500 transition-colors"
            >
              Features
            </button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ShibaVik.io. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
