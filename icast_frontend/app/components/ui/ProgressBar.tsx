// components/ui/ProgressBar.tsx

import React from "react";
import classNames from "classnames"; // Optional: Import if using conditional styling with classNames package

type ProgressBarProps = {
  value: number; // Represents progress percentage
  className?: string; // Optional for additional styling
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value, className }) => {
  // Ensure the value is within 0 to 100
  const progress = Math.min(Math.max(value, 0), 100);

  return (
    <div className={classNames("w-full h-4 bg-gray-300 rounded-md overflow-hidden", className)}>
      <div
        className="h-full bg-blue-500 transition-width duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
