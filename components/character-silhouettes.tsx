"use client"

import { motion } from "framer-motion"

interface CharacterSilhouettesProps {
  theme: "gojo" | "sukuna"
  animeMode: boolean
}

export function CharacterSilhouettes({ theme, animeMode }: CharacterSilhouettesProps) {
  return (
    <div className="character-silhouettes-container">
      {/* Gojo Silhouette */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{
          opacity: theme === "gojo" ? (animeMode ? 0.3 : 0.15) : 0.05,
          x: 0,
          scale: animeMode ? 1.1 : 1,
        }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      >
        <div className="w-64 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl" />
      </motion.div>

      {/* Sukuna Silhouette */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{
          opacity: theme === "sukuna" ? (animeMode ? 0.3 : 0.15) : 0.05,
          x: 0,
          scale: animeMode ? 1.1 : 1,
        }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      >
        <div className="w-64 h-96 bg-gradient-to-l from-red-500/30 to-orange-500/30 rounded-full blur-3xl" />
      </motion.div>

      {/* Floating Orbs */}
      {animeMode && (
        <div className="floating-orbs-container">
          <motion.div
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute left-1/4 top-1/4 w-4 h-4 rounded-full bg-primary/60 blur-sm"
          />
          <motion.div
            animate={{
              y: [20, -20, 20],
              x: [10, -10, 10],
              rotate: [360, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute right-1/4 top-3/4 w-6 h-6 rounded-full bg-accent/60 blur-sm"
          />
        </div>
      )}
    </div>
  )
}
