import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, MessageCircle, Sliders, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import InstrumentZoomLoupe from "@/src/components/beauty/InstrumentZoomLoupe"

interface SteelFinish {
  id: string
  name: string
  tag: string
  colorDot: string
  description: string
  benefits: string[]
  recommendedFor: string
  image: string
  surfaceReflection: string
  hardness: string
}

const FINISHES: SteelFinish[] = [
  {
    id: "mirror",
    name: "Surgical Mirror Ultra-Polish",
    tag: "Jewelry-Grade Brilliance",
    colorDot: "bg-slate-200 border-white",
    description:
      "Hand-buffed with diamond compound down to 0.05 micron roughness. Creates an immaculate, high-reflective mirror sheen that prevents microscopic chemical staining and offers frictionless glide.",
    benefits: [
      "Zero surface porosity prevents adhesive sticking",
      "Immune to medical autoclave oxidation & staining",
      "Stunning optical luster under salon ring lighting",
      "Original deep laser-etched 'ASH INSTRUMENTS' mark",
    ],
    recommendedFor: "High-end Salon Showcases, Eyelash Extensions, Precision Dermatology",
    image: "./images/ash_thinning_shears_1791621420987.jpg",
    surfaceReflection: "Mirror 99.4% Reflective",
    hardness: "HRC 50-52 (Japanese SUS420)",
  },
  {
    id: "satin",
    name: "Matte Satin Anti-Glare",
    tag: "Clinical Anti-Fatigue",
    colorDot: "bg-slate-400 border-slate-300",
    description:
      "Bead-blasted non-reflective frosted surface designed for intense LED ring lighting and surgical operatory lights. Eliminates blinding reflections that cause technician eye fatigue during 8-hour sessions.",
    benefits: [
      "100% Non-glare under high-lumen microscope and magnifying lamps",
      "Micro-textured silky tactile grip resists oily slip",
      "Permanent laser engraving with stark contrast",
      "Preferred by European & American lash educators",
    ],
    recommendedFor: "Master Lash Artistry, Barbershops, Medical Clinics",
    image: "./images/ash_nipper_realistic_1791623359819.jpg",
    surfaceReflection: "Matte Frosted 12% Diffusion",
    hardness: "HRC 52-54 (German Inox Alloy)",
  },
  {
    id: "gold",
    name: "24K Gold Plasma Titanium PVD",
    tag: "Ultra-Luxury Atelier Tier",
    colorDot: "bg-amber-300 border-yellow-200",
    description:
      "Physical Vapor Deposition (PVD) molecular titanium gold coating bonded under high-vacuum plasma chambers. Adds 35% extra surface hardness and extraordinary scratch protection.",
    benefits: [
      "PVD plasma bond will not chip, peel, or fade in disinfectant",
      "Extra scratch-resistant surface barrier (HV 2200 hardness)",
      "Opulent champagne gold luster that wows salon clients",
      "Contrast laser branding in crisp surgical platinum",
    ],
    recommendedFor: "VIP Salon Stations, Academy Award Sets, Luxury Gift Bundles",
    image: "./images/ash_lash_realistic_1791623278329.jpg",
    surfaceReflection: "Plasma Titanium Luster",
    hardness: "HRC 56+ (PVD Reinforced)",
  },
  {
    id: "black",
    name: "Jet Black DLC Diamond Carbon",
    tag: "Extreme Duty Diamond Carbon",
    colorDot: "bg-neutral-800 border-neutral-600",
    description:
      "Diamond-Like Carbon (DLC) coating engineered for extreme duty cycles. Combines the hardness of natural diamond with high thermal stability and sleek obsidian stealth optics.",
    benefits: [
      "Ultra-low friction coefficient for effortless cutting",
      "Resists aggressive chemical sanitizers and barbicides",
      "Striking contrast laser-marked ASH Instruments logo",
      "Zero corrosion under any salon humidity environment",
    ],
    recommendedFor: "Heavy-Duty Barbers, High-Volume Manicure Studios",
    image: "./images/ash_shears_realistic_1791623537885.jpg",
    surfaceReflection: "Stealth Diamond Carbon",
    hardness: "HRC 58+ (Diamond Layer)",
  },
  {
    id: "damascus",
    name: "Forged Damascus Pattern Etch",
    tag: "Artisanal Forge Damascus",
    colorDot: "bg-stone-500 border-amber-400",
    description:
      "Folded and acid-etched Damascus carbon steel revealing high-contrast topographical grain patterns. Hand-finished for traditional master barbers and luxury salon cutlery collectors.",
    benefits: [
      "Folded Damascus steel with 100% unique grain on every piece",
      "Traditional hollow-ground edge honed to razor hair-splitting sharpness",
      "Deep contrast etching sealed with protective passivation barrier",
      "Classified under HS 8212/8213 with zero medical certification hold-ups",
    ],
    recommendedFor: "Master Barbershops, Traditional Wet Shave Salons, Luxury Cutlery Sets",
    image: "./images/ash_damascus_razor_1791621275630.jpg",
    surfaceReflection: "Acid-Etched Damascus Grain",
    hardness: "HRC 58-60 (Folded Damascus)",
  },
]

