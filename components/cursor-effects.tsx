"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CursorEffectsProps {
  theme: "gojo" | "sukuna"
  enabled: boolean
}

export function CursorEffects({ theme, enabled }: CursorEffectsProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Add trail point
      const newTrail = { x: e.clientX, y: e.clientY, id: Date.now() }
      setTrails((prev) => [...prev.slice(-10), newTrail])
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="cursor-effects-container fixed inset-0 pointer-events-none z-[100]">
      {/* Main Cursor */}
      <motion.div
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className={`absolute w-6 h-6 rounded-full border-2 ${
          theme === "gojo" ? "border-blue-400 bg-blue-400/20" : "border-red-400 bg-red-400/20"
        }`}
      >
        {/* Eye in center */}
        <div
          className={`absolute inset-0 flex items-center justify-center text-xs ${
            theme === "gojo" ? "text-blue-400" : "text-red-400"
          }`}
        >
          👁️
        </div>
      </motion.div>

      {/* Aura Trails */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 1 }}
          className={`absolute w-3 h-3 rounded-full ${theme === "gojo" ? "bg-blue-400/40" : "bg-red-400/40"}`}
          style={{
            left: trail.x - 6,
            top: trail.y - 6,
          }}
        />
      ))}
    </div>
  )
}
