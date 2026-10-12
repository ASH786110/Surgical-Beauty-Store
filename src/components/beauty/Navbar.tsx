import React, { useState } from "react"
import { ShoppingBag, MessageCircle, Menu, X } from "lucide-react"
import { useCart } from "@/src/context/CartContext"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onOpenAdmin?: () => void
}

export default function Navbar({ onOpenAdmin }: NavbarProps) {
  const { totalCount, setIsCartOpen } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/15 bg-[#080c16]/95 backdrop-blur-xl">
      {/* Main Header */}
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
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
              className="h-9 w-9 rounded-full border border-amber-400/30 object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-wider text-sm leading-tight text-white group-hover:text-amber-200 transition-colors">
              ASH INSTRUMENTS
            </span>
            <span className="text-[10px] text-amber-300/80 font-semibold tracking-widest uppercase">
              Askari Surgical Hubs
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-300">
          <a
            href="#catalog"
            onClick={(e) => {
              e.preventDefault()
              handleScroll("catalog")
            }}
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Catalog
          </a>
          <a
            href="#finishes"
            onClick={(e) => {
              e.preventDefault()
              handleScroll("finishes")
            }}
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Steel Finishes
          </a>
          <a
            href="#categories"
            onClick={(e) => {
              e.preventDefault()
              handleScroll("categories")
            }}
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Categories
          </a>
          <a
            href="#quality"
            onClick={(e) => {
              e.preventDefault()
              handleScroll("quality")
            }}
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Quality & OEM
          </a>
          <a
            href="#testimonials"
            onClick={(e) => {
              e.preventDefault()
              handleScroll("testimonials")
            }}
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Reviews
          </a>
          <a
            href="#wholesale"
            onClick={(e) => {
              e.preventDefault()
              handleScroll("wholesale")
            }}
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Wholesale Desk
          </a>
        </nav>

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
            href="https://wa.me/923497560980?text=Hello%20ASH%20Instruments%2C%20I%20am%20interested%20in%20ordering%20beauty%20instruments%20at%20direct%20factory%20rates."
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
          <div className="flex flex-col space-y-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <button
              onClick={() => handleScroll("catalog")}
              className="text-left py-2 hover:text-amber-200"
            >
              Catalog & Products
            </button>
            <button
              onClick={() => handleScroll("finishes")}
              className="text-left py-2 hover:text-amber-200"
            >
              Steel Finishes Metallurgy
            </button>
            <button
              onClick={() => handleScroll("categories")}
              className="text-left py-2 hover:text-amber-200"
            >
              Categories & Tools
            </button>
            <button
              onClick={() => handleScroll("quality")}
              className="text-left py-2 hover:text-amber-200"
            >
              Quality & OEM Guarantee
            </button>
            <button
              onClick={() => handleScroll("testimonials")}
              className="text-left py-2 hover:text-amber-200"
            >
              Verified Reviews
            </button>
            <button
              onClick={() => handleScroll("wholesale")}
              className="text-left py-2 hover:text-amber-200"
            >
              Wholesale Inquiry
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
    </header>
  )
}
