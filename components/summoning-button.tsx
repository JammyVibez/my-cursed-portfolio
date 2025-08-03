"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface SummoningButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  size?: "sm" | "default" | "lg"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  href?: string
  [key: string]: any
}

export function SummoningButton({
  children,
  onClick,
  className = "",
  size = "default",
  variant = "default",
  href,
  ...props
}: SummoningButtonProps) {
  const [isActivating, setIsActivating] = useState(false)

  const handleClick = () => {
    setIsActivating(true)

    setTimeout(() => {
      setIsActivating(false)
      if (href) {
        window.location.href = href
      } else {
        onClick?.()
      }
    }, 1500)
  }

  return (
    <div className="summoning-button-container relative">
      {/* Summoning Circle */}
      {isActivating && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: 1, scale: 1.5, rotate: 360 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 -m-8 pointer-events-none"
        >
          <div className="w-full h-full border-2 border-primary/60 rounded-full relative">
            {/* Runes around circle */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 text-primary/80 text-xs flex items-center justify-center"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-40px)`,
                }}
              >
                ⚡
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Button */}
      <motion.div
        animate={
          isActivating
            ? {
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 0 rgba(59, 130, 246, 0)",
                ],
              }
            : {}
        }
        transition={{ duration: 1.5 }}
      >
        <Button
          onClick={handleClick}
          disabled={isActivating}
          className={`relative overflow-hidden ${className}`}
          size={size}
          variant={variant}
          {...props}
        >
          {isActivating && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          )}
          {children}
        </Button>
      </motion.div>
    </div>
  )
}
