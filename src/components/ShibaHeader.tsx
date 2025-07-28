import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ShibaHeaderProps {
  className?: string;
}

const ShibaHeader: React.FC<ShibaHeaderProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState('Trading');

  const socialLinks = [
    { name: 'Twitter', symbol: '𝕏', href: 'https://twitter.com/Nft_ShibaVik' },
    { name: 'LinkedIn', symbol: 'in', href: 'https://www.linkedin.com/in/sullyvan-milhau' },
    { name: 'OpenSea', symbol: 'OS', href: 'https://opensea.io/ShibaVik' },
    { name: 'GitHub', symbol: 'GH', href: 'https://github.com/ShibaVik' },
  ];

  const navItems = ['Trading', 'Portfolio', 'History', 'NFT'];

  return (
    <header className={cn('w-full py-4 px-6', className)}>
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-shiba-cyan rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ShibaVik.io</h1>
              <p className="text-shiba-muted text-sm">Simulator developed by MS-ShibaVik</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title={link.name}
              >
                <span className="text-white text-sm font-medium">{link.symbol}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Balance and Navigation section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-white">
              <span className="text-shiba-muted text-sm">Current Balance: </span>
              <span className="text-xl font-bold">$10000.00</span>
              <div className="text-xs text-shiba-muted">Mode: Demo</div>
            </div>
            
            <div className="w-8 h-8 bg-shiba-cyan rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">$</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex bg-white/10 rounded-lg p-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium transition-all',
                    activeTab === item
                      ? 'bg-shiba-cyan text-white'
                      : 'text-shiba-muted hover:text-white'
                  )}
                >
                  {item}
                </button>
              ))}
            </nav>

            <Button className="bg-shiba-cyan hover:bg-shiba-cyan/80 text-white">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShibaHeader;