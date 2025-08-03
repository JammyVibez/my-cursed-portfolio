"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Trophy, Target } from "lucide-react"

const games = [
  {
    name: "Valorant",
    rank: "Diamond",
    mainAgent: "Jett",
    hours: "500+",
    icon: "🎯",
    color: "from-red-500 to-orange-500",
  },
  {
    name: "Roblox",
    rank: "Builder",
    mainAgent: "Creator",
    hours: "300+",
    icon: "🧱",
    color: "from-blue-500 to-green-500",
  },
  {
    name: "Fortnite",
    rank: "Victory Royale",
    mainAgent: "Builder",
    hours: "200+",
    icon: "🏆",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Marvel Games",
    rank: "Hero",
    mainAgent: "Spider-Man",
    hours: "150+",
    icon: "🕷️",
    color: "from-red-600 to-blue-600",
  },
  {
    name: "Minecraft",
    rank: "Architect",
    mainAgent: "Redstone Engineer",
    hours: "400+",
    icon: "⛏️",
    color: "from-green-600 to-brown-600",
  },
  {
    name: "Apex Legends",
    rank: "Predator",
    mainAgent: "Wraith",
    hours: "250+",
    icon: "🔫",
    color: "from-orange-500 to-red-500",
  },
]

export function GamingInterests() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="p-4 sm:p-6 bg-card/60 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 h-full">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
              <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-primary font-orbitron">Gaming Arsenal</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Battle-tested across multiple realms</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {games.slice(0, 4).map((game, index) => (
              <motion.div
                key={game.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-3 sm:p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-300 border border-primary/20 hover:border-primary/40">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${game.color} flex items-center justify-center text-sm sm:text-lg flex-shrink-0`}
                      >
                        {game.icon}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-foreground text-sm sm:text-base truncate">{game.name}</h4>
                        <p className="text-xs text-muted-foreground">{game.hours} played</p>
                      </div>
                    </div>
                    <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Rank:</span>
                      <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                        {game.rank}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Main:</span>
                      <span className="text-xs text-primary font-medium truncate max-w-[100px]">{game.mainAgent}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 sm:mt-6 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-primary">Gaming Philosophy</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-primary">Strategic Mindset:</strong> Every game teaches problem-solving, teamwork,
              and quick decision-making - skills that translate perfectly to development challenges.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
