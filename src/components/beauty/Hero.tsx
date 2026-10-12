import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle, Check, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import SmokeMistEffect from "@/src/components/effects/SmokeMistEffect"
import InstrumentZoomLoupe from "@/src/components/beauty/InstrumentZoomLoupe"

interface HeroSpotlight {
  id: string
  ref: string
  name: string
  alloy: string
  finish: string
  samplePrice: number
  salonPrice: number
  wholesalePrice: number
  image: string
  quote: string
  waText: string
}

const SPOTLIGHT_ITEMS: HeroSpotlight[] = [
  {
    id: "lash",
    ref: "ASH-LASH-090",
    name: "90° Fiber-Tip Mega Volume Eyelash Tweezers",
    alloy: "24K Gold PVD Plasma Titanium",
    finish: "Gold Plasma Diamond Grip (120mm / 4.75\")",
    samplePrice: 42.0,
    salonPrice: 38.0,
    wholesalePrice: 34.0,
    image: "/src/assets/images/ash_lash_realistic_1791623278329.jpg",
    quote: "Original ASH Instruments laser engraved 90° tweezers. Micro-textured diamond fiber sweet-spot grabs 0.03mm Russian volume fans with zero slippage.",
    waText: "Hello ASH Instruments, I want to order the 90° Fiber-Tip Mega Volume Tweezers (REF: ASH-LASH-090) at official export rates.",
  },
  {
    id: "cuticle",
    ref: "ASH-MANI-404",
    name: "Pro-Grade Cobalt Cuticle Nipper 4mm",
    alloy: "AISI 420 High Carbon Surgical Steel",
    finish: "Satin Matte Non-Glare (105mm / 4.15\")",
    samplePrice: 38.0,
    salonPrice: 34.0,
    wholesalePrice: 30.5,
    image: "/src/assets/images/ash_nipper_realistic_1791623359819.jpg",
    quote: "Original ASH Instruments laser marked cuticle nippers. Hand-honed beveled razor edge aligned under 20x stereo microscope for surgical clean trimming.",
    waText: "Hello ASH Instruments, I want to order the Pro Cobalt Cuticle Nipper 4mm (REF: ASH-MANI-404) at official export rates.",
  },
  {
    id: "shears",
    ref: "ASH-HAIR-750",
    name: "Titanium Swivel Barber Cutting Shears 6.5\"",
    alloy: "Japanese 440C Cobalt Alloy",
    finish: "Titanium Black Nitride (170mm / 6.5\")",
    samplePrice: 165.0,
    salonPrice: 148.0,
    wholesalePrice: 135.0,
    image: "/src/assets/images/ash_shears_realistic_1791623537885.jpg",
    quote: "Original ASH Instruments laser marked shears. Titanium black nitride coating with 360° rotating thumb ring and gold micro-click pivot.",
    waText: "Hello ASH Instruments, I want to order the Titanium Swivel Barber Shears 6.5\" (REF: ASH-HAIR-750) at official export rates.",
  },
  {
    id: "razor",
    ref: "ASH-BARB-901",
    name: "Master Damascus Folding Barber Straight Razor",
    alloy: "288-Layer Folded Damascus Carbon Steel",
    finish: "Natural Hardwood Scales & Damascus Etch (160mm)",
    samplePrice: 78.0,
    salonPrice: 70.0,
    wholesalePrice: 62.0,
    image: "/src/assets/images/ash_damascus_razor_1791621275630.jpg",
    quote: "Original ASH Instruments laser marked razor. Traditional forged Damascus hollow ground edge for master-barber wet shaves. Universal HS 8212.10 export clearance.",
    waText: "Hello ASH Instruments, I want to order the Master Damascus Barber Straight Razor (REF: ASH-BARB-901) at official export rates.",
  },
]

