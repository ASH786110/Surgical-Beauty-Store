import React from "react"
import { MessageCircle, Mail, ShieldCheck, Lock } from "lucide-react"

interface FooterProps {
  onOpenAdmin?: () => void
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="border-t border-white/10 bg-[#04060b] text-slate-300 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          {/* Brand Column with Official Logo */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/logo_ash_instruments_1791532110951.jpg"
                alt="ASH Instruments Official Logo"
                className="h-10 w-10 rounded-full border border-cyan-500/30 object-cover shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-white tracking-wider leading-tight">
                  ASH INSTRUMENTS
                </span>
                <span className="text-[10px] text-slate-400 tracking-widest uppercase">
                  Askari Surgical Hubs
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Askari Surgical Hubs. Manufacturers of authentic, laser-engraved beauty, salon, and surgical precision cutlery. Hand-honed German and Japanese alloys at competitive factory-direct wholesale rates.
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
                <span>WhatsApp: +923497560980</span>
              </a>
              <a
                href="mailto:askarisurgicalhubs@gmail.com"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-cyan-400" />
                <span>askarisurgicalhubs@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Beauty Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-cyan-400">
              Beauty Lines
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => { e.preventDefault(); handleScroll("catalog") }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  90° Fiber-Tip Lash Tweezers
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => { e.preventDefault(); handleScroll("catalog") }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Curved 45° Isolation Tweezers
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => { e.preventDefault(); handleScroll("catalog") }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Pro Cuticle Nippers (4mm / 6mm)
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => { e.preventDefault(); handleScroll("catalog") }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Japanese 440C Hair Shears
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => { e.preventDefault(); handleScroll("catalog") }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Dermatology Comedone Extractors
                </a>
              </li>
            </ul>
          </div>

          {/* OEM & Customization */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-cyan-400">
              OEM & Private Label
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="#quality"
                  onClick={(e) => { e.preventDefault(); handleScroll("quality") }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Laser Logo Engraving (Official Hallmark)
                </a>
              </li>
              <li>
                <a
                  href="#quality"
                  onClick={(e) => { e.preventDefault(); handleScroll("quality") }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Gold Plasma & Titanium Black Nitride
                </a>
              </li>
              <li>
                <a
                  href="#quality"
                  onClick={(e) => { e.preventDefault(); handleScroll("quality") }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Salon Academy Student Kits
                </a>
              </li>
              <li>
                <a
                  href="#quality"
                  onClick={(e) => { e.preventDefault(); handleScroll("quality") }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Custom Magnetic Box Packaging
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Ordering */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-cyan-400">
              Wholesale Orders
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct factory supply for salons, distributors, and academies across North America, Europe, Australia, and the Middle East.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/923497560980?text=Hello%20ASH%20Instruments%2C%20please%20send%20me%20your%20full%20beauty%20instruments%20wholesale%20price%20list."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp (+923497560980)
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Discreet Admin Access */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ASH instruments (Askari Surgical Hubs). All rights reserved.</p>
          
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span>WhatsApp: +923497560980</span>
            <span className="text-slate-700">·</span>
            <span>askarisurgicalhubs@gmail.com</span>
            <span className="text-slate-700">·</span>
            <span className="text-cyan-400 font-mono">100% Genuine Laser Hallmarked</span>

            {/* Discreet Management Portal Trigger for owner */}
            {onOpenAdmin && (
              <>
                <span className="text-slate-700">·</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="text-slate-500 hover:text-cyan-400 transition-colors inline-flex items-center gap-1 opacity-70 hover:opacity-100"
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
