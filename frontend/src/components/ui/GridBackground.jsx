import React from "react";

export function GridBackgroundDemo({ children }) {
  return (
    <div className=" w-full bg-[#1E1E2F] relative flex ">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[#1E1E2F] bg-opacity-20 bg-grid-white/[0.1] z-0" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black bg-opacity-100 z-10 [mask-image:radial-gradient(ellipse_at_center,transparent_0.01%,black)]" />

      {/* Content */}
      <div className="relative z-20 w-full">{children}</div>
    </div>
  );
}
