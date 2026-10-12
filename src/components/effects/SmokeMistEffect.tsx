import React, { useEffect, useRef } from "react"

interface SmokeMistEffectProps {
  className?: string
  density?: "low" | "medium" | "high"
  interactive?: boolean
  tint?: "luxury" | "steel" | "cyan" | "mystic"
}

interface SmokeParticle {
  x: number
  y: number
  size: number
  vx: number
  vy: number
  opacity: number
  maxOpacity: number
  life: number
  maxLife: number
  rotation: number
  vRot: number
  colorR: number
  colorG: number
  colorB: number
  wobbleSpeed: number
  wobblePhase: number
}

export default function SmokeMistEffect({
  className = "",
  density = "medium",
  interactive = true,
  tint = "luxury",
}: SmokeMistEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef<{ x: number; y: number; active: boolean; prevX: number; prevY: number }>({
    x: -999,
    y: -999,
    active: false,
    prevX: -999,
    prevY: -999,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    const particleCount = density === "low" ? 28 : density === "high" ? 64 : 44
    const particles: SmokeParticle[] = []

    // Distinctive, rich Atelier palette for smoke vapor
    const getColors = () => {
      if (tint === "luxury") {
        const rand = Math.random()
        if (rand < 0.35) {
          return { r: 212, g: 175, b: 55 } // Warm Champagne Gold wisp
        } else if (rand < 0.65) {
          return { r: 180, g: 198, b: 220 } // Ice Damascus Steel mist
        } else {
          return { r: 241, g: 245, b: 249 } // Surgical Platinum Vapor
        }
      }
      if (tint === "cyan") {
        return Math.random() > 0.4
          ? { r: 56, g: 189, b: 248 }
          : { r: 148, g: 163, b: 184 }
      }
      if (tint === "mystic") {
        return Math.random() > 0.5
          ? { r: 129, g: 140, b: 248 }
          : { r: 45, g: 212, b: 191 }
      }
      // Pure Steel
      return Math.random() > 0.5
        ? { r: 203, g: 213, b: 225 }
        : { r: 148, g: 163, b: 184 }
    }

    const createParticle = (spawnRandom = false): SmokeParticle => {
      const colors = getColors()
      return {
        x: Math.random() * width,
        y: spawnRandom ? Math.random() * height : height + Math.random() * 60,
        size: Math.random() * 200 + 140, // Generous, soft billowy plumes
        vx: (Math.random() - 0.48) * 0.45,
        vy: -(Math.random() * 0.42 + 0.18), // Smooth rising draft
        opacity: 0,
        maxOpacity: Math.random() * 0.18 + 0.08, // Rich visible vapor, not faint
        life: spawnRandom ? Math.random() * 900 : 0,
        maxLife: Math.random() * 900 + 700,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.004,
        colorR: colors.r,
        colorG: colors.g,
        colorB: colors.b,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        wobblePhase: Math.random() * Math.PI * 2,
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true))
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const newX = e.clientX - rect.left
      const newY = e.clientY - rect.top
      mouseRef.current.prevX = mouseRef.current.x
      mouseRef.current.prevY = mouseRef.current.y
      mouseRef.current.x = newX
      mouseRef.current.y = newY
      mouseRef.current.active = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    if (interactive && canvas.parentElement) {
      canvas.parentElement.addEventListener("mousemove", handleMouseMove)
      canvas.parentElement.addEventListener("mouseleave", handleMouseLeave)
    }

    let lastTime = performance.now()

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      ctx.clearRect(0, 0, width, height)

      // Render each billow of silky smoke
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.life += dt * 60
        p.wobblePhase += p.wobbleSpeed

        // Smooth bell curve for mist lifecycle
        const progress = p.life / p.maxLife
        if (progress < 0.25) {
          p.opacity = (progress / 0.25) * p.maxOpacity
        } else if (progress > 0.7) {
          p.opacity = ((1 - progress) / 0.3) * p.maxOpacity
        } else {
          p.opacity = p.maxOpacity
        }

        // Natural swirling draft physics
        p.x += (p.vx + Math.sin(p.wobblePhase) * 0.35) * 60 * dt
        p.y += p.vy * 60 * dt
        p.rotation += p.vRot * 60 * dt
        p.size += 0.08 // Gently expand as smoke disperses

        // Interactive mouse curl
        if (interactive && mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x
          const dy = p.y - mouseRef.current.y
          const distSq = dx * dx + dy * dy
          const maxDist = 220
          if (distSq < maxDist * maxDist && distSq > 0) {
            const dist = Math.sqrt(distSq)
            const force = (1 - dist / maxDist) * 1.2
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }
        }

        // Draw lush atmospheric mist plume
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size)
        gradient.addColorStop(0, `rgba(${p.colorR}, ${p.colorG}, ${p.colorB}, ${p.opacity})`)
        gradient.addColorStop(0.35, `rgba(${p.colorR}, ${p.colorG}, ${p.colorB}, ${p.opacity * 0.65})`)
        gradient.addColorStop(0.7, `rgba(${p.colorR}, ${p.colorG}, ${p.colorB}, ${p.opacity * 0.2})`)
        gradient.addColorStop(1, `rgba(${p.colorR}, ${p.colorG}, ${p.colorB}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(0, 0, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Recycle particle
        if (p.life >= p.maxLife || p.y < -p.size || p.x < -p.size || p.x > width + p.size) {
          particles[i] = createParticle(false)
        }
      }

      animationId = requestAnimationFrame(render)
    }

    animationId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener("mousemove", handleMouseMove)
        canvas.parentElement.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [density, interactive, tint])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Dynamic Procedural Canvas Mist */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Atmospheric Ambient Vapor Backlight (Rich Champagne & Damascus Indigo) */}
      <div className="absolute top-1/4 -left-40 h-[36rem] w-[36rem] rounded-full bg-amber-500/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 -right-40 h-[38rem] w-[38rem] rounded-full bg-sky-500/[0.04] blur-[130px] pointer-events-none" />
      <div className="absolute top-10 right-1/4 h-[24rem] w-[24rem] rounded-full bg-indigo-500/[0.03] blur-[100px] pointer-events-none" />

      {/* Subtle Fine-grain radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,11,20,0.5)_100%)]" />
    </div>
  )
}
