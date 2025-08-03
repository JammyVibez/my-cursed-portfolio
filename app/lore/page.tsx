"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, Zap, Code2, Rocket } from "lucide-react"
import Link from "next/link"

const loreChapters = [
  {
    title: "Childhood Arc: The Awakening",
    description:
      "Born with an unusual curiosity for technology, young Hamza discovered his first computer at age 15. Little did he know, this would awaken his dormant cursed energy.",
    power: 15,
    skills: ["Curiosity", "Problem Solving", "Gaming"],
    image: "/placeholder.svg?height=200&width=300&text=Childhood",
  },
  {
    title: "School Arc: First Techniques",
    description:
      "During his school years, Hamza began mastering basic programming languages. His teachers noticed his unusual ability to debug code that others couldn't understand.",
    power: 35,
    skills: ["HTML", "CSS", "JavaScript", "Python"],
    image: "/placeholder.svg?height=200&width=300&text=School",
  },
  // {
  //   title: "Developer Awakening: The Six Eyes",
  //   description:
  //     "At university, Hamza's true power awakened. He could see through any codebase instantly, understanding complex architectures that took others months to grasp.",
  //   power: 70,
  //   skills: ["React", "Node.js", "Databases", "System Design"],
  //   image: "/placeholder.svg?height=200&width=300&text=University",
  // },
  // {
  //   title: "Professional Arc: Domain Expansion",
  //   description:
  //     "Entering the professional world, Hamza learned to expand his domain. His projects became legendary, each one a manifestation of pure cursed energy.",
  //   power: 85,
  //   skills: ["Next.js", "Supabase", "Team Leadership", "Architecture"],
  //   image: "/placeholder.svg?height=200&width=300&text=Professional",
  // },
  // {
  //   title: "Startup Saga: King of Curses",
  //   description:
  //     "Now building his own anime-tech empire, Hamza has become a force to be reckoned with. His startup threatens to reshape the entire digital landscape.",
  //   power: 95,
  //   skills: ["Entrepreneurship", "Innovation", "Vision", "Leadership"],
  //   image: "/placeholder.svg?height=200&width=300&text=Startup",
  // },
  {
    title: "Future Quest: Infinite Possibilities",
    description:
      "The story continues... What new heights will Hamza reach? What impossible dreams will become reality? The adventure is just beginning.",
    power: 50,
    skills: ["???", "???", "???", "Limitless"],
    image: "/placeholder.svg?height=200&width=300&text=Future",
  },
]

export default function LorePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Manga-style background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_1px,_transparent_1px)] bg-[length:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button variant="outline" asChild className="border-primary/30 bg-transparent">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-orbitron">
              The Lore of Hamza
            </h1>
            <p className="text-muted-foreground mt-2">A Developer's Journey Through the Anime Multiverse</p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {loreChapters.map((chapter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex items-center gap-8 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}
            >
              {/* Chapter Card */}
              <div className="flex-1">
                <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-primary font-orbitron mb-2">
                          Chapter {index + 1}: {chapter.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-primary/20 text-primary">
                            <Zap className="w-3 h-3 mr-1" />
                            Power: {chapter.power}
                          </Badge>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(chapter.power / 20) ? "text-yellow-400 fill-current" : "text-gray-400"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">{chapter.description}</p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-accent">Techniques Learned:</h4>
                      <div className="flex flex-wrap gap-2">
                        {chapter.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="outline"
                            className="bg-accent/10 text-accent border-accent/30"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline Connector */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${
                    index === loreChapters.length - 1 ? "from-yellow-400 to-orange-400" : "from-primary to-accent"
                  } flex items-center justify-center shadow-lg`}
                >
                  {index === loreChapters.length - 1 ? (
                    <Rocket className="w-8 h-8 text-white" />
                  ) : (
                    <Code2 className="w-8 h-8 text-white" />
                  )}
                </div>
                {index < loreChapters.length - 1 && (
                  <div className="w-1 h-16 bg-gradient-to-b from-primary to-accent mt-2" />
                )}
              </div>

              {/* Chapter Image */}
              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-lg border-2 border-primary/30"
                >
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-4xl opacity-50">📖</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="font-bold text-white">Arc {index + 1}</h4>
                    <p className="text-sm text-white/80">Power Level: {chapter.power}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
            <CardContent className="p-0">
              <h3 className="text-3xl font-bold mb-4 text-primary font-orbitron">
                Want to be Part of the Next Chapter?
              </h3>
              <p className="text-muted-foreground mb-6 text-lg">
                The adventure continues, and I'm looking for fellow sorcerers to join the quest!
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/#contact">
                  <Zap className="w-5 h-5 mr-2" />
                  Join the Adventure
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
