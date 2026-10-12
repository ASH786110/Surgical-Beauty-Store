import React from "react"
import { ArrowRight, Star, CheckCircle2, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface AvatarList {
  image: string
}

interface HeroSectionProps {
  avatarList: AvatarList[]
}

const fallbackAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
]

export default function HeroSection({ avatarList }: HeroSectionProps) {
  const avatars = (avatarList && avatarList.length > 0) ? avatarList : fallbackAvatars.map(img => ({ image: img }))

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.querySelector("#contact")
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Background glow effects */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(168,85,247,0.15) 50%, transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute top-1/2 -right-40 -z-10 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-foreground backdrop-blur-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for new projects in Q4</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground flex items-center gap-1">
              Top Rated Agency 2026
            </span>
          </div>

          {/* Main Title */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            We build digital products that{" "}
            <span className="bg-gradient-to-r from-primary via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              scale & inspire
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
            A boutique design and engineering studio creating high-impact brand identities, web apps, and design systems for ambitious companies worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-8 text-base font-semibold shadow-md gap-2"
              onClick={scrollToContact}
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 px-6 text-base font-medium gap-2 border-border/80"
              onClick={(e) => {
                e.preventDefault()
                const awards = document.querySelector("#brand-slider")
                if (awards) awards.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <Play className="h-4 w-4 fill-foreground/80" />
              View Client Work
            </Button>
          </div>

          {/* Social Proof & Rating */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-border/60">
            {/* Avatar Stack */}
            <div className="flex -space-x-3 overflow-hidden p-1">
              {avatars.slice(0, 5).map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar.image}
                  alt={`Client avatar ${idx + 1}`}
                  onError={(e) => {
                    // Fallback to stock unsplash if image url fails
                    const target = e.currentTarget
                    target.src = fallbackAvatars[idx % fallbackAvatars.length]
                  }}
                  className="inline-block h-10 w-10 rounded-full border-2 border-background object-cover shadow-sm ring-1 ring-border/20"
                />
              ))}
            </div>

            {/* Stars & Text */}
            <div className="flex flex-col items-center sm:items-start text-sm">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 font-bold text-foreground">4.9 / 5.0</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Loved by 150+ funded startups & global brands
              </p>
            </div>
          </div>

          {/* Key Value Prop Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Full-stack Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Dedicated Design Team</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>2-Week MVP Sprint</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
