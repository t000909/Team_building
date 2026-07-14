import React from 'react';

export default function Logo({ 
  className = "",
  variant = "header"
}: { 
  className?: string;
  variant?: "header" | "footer";
}) {
  const isFooter = variant === "footer";
  
  // Dynamically resolve fully qualified URL from index.html links to handle nested subpaths or subdirectory hosting
  const preloadEl = document.getElementById(isFooter ? 'logo-footer-preload' : 'logo-preload') as HTMLLinkElement | null;
  const currentLogo = preloadEl ? preloadEl.href : (isFooter ? "./logo_footer.png" : "./logo.png");

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