export default function InteractiveSteelInspector() {
  const [selectedFinish, setSelectedFinish] = useState<SteelFinish>(FINISHES[0])

  return (
    <section id="finishes" className="relative py-20 bg-[#080c16] text-slate-100 overflow-hidden border-b border-amber-500/15">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-200">
            <Sliders className="h-3.5 w-3.5 text-amber-300" />
            Atelier Finish Metallurgy
          </div>

          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl text-white tracking-tight">
            Inspect Surface Treatments & Custom Finishes
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Select any finish below. Every batch is forged from certified Japanese & German surgical alloy and permanently engraved with the authentic <strong className="text-amber-200">ASH Instruments</strong> hallmark.
          </p>
        </div>

        {/* Finish Selector Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {FINISHES.map((finish) => {
            const isSelected = finish.id === selectedFinish.id
            return (
              <button
                key={finish.id}
                onClick={() => setSelectedFinish(finish)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2.5 ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "bg-slate-900/70 text-slate-300 border border-amber-400/15 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span className={`h-2.5 w-2.5 rounded-full border ${finish.colorDot}`} />
                <span>{finish.name}</span>
              </button>
            )
          })}
        </div>

        {/* Inspection Showcase Card */}
        <div className="mt-10 studio-card rounded-2xl p-6 sm:p-10 border border-amber-500/20 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFinish.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left: Product Visual with Microscope Zoom Loupe */}
              <div className="lg:col-span-5 relative aspect-4/3 rounded-xl overflow-hidden bg-[#05070c] border border-amber-500/20">
                <InstrumentZoomLoupe
                  src={selectedFinish.image}
                  alt={selectedFinish.name}
                  className="h-full w-full"
                  hallmarkText={`SURFACE: ${selectedFinish.tag.toUpperCase()}`}
                  zoomFactor={2.7}
                  lensSize={165}
                />
                <div className="absolute top-3 left-3 bg-[#090d16]/95 px-2.5 py-1 rounded text-xs font-mono text-amber-200 border border-amber-400/25 pointer-events-none z-10">
                  {selectedFinish.tag}
                </div>
                <div className="absolute bottom-3 left-3 bg-[#090d16]/95 px-2.5 py-1 rounded text-xs font-mono text-slate-300 border border-white/10 pointer-events-none z-10">
                  {selectedFinish.surfaceReflection}
                </div>
              </div>

              {/* Right: Technical Specs & Metallurgy */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span>HARDNESS RATING:</span>
                    <span className="font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                      {selectedFinish.hardness}
                    </span>
                  </div>
                  <h3 className="mt-2 text-2xl font-extrabold text-white">
                    {selectedFinish.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {selectedFinish.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                    Metallurgical Advantages:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {selectedFinish.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended For & WhatsApp Trigger */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Recommended Application:</div>
                    <div className="text-xs font-bold text-amber-200 mt-0.5">{selectedFinish.recommendedFor}</div>
                  </div>

                  <a
                    href={`https://wa.me/923497560980?text=${encodeURIComponent(
                      `Hello ASH Instruments,\nI am inquiring about the ${selectedFinish.name} surface treatment for our salon/bulk orders. Please share available models and MOQs.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold gap-2 h-9 px-4 rounded-lg shadow-md transition-all">
                      <MessageCircle className="h-3.5 w-3.5" />
                      Inquire on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
