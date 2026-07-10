import React from 'react';

export default function Logo({ 
  className = "",
  variant = "header"
}: { 
  className?: string;
  variant?: "header" | "footer";
}) {
  const isFooter = variant === "footer";
  const logoUrl = isFooter ? "/logo_footer.png" : "/logo.png";

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoUrl}
        alt="Team Building Logo"
        className="h-8 md:h-10 w-auto object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}



