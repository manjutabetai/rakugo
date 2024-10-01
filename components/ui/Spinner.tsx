// components/ui/Spinner.tsx
import React from "react";

// シンプルなスピナーコンポーネントを作成
export const Spinner: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500 ${className}`}
    />
  );
};
