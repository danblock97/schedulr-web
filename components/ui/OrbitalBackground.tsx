'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface OrbitalItem {
  id: number;
  radius: number;
  speed: number;
  angle: number;
  size: number;
  color: string;
}

export function OrbitalBackground() {
  const [items, setItems] = useState<OrbitalItem[]>([]);

  useEffect(() => {
    const generateItems = () => {
      const newItems: OrbitalItem[] = [];
      const colors = [
        'rgba(250, 74, 140, 0.2)',
        'rgba(148, 90, 224, 0.2)',
        'rgba(69, 161, 250, 0.12)',
        'rgba(46, 205, 168, 0.12)',
      ];

      // Reduced from 8 to 5 for better performance
      for (let i = 0; i < 5; i++) {
        newItems.push({
          id: i,
          radius: 150 + Math.random() * 200,
          speed: 0.5 + Math.random() * 0.5,
          angle: Math.random() * 360,
          size: 100 + Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setItems(newItems);
    };

    generateItems();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute top-1/2 left-1/2"
          style={{
            width: item.radius * 2 + item.size,
            height: item.radius * 2 + item.size,
            transform: `translate(-50%, -50%) rotate(${item.angle}deg)`,
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
          animate={{
            rotate: item.angle + 360,
          }}
          transition={{
            duration: 20 / item.speed,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div
            className="absolute"
            style={{
              left: `${item.radius}px`,
              top: '50%',
              width: item.size,
              height: item.size,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle, ${item.color} 0%, transparent 80%)`,
                filter: 'blur(25px)',
                willChange: 'transform',
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

