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
  department: string
  alloy: string
  finish: string
  msrpPrice: number
  samplePrice: number
  salonPrice: number
  wholesalePrice: number
  image: string
  quote: string
  waText: string
}

const SPOTLIGHT_ITEMS: HeroSpotlight[] = [
  {
    id: "surg-mayo",
    ref: "ASH-SURG-001",
    name: "Mayo-Hegar Needle Holder (Gold Handle TC Jaws)",
    department: "General Surgery",
    alloy: "German Stainless + Tungsten Carbide",
    finish: "Satin Non-Glare with Gold Rings (160mm)",
    msrpPrice: 58.0,
    samplePrice: 44.0,
    salonPrice: 38.0,
    wholesalePrice: 34.0,
    image: "./images/product_micro_needle_holder_1791527347532.jpg",
    quote: "Official hospital operating theater grade. Pyramid cross-serrated Tungsten Carbide jaws with ratchet lock for zero suture slippage. ISO 13485 & CE certified.",
    waText: "Hello ASH Instruments, I want to order the Mayo-Hegar TC Needle Holder (REF: ASH-SURG-001) at official factory export rates.",
  },
  {
    id: "dent-forceps",
    ref: "ASH-DENT-101",
    name: "Universal Adult Extracting Forceps #150",
    department: "Dental Instruments",
    alloy: "German Surgical Stainless 1.4021",
    finish: "Anatomical Serrated Beaks (175mm)",
    msrpPrice: 62.0,
    samplePrice: 46.0,
    salonPrice: 40.0,
    wholesalePrice: 36.0,
    image: "./images/dental_surgical_instruments_1791963309346.jpg",
    quote: "Precision dental extraction cutlery. Deep anatomical beak cross-serrations maximize root contact while preserving alveolar bone architecture.",
    waText: "Hello ASH Instruments, I want to order the Dental Extraction Forceps #150 (REF: ASH-DENT-101) at official factory rates.",
  },
  {
    id: "eye-iris",
    ref: "ASH-EYE-201",
    name: "Iris Micro-Surgical Scissors (Curved 11.5cm Sharp/Sharp)",
    department: "Eye / Ophthalmic",
    alloy: "Hardened German Inox Steel",
    finish: "Satin Non-Glare Hand-Honed Sharp/Sharp (115mm)",
    msrpPrice: 42.0,
    samplePrice: 32.0,
    salonPrice: 28.0,
    wholesalePrice: 24.5,
    image: "./images/ash_scissors_realistic_1791623595411.jpg",
    quote: "Delicate micro-surgical Iris scissors featuring ultra-sharp 0.2mm needle points and hand-lapped blades for clean ophthalmic incisions without tissue pulling.",
    waText: "Hello ASH Instruments, I want to order the Iris Micro Scissors (REF: ASH-EYE-201) at official factory rates.",
  },
  {
    id: "lash",
    ref: "ASH-LASH-090",
    name: "90° Fiber-Tip Mega Volume Eyelash Tweezers",
    department: "Beauty & Salon",
    alloy: "24K Gold PVD Plasma Titanium",
    finish: "Gold Plasma Diamond Grip (120mm / 4.75\")",
    msrpPrice: 48.0,
    samplePrice: 36.0,
    salonPrice: 32.0,
    wholesalePrice: 28.0,
    image: "./images/ash_lash_realistic_1791623278329.jpg",
    quote: "Original ASH Instruments laser engraved 90° tweezers. Micro-textured diamond fiber sweet-spot grabs 0.03mm Russian volume fans with zero slippage.",
    waText: "Hello ASH Instruments, I want to order the 90° Fiber-Tip Mega Volume Tweezers (REF: ASH-LASH-090) at official export rates.",
  },
  {
    id: "cuticle",
    ref: "ASH-MANI-404",
    name: "Pro-Grade Cobalt Cuticle Nipper 4mm",
    department: "Beauty & Salon",
    alloy: "AISI 420 High Carbon Surgical Steel",
    finish: "Satin Matte Non-Glare (105mm / 4.15\")",
    msrpPrice: 44.0,
    samplePrice: 33.0,
    salonPrice: 29.0,
    wholesalePrice: 26.0,
    image: "./images/ash_nipper_realistic_1791623359819.jpg",
    quote: "Hand-honed beveled razor edge aligned under 20x stereo microscope for surgical clean trimming with zero skin pinching.",
    waText: "Hello ASH Instruments, I want to order the Pro Cobalt Cuticle Nipper 4mm (REF: ASH-MANI-404) at official export rates.",
  },
  {
    id: "shears",
    ref: "ASH-HAIR-750",
    name: "Titanium Swivel Barber Cutting Shears 6.5\"",
    department: "Beauty & Salon",
    alloy: "Japanese 440C Cobalt Alloy",
    finish: "Titanium Black Nitride (170mm / 6.5\")",
    msrpPrice: 185.0,
    samplePrice: 139.0,
    salonPrice: 125.0,
    wholesalePrice: 110.0,
    image: "./images/ash_shears_realistic_1791623537885.jpg",
    quote: "Titanium black nitride molecular PVD coating with 360° rotating ergonomic thumb ring and jeweled tension pivot.",
    waText: "Hello ASH Instruments, I want to order the Titanium Swivel Barber Shears 6.5\" (REF: ASH-HAIR-750) at official export rates.",
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

  const discountPercent = Math.round(
    ((activeItem.msrpPrice - activeItem.samplePrice) / activeItem.msrpPrice) * 100
  )

  return (
    <section className="relative overflow-hidden border-b border-amber-500/15 bg-[#080c16] text-slate-100">
      {/* Background High-End Studio Presentation */}
      <div className="absolute inset-0 z-0">
        <img
          src="./images/hero_ash_instruments_tray_1791532125541.jpg"
          alt="Authentic surgical-grade instruments on stainless inspection tray"
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
          {/* Main Hero Information */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            {/* Atelier Hallmark Badge */}
            <div className="inline-flex items-center gap-3 py-1.5 px-3.5 rounded-full border border-amber-400/25 bg-amber-400/[0.06] backdrop-blur-md mb-6 shadow-sm">
              <img
                src="./images/logo_ash_instruments_1791532110951.jpg"
                alt="ASH Instruments Official Emblem"
                className="h-6 w-6 rounded-full border border-amber-400/40 object-cover"
              />
              <span className="text-xs font-semibold tracking-wider text-amber-200">
                ASH INSTRUMENTS · Askari Surgical Hubs
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] text-slate-300 font-medium">Sialkot Surgical Atelier</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.12]">
              Surgical, Dental & Ophthalmic Cutlery.{" "}
              <span className="gold-gradient-text block sm:inline">
                Precision Forged in Sialkot.
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Precision forged from certified German Inox AISI 420/316L, Tungsten Carbide, and Japanese 440C cobalt alloys. Every instrument is individually hand-honed, passivated, and laser-hallmarked with the authentic <strong className="text-amber-200 font-bold">ASH INSTRUMENTS</strong> mark.
            </p>

            {/* Direct Factory Value Props */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>DIN EN ISO 13485 & CE Operating Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-400" />
                <span>Official Direct Factory Export Rates (Save 20-27%)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-sky-400" />
                <span>Free Custom Laser Engraving on 20+ pcs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>134°C Autoclave Validated · Zero Pitting Guarantee</span>
              </div>
            </div>

            {/* Clean, High-Conversion CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/923497560980?text=${encodeURIComponent(
                  `${activeItem.waText}\nSelected Model: ${activeItem.name} [REF: ${activeItem.ref}]\nOfficial List Price: $${activeItem.msrpPrice.toFixed(2)}\nDiscounted Rate: $${currentPrice.toFixed(2)}/pc`
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
                size="lg"
                variant="outline"
                onClick={() => scrollTo("catalog")}
                className="gap-2 text-white border-amber-400/30 bg-slate-900/70 hover:bg-slate-800 hover:border-amber-400/60 text-sm h-12 px-7 rounded-xl transition-all"
              >
                <span>Browse 4 Divisions</span>
                <ArrowRight className="h-4 w-4 text-amber-300" />
              </Button>
            </div>
          </motion.div>

          {/* Interactive Live Spotlight Unit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="studio-card rounded-2xl p-5 sm:p-6 shadow-2xl relative">
              {/* Department Selector Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 border-b border-white/[0.08] no-scrollbar">
                {SPOTLIGHT_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shrink-0 transition-all ${
                      activeItem.id === item.id
                        ? "bg-amber-400 text-slate-950 shadow-sm"
                        : "bg-white/[0.04] text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.department.split(" ")[0]} · {item.ref.split("-")[1]}
                  </button>
                ))}
              </div>

              {/* Main Image with Microscope Zoom Loupe */}
              <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-[#05070c] border border-amber-500/25">
                <InstrumentZoomLoupe
                  src={activeItem.image}
                  alt={activeItem.name}
                  className="h-full w-full"
                  hallmarkText={`ASH INSTRUMENTS · ${activeItem.ref} · ${activeItem.finish}`}
                  zoomFactor={2.7}
                  lensSize={160}
                />

                {/* Laser Hallmark Badge on Active Spotlight */}
                <div className="absolute top-3 left-3 bg-[#090d16]/95 border border-amber-400/40 text-[9px] font-mono text-amber-200 px-2 py-0.5 rounded shadow backdrop-blur-md flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-amber-400" />
                  <span>ASH INSTRUMENTS</span>
                </div>

                {/* Department Tag */}
                <div className="absolute top-3 right-3 bg-amber-950/80 border border-amber-400/40 text-[9px] font-semibold text-amber-300 px-2 py-0.5 rounded shadow">
                  {activeItem.department}
                </div>
              </div>

              {/* Item Info */}
              <div className="mt-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-white">
                    {activeItem.name}
                  </h3>
                  <span className="text-[11px] font-mono text-amber-300 font-bold shrink-0">{activeItem.ref}</span>
                </div>
                <p className="mt-1 text-xs text-slate-400 italic line-clamp-2">
                  "{activeItem.quote}"
                </p>
              </div>

              {/* Volume Discount Selector with Official MSRP Crossed out */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-900/70 border border-amber-500/15">
                <div className="text-[11px] font-semibold text-slate-300 mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Official List:</span>
                    <span className="line-through text-slate-400 font-mono">${activeItem.msrpPrice.toFixed(2)}</span>
                  </div>
                  <span className="text-emerald-400 font-bold font-mono text-[10px] bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                    Save {discountPercent}% Factory Direct
                  </span>
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
                    <div className="text-[10px] uppercase font-bold text-slate-400">Trade 10+</div>
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
                      Wholesale
                    </span>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Bulk 50+</div>
                    <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                      ${activeItem.wholesalePrice.toFixed(2)}
                    </div>
                    <div className="text-[9px] text-slate-400">50+ pcs</div>
                  </button>
                </div>
              </div>

              {/* Direct WhatsApp Quick Order */}
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={`https://wa.me/923497560980?text=${encodeURIComponent(
                    `Hello ASH Instruments! I want to order:\nModel: ${activeItem.name} (REF: ${activeItem.ref})\nDepartment: ${activeItem.department}\nOfficial List Price: $${activeItem.msrpPrice.toFixed(2)}\nSelected Tier Rate: $${currentPrice.toFixed(2)}/pc.\nPlease send official proforma invoice.`
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
