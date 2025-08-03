"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Code2, Zap, Rocket, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ParticlesBackground } from "@/components/particles-background"
import { AnimeThemeToggle } from "@/components/anime-theme-toggle"
import { CharacterSilhouettes } from "@/components/character-silhouettes"
import { CharacterImages } from "@/components/character-images"
import { MyAvatar } from "@/components/my-avatar"
import { AnimeQuotes } from "@/components/anime-quotes"
import { AnimeLoadingScreen } from "@/components/anime-loading-screen"
import { AnimeCharacterStats } from "@/components/anime-character-stats"
import { AnimeBattleCard } from "@/components/anime-battle-card"
import { ContactForm } from "@/components/contact-form"
import { DomainExpansion } from "@/components/domain-expansion"
import { ScrollPowerUp } from "@/components/scroll-power-up"
import { TalkingAvatar } from "@/components/talking-avatar"
import { AnimeOpening } from "@/components/anime-opening"
import { CursorEffects } from "@/components/cursor-effects"
import { KonamiCode } from "@/components/konami-code"
import { SummoningButton } from "@/components/summoning-button"
import { FloatingElements } from "@/components/floating-elements"
import { GamingInterests } from "@/components/gaming-interests"
import { AnimeWatchlist } from "@/components/anime-watchlist"

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Supabase",
  "MySQL",
  "TailwindCSS",
  "Three.js",
  "Framer Motion",
  "Python",
]

const projects = [
  {
    id: 1,
    title: "Anime Streaming Platform",
    description: "Full-stack streaming platform with real-time chat, AI recommendations, and cursed energy tracking",
    tech: ["Next.js", "Supabase", "WebRTC", "AI"],
    image: "/placeholder.svg?height=300&width=400&text=Anime+Streaming",
    link: "#",
    type: "web" as const,
    power: 95,
    rarity: "legendary" as const,
  },
  {
    id: 2,
    title: "Domain Expansion: Code Realm",
    description: "3D visualization tool for tracking and analyzing code complexity with cursed energy patterns",
    tech: ["Three.js", "React", "WebGL", "D3.js"],
    image: "/placeholder.svg?height=300&width=400&text=3D+Code+Realm",
    link: "#",
    type: "3d" as const,
    power: 88,
    rarity: "epic" as const,
  },
  {
    id: 3,
    title: "Sukuna's Analytics Shrine",
    description: "Real-time analytics dashboard with malevolent data processing and cursed technique monitoring",
    tech: ["React", "Supabase", "Charts.js", "TypeScript"],
    image: "/placeholder.svg?height=300&width=400&text=Analytics+Dashboard",
    link: "#",
    type: "dashboard" as const,
    power: 92,
    rarity: "epic" as const,
  },
  {
    id: 4,
    title: "Gojo's Infinite Scroll",
    description: "Mobile app with limitless content discovery and six-eyes recommendation algorithm",
    tech: ["React Native", "Expo", "Supabase"],
    image: "/placeholder.svg?height=300&width=400&text=Mobile+App",
    link: "#",
    type: "mobile" as const,
    power: 85,
    rarity: "rare" as const,
  },
]

