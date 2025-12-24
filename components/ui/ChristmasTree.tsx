"use client";

import XmasTree from "react-xmas-tree/react";

export default function ChristmasTree() {
  return (
    <div className="fixed bottom-4 left-4 z-40 pointer-events-none">
      <XmasTree
        position={{
          position: "relative",
        }}
        containerClass="scale-75"
        lightColors={["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"]}
        starColor="#fbbf24"
      />
    </div>
  );
}

