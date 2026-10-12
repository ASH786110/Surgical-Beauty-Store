import React, { useState } from "react"
import { ProductRecord } from "@/src/services/db"
import {
  ArrowLeft,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Check,
  Sparkles,
  Award,
  Layers,
  Flame,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/src/context/CartContext"
import InstrumentZoomLoupe from "@/src/components/beauty/InstrumentZoomLoupe"

interface ProductDetailViewProps {
  product: ProductRecord
  onBack: () => void
}

export default function ProductDetailView({ product, onBack }: ProductDetailViewProps) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [customBrandName, setCustomBrandName] = useState("")

  const wholesale10 = product.wholesalePrice
  const wholesale50 = Math.round(product.wholesalePrice * 0.82 * 100) / 100

  const whatsappMessage = encodeURIComponent(
    `Hello ASH Instruments (Askari Surgical Hubs),\nI want to order:\nProduct: ${product.name} [REF: ${product.ref}]\nQuantity: ${qty} units\nUnit Rate: $${(
      qty >= 50 ? wholesale50 : qty >= 10 ? wholesale10 : product.price
    ).toFixed(2)}\nCustom Laser Engraving: ${customBrandName || "Standard ASH Instruments Logo"}\nPlease send formal proforma invoice and shipping dispatch details.`
  )

  return (
    <div className="min-h-screen bg-[#080b12] text-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="gap-2 text-xs border-white/15 bg-white/5 text-slate-200 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalog
          </Button>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>MODEL REF:</span>
            <span className="font-mono font-bold text-white bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-md">
              {product.ref}
            </span>
          </div>
        </div>

        {/* Product Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Product Image on Clean Studio Card with Interactive Microscope Zoom */}
          <div className="lg:col-span-6 studio-card rounded-2xl p-6 overflow-hidden border border-amber-500/20 shadow-2xl">
            <div className="relative aspect-4/3 w-full flex items-center justify-center bg-[#05070c] rounded-xl overflow-hidden border border-amber-500/20 shadow-inner">
              <InstrumentZoomLoupe
                src={product.image}
                alt={product.name}
                className="h-full w-full"
                hallmarkText={`ASH INSTRUMENTS · ${product.ref} · ${product.size || product.specifications.length}`}
                zoomFactor={2.7}
                lensSize={175}
              />

              {/* Free Custom Engraving Badge */}
              <div className="pointer-events-none absolute bottom-3 right-3 z-10 bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 shadow-md">
                <span>Free Custom Laser Engraving (20+ pcs)</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                {product.qualityGrade || "Export Grade · Krupp Inox 420 & Japanese 440C"}
              </span>
              <span className="text-emerald-400 font-semibold font-mono text-xs flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                In Factory Stock
              </span>
            </div>
          </div>

          {/* Right: Pricing, Specs & Direct Order Triggers */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <span className="text-white">{product.category}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{product.alloy}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-amber-300/90 font-semibold">{product.finish}</span>
              </div>

              <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {product.name}
              </h1>

              {/* Physical Size & Dimensions Headline Bar */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="bg-amber-400/10 border border-amber-400/30 text-amber-200 px-3 py-1 rounded-lg flex items-center gap-1.5">
                  <span className="text-slate-400 text-[10px] uppercase font-sans font-semibold">Exact Size:</span>
                  <span className="font-bold">{product.size || product.specifications.length}</span>
                </span>
                {product.weight && (
                  <span className="bg-white/[0.05] border border-white/10 text-slate-200 px-3 py-1 rounded-lg flex items-center gap-1.5">
                    <span className="text-slate-400 text-[10px] uppercase font-sans font-semibold">Weight:</span>
                    <span className="font-bold">{product.weight}</span>
                  </span>
                )}
                <span className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-lg text-[11px] font-sans font-semibold">
                  100% Sialkot Export Grade
                </span>
              </div>

              {/* Official Pricing & Bulk Trade Discount Grid */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className={`p-3 rounded-xl border transition-all ${qty < 10 ? "bg-white/10 border-white/30" : "bg-white/[0.03] border-white/[0.08]"}`}>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">1–9 pcs (Single)</div>
                  <div className="text-xl font-black font-mono text-white mt-1">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Official List Price</div>
                </div>

                <div className={`p-3 rounded-xl border transition-all ${qty >= 10 && qty < 50 ? "bg-white/10 border-emerald-500/50" : "bg-white/[0.03] border-white/[0.08]"}`}>
                  <div className="text-[10px] text-emerald-400 font-bold uppercase">10–49 pcs (Salon Pack)</div>
                  <div className="text-xl font-black font-mono text-emerald-400 mt-1">
                    ${wholesale10.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-emerald-400/80 font-semibold mt-0.5">
                    Save {Math.round(((product.price - wholesale10) / product.price) * 100)}% / unit
                  </div>
                </div>

                <div className={`p-3 rounded-xl border transition-all ${qty >= 50 ? "bg-emerald-950/40 border-emerald-400" : "bg-white/[0.03] border-white/[0.08]"}`}>
                  <div className="text-[10px] text-amber-300 font-bold uppercase">50+ pcs (Bulk Order)</div>
                  <div className="text-xl font-black font-mono text-amber-300 mt-1">
                    ${wholesale50.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-amber-300/80 font-semibold mt-0.5">
                    Save {Math.round(((product.price - wholesale50) / product.price) * 100)}% + Free Logo
                  </div>
                </div>
              </div>
            </div>

            {/* Original Technical Review */}
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <div className="text-[11px] font-bold uppercase tracking-wider text-white mb-1.5 flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-amber-300" />
                Artisanal Metallurgy & Quality Standards
              </div>
              <p>{product.description}</p>
            </div>

            {/* Key Features */}
            <div className="space-y-1.5">
              {product.keyFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Technical Specifications Table */}
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-xs space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5 mb-2">
                <Sparkles className="h-4 w-4 text-slate-300" />
                Factory Engineering Parameters
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-slate-400">
                <span>Jaw / Blade Alignment:</span>
                <span className="font-medium text-white">{product.specifications.bladeOrTip}</span>
                <span>Rockwell Hardness:</span>
                <span className="font-mono text-white font-semibold">{product.specifications.hardnessRating}</span>
                <span>Sterilization:</span>
                <span className="text-white">{product.specifications.sterilization}</span>
                <span>Overall Length:</span>
                <span className="font-mono text-white">{product.specifications.length}</span>
                <span>Warranty:</span>
                <span className="text-emerald-400 font-medium">{product.specifications.warranty}</span>
                <span>Export HS Code:</span>
                <span className="text-amber-200 font-mono font-medium">{product.hsCode || "HS 8214.20"}</span>
                <span>Import Status:</span>
                <span className="text-emerald-400 font-medium">100% Non-Medical (No FDA/CE Barriers)</span>
              </div>
            </div>

            {/* Interactive Live Custom Laser Engraving Simulator */}
            <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  Try Your Custom Salon Name on the Steel:
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">Free on 20+ pcs</span>
              </div>

              <Input
                type="text"
                placeholder="Enter your salon or brand name (e.g. Bella Lash Studio)..."
                value={customBrandName}
                onChange={(e) => setCustomBrandName(e.target.value)}
                maxLength={32}
                className="bg-black/40 border-white/15 text-white text-xs h-9 placeholder:text-slate-500 rounded-lg"
              />

              {/* Steel Blade Preview with Laser Simulation */}
              <div className="relative py-3 px-4 rounded-lg bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-white/10 flex items-center justify-between text-xs font-mono overflow-hidden">
                <span className="text-slate-400 text-[10px]">LASER SIMULATION:</span>
                <div className="flex items-center gap-2 text-amber-200/90 font-bold tracking-widest uppercase">
                  <span>ASH INSTRUMENTS</span>
                  <span className="text-slate-600">·</span>
                  <span className={customBrandName ? "text-emerald-300 underline underline-offset-2" : "text-slate-500 italic"}>
                    {customBrandName || "[YOUR BRAND NAME HERE]"}
                  </span>
                </div>
              </div>
            </div>

            {/* Purchase & WhatsApp Actions */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl border border-white/15 bg-white/[0.04]">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3.5 py-2 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 rounded-l-xl"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-mono font-bold tabular-nums text-white">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="px-3.5 py-2 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 rounded-r-xl"
                  >
                    +
                  </button>
                </div>

                <Button
                  onClick={() => addItem(product, qty)}
                  className="flex-1 gap-2 bg-white text-slate-950 hover:bg-slate-200 text-xs sm:text-sm font-bold h-11 rounded-xl shadow-lg transition-all"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Order Bag ($
                  {(
                    (qty >= 50 ? wholesale50 : qty >= 10 ? wholesale10 : product.price) * qty
                  ).toFixed(2)}
                  )
                </Button>
              </div>

              {/* Direct WhatsApp Order */}
              <a
                href={`https://wa.me/923497560980?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  className="w-full gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm h-11 rounded-xl shadow-md transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  Order on WhatsApp with Factory Proforma (+923497560980)
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
