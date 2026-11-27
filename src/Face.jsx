import React from "react";

const DARK = "#1a1c2c";
const RED = "#b13e53";

const Eye = ({ expr }) => {
  if (expr === "senang") {
    return <path d="M7.8 4.9 Q8.5 3.7 9.2 4.9" stroke={DARK} strokeWidth="0.6" strokeLinecap="round" fill="none" />;
  }
  if (expr === "kaget") {
    return (
      <g>
        <circle cx="8.6" cy="4.4" r="1.1" fill="#ffffff" stroke={DARK} strokeWidth="0.3" />
        <circle cx="8.8" cy="4.4" r="0.45" fill={DARK} />
      </g>
    );
  }
  return <circle cx="8.5" cy="4.4" r="0.55" fill={DARK} />;
};

const Brow = ({ expr }) => {
  if (expr === "marah") {
    return <rect x="7.5" y="2.85" width="2.6" height="0.6" rx="0.2" fill={DARK} transform="rotate(22 8.8 3.15)" />;
  }
  if (expr === "sedih") {
    return <rect x="7.5" y="2.85" width="2.4" height="0.5" rx="0.2" fill={DARK} transform="rotate(-20 8.7 3.1)" />;
  }
  if (expr === "kaget") {
    return <rect x="7.6" y="2.5" width="2.2" height="0.5" rx="0.2" fill={DARK} transform="rotate(-8 8.7 2.75)" />;
  }
  return null;
};

const Mouth = ({ expr, open }) => {
  if (expr === "senang") {
    return open ? (
      <path d="M7.4 6.8 Q8.6 9.4 9.9 6.7 Z" fill={RED} />
    ) : (
      <path d="M7.5 6.9 Q8.6 8.2 9.8 6.8" stroke={RED} strokeWidth="0.55" strokeLinecap="round" fill="none" />
    );
  }
  if (expr === "sedih") {
    return open ? (
      <ellipse cx="8.7" cy="7.6" rx="0.9" ry="0.8" fill={RED} />
    ) : (
      <path d="M7.6 7.9 Q8.6 6.9 9.8 7.8" stroke={RED} strokeWidth="0.55" strokeLinecap="round" fill="none" />
    );
  }
  if (expr === "kaget") {
    return <ellipse cx="8.7" cy="7.6" rx={open ? 0.8 : 0.65} ry={open ? 1.3 : 0.95} fill={RED} />;
  }
  if (expr === "marah") {
    return open ? (
      <g>
        <rect x="7.5" y="7.2" width="2.2" height="1.3" rx="0.3" fill={RED} />
        <rect x="7.7" y="7.2" width="1.8" height="0.4" fill="#f4f4f4" />
      </g>
    ) : (
      <rect x="7.6" y="7.5" width="2.1" height="0.5" rx="0.2" fill={RED} />
    );
  }
  return <rect x="7.6" y="7.2" width="1.9" height={open ? 1.4 : 0.6} rx="0.3" fill={RED} />;
};

export const Face = ({ expr, open }) => (
  <g>
    {expr === "senang" && <circle cx="7.9" cy="6.1" r="0.9" fill="#ff8fb0" opacity="0.55" />}
    {expr === "marah" && <circle cx="7.4" cy="5.9" r="1.4" fill="#d63a4a" opacity="0.4" />}
    <Brow expr={expr} />
    <Eye expr={expr} />
    {expr === "sedih" && <ellipse cx="8.9" cy="5.9" rx="0.35" ry="0.6" fill="#73c6f9" />}
    <Mouth expr={expr} open={open} />
  </g>
);
