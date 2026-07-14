import React from 'react';

declare global {
  interface Window {
    __LOGO_URL__?: string;
    __LOGO_FOOTER_URL__?: string;
  }
}

export default function Logo({ 
  className = "",
  variant = "header"
}: { 
  className?: string;
  variant?: "header" | "footer";
}) {
  const isFooter = variant === "footer";
  
  // Use the dynamically resolved global variables from index.html which are fully absolute and subpath-aware
  const currentLogo = isFooter 
    ? (window.__LOGO_FOOTER_URL__ || "/logo_footer.png")
    : (window.__LOGO_URL__ || "/logo.png");

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




