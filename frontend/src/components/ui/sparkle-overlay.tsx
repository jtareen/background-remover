import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface SparkleOverlayProps {
  isVisible: boolean;
  zIndex?: number;
  sparkleCount?: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const generateSparkles = (count: number): Sparkle[] => {
  return Array.from({ length: count }).map((_, index) => ({
    id: index,
    x: Math.random() * 100, // percentage
    y: Math.random() * 100, // percentage
    size: 4 + Math.random() * 4, // 4px to 8px
    delay: Math.random() * 5, // seconds
  }));
};

const SparkleOverlay: React.FC<SparkleOverlayProps> = ({ isVisible, zIndex = 50, sparkleCount = 30 }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    setSparkles(generateSparkles(sparkleCount));
  }, [sparkleCount]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex }}
    >
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: 'easeInOut'
          }}
          className={twMerge(
            `absolute rounded-full`,
            `bg-yellow-300 opacity-80`,
            `shadow-[0_0_6px_2px_rgba(255,223,100,0.7)]`
          )}
          style={{
            width: sparkle.size,
            height: sparkle.size,
            top: `${sparkle.y}%`,
            left: `${sparkle.x}%`,
          }}
        />
      ))}
    </div>
  );
};

export default SparkleOverlay;