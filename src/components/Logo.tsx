import React, { useState, useEffect } from 'react';
import logoUrl from '../logo.png';
import footerLogoUrl from '../footer_logo.png';

export default function Logo({ 
  className = "",
  variant = "header"
}: { 
  className?: string;
  variant?: "header" | "footer";
}) {
  const isFooter = variant === "footer";
  
  // Use the imported assets as primary, with absolute/relative public paths as fallbacks
  const primarySrc = isFooter ? footerLogoUrl : logoUrl;
  const [src, setSrc] = useState(primarySrc);
  const [fallbackStep, setFallbackStep] = useState(0);

  // Update src if variant changes
  useEffect(() => {
    setSrc(isFooter ? footerLogoUrl : logoUrl);
    setFallbackStep(0);
  }, [variant]);

  const handleError = () => {
    if (fallbackStep === 0) {
      // First fallback: Try absolute public paths
      setSrc(isFooter ? "/footer_logo.png" : "/logo.png");
      setFallbackStep(1);
    } else if (fallbackStep === 1) {
      // Second fallback: Try alternative footer name
      setSrc(isFooter ? "/logo_footer.png" : "logo.png");
      setFallbackStep(2);
    } else if (fallbackStep === 2) {
      // Third fallback: Try relative paths
      setSrc(isFooter ? "footer_logo.png" : "logo.png");
      setFallbackStep(3);
    } else if (fallbackStep === 3) {
      // Fourth fallback: Try alternative relative footer name
      setSrc(isFooter ? "logo_footer.png" : "/favicon.svg");
      setFallbackStep(4);
    }
  };

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={src}
        alt="Team Building Logo"
        className="h-8 md:h-10 w-auto object-contain"
        referrerPolicy="no-referrer"
        onError={handleError}
      />
    </div>
  );
}




