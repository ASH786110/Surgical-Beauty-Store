import React, { useState } from "react"
import { BeautyInstrument } from "@/src/data/beauty-instruments"
import { X, MessageCircle, ShoppingBag, Check, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/src/context/CartContext"
import InstrumentZoomLoupe from "@/src/components/beauty/InstrumentZoomLoupe"

interface QuickViewModalProps {
  instrument: BeautyInstrument | null
  onClose: () => void
}

export default function QuickViewModal({ instrument, onClose }: QuickViewModalProps) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)

  if (!instrument) return null

  const handleAdd = () => {
    addItem(instrument, qty)
    onClose()
  }

  const wholesale10 = instrument.wholesalePrice
  const wholesale50 = Math.round(instrument.wholesalePrice * 0.82 * 100) / 100
  const unitPrice = qty >= 50 ? wholesale50 : qty >= 10 ? wholesale10 : instrument.price

  const whatsappMessage = encodeURIComponent(
    `Hello ASH Instruments,\nI want to order:\n${instrument.name} [REF: ${instrument.ref}]\nQuantity: ${qty}\nUnit Rate: $${unitPrice.toFixed(2)}\nTotal: $${(unitPrice * qty).toFixed(2)}\nPlease confirm availability and dispatch options.`
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#090d16] shadow-2xl text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-slate-400 hover:text-white hover:bg-white/20 transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Product Image with Microscope Loupe */}
          <div className="relative bg-[#05070c] p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-amber-500/20">
            <div className="w-full aspect-square rounded-xl overflow-hidden relative">
              <InstrumentZoomLoupe
                src={instrument.image}
                alt={instrument.name}
                className="h-full w-full"
                hallmarkText={`ASH INSTRUMENTS · ${instrument.ref} · ${instrument.size || instrument.specifications.length}`}
                zoomFactor={2.7}
                lensSize={160}
              />
            </div>
          </div>

          {/* Details & Specs */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                <span className="text-white">{instrument.category}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{instrument.alloy}</span>
              </div>

              <h3 className="mt-2 text-xl font-bold text-white">
                {instrument.name}
              </h3>

              {/* Exact Size & Export Grade Badge in QuickView */}
              <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="bg-amber-400/10 border border-amber-400/30 text-amber-200 px-2.5 py-0.5 rounded">
                  📏 {instrument.size || instrument.specifications.length}
                </span>
                {instrument.weight && (
                  <span className="bg-white/[0.05] border border-white/10 text-slate-300 px-2 py-0.5 rounded">
                    ⚖️ {instrument.weight}
                  </span>
                )}
                <span className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-sans font-semibold">
                  Export Grade
                </span>
              </div>

              {/* Tier Pricing Cards with Official Price and Bulk Discount */}
              <div className="mt-3.5 grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Official 1 pc Price</div>
                  <div className="text-lg font-bold font-mono text-white">${instrument.price.toFixed(2)}</div>
                  <div className="text-[9px] text-slate-400">Single Unit Rate</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-emerald-500/30">
                  <div className="text-[10px] text-emerald-400 uppercase font-semibold">10+ Bulk Order Rate</div>
                  <div className="text-lg font-bold font-mono text-emerald-400">${wholesale10.toFixed(2)} / pc</div>
                  <div className="text-[9px] text-emerald-400/90 font-medium">
                    Save {Math.round(((instrument.price - wholesale10) / instrument.price) * 100)}% Trade Discount
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                {instrument.description}
              </p>

              <div className="mt-4 pt-3 border-t border-white/[0.08]">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Technical Specifications
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tip / Jaw:</span>
                    <span className="font-medium text-white">{instrument.specifications.bladeOrTip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hardness:</span>
                    <span className="font-mono text-white font-semibold">{instrument.specifications.hardnessRating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Length:</span>
                    <span className="font-mono text-white">{instrument.specifications.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sanitization:</span>
                    <span className="text-white">{instrument.specifications.sterilization}</span>
                  </div>
                  {instrument.hsCode && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Customs HS:</span>
                      <span className="text-amber-200 font-mono text-[11px] font-semibold">{instrument.hsCode}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Regulation:</span>
                    <span className="text-emerald-400 font-medium text-[11px]">100% Non-Medical (Zero Permits)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl border border-white/15 bg-white/[0.04]">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-mono font-bold tabular-nums text-white">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white"
                  >
                    +
                  </button>
                </div>

                <Button
                  onClick={handleAdd}
                  className="flex-1 gap-2 bg-white text-slate-950 hover:bg-slate-200 text-xs font-bold h-9 rounded-xl shadow-md transition-colors"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Order (${(unitPrice * qty).toFixed(2)})
                </Button>
              </div>

              <a
                href={`https://wa.me/923497560980?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  className="w-full gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl h-9 shadow-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  Order via WhatsApp (+923497560980)
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
