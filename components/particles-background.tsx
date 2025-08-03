"use client"

import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"

interface ParticlesBackgroundProps {
  theme: "gojo" | "sukuna"
  animeMode: boolean
}

export function ParticlesBackground({ theme, animeMode }: ParticlesBackgroundProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Particles loaded callback
  }, [])

  const gojoConfig = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ["#3b82f6", "#8b5cf6", "#06b6d4"],
      },
      links: {
        color: "#3b82f6",
        distance: 150,
        enable: animeMode,
        opacity: 0.3,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: animeMode ? 3 : 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: animeMode ? 120 : 60,
      },
      opacity: {
        value: 0.5,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
        },
      },
      shape: {
        type: ["circle", "triangle"],
      },
      size: {
        value: { min: 1, max: 5 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
        },
      },
    },
    detectRetina: true,
  }

  const sukunaConfig = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 6,
        },
        grab: {
          distance: 150,
          links: {
            opacity: 0.8,
          },
        },
      },
    },
    particles: {
      color: {
        value: ["#ef4444", "#dc2626", "#b91c1c", "#991b1b"],
      },
      links: {
        color: "#ef4444",
        distance: 100,
        enable: animeMode,
        opacity: 0.4,
        width: 2,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out",
        },
        random: true,
        speed: animeMode ? 4 : 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 600,
        },
        value: animeMode ? 100 : 50,
      },
      opacity: {
        value: 0.6,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.2,
        },
      },
      shape: {
        type: ["polygon", "star"],
        polygon: {
          sides: 6,
        },
        star: {
          sides: 4,
        },
      },
      size: {
        value: { min: 2, max: 8 },
        animation: {
          enable: true,
          speed: 3,
          minimumValue: 0.5,
        },
      },
    },
    detectRetina: true,
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={theme === "gojo" ? gojoConfig : sukunaConfig}
      className="absolute inset-0 z-0"
    />
  )
}
