import React from 'react';
import { logoBase64 } from '../logo-base64';

export default function Logo({ 
  className = "",
  variant = "header"
}: { 
  className?: string;
  variant?: "header" | "footer";
}) {
  const isFooter = variant === "footer";
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoBase64}
        alt="Team Building Logo"
        className={`h-8 md:h-10 w-auto object-contain ${isFooter ? "invert brightness-0" : ""}`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}