export default function Hero() {
  const [activeItem, setActiveItem] = useState<HeroSpotlight>(SPOTLIGHT_ITEMS[0])
  const [selectedTier, setSelectedTier] = useState<"sample" | "salon" | "bulk">("salon")

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const currentPrice =
    selectedTier === "sample"
      ? activeItem.samplePrice
      : selectedTier === "salon"
      ? activeItem.salonPrice
      : activeItem.wholesalePrice

  return (
    <section className="relative overflow-hidden border-b border-amber-500/15 bg-[#080c16] text-slate-100">
      {/* Background High-End Studio Tray Presentation */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_ash_instruments_tray_1791532125541.jpg"
          alt="Authentic surgical-grade beauty instruments on stainless inspection tray"
          className="h-full w-full object-cover object-center opacity-20"
          referrerPolicy="no-referrer"
        />
        {/* Soft dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080c16] via-[#080c16]/95 to-[#080c16]/85" />
      </div>

      {/* Atmospheric Luxury Smoke / Surgical Steam */}
      <SmokeMistEffect density="medium" tint="luxury" interactive={true} className="z-1 opacity-70 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Information with Framer Motion entrance */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            {/* Atelier Hallmark Badge */}
            <div className="inline-flex items-center gap-3 py-1.5 px-3.5 rounded-full border border-amber-400/25 bg-amber-400/[0.06] backdrop-blur-md mb-6 shadow-sm">
              <img
                src="/src/assets/images/logo_ash_instruments_1791532110951.jpg"
                alt="ASH Instruments Official Emblem"
                className="h-6 w-6 rounded-full border border-amber-400/40 object-cover"
              />
              <span className="text-xs font-semibold tracking-wider text-amber-200">
                ASH INSTRUMENTS · Askari Surgical Hubs
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] text-slate-300 font-medium">Direct Sialkot Factory</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.12]">
              Surgical Precision Cutlery{" "}
              <span className="gold-gradient-text block sm:inline">
                Crafted for Master Artists.
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Precision forged from certified German AISI 420 and Japanese 440C cobalt alloy. Every single piece is hand-calibrated with zero light-gap and laser-engraved with the authentic <strong className="text-amber-200 font-bold">ASH Instruments</strong> hallmark.
            </p>

            {/* Direct Factory Value Props */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Zero Medical Permit Required (HS 8213/8214 Universal Import)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-400" />
                <span>Direct Sialkot Factory Pricing (No Middlemen)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-sky-400" />
                <span>Free Custom Laser Engraving on 20+ pcs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>30-Day Zero-Rust & Razor Sharpness Guarantee</span>
              </div>
            </div>

            {/* Clean, High-Conversion CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/923497560980?text=${encodeURIComponent(
                  `${activeItem.waText}\nSelected Tier: ${
                    selectedTier === "sample" ? "Sample (1 pc)" : selectedTier === "salon" ? "Salon Pack (10 pcs)" : "Wholesale (50+ pcs)"
                  } @ $${currentPrice.toFixed(2)}/pc`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm h-12 px-7 rounded-xl shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Order on WhatsApp (+923497560980)
                </Button>
              </a>

              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollTo("catalog")}
                className="gap-2 border-amber-400/30 bg-amber-400/[0.06] text-amber-100 hover:bg-amber-400/15 hover:border-amber-400/50 text-sm h-12 px-6 rounded-xl transition-all"
              >
                Browse Full Catalog
                <ArrowRight className="h-4 w-4 text-amber-300" />
              </Button>
            </div>

            {/* Quality Pillars */}
            <div className="mt-10 pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl border border-amber-400/15 bg-slate-900/40 backdrop-blur-sm">
                <div className="font-bold text-amber-200">Direct Factory Cost</div>
                <div className="text-slate-400 mt-1 text-[11px]">Save up to 50% vs distributor markup</div>
              </div>
              <div className="p-3.5 rounded-xl border border-amber-400/15 bg-slate-900/40 backdrop-blur-sm">
                <div className="font-bold text-amber-200">Laser Engraved</div>
                <div className="text-slate-400 mt-1 text-[11px]">Official hallmark + custom branding</div>
              </div>
              <div className="p-3.5 rounded-xl border border-amber-400/15 bg-slate-900/40 backdrop-blur-sm">
                <div className="font-bold text-amber-200">0.02mm Tip Calibrated</div>
                <div className="text-slate-400 mt-1 text-[11px]">Zero light gap under 20x stereo view</div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Studio Spotlight Card with Framer Motion slide-up */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            {/* Quick Switcher Tabs */}
            <div className="flex items-center gap-1.5 mb-3 bg-slate-900/60 p-1.5 rounded-xl border border-amber-500/15 backdrop-blur-md">
              {SPOTLIGHT_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`flex-1 text-xs py-2 px-2.5 rounded-lg font-medium transition-all ${
                    activeItem.id === item.id
                      ? "bg-amber-500/20 text-amber-200 border border-amber-400/30 shadow-sm font-bold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.id === "lash"
                    ? "Mega Lash"
                    : item.id === "cuticle"
                    ? "Cuticle Nipper"
                    : item.id === "shears"
                    ? "Salon Shears"
                    : "Damascus Razor"}
                </button>
              ))}
            </div>

            <div className="studio-card rounded-2xl p-6 shadow-2xl relative">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-amber-300 font-bold">REF: {activeItem.ref}</span>
                  <span className="text-[10px] bg-slate-800/80 text-slate-300 border border-slate-700/80 px-2 py-0.5 rounded font-mono">
                    {activeItem.alloy}
                  </span>
                </div>
                <span className="text-emerald-400 font-medium text-xs flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Hallmarked
                </span>
              </div>

              {/* Product Image with Interactive Microscope Zoom Loupe */}
              <div className="mt-4 aspect-4/3 overflow-hidden rounded-xl bg-[#05070c] border border-amber-500/20 relative shadow-inner">
                <InstrumentZoomLoupe
                  src={activeItem.image}
                  alt={activeItem.name}
                  className="h-full w-full"
                  hallmarkText="ASH INSTRUMENTS · OFFICIAL"
                  zoomFactor={2.6}
                  lensSize={165}
                />
              </div>

              <div className="mt-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-white">
                    {activeItem.name}
                  </h3>
                  <span className="text-xs text-slate-400 shrink-0 font-medium">{activeItem.finish}</span>
                </div>
                <p className="mt-1 text-xs text-slate-400 italic">
                  "{activeItem.quote}"
                </p>
              </div>

              {/* Volume Discount Selector */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-900/70 border border-amber-500/15">
                <div className="text-[11px] font-semibold text-slate-300 mb-2 flex items-center justify-between">
                  <span>Factory Volume Pricing</span>
                  <span className="text-amber-400 font-mono text-[10px]">Direct from Sialkot</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedTier("sample")}
                    className={`p-2 rounded-lg text-left transition-all border ${
                      selectedTier === "sample"
                        ? "bg-amber-500/15 border-amber-400/50 text-white"
                        : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold text-slate-400">Sample</div>
                    <div className="text-xs font-mono font-bold text-white mt-0.5">
                      ${activeItem.samplePrice.toFixed(2)}
                    </div>
                    <div className="text-[9px] text-slate-400">1 piece</div>
                  </button>

                  <button
                    onClick={() => setSelectedTier("salon")}
                    className={`p-2 rounded-lg text-left transition-all border relative ${
                      selectedTier === "salon"
                        ? "bg-amber-500/15 border-amber-400/50 text-white"
                        : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    <span className="absolute -top-2 right-1 bg-amber-500 text-slate-950 text-[8px] font-bold px-1.5 rounded">
                      Popular
                    </span>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Salon Pack</div>
                    <div className="text-xs font-mono font-bold text-amber-300 mt-0.5">
                      ${activeItem.salonPrice.toFixed(2)}
                    </div>
                    <div className="text-[9px] text-slate-400">10+ pcs</div>
                  </button>

                  <button
                    onClick={() => setSelectedTier("bulk")}
                    className={`p-2 rounded-lg text-left transition-all border relative ${
                      selectedTier === "bulk"
                        ? "bg-amber-500/15 border-amber-400/50 text-white"
                        : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    <span className="absolute -top-2 right-1 bg-emerald-500 text-slate-950 text-[8px] font-bold px-1.5 rounded">
                      Best Rate
                    </span>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Wholesale</div>
                    <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                      ${activeItem.wholesalePrice.toFixed(2)}
                    </div>
                    <div className="text-[9px] text-slate-400">50+ pcs</div>
                  </button>
                </div>
              </div>

              {/* Direct WhatsApp Quick Order for this item */}
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={`https://wa.me/923497560980?text=${encodeURIComponent(
                    `Hello ASH Instruments! I want to order:\nModel: ${activeItem.name} (REF: ${activeItem.ref})\nQuantity Tier: ${
                      selectedTier === "sample" ? "1 Sample Piece" : selectedTier === "salon" ? "10+ Salon Pack" : "50+ Wholesale Carton"
                    }\nRate: $${currentPrice.toFixed(2)}/pc.\nPlease send proforma invoice.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-10 rounded-xl shadow-md transition-all gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Order REF: {activeItem.ref} on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