const certifications = [
  { name: "Schoolvile Graduate", logo: "/placeholder.svg?height=60&width=60&text=School" },
  { name: "3MTT Program", logo: "/placeholder.svg?height=60&width=60&text=3MTT" },
  { name: "Full Stack Sorcerer", logo: "/placeholder.svg?height=60&width=60&text=FS" },
  { name: "Cursed Technique Master", logo: "/placeholder.svg?height=60&width=60&text=CTM" },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<"gojo" | "sukuna">("gojo")
  const [animeMode, setAnimeMode] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [showOpening, setShowOpening] = useState(false)
  const [cursorEffects, setCursorEffects] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user has seen opening before
    const hasSeenOpening = localStorage.getItem("hasSeenOpening")
    if (!hasSeenOpening) {
      setShowOpening(true)
    }
  }, [])

  const handleOpeningComplete = () => {
    setShowOpening(false)
    localStorage.setItem("hasSeenOpening", "true")
  }

  const handleAnimeModeChange = (enabled: boolean) => {
    setAnimeMode(enabled)
    setCursorEffects(enabled)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {showOpening && <AnimeOpening onComplete={handleOpeningComplete} />}

      <AnimeLoadingScreen theme={theme} soundEnabled={soundEnabled} />

      <ParticlesBackground theme={theme} animeMode={animeMode} />
      <FloatingElements theme={theme} animeMode={animeMode} />
      <CharacterImages theme={theme} animeMode={animeMode} />
      <CursorEffects theme={theme} enabled={cursorEffects} />
      <KonamiCode />

      <ScrollPowerUp />
      <AnimeThemeToggle
        onThemeChange={setTheme}
        onAnimeModeChange={handleAnimeModeChange}
        onSoundChange={setSoundEnabled}
      />
      <TalkingAvatar soundEnabled={soundEnabled} />
      <AnimeQuotes />
      <DomainExpansion theme={theme} soundEnabled={soundEnabled} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        <CharacterSilhouettes theme={theme} animeMode={animeMode} />

        <div className="relative z-20 text-center max-w-6xl mx-auto px-4">
          {/* My Avatar - Hero Section - Fixed positioning */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="mb-8 mt-8"
          >
            <MyAvatar size="xl" className="mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-orbitron leading-tight">
              I Code with
            </h1>
            <motion.h2
              animate={{
                textShadow: animeMode
                  ? [
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                      "0 0 40px rgba(147, 51, 234, 0.5)",
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                    ]
                  : "none",
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent font-orbitron"
            >
              Cursed Energy
            </motion.h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4"
          >
            {theme === "gojo"
              ? "Fullstack Sorcerer wielding the Six Eyes of Development • Building infinite possibilities with limitless code"
              : "King of Curses in the Digital Realm • Manifesting malevolent applications that dominate the web"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 px-4"
          >
            <SummoningButton
              size="lg"
              className={`px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-semibold transition-all duration-300 ${
                animeMode ? "animate-pulse shadow-lg shadow-primary/50" : ""
              }`}
            >
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              {theme === "gojo" ? "Expand Domain" : "Unleash Malevolence"}
            </SummoningButton>
            <SummoningButton
              size="lg"
              variant="outline"
              className="border-2 border-accent text-accent hover:bg-accent/10 px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg bg-transparent backdrop-blur-sm"
              href="#contact"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              Summon Developer
            </SummoningButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className={animeMode ? "animate-bounce" : ""}
          >
            <ArrowDown className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-primary" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 bg-muted/10 relative" id="about">
        {/* Gojo Image - About Page - Hidden on mobile */}
        <div className="absolute top-8 right-8 hidden xl:block">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 0.3, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="gojo-img w-48 h-64 relative"
          >
            <Image
              src="/gojo 2.jpg"
              alt="Gojo Satoru"
              fill
              className="object-cover mix-blend-screen opacity-30 blur-sm"
            />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-orbitron">
              Character Profile
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
              {theme === "gojo"
                ? "Born with the rare Six Eyes technique, I see through code like no other developer. My Limitless ability allows me to manipulate any programming language with infinite precision."
                : "The King of Curses in the development world. With four arms, I can code faster than any mortal developer. My malevolent shrine processes data with terrifying efficiency."}
            </p>
          </motion.div>

          {/* Responsive grid - stacks on mobile, 2 cols on tablet, 4 cols on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-12">
            <div className="md:col-span-2 xl:col-span-1">
              <AnimeCharacterStats />
            </div>

            <div className="md:col-span-2 xl:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 lg:p-8 bg-card/60 backdrop-blur-sm border-accent/30 hover:border-accent/50 transition-all duration-300 h-full">
                  <CardContent className="p-0">
                    <Code2 className="w-10 h-10 lg:w-12 lg:h-12 mb-4 lg:mb-6 text-accent" />
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-accent font-orbitron">
                      Cursed Techniques
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-primary/15 text-primary border-primary/30 hover:bg-primary/25 transition-colors cursor-pointer text-xs sm:text-sm"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="md:col-span-1 xl:col-span-1">
              <GamingInterests />
            </div>

            <div className="md:col-span-1 xl:col-span-1">
              <AnimeWatchlist />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 lg:mt-12"
          >
            <Card className="p-6 lg:p-8 bg-card/60 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                  <MyAvatar size="md" showGlow={false} className="mx-auto sm:mx-0" />
                  <div className="text-center sm:text-left">
                    <Rocket className="w-6 h-6 lg:w-8 lg:h-8 mb-2 text-primary mx-auto sm:mx-0" />
                    <h3 className="text-xl lg:text-2xl font-bold text-primary font-orbitron">Origin Story</h3>
                  </div>
                </div>
                <div className="space-y-2 lg:space-y-3 text-muted-foreground text-sm sm:text-base">
                  <p>• 3+ Years mastering cursed techniques</p>
                  <p>• Graduated from Jujutsu Tech (3MTT Program)</p>
                  <p>• Former Marketing Sorcerer turned Developer</p>
                  <p>• Currently building my own Digital Domain</p>
                  <p>• Mission: Bridge anime culture with tech innovation</p>
                  <p>• Gaming across multiple realms: Valorant, Roblox, Fortnite, Marvel games</p>
                  <p>• Anime enthusiast keeping up with JJK, Demon Slayer, One Piece & more</p>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 hover:border-primary/50 bg-transparent w-full sm:w-auto"
                    onClick={() => (window.location.href = "/lore")}
                  >
                    📖 Read Full Lore
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 relative" id="projects">
        {/* Sukuna Image - Projects Background - Hidden on mobile */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:block">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 0.2, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="sukuna-img w-64 h-80 relative"
          >
            <Image
              src="/placeholder.svg?height=320&width=256&text=Sukuna+Projects"
              alt="Ryomen Sukuna"
              fill
              className="object-cover mix-blend-screen opacity-20 blur-sm"
            />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-orbitron">
              Battle Arena
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-4">
              Each project enters the arena as a legendary fighter card, forged through countless hours of coding
              battles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <AnimeBattleCard key={project.id} project={project} index={index} animeMode={animeMode} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-8 lg:mt-12"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-accent/50 text-accent hover:bg-accent/10 bg-transparent w-full sm:w-auto"
              onClick={() => (window.location.href = "/game")}
            >
              🎮 Play Mini Game
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Startup Vision Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 bg-muted/10" id="company">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-orbitron">
              {theme === "gojo" ? "Infinite Domain" : "Malevolent Shrine"}
            </h2>
            <Card className="p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-primary/10 via-card/60 to-accent/10 border-2 border-primary/30 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 animate-pulse" />
              <CardContent className="p-0 relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-6 sm:mb-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Rocket className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-primary font-orbitron">
                  {theme === "gojo" ? "Building Infinite Possibilities" : "Conquering the Digital Realm"}
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto">
                  {theme === "gojo"
                    ? "My startup harnesses the power of the Six Eyes to see market opportunities others cannot. We're creating a limitless platform that connects anime culture with cutting-edge technology, making the impossible possible."
                    : "As the King of Curses in tech, my company dominates through superior cursed techniques. We build applications so powerful, they reshape entire industries. Our malevolent shrine processes data with terrifying efficiency."}
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                  <Badge
                    variant="outline"
                    className="text-primary border-primary/50 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg"
                  >
                    {theme === "gojo" ? "Infinite Innovation" : "Malevolent Efficiency"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-accent border-accent/50 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg"
                  >
                    Anime Culture
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-primary border-primary/50 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg"
                  >
                    Global Domination
                  </Badge>
                </div>
                <SummoningButton
                  size="lg"
                  className="px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold w-full sm:w-auto"
                >
                  {theme === "gojo" ? "Enter My Domain" : "Bow to the King"}
                </SummoningButton>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4" id="credentials">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-orbitron">
              Cursed Artifacts
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 lg:p-8 bg-card/60 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-primary font-orbitron">
                    Sacred Scroll
                  </h3>
                  <p className="text-muted-foreground mb-4 lg:mb-6 text-base lg:text-lg">
                    Download my complete developer resume containing all my cursed techniques, battle experience, and
                    conquered domains.
                  </p>
                  <SummoningButton className="w-full bg-primary hover:bg-primary/90 py-3 lg:py-4 text-base lg:text-lg">
                    <Download className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3" />
                    Obtain Sacred Scroll
                  </SummoningButton>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 lg:p-8 bg-card/60 backdrop-blur-sm border-accent/30 hover:border-accent/50 transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-accent font-orbitron">
                    Certification Talismans
                  </h3>
                  <div className="space-y-3 lg:space-y-4">
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                          <Image
                            src={cert.logo || "/placeholder.svg"}
                            alt={cert.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium text-base lg:text-lg">{cert.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 bg-muted/10" id="contact">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-orbitron">
              {theme === "gojo" ? "Form a Binding Vow" : "Summon the King"}
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground px-4">
              {theme === "gojo"
                ? "Ready to create something limitless together? Let's expand our domains and build the impossible."
                : "Dare to contact the King of Curses? Prepare your offering and state your business, mortal."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 lg:space-y-8"
            >
              <Card className="p-6 lg:p-8 bg-card/60 backdrop-blur-sm border-primary/30">
                <CardContent className="p-0">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-primary font-orbitron">
                    Contact Channels
                  </h3>
                  <div className="space-y-4 lg:space-y-6">
                    {[
                      {
                        icon: Mail,
                        label: "Email Technique",
                        value: "jammyvibez479@gmail.com",
                        href: "mailto:jammyvibez479@gmail.com",
                      },
                      {
                        icon: Github,
                        label: "Code Repository",
                        value: "@JammyVibez",
                        href: "https://github.com/JammyVibez",
                      },
                      {
                        icon: Linkedin,
                        label: "Professional Network",
                        value: "Connect with Hamza",
                        href: "https://linkedin.com/in/hamza-cursed-dev",
                      },
                    ].map((contact, index) => (
                      <Link
                        key={index}
                        href={contact.href}
                        className="flex items-center text-muted-foreground hover:text-primary transition-colors group"
                      >
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4 lg:mr-6 group-hover:bg-primary/30 transition-colors flex-shrink-0">
                          <contact.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-base lg:text-lg">{contact.label}</p>
                          <p className="text-sm">{contact.value}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
