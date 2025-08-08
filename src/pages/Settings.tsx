import React from 'react';
import Header from '@/components/Header';
import Settings from '@/components/Settings';

const SettingsPage = () => {
  return (
    <main className="relative min-h-screen bg-gray-50">
      <Header forceScrolledStyle={true} />
      <div className="pt-24">
        <Settings />
      </div>
    </main>
  );
};

export default SettingsPage;