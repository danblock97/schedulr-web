"use client";

import { useEffect, useState } from "react";

export default function FairyLights() {
  const [lights, setLights] = useState<boolean[]>([]);

  useEffect(() => {
    // Create array of 50 lights
    const initialLights = Array.from({ length: 50 }, () => Math.random() > 0.5);
    setLights(initialLights);

    // Animate lights with random blinking
    const interval = setInterval(() => {
      setLights((prev) => prev.map(() => Math.random() > 0.3));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-16 z-40 pointer-events-none overflow-hidden">
      <div className="relative w-full h-full">
        {/* Wire */}
        <svg className="absolute top-0 left-0 w-full h-full" style={{ height: "64px" }}>
          <path
            d={`M 0,32 ${Array.from({ length: 50 }, (_, i) => {
              const x = (i / 49) * 100;
              const y = 32 + Math.sin(i * 0.3) * 8;
              return `L ${x}%,${y}`;
            }).join(" ")}`}
            stroke="#d4a574"
            strokeWidth="2"
            fill="none"
            className="drop-shadow-sm"
          />
        </svg>

        {/* Lights */}
        {lights.map((isOn, i) => {
          const x = (i / 49) * 100;
          const y = 32 + Math.sin(i * 0.3) * 8;
          const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];
          const color = colors[i % colors.length];

          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isOn ? "opacity-100" : "opacity-30"
                }`}
                style={{
                  backgroundColor: color,
                  boxShadow: isOn
                    ? `0 0 8px ${color}, 0 0 12px ${color}, 0 0 16px ${color}`
                    : "none",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

