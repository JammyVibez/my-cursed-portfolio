"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Code2, Zap, Brain, Rocket, Star } from "lucide-react"

const stats = [
  { name: "Frontend Development", level: 95, icon: Code2 },
  { name: "Backend Development", level: 50, icon: Zap },
  { name: "Problem Solving", level: 92, icon: Brain },
  { name: "Innovation", level: 96, icon: Rocket },
  { name: "Anime Knowledge", level: 100, icon: Star },
]

export function AnimeCharacterStats() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary font-orbitron">Character Stats</h3>
              <p className="text-sm text-muted-foreground">Level 99 Developer</p>
            </div>
          </div>

          <div className="space-y-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{stat.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                    {stat.level}%
                  </Badge>
                </div>
                <Progress value={stat.level} className="h-2 bg-muted/30" />
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Special Ability</span>
            </div>
            <p className="text-xs text-muted-foreground">
              <strong className="text-primary">Domain Expansion: Infinite Code</strong> - Can debug any code within a
              200-meter radius instantly
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
