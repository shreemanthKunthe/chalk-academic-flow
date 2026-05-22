import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function Logo({ size = 20, className = "", ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
      {...props}
    >
      <path
        d="M 5,60 C 15,68 28,58 38,48 C 44,36 47,20 50,20 C 53,20 56,36 62,48 C 72,58 85,68 95,60 C 82,52 75,38 68,30 C 60,18 55,5 50,5 C 45,5 40,18 32,30 C 25,38 18,52 5,60 Z"
      />
    </svg>
  );
}
