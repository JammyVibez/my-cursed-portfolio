"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Sukuna laughing */}
          <div className="mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-8xl mb-4"
            >
              👹
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="text-6xl font-bold text-red-400 font-orbitron mb-2"
            >
              404
            </motion.div>
            <h1 className="text-3xl font-bold text-primary mb-4">Domain Not Found</h1>
          </div>
        </motion.div>

        <Card className="bg-card/60 backdrop-blur-sm border-primary/30 mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-8 mb-6">
              {/* Sukuna */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-center"
              >
                <div className="text-4xl mb-2">👹</div>
                <p className="text-red-400 font-bold">"HAHAHA! You got lost!"</p>
              </motion.div>

              {/* VS */}
              <div className="text-2xl font-bold text-accent">VS</div>

              {/* Gojo */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">👁️</div>
                <p className="text-blue-400 font-bold">"Looks like you got lost in the void..."</p>
              </motion.div>
            </div>

            <p className="text-muted-foreground mb-6 text-lg">
              The page you're looking for has been consumed by cursed energy. Even my Six Eyes can't locate it!
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Return to Domain
                </Link>
              </Button>
              <Button variant="outline" onClick={() => window.history.back()} className="border-accent/50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-sm text-muted-foreground"
        >
          "In the world of infinite possibilities, even 404s can be legendary..."
        </motion.p>
      </div>
    </div>
  )
}
