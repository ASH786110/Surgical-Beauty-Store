import React, { useState } from "react"
import { ShoppingBag, MessageCircle, Menu, X, ChevronDown, Stethoscope, Sparkles } from "lucide-react"
import { useCart } from "@/src/context/CartContext"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onOpenAdmin?: () => void
}

export default function Navbar({ onOpenAdmin }: NavbarProps) {
  const { totalCount, setIsCartOpen } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false)

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false)
    setDeptDropdownOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSelectDepartment = (dept: string) => {
    setMobileMenuOpen(false)
    setDeptDropdownOpen(false)
    window.dispatchEvent(new CustomEvent("ash-filter-category", { detail: dept }))
    const el = document.getElementById("catalog")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="w-full bg-[#080c16]/98 backdrop-blur-xl border-b border-amber-500/15">
      {/* Main Header */}
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Official ASH Emblem + Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="group flex items-center gap-3 whitespace-nowrap shrink-0"
        >
          <div className="relative">
            <img
              src="/src/assets/images/logo_ash_instruments_1791532110951.jpg"
              alt="ASH Instruments Official Logo"
              className="h-10 w-10 rounded-full border border-amber-400/40 object-cover transition-transform duration-200 group-hover:scale-105 shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-wider text-sm sm:text-base leading-tight text-white group-hover:text-amber-200 transition-colors">
                ASH INSTRUMENTS
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                OFFICIAL
              </span>
            </div>
            <span className="text-[10px] text-amber-300/80 font-semibold tracking-widest uppercase">
              Askari Surgical Hubs · Est. Sialkot
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links with Departments */}
        <div className="hidden lg:flex items-center gap-5 text-xs font-semibold uppercase tracking-wider text-slate-300">
          {/* Department Quick Filter Tabs */}
          <button
            onClick={() => handleSelectDepartment("General Surgery")}
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-800/60"
          >
            <span>General Surgery</span>
          </button>

          <button
            onClick={() => handleSelectDepartment("Dental Instruments")}
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-800/60"
          >
            <span>Dental</span>
          </button>

          <button
            onClick={() => handleSelectDepartment("Eye / Ophthalmic")}
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-800/60"
          >
            <span>Eye Instruments</span>
          </button>

          <button
            onClick={() => handleSelectDepartment("Beauty & Salon")}
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-800/60"
          >
            <span>Beauty & Salon</span>
          </button>

          <div className="h-4 w-px bg-white/10" />

          <a
            href="#quality"
            onClick={(e) => {
              e.preventDefault()
              handleScroll("quality")
            }}
            className="hover:text-amber-200 transition-colors"
          >
            Quality & OEM
          </a>

          <a
            href="#wholesale"
            onClick={(e) => {
              e.preventDefault()
              handleScroll("wholesale")
            }}
            className="hover:text-amber-200 transition-colors"
          >
            Wholesale Desk
          </a>
        </div>

        {/* Zone 3: Direct Actions (Order Tray Bag & WhatsApp Direct) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Order Tray Button */}
          <Button
            onClick={() => setIsCartOpen(true)}
            variant="outline"
            className="relative gap-2 border-amber-400/25 bg-slate-900/80 hover:bg-slate-800 text-white text-xs h-9 px-3.5 rounded-xl shadow-sm transition-all"
            title="Open Order Tray"
          >
            <ShoppingBag className="h-4 w-4 text-amber-300" />
            <span className="hidden sm:inline font-semibold">Order Tray</span>
            {totalCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-black text-slate-950 font-mono">
                {totalCount}
              </span>
            )}
          </Button>

          {/* Quick WhatsApp Inquiry CTA */}
          <a
            href="https://wa.me/923497560980?text=Hello%20ASH%20Instruments%2C%20I%20am%20interested%20in%20ordering%20surgical%2C%20dental%2C%20ophthalmic%2C%20and%20beauty%20instruments%20at%20official%20factory%20rates."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button
              className="gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-9 px-4 rounded-xl shadow-md transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Desk</span>
            </Button>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-500/15 bg-[#080c16]/98 px-4 py-4 space-y-3">
          <div className="text-[11px] font-mono uppercase text-amber-300 font-bold tracking-wider mb-2">
            Departments & Instruments
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-200">
            <button
              onClick={() => handleSelectDepartment("General Surgery")}
              className="text-left p-2.5 rounded-lg bg-slate-900/90 border border-white/10 hover:border-amber-400/40 hover:text-amber-200"
            >
              🩺 General Surgery
            </button>
            <button
              onClick={() => handleSelectDepartment("Dental Instruments")}
              className="text-left p-2.5 rounded-lg bg-slate-900/90 border border-white/10 hover:border-amber-400/40 hover:text-amber-200"
            >
              🦷 Dental Tools
            </button>
            <button
              onClick={() => handleSelectDepartment("Eye / Ophthalmic")}
              className="text-left p-2.5 rounded-lg bg-slate-900/90 border border-white/10 hover:border-amber-400/40 hover:text-amber-200"
            >
              👁️ Eye Microsurgery
            </button>
            <button
              onClick={() => handleSelectDepartment("Beauty & Salon")}
              className="text-left p-2.5 rounded-lg bg-slate-900/90 border border-white/10 hover:border-amber-400/40 hover:text-amber-200"
            >
              ✂️ Beauty & Salon
            </button>
          </div>

          <div className="pt-2 border-t border-white/[0.08] flex flex-col space-y-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <button
              onClick={() => handleScroll("quality")}
              className="text-left py-1.5 hover:text-amber-200"
            >
              Quality & DIN/ISO Certifications
            </button>
            <button
              onClick={() => handleScroll("wholesale")}
              className="text-left py-1.5 hover:text-amber-200"
            >
              Wholesale Inquiry & OEM Desk
            </button>
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex items-center gap-3">
            <a
              href="https://wa.me/923497560980"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-10 rounded-xl gap-2">
                <MessageCircle className="h-4 w-4" />
                WhatsApp: +923497560980
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
