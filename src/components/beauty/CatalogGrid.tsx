import React, { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { db, ProductRecord } from "@/src/services/db"
import { Search, Eye, ShoppingBag, MessageCircle, Check, Sparkles, Star, ShieldCheck } from "lucide-react"
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

  const categories = [
    "All",
    "Lash & Brow",
    "Nail & Cuticle",
    "Hair & Barber",
    "Dermatology & Skin",
  ]

  const filteredInstruments = useMemo(() => {
    return products.filter((inst) => {
      const matchCat =
        selectedCategory === "All" || inst.category === selectedCategory
      const matchQuery =
        searchQuery.trim() === "" ||
        inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.alloy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  return (
    <section id="catalog" className="relative py-16 sm:py-24 bg-[#080c16] border-b border-amber-500/15 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300/90 tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Direct Sialkot Atelier Catalog · 100% Original Steel</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Professional Beauty Cutlery & Instruments
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Every tool is forged from certified stainless and Japanese cobalt alloys, laser-engraved with the official ASH Instruments mark, and priced at direct manufacturer rates.
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
                placeholder="Search tweezers, nippers..."
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

        {/* Category Filter Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pb-2">
          {categories.map((category) => {
            const count =
              category === "All"
                ? products.length
                : products.filter((p) => p.category === category).length
            const isSelected = selectedCategory === category

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 font-bold"
                    : "bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-amber-400/15"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isSelected ? "bg-slate-950 text-amber-200" : "bg-white/10 text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Universal Direct Export Notice */}
        <div className="mt-4 p-3 rounded-xl bg-amber-400/[0.05] border border-amber-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0">✓</span>
            <span className="text-slate-300">
              <strong className="text-amber-300">Universal Direct Import Implements:</strong> Zero FDA, Medical CE, or ISO 13485 restrictions. Hassle-free customs entry worldwide for salons, barbers & beauty retailers.
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded shrink-0 self-start sm:self-auto">
            HS 8213 / 8214 / 8203 / 8212
          </span>
        </div>

        {/* Products Grid with Framer Motion entrance */}
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
                `Hello ASH Instruments,\nI want to order:\n${instrument.name} [REF: ${instrument.ref}]\nSingle Sample: ${formatPrice(instrument.price)}\nWholesale 10+ Rate: ${formatPrice(instrument.wholesalePrice)}/pc\nPlease confirm factory stock and dispatch details.`
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
                        <span className="text-[8px] text-emerald-400 font-sans uppercase font-semibold">Export Quality</span>
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

                      {/* Finish Tag */}
                      <div className="absolute top-2.5 right-2.5 bg-[#090d16]/90 px-2 py-0.5 rounded text-[9px] text-slate-300 border border-white/10 font-medium">
                        {instrument.finish}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-semibold text-amber-400/90 uppercase tracking-wider text-[10px]">
                          {instrument.category}
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

                      {/* Explicit Size, Weight & Export Grade Badges */}
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
                          Export Grade
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {instrument.description}
                      </p>

                      {/* Pricing Display with Official Price and Bulk Discount */}
                      <div className="mt-4 pt-3 border-t border-white/[0.08]">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5">
                          <span className="font-medium text-slate-300">
                            Official Single Unit: <span className="font-mono font-bold text-white">{formatPrice(instrument.price)}</span>
                          </span>
                          <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded text-[9px]">
                            {Math.round(((instrument.price - instrument.wholesalePrice) / instrument.price) * 100)}% Bulk Discount
                          </span>
                        </div>

                        <div className="flex items-baseline justify-between bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.06]">
                          <div>
                            <div className="text-[9px] text-slate-400 uppercase font-semibold">Official 1 pc Price</div>
                            <div className="text-base font-bold font-mono text-white">
                              {formatPrice(instrument.price)}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-[9px] text-amber-400 font-semibold uppercase">
                              10+ Bulk Order Rate
                            </div>
                            <div className="text-sm font-bold font-mono text-amber-300">
                              {formatPrice(instrument.wholesalePrice)} <span className="text-[10px] text-slate-400 font-normal">/ pc</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                        <span className="flex items-center gap-1.5 text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Factory Stock
                        </span>
                        <span className="text-amber-300/80 font-medium">Free Custom Laser on 20+</span>
                      </div>

                      {/* Universal Import HS Code & Permit Status */}
                      <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px]">
                        <span className="text-slate-400 font-mono text-[9px]">
                          {instrument.hsCode ? instrument.hsCode.split(" ")[0] + " " + instrument.hsCode.split(" ")[1] : "HS 8214"}
                        </span>
                        <span className="text-emerald-400/90 font-medium flex items-center gap-1 text-[9px]">
                          <Check className="h-2.5 w-2.5" />
                          Zero Medical Barrier
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 sm:p-5 pt-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onSelectProduct?.(instrument)}
                        className="text-xs h-9 px-3 border-amber-400/20 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800"
                      >
                        Details
                      </Button>

                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(instrument)}
                        className="flex-1 h-9 px-3 text-xs font-bold gap-1.5 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/15"
                      >
                        {addedNoticeId === instrument.id ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-slate-950" />
                            Added to Tray
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="h-3.5 w-3.5" />
                            Add to Order
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Direct 1-Click WhatsApp Order Button */}
                    <a
                      href={`https://wa.me/923497560980?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full h-8 text-[11px] font-semibold gap-1.5 border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/50 hover:text-emerald-100 transition-colors"
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                        Order Directly on WhatsApp
                      </Button>
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {activeModalInstrument && (
        <QuickViewModal
          instrument={activeModalInstrument}
          onClose={() => setActiveModalInstrument(null)}
        />
      )}
    </section>
  )
}
