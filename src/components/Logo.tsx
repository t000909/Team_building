import React from 'react';
import logoUrl from '../logo.png';
import logoFooterUrl from '../logo_footer.png';

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
        src={isFooter ? logoFooterUrl : logoUrl}
        alt="Team Building Logo"
        className="h-8 md:h-10 w-auto object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}



