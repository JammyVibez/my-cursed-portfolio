"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface CharacterImagesProps {
  theme: "gojo" | "sukuna"
  animeMode: boolean
}

export function CharacterImages({ theme, animeMode }: CharacterImagesProps) {
  return (
    <div className="character-images-container">
      {/* Gojo Image - Homepage Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{
          opacity: theme === "gojo" ? (animeMode ? 0.8 : 0.4) : 0.2,
          x: 0,
          scale: animeMode ? 1.1 : 1,
        }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="gojo-img fixed right-0 top-1/2 -translate-y-1/2 z-5 pointer-events-none hidden lg:block"
      >
        <div className="relative w-96 h-[600px]">
          <Image
            src="/images.jpg"
            alt="Gojo Satoru"
            fill
            className="object-cover mix-blend-screen opacity-70 blur-sm hover:blur-none transition-all duration-500"
            style={{ filter: "hue-rotate(200deg) saturate(1.2)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-500/10 to-blue-500/20" />
        </div>
      </motion.div>

      {/* Sukuna Image - Bottom Left */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{
          opacity: theme === "sukuna" ? (animeMode ? 0.8 : 0.4) : 0.2,
          x: 0,
          scale: animeMode ? 1.1 : 1,
        }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="sukuna-img fixed left-0 bottom-0 z-5 pointer-events-none hidden lg:block"
      >
        <div className="relative w-80 h-96">
          <Image
            src="sakuna.jpg"
            alt="Ryomen Sukuna"
            fill
            className="object-cover mix-blend-screen opacity-60 blur-sm hover:blur-none transition-all duration-500"
            style={{ filter: "hue-rotate(0deg) saturate(1.5) contrast(1.2)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-red-500/20" />
        </div>
      </motion.div>
    </div>
  )
}
