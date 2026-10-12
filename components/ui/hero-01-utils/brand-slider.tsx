import React from "react"
import { Hexagon, Zap, Shield, Globe, Cpu } from "lucide-react"

export interface BrandList {
  image: string
  lightimg?: string
  name: string
}

interface BrandSliderProps {
  brandList: BrandList[]
}

const fallbackIcons = [Zap, Hexagon, Shield, Globe, Cpu]

export default function BrandSlider({ brandList }: BrandSliderProps) {
  return (
    <section id="brand-slider" className="border-y border-border/60 bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Trusted by visionary teams and high-growth innovators
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {brandList.map((brand, index) => {
            const Icon = fallbackIcons[index % fallbackIcons.length]
            return (
              <div
                key={index}
                className="group flex items-center gap-2.5 grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background p-2 shadow-xs border border-border/80">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="max-h-6 max-w-6 object-contain"
                    onError={(e) => {
                      // If SVG fails to render, hide image and show fallback icon
                      e.currentTarget.style.display = "none"
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement
                      if (fallback) fallback.style.display = "inline-flex"
                    }}
                  />
                  <span className="hidden text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <span className="font-semibold text-sm tracking-tight text-foreground/80 group-hover:text-foreground">
                  {brand.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
