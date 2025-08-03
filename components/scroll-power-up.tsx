"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Zap, Star } from "lucide-react"

export function ScrollPowerUp() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showPowerUp, setShowPowerUp] = useState(false)
  const [xpLevel, setXpLevel] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)

      // Trigger power-up animation at certain scroll points
      const newLevel = Math.floor(progress / 20) + 1
      if (newLevel > xpLevel && newLevel <= 5) {
        setXpLevel(newLevel)
        setShowPowerUp(true)
        setTimeout(() => setShowPowerUp(false), 2000)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [xpLevel])

  return (
    <>
      {/* XP Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-primary/20">
        <div className="flex items-center gap-4 px-4 py-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Level {xpLevel}</span>
          </div>
          <div className="flex-1">
            <Progress value={scrollProgress} className="h-2" />
          </div>
          <div className="text-xs text-muted-foreground">{Math.round(scrollProgress)}% Complete</div>
        </div>
      </div>

      {/* Power-Up Animation */}
      <AnimatePresence>
        {showPowerUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          >
            {/* Screen Glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-primary/20"
            />

            {/* Particle Burst */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                }}
                transition={{ duration: 1, delay: Math.random() * 0.5 }}
              />
            ))}

            {/* Level Up Text */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-8 h-8 text-yellow-400" />
                <span className="text-4xl font-bold text-primary font-orbitron">LEVEL UP!</span>
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
              <p className="text-xl text-accent">Power Level: {xpLevel * 20}%</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
