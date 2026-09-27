import React, { useState } from 'react';
import ngLogoImg from '../assets/images/ng_neon_logo_1790444749118.jpg';

interface NGLogoProps {
  className?: string;
  size?: number;
}

export const NGLogo: React.FC<NGLogoProps> = ({ className = "w-10 h-10", size }) => {
  const [hasError, setHasError] = useState(false);
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;

  return (
    <div
      style={style}
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full select-none overflow-hidden ${className}`}
    >
      {!hasError ? (
        <img
          src={ngLogoImg}
          alt="NayaGram Official Logo"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover object-center rounded-full drop-shadow-md transform transition-transform duration-300"
        />
      ) : (
        /* Styled fallback SVG if image fails */
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md rounded-full"
        >
          <defs>
            <radialGradient id="ng_sphere_fallback" cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="95" fill="url(#ng_sphere_fallback)" />
          <text
            x="100"
            y="125"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="78"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            NG
          </text>
        </svg>
      )}
    </div>
  );
};
