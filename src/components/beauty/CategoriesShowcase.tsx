import React from "react"
import { motion } from "framer-motion"
import { Sparkles, Scissors, Eye, Heart, ArrowRight } from "lucide-react"

interface CategoryCard {
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  featuredItems: string[]
  priceRange: string
  description: string
}

const categories: CategoryCard[] = [
  {
    title: "Lash & Brow Artistry",
    subtitle: "Fiber-Tip & Micro-Isolation",
    icon: Eye,
    featuredItems: [
      "90° Mega Volume Fiber Tweezers",
      "Russian Volume Boot Tweezers (Diamond Grip)",
      "45° Curved Precision Isolation Tweezers",
      "Hand-Honed 25° Slant Brow Tweezers",
    ],
    priceRange: "$11.50 – $18.50 (Wholesale from $7.50)",
    description:
      "Engineered with laser micro-textured diamond fiber tips. Grips 0.03mm-0.07mm fans without dropping or splaying. Universal cosmetic import.",
  },
  {
    title: "Manicure & Pedicure Nippers & Tools",
    subtitle: "Precision Hand-Honed Cuticle Cutlery",
    icon: Sparkles,
    featuredItems: [
      "Russian Manicure Micro-Curved Razor Scissors",
      "Cobalt 4mm Quarter-Jaw Nippers",
      "Dual-Ended Cuticle Pusher & Spoon Curette",
      "Heavy-Duty Barrel Spring Toenail Nippers",
    ],
    priceRange: "$9.50 – $26.50 (Wholesale from $5.80)",
    description:
      "Forged surgical-grade stainless steel with smooth double-spring action for razor-clean cuticle trimming without pinching or pulling.",
  },
  {
    title: "Professional Hair & Barber Cutlery",
    subtitle: "Japanese 440C Cobalt & Damascus Steel",
    icon: Scissors,
    featuredItems: [
      "Master Damascus Folding Straight Razor",
      "Titanium Swivel-Thumb Barber Shears 6.5\"",
      "Japanese 440C Convex Cutting Shears 6.0\"",
      "30-Tooth Soft Blending Thinning Shears",
    ],
    priceRange: "$16.50 – $49.00 (Wholesale from $11.00)",
    description:
      "Hamaguri convex clam-shell blades and forged Damascus steel honed to surgical sharpness for effortless haircutting and wet shaving.",
  },
  {
    title: "Esthetic Skincare & Derm Grooming",
    subtitle: "Clinical Pore & Blemish Tools",
    icon: Heart,
    featuredItems: [
      "Double-Ended Comedone Extractors",
      "Esthetic Dermal Loop Curettes",
      "Micro-Derm Skin Scraper Implements",
    ],
    priceRange: "$12.50 – $15.00 (Wholesale from $7.90)",
    description:
      "Passivated stainless steel implements for hygienic clinic facials, blackhead extraction, and micro-exfoliation with knurled grips.",
  },
]

export default function CategoriesShowcase() {
  const scrollToCatalog = () => {
    const el = document.getElementById("catalog")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="categories" className="py-16 sm:py-24 bg-[#080c16] border-b border-amber-500/15 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 tracking-wider uppercase">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Specialized Instrument Lines</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Precision instruments for salons, academies & artists
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Every tool is engineered with balanced center-of-gravity, ergonomic finger contours, and durable passivated coatings to withstand daily autoclaving and clinic sanitization.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="studio-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-amber-400/35 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/25 group-hover:bg-amber-400/15 group-hover:border-amber-400/40 transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-md">
                      {cat.priceRange}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                    {cat.title}
                  </h3>
                  <div className="text-xs font-medium text-amber-300/80 mt-1">
                    {cat.subtitle}
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/[0.08]">
                    <div className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider mb-2">
                      Popular Master Models:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {cat.featuredItems.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs text-slate-400">German AISI 420 & Japanese 440C</span>
                  <button
                    onClick={scrollToCatalog}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors"
                  >
                    <span>View Models</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
