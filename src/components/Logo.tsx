import React from 'react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src="/logo.png"
        alt="Team Building Logo"
        className="h-8 md:h-10 w-auto object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}



