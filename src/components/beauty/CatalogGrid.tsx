import React, { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { db, ProductRecord } from "@/src/services/db"
import { Search, Eye, ShoppingBag, MessageCircle, Check, Sparkles, Star, ShieldCheck, Stethoscope, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/src/context/CartContext"
import QuickViewModal from "./QuickViewModal"

interface CatalogGridProps {
  onSelectProduct?: (product: ProductRecord) => void
}

type Currency = "USD" | "PKR" | "EUR" | "AED"

const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: "$", rate: 1, label: "USD" },
  PKR: { symbol: "Rs. ", rate: 278, label: "PKR" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR" },
  AED: { symbol: "AED ", rate: 3.67, label: "AED" },
}

export const CATALOG_SECTIONS = [
  { id: "All", label: "All Instruments", icon: "🌐", desc: "Comprehensive export inventory of surgical, dental, ophthalmic, and beauty cutlery." },
  { id: "General Surgery", label: "General Surgery", icon: "🩺", desc: "Hospital operating suite instruments · DIN EN ISO 13485 & CE certified German surgical alloys." },
  { id: "Dental Instruments", label: "Dental Instruments", icon: "🦷", desc: "Clinical extraction, periodontal hygiene & oral surgery instruments · Autoclave 134°C safe." },
  { id: "Eye / Ophthalmic", label: "Eye / Ophthalmic", icon: "👁️", desc: "Microsurgical ophthalmic instruments · Tungsten carbide needle holders & micro-fine iris scissors." },
  { id: "Beauty & Salon", label: "Beauty & Salon", icon: "✂️", desc: "Master artisan volume lash tweezers, Russian manicure nippers & Japanese 440C salon shears." },
]

export default function CatalogGrid({ onSelectProduct }: CatalogGridProps) {
  const { addItem } = useCart()
  const [products, setProducts] = useState<ProductRecord[]>(db.getProducts())
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currency, setCurrency] = useState<Currency>("USD")
  const [activeModalInstrument, setActiveModalInstrument] = useState<ProductRecord | null>(null)
  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null)

  // Subscribe to DB updates
  useEffect(() => {
    const unsub = db.subscribe(() => {
      setProducts(db.getProducts())
    })
    return unsub
  }, [])

  // Listen to navigation custom events from Navbar or Showcase
  useEffect(() => {
    const handleCategoryEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      if (customEvent.detail) {
        setSelectedCategory(customEvent.detail)
      }
    }
    window.addEventListener("ash-filter-category", handleCategoryEvent)
    return () => window.removeEventListener("ash-filter-category", handleCategoryEvent)
  }, [])

  const filteredInstruments = useMemo(() => {
    return products.filter((inst) => {
      const matchCat =
        selectedCategory === "All" ||
        inst.category === selectedCategory ||
        inst.department === selectedCategory
      const matchQuery =
        searchQuery.trim() === "" ||
        inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.alloy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inst.department && inst.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
        inst.description.toLowerCase().includes(searchQuery.toLowerCase())

      return matchCat && matchQuery
    })
  }, [products, selectedCategory, searchQuery])

  const handleAddToCart = (inst: ProductRecord) => {
    addItem(inst, 1)
    setAddedNoticeId(inst.id)
    setTimeout(() => {
      setAddedNoticeId((current) => (current === inst.id ? null : current))
    }, 1800)
  }

  const formatPrice = (usd: number) => {
    const curr = CURRENCY_RATES[currency]
    const converted = usd * curr.rate
    if (currency === "PKR") {
      return `${curr.symbol}${Math.round(converted).toLocaleString()}`
    }
    return `${curr.symbol}${converted.toFixed(2)}`
  }

  const activeSectionInfo = CATALOG_SECTIONS.find((s) => s.id === selectedCategory) || CATALOG_SECTIONS[0]

  return (
    <section id="catalog" className="relative py-16 sm:py-24 bg-[#080c16] border-b border-amber-500/15 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300/90 tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Official ASH Instruments Catalog · 100% Certified Surgical Grade</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Surgical, Dental, Ophthalmic & Beauty Cutlery
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Direct manufacturer exports from Sialkot, Pakistan. Forged from certified German Inox, AISI 420/316L, and Japanese cobalt alloys. Every instrument is hallmarked with the official <span className="text-amber-300 font-bold">ASH INSTRUMENTS</span> mark.
            </p>
          </div>

          {/* Right Toolbar: Currency Switcher & Search Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Currency selector */}
            <div className="inline-flex rounded-lg border border-amber-400/20 bg-slate-900/80 p-1">
              {(Object.keys(CURRENCY_RATES) as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                    currency === c
                      ? "bg-amber-400 text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search Mayo-Hegar, Forceps, Shears..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-8 text-xs h-9 bg-slate-900/80 border-amber-400/20 text-slate-100 placeholder:text-slate-500 rounded-lg focus:border-amber-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Major Category & Section Tabs (Separate Section for Each Requirement) */}
        <div className="mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {CATALOG_SECTIONS.map((section) => {
              const count =
                section.id === "All"
                  ? products.length
                  : products.filter(
                      (p) => p.category === section.id || p.department === section.id
                    ).length
              const isSelected = selectedCategory === section.id

              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedCategory(section.id)}
                  className={`p-3 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between ${
                    isSelected
                      ? "bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/20 scale-[1.02]"
                      : "bg-slate-900/80 text-slate-300 border-amber-400/15 hover:border-amber-400/40 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{section.icon}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isSelected ? "bg-slate-950 text-amber-300" : "bg-white/10 text-slate-300"
                      }`}
                    >
                      {count} items
                    </span>
                  </div>
                  <div className="mt-2 font-bold text-xs sm:text-sm leading-tight">
                    {section.label}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Department Info Banner */}
          <div className="mt-4 p-3.5 rounded-xl bg-amber-400/[0.04] border border-amber-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-400/20 text-amber-300 text-sm shrink-0">
                {activeSectionInfo.icon}
              </span>
              <span className="text-slate-300">
                <strong className="text-white">{activeSectionInfo.label} Section:</strong>{" "}
                {activeSectionInfo.desc}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto text-[10px] font-mono">
              <span className="bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 px-2.5 py-1 rounded">
                Official Factory Direct Rates
              </span>
              <span className="bg-amber-950/70 border border-amber-500/30 text-amber-300 px-2 py-1 rounded">
                Discount Applied
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid with Framer Motion */}
        {filteredInstruments.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-slate-400 text-sm">
              No instruments found matching "{searchQuery}".
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
              className="mt-4 text-xs border-amber-400/20 text-amber-200"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredInstruments.map((instrument, index) => {
              const waText = encodeURIComponent(
                `Hello ASH Instruments,\nI want to order official instruments:\n${instrument.name} [REF: ${instrument.ref}]\nDepartment: ${instrument.department || instrument.category}\nOfficial List Price: $${instrument.msrpPrice.toFixed(2)}\nDiscounted Rate: ${formatPrice(instrument.price)}\nBulk 10+ Rate: ${formatPrice(instrument.wholesalePrice)}/pc\nPlease share dispatch details and invoice.`
              )

              // Department color coding
              const isSurg = instrument.department === "General Surgery" || instrument.category === "General Surgery"
              const isDent = instrument.department === "Dental Instruments" || instrument.category === "Dental Instruments"
              const isEye = instrument.department === "Eye / Ophthalmic" || instrument.category === "Eye / Ophthalmic"

              const badgeColor = isSurg
                ? "bg-blue-950/80 text-blue-300 border-blue-500/30"
                : isDent
                ? "bg-teal-950/80 text-teal-300 border-teal-500/30"
                : isEye
                ? "bg-purple-950/80 text-purple-300 border-purple-500/30"
                : "bg-amber-950/80 text-amber-300 border-amber-500/30"

              const discountPercent = Math.round(
                ((instrument.msrpPrice - instrument.price) / instrument.msrpPrice) * 100
              )

              return (
                <motion.div
                  key={instrument.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: (index % 4) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="studio-card rounded-2xl overflow-hidden flex flex-col justify-between group relative"
                >
                  <div>
                    {/* Image Container with Subtle Steel Gleam on Hover */}
                    <div className="relative aspect-4/3 bg-[#05070c] overflow-hidden steel-gleam-container">
                      <img
                        src={instrument.image}
                        alt={instrument.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />

                      {/* Official Laser Hallmark Stamp on Instrument */}
                      <div className="absolute bottom-2.5 left-2.5 rounded-md bg-[#090d16]/95 px-2.5 py-1 border border-amber-400/35 text-[9px] font-mono text-amber-200 flex items-center gap-1.5 shadow-md backdrop-blur-md">
                        <Sparkles className="h-3 w-3 text-amber-400 shrink-0" />
                        <span className="font-bold tracking-wider">ASH INSTRUMENTS</span>
                        <span className="text-amber-400/50">·</span>
                        <span className="text-[8px] text-emerald-400 font-sans uppercase font-semibold">
                          {isSurg || isDent || isEye ? "Surgical CE" : "Export Grade"}
                        </span>
                      </div>

                      {/* Physical Size & Length Badge on Image */}
                      <div className="absolute bottom-2.5 right-2.5 rounded-md bg-[#090d16]/95 px-2 py-0.5 border border-white/20 text-[9px] font-mono text-white flex items-center gap-1 shadow-md backdrop-blur-md">
                        <span className="text-slate-400 text-[8px] uppercase">Size:</span>
                        <span className="font-bold text-amber-300">{instrument.size || instrument.specifications.length}</span>
                      </div>

                      {/* Quick Specs Overlay on Hover */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveModalInstrument(instrument)
                        }}
                        className="absolute inset-x-0 bottom-0 py-2.5 bg-[#090d16]/95 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity border-t border-amber-400/20"
                      >
                        <Eye className="h-3.5 w-3.5 text-amber-300" />
                        Quick Metallurgy & Dimensions
                      </button>

                      {/* REF Tag */}
                      <div className="absolute top-2.5 left-2.5 bg-[#090d16]/90 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-amber-300 border border-amber-400/20">
                        {instrument.ref}
                      </div>

                      {/* Department Tag */}
                      <div className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[9px] font-medium border ${badgeColor}`}>
                        {instrument.department || instrument.category}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-semibold text-amber-400/90 uppercase tracking-wider text-[10px]">
                          {instrument.alloy}
                        </span>
                        <div className="flex items-center gap-1 text-slate-400">
                          <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                          <span className="text-[11px] font-bold text-white">{instrument.rating.toFixed(1)}</span>
                          <span className="text-[10px] text-slate-500">({instrument.reviewCount})</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => onSelectProduct?.(instrument)}
                        className="mt-2 text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1 cursor-pointer"
                        title={instrument.name}
                      >
                        {instrument.name}
                      </h3>

                      {/* Explicit Size, Weight & Grade Badges */}
                      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                        <span className="bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded text-amber-200">
                          📏 {instrument.size || instrument.specifications.length}
                        </span>
                        {instrument.weight && (
                          <span className="bg-white/[0.04] border border-white/10 px-1.5 py-0.5 rounded text-slate-300">
                            ⚖️ {instrument.weight}
                          </span>
                        )}
                        <span className="bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded text-emerald-300 font-sans text-[9px] font-semibold">
                          {isSurg || isDent || isEye ? "DIN ISO 13485" : "Export Grade"}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {instrument.description}
                      </p>

                      {/* Pricing Display with Official MSRP, Discounted Price & Bulk Discount */}
                      <div className="mt-4 pt-3 border-t border-white/[0.08]">
                        <div className="flex items-center justify-between text-[11px] mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-[10px]">Official List Price:</span>
                            <span className="line-through text-slate-400 font-mono text-[11px]">
                              {formatPrice(instrument.msrpPrice)}
                            </span>
                          </div>
                          <span className="text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] tracking-wide">
                            Save {discountPercent}% OFF
                          </span>
                        </div>

                        <div className="flex items-baseline justify-between bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.06]">
                          <div>
                            <div className="text-[9px] text-slate-400 uppercase font-semibold">
                              Discounted 1 pc Price
                            </div>
                            <div className="text-base sm:text-lg font-black font-mono text-white">
                              {formatPrice(instrument.price)}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-[9px] text-amber-400 font-semibold uppercase">
                              10+ Bulk Order Rate
                            </div>
                            <div className="text-sm font-bold font-mono text-amber-300">
                              {formatPrice(instrument.wholesalePrice)}{" "}
                              <span className="text-[10px] text-slate-400 font-normal">/ pc</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                        <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Ready for Dispatch
                        </span>
                        <span className="text-amber-300/80 font-medium">Free Custom Laser on 20+</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions: Order Tray & Direct WhatsApp */}
                  <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2 mt-2">
                    <Button
                      onClick={() => handleAddToCart(instrument)}
                      variant="outline"
                      size="sm"
                      className={`gap-1.5 border-amber-400/25 text-xs h-9 rounded-xl transition-all ${
                        addedNoticeId === instrument.id
                          ? "bg-emerald-600 border-emerald-500 text-white"
                          : "bg-slate-900/80 text-white hover:bg-slate-800 hover:border-amber-400/50"
                      }`}
                    >
                      {addedNoticeId === instrument.id ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-3.5 w-3.5 text-amber-300" />
                          <span>Order Tray</span>
                        </>
                      )}
                    </Button>

                    <a
                      href={`https://wa.me/923497560980?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button
                        size="sm"
                        className="w-full gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-9 rounded-xl shadow-sm transition-all"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>WhatsApp</span>
                      </Button>
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick View Metallurgy Modal */}
      {activeModalInstrument && (
        <QuickViewModal
          instrument={activeModalInstrument}
          onClose={() => setActiveModalInstrument(null)}
        />
      )}
    </section>
  )
}
