"use client";

// Pre-calculate light positions (deterministic based on index)
const LIGHT_COUNT = 50;
const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];

function generateLightPositions() {
  return Array.from({ length: LIGHT_COUNT }, (_, i) => {
    const x = (i / (LIGHT_COUNT - 1)) * 100;
    const y = 32 + Math.sin(i * 0.3) * 8;
    const color = colors[i % colors.length];
    // Stagger animation delays for natural blinking effect
    const delay = (i * 0.1) % 2; // Delay between 0-2 seconds
    return { x, y, color, delay };
  });
}

const lightPositions = generateLightPositions();

// Generate wire path
function generateWirePath() {
  return `M 0,32 ${lightPositions.map((pos) => `L ${pos.x}%,${pos.y}`).join(" ")}`;
}

export default function FairyLights() {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 z-40 pointer-events-none overflow-hidden">
      <div className="relative w-full h-full">
        {/* Wire */}
        <svg className="absolute top-0 left-0 w-full h-full" style={{ height: "64px" }}>
          <path
            d={generateWirePath()}
            stroke="#d4a574"
            strokeWidth="2"
            fill="none"
            className="drop-shadow-sm"
          />
        </svg>

        {/* Lights */}
        {lightPositions.map((light, i) => (
          <div
            key={i}
            className="fairy-light absolute"
            style={{
              left: `${light.x}%`,
              top: `${light.y}px`,
              animationDelay: `${light.delay}s`,
            }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: light.color,
                boxShadow: `0 0 8px ${light.color}, 0 0 12px ${light.color}, 0 0 16px ${light.color}`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
