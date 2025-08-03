"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Star, Clock, Eye } from "lucide-react"
import Image from "next/image"

const currentlyWatching = [
  {
    title: "Jujutsu Kaisen",
    status: "Caught Up",
    rating: 10,
    episode: "S2 Complete",
    genre: "Supernatural",
    favorite: true,
    image: "/placeholder.svg?height=120&width=80&text=JJK",
  },
  {
    title: "Demon Slayer",
    status: "Watching",
    rating: 9,
    episode: "S4 Ep 8",
    genre: "Action",
    favorite: true,
    image: "/placeholder.svg?height=120&width=80&text=DS",
  },
  {
    title: "Attack on Titan",
    status: "Completed",
    rating: 10,
    episode: "Final Season",
    genre: "Drama",
    favorite: true,
    image: "/placeholder.svg?height=120&width=80&text=AOT",
  },
  {
    title: "My Hero Academia",
    status: "Watching",
    rating: 8,
    episode: "S7 Ep 12",
    genre: "Superhero",
    favorite: false,
    image: "/placeholder.svg?height=120&width=80&text=MHA",
  },
]

const statusColors = {
  Watching: "bg-green-500/20 text-green-400 border-green-500/30",
  Completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Caught Up": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "On Hold": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
}

export function AnimeWatchlist() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="p-4 sm:p-6 bg-card/60 backdrop-blur-sm border-accent/30 hover:border-accent/50 transition-all duration-300 h-full">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center flex-shrink-0">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-accent font-orbitron">Anime Watchlist</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Currently consuming cursed content</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {currentlyWatching.slice(0, 4).map((anime, index) => (
              <motion.div
                key={anime.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-3 sm:p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-300 border border-accent/20 hover:border-accent/40">
                  <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-12 h-16 sm:w-16 sm:h-20 rounded overflow-hidden border border-accent/30 flex-shrink-0">
                      <Image
                        src={anime.image || "/placeholder.svg"}
                        alt={anime.title}
                        width={64}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground text-sm leading-tight truncate pr-2">
                          {anime.title}
                        </h4>
                        {anime.favorite && (
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current flex-shrink-0" />
                        )}
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${statusColors[anime.status as keyof typeof statusColors]}`}
                        >
                          {anime.status}
                        </Badge>

                        <div className="flex items-center gap-1 sm:gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{anime.episode}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-accent truncate">{anime.genre}</span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Eye className="w-3 h-3 text-primary" />
                            <span className="text-xs text-primary font-bold">{anime.rating}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 sm:mt-6 p-3 rounded-lg bg-accent/10 border border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-accent">Anime Influence</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-accent">Inspiration Source:</strong> Anime storytelling, character development,
              and world-building heavily influence my approach to UI/UX design and creative problem-solving in
              development.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
