import React from "react";

export const Face = ({ open }) => (
  <g>
    <circle cx="8.5" cy="4.4" r="0.55" fill="#1a1c2c" />
    <rect x="7.6" y="7.2" width="1.9" height={open ? 1.4 : 0.6} rx="0.3" fill="#b13e53" />
  </g>
);
