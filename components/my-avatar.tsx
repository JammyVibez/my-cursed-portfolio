"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface MyAvatarProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showGlow?: boolean
}

export function MyAvatar({ size = "lg", className = "", showGlow = true }: MyAvatarProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} className={`my-avatar relative ${sizeClasses[size]} ${className}`}>
      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl">
        <Image
          src="gojo.jpg"
          alt="Hamza - Cursed Energy Developer"
          fill
          className="object-cover"
        />
        {showGlow && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse" />
        )}
      </div>

      {showGlow && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-xl -z-10 animate-pulse" />
      )}
    </motion.div>
  )
}
