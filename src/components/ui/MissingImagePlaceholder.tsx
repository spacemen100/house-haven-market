import React from 'react';

interface MissingImagePlaceholderProps {
  className?: string;
}

const MissingImagePlaceholder: React.FC<MissingImagePlaceholderProps> = ({ className }) => {
  // Using a more common font stack that's likely to support Georgian and emojis
  const georgianFontFamily = "'Inter', 'Arial', sans-serif";

  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="placeholderTitle"
      // Preserving aspect ratio and ensuring the SVG scales nicely
      preserveAspectRatio="xMidYMid meet" 
    >
      <title id="placeholderTitle">Placeholder for missing property image</title>
      {/* Using a light gray fill, similar to bg-gray-200 */}
      <rect width="100%" height="100%" fill="#E5E7EB" /> 
      
      {/* Text element for the first line */}
      <text
        x="50%"
        y="45%" // Adjusted y for the first line
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily={georgianFontFamily}
        fontSize="20" // Base font size
        fill="#374151" // Dark gray text, similar to text-gray-700
      >
        უძრავი ქონების სურათი
      </text>
      
      {/* Text element for the second line with emoji */}
      <text
        x="50%"
        y="58%" // Adjusted y for the second line, with emoji
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily={georgianFontFamily}
        fontSize="20" // Base font size
        fill="#374151" // Dark gray text
      >
        მიუწვდომელია 🏠
      </text>
    </svg>
  );
};

export default MissingImagePlaceholder;
