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
  const currentLogo = isFooter ? logoFooterUrl : logoUrl;

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={currentLogo}
        alt="Team Building Logo"
        className="h-8 md:h-10 w-auto object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}




