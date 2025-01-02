import React from "react";
import { IconType } from ".";

const IconCorner: IconType = ({ size = 24, ...props }) => {
  return (
    <svg
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
    >
      <path d="M15 .5A2.5 2.5 0 0 0 12.5 3v9.5H3a2.5 2.5 0 0 0 0 5h12a2.5 2.5 0 0 0 2.5-2.5V3A2.5 2.5 0 0 0 15 .5z" />
    </svg>
  );
};

export default IconCorner;
