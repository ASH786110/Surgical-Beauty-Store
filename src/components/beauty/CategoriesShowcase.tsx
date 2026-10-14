import React from "react"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"

interface CategoryCard {
  id: string
  title: string
  subtitle: string
  icon: string
  featuredItems: string[]
  priceRange: string
  description: string
  standard: string
}

const categories: CategoryCard[] = [
  {
    id: "General Surgery",
    title: "General Surgery Instruments",
    subtitle: "Operating Theater & Trauma Suite Grade",
    icon: "🩺",
    featuredItems: [
      "Mayo-Hegar Needle Holders (Gold TC Jaws)",
      "Metzenbaum Dissecting Scissors (Curved TC)",
      "DeBakey Cardiovascular Atraumatic Forceps",
      "Allis Tissue Grasping Forceps 5x6 Teeth",
      "Scalpel Handle #3 & #4 Ergonomic Set",
    ],
    priceRange: "From $18.00 – $44.00 (MSRP up to $58.00)",
    description:
      "Engineered from certified German surgical grade stainless steel and bonded Tungsten Carbide. Validated for high-pressure Class B autoclave sterilization (134°C). Zero tissue damage with DeBakey micro atraumatic teeth.",
    standard: "DIN EN ISO 13485 & CE Operating Standard",
  },
  {
    id: "Dental Instruments",
    title: "Dental Instruments & Oral Surgery",
    subtitle: "Clinical Extraction & Periodontal Hygiene",
    icon: "🦷",
    featuredItems: [
      "Universal Adult Extracting Forceps #150 / #151",
      "Jaquette Sickle Scaler & Gracey Curettes (5-Pcs)",
      "Rhodium HD Front-Surface Mouth Mirrors #5",
      "Dental Luxating Elevators Stubby Tip (Straight & Curved)",
    ],
    priceRange: "From $16.50 – $58.00 (MSRP up to $78.00)",
    description:
      "Crafted from cold-forged AISI 420 & 1.4021 surgical alloys. Ergonomically knurled non-slip handles prevent hand fatigue during prolonged scaling, elevation, and dental extractions.",
    standard: "Thermodisinfector & 134°C Autoclave Safe",
  },
  {
    id: "Eye / Ophthalmic",
    title: "Eye / Ophthalmic Microsurgery",
    subtitle: "Micro-Tension & Delicate Corneal Cutlery",
    icon: "👁️",
    featuredItems: [
      "Castroviejo Micro Needle Holders (TC Straight 14cm)",
      "Iris Micro-Surgical Scissors (Curved 11.5cm)",
      "Castroviejo Ophthalmic Suturing Forceps 1x2 Teeth (0.12mm)",
      "Barraquer Wire Eye Speculum (Adult 14mm)",
    ],
    priceRange: "From $21.00 – $68.00 (MSRP up to $89.00)",
    description:
      "Delicate micro-instruments calibrated under stereo optical microscopes for corneal, cataract, and vitreoretinal surgery. Non-glare satin matte finish prevents optical reflection under operating microscopes.",
    standard: "Zero Tremor Spring Balance · Micro-Precision",
  },
  {
    id: "Beauty & Salon",
    title: "Beauty & Salon Precision Cutlery",
    subtitle: "Master Artisan Export Cutlery Atelier",
    icon: "✂️",
    featuredItems: [
      "90° Fiber-Tip Mega Volume Eyelash Tweezers",
      "Pro-Grade Cobalt Cuticle Nippers 4mm (Quarter Jaw)",
      "Japanese 440C Convex Edge Salon Hair Shears 6.0\"",
      "Master Damascus Folding Barber Straight Razor",
      "Russian Manicure Micro-Curved Scissors 21mm",
    ],
    priceRange: "From $17.50 – $139.00 (MSRP up to $185.00)",
    description:
      "Ultra-fine micro-textured diamond fiber tips, hand-honed convex razor shears, and Damascus steel shavettes. Universal export classification (HS 8203/8214) with zero regulatory import hurdles.",
    standard: "Japanese Hitachi 440C & Cryo Hardened",
  },
]

export default function CategoriesShowcase() {
  const handleSelectCategory = (categoryId: string) => {
    window.dispatchEvent(new CustomEvent("ash-filter-category", { detail: categoryId }))
    const el = document.getElementById("catalog")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="categories" className="py-16 sm:py-24 bg-[#080c16] border-b border-amber-500/15 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 tracking-wider uppercase">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Dedicated Manufacturing Divisions</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Four Specialized Instrument Divisions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            From hospital operating theaters and dental clinics to ophthalmic surgical microsuites and master beauty academies, ASH Instruments delivers certified surgical cutlery with direct factory warranties.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((cat, i) => {
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="studio-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-amber-400/35 transition-all cursor-pointer"
                onClick={() => handleSelectCategory(cat.id)}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-2xl border border-amber-400/25 group-hover:bg-amber-400/15 group-hover:border-amber-400/40 transition-colors">
                      {cat.icon}
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
                      Key Manufactured Models:
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
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {cat.standard}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelectCategory(cat.id)
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors"
                  >
                    <span>Browse Section</span>
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
