import React from 'react';
import { Wind } from 'lucide-react';

const Header = () => (
  <header className="flex items-center justify-between p-3 bg-white border-b border-gray-200 text-gray-800 sticky top-0 z-50">
    <div className="flex items-center space-x-2">
      <Wind className="w-6 h-6 text-green-600" />
      <img src="/Meghdarshn.png" alt="Meghdarshan.ai" className="h-8" />
    </div>
    <p className="hidden md:block text-sm text-gray-600">INSAT-3DR Cloud Motion Forecasting</p>
    <div className="flex items-center space-x-2 text-xs text-gray-700">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span>Online</span>
    </div>
  </header>
);

export default Header;
