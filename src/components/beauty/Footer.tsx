import React from "react"
import { MessageCircle, Mail, ShieldCheck, Lock, Sparkles } from "lucide-react"

interface FooterProps {
  onOpenAdmin?: () => void
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const handleScroll = (id: string, category?: string) => {
    if (category) {
      window.dispatchEvent(new CustomEvent("ash-filter-category", { detail: category }))
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="border-t border-white/10 bg-[#04060b] text-slate-300 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          {/* Brand Column with Official Logo */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="./images/logo_ash_instruments_1791532110951.jpg"
                alt="ASH Instruments Official Logo"
                className="h-10 w-10 rounded-full border border-amber-400/40 object-cover shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-white tracking-wider leading-tight">
                  ASH INSTRUMENTS
                </span>
                <span className="text-[10px] text-amber-300/80 tracking-widest uppercase">
                  Askari Surgical Hubs · Est. Sialkot
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Official manufacturer and exporter of General Surgery, Dental Instruments, Ophthalmic Microsurgery, and Professional Beauty Cutlery. Crafted from certified German Inox, Tungsten Carbide, and Japanese 440C alloys at direct factory export rates.
            </p>

            {/* Direct Contact Links */}
            <div className="pt-2 space-y-2 text-xs">
              <a
                href="https://wa.me/923497560980"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Desk: +923497560980</span>
              </a>
              <a
                href="mailto:askarisurgicalhubs@gmail.com"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-amber-400" />
                <span>askarisurgicalhubs@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Division 1 & 2: Surgical & Dental */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-amber-300">
              Surgical & Dental
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => { e.preventDefault(); handleScroll("catalog", "General Surgery") }}
                  className="hover:text-amber-200 transition-colors"
                >
                  Mayo-Hegar Needle Holders (TC)
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => { e.preventDefault(); handleScroll("catalog", "General Surgery") }}
                  className="hover:text-amber-200 transition-colors"
                >
                  Metzenbaum Curved Dissecting TC
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => { e.preventDefault(); handleScroll("catalog", "General Surgery") }}
                  className="hover:text-amber-200 transition-colors"
                >
                  DeBakey Atraumatic Forceps
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => { e.preventDefault(); handleScroll("catalog", "Dental Instruments") }}
                  className="hover:text-amber-200 transition-colors"
                >
                  Dental Extracting Forceps #150
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => { e.preventDefault(); handleScroll("catalog", "Dental Instruments") }}
                  className="hover:text-amber-200 transition-colors"
                >
                  Periodontal Sickle Scaler Kits
                </a>
              </li>
            </ul>
          </div>

          {/* Division 3 & 4: Eye Microsurgery & Beauty */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-amber-300">
              Eye & Beauty Cutlery
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => { e.preventDefault(); handleScroll("catalog", "Eye / Ophthalmic") }}
                  className="hover:text-amber-200 transition-colors"
                >
                  Castroviejo Micro Needle Holder
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => { e.preventDefault(); handleScroll("catalog", "Eye / Ophthalmic") }}
                  className="hover:text-amber-200 transition-colors"
                >
                  Iris Micro Curved Scissors
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => { e.preventDefault(); handleScroll("catalog", "Beauty & Salon") }}
                  className="hover:text-amber-200 transition-colors"
                >
                  90° Fiber-Tip Volume Tweezers
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => { e.preventDefault(); handleScroll("catalog", "Beauty & Salon") }}
                  className="hover:text-amber-200 transition-colors"
                >
                  Russian Cobalt Cuticle Nippers 4mm
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => { e.preventDefault(); handleScroll("catalog", "Beauty & Salon") }}
                  className="hover:text-amber-200 transition-colors"
                >
                  Japanese 440C Barber Shears
                </a>
              </li>
            </ul>
          </div>

          {/* Quality, Standards & Wholesale */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-amber-300">
              Certifications & Export
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Supplying hospitals, clinics, dental centers, and master academies worldwide.
            </p>
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div className="text-emerald-400 font-mono">✓ DIN EN ISO 13485:2016</div>
              <div className="text-emerald-400 font-mono">✓ CE Class I / IIa Compliant</div>
              <div className="text-amber-300 font-mono">✓ Class B Autoclave 134°C</div>
              <div className="text-slate-300 font-mono">✓ HS 9018 / 8203 / 8214</div>
            </div>
            <div className="pt-2">
              <a
                href="https://wa.me/923497560980?text=Hello%20ASH%20Instruments%2C%20please%20send%20me%20your%20full%20instruments%20catalog%20and%20official%20wholesale%20price%20list."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  Wholesale Inquiry (+923497560980)
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Discreet Admin Access */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ASH Instruments (Askari Surgical Hubs). All rights reserved.</p>
          
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span>WhatsApp: +923497560980</span>
            <span className="text-slate-700">·</span>
            <span>askarisurgicalhubs@gmail.com</span>
            <span className="text-slate-700">·</span>
            <span className="text-amber-400 font-mono">100% Genuine Laser Hallmarked</span>

            {/* Discreet Management Portal Trigger for owner */}
            {onOpenAdmin && (
              <>
                <span className="text-slate-700">·</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="text-slate-500 hover:text-amber-400 transition-colors inline-flex items-center gap-1 opacity-70 hover:opacity-100"
                  title="Askari Management Portal (3 DBs)"
                >
                  <Lock className="h-3 w-3" />
                  <span>Staff Portal</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
