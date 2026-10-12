import React, { useState } from "react"
import { MessageCircle, Copy, Check, Globe2 } from "lucide-react"

export default function TopUrgencyBar() {
  const [copied, setCopied] = useState(false)

  const copyCoupon = () => {
    navigator.clipboard.writeText("ASH-VIP10")
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="relative z-30 bg-[#080c16] text-slate-300 py-2 px-4 border-b border-amber-500/15 text-xs">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3 relative z-10">
        {/* Left: Factory Direct Authentication */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white tracking-wide text-[11px]">
            Sialkot Cutlery Atelier · Direct Factory Export Rates
          </span>
          <span className="hidden md:inline-block text-amber-500/30">|</span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-amber-200/80">
            <Globe2 className="h-3 w-3 text-amber-400" />
            Supplying Salons & Academies in UK, USA, UAE & Europe
          </span>
        </div>

        {/* Right: Clean Voucher & Instant WhatsApp Desk */}
        <div className="flex items-center gap-3 ml-auto text-[11px]">
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-md border border-amber-400/20">
            <span className="text-slate-400">Factory Voucher:</span>
            <button
              onClick={copyCoupon}
              className="inline-flex items-center gap-1 bg-amber-400/10 text-amber-200 px-2 py-0.5 rounded font-mono font-bold hover:bg-amber-400/20 transition-colors"
              title="Click to copy voucher code"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 text-amber-300" />
                  <span>ASH-VIP10</span>
                </>
              )}
            </button>
            <span className="text-[10px] text-emerald-400 font-semibold">(10% OFF Sample)</span>
          </div>

          <a
            href="https://wa.me/923497560980?text=Hello%20ASH%20Instruments%2C%20I%20have%20promo%20code%20ASH-VIP10%20and%20want%20to%20order%20beauty%20instruments%20at%20direct%20factory%20rates."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-mono">+923497560980</span>
          </a>
        </div>
      </div>
    </div>
  )
}
