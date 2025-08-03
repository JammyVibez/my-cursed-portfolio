"use client"

import { motion } from "framer-motion"

interface FloatingElementsProps {
  theme: "gojo" | "sukuna"
  animeMode: boolean
}

export function FloatingElements({ theme, animeMode }: FloatingElementsProps) {
  if (!animeMode) return null

  const elements = theme === "gojo" ? ["❄️", "✨", "💙", "🔵", "⭐"] : ["🔥", "💀", "❤️", "🔴", "⚡"]

  return (
    <div className="floating-elements-container fixed inset-0 pointer-events-none z-10">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            x: [0, 10, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        >
          {elements[Math.floor(Math.random() * elements.length)]}
        </motion.div>
      ))}
    </div>
  )
}
