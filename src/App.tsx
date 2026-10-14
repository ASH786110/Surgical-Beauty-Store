import React, { useState } from "react"
import { CartProvider } from "@/src/context/CartContext"
import { ProductRecord } from "@/src/services/db"
import TopUrgencyBar from "@/src/components/beauty/TopUrgencyBar"
import Navbar from "@/src/components/beauty/Navbar"
import Hero from "@/src/components/beauty/Hero"
import CatalogGrid from "@/src/components/beauty/CatalogGrid"
import InteractiveSteelInspector from "@/src/components/beauty/InteractiveSteelInspector"
import CategoriesShowcase from "@/src/components/beauty/CategoriesShowcase"
import QualitySection from "@/src/components/beauty/QualitySection"
import TestimonialsSection from "@/src/components/beauty/TestimonialsSection"
import WholesaleInquirySection from "@/src/components/beauty/WholesaleInquirySection"
import Footer from "@/src/components/beauty/Footer"
import CartDrawer from "@/src/components/beauty/CartDrawer"
import ProductDetailView from "@/src/components/beauty/ProductDetailView"
import AdminControlPanel from "@/src/components/admin/AdminControlPanel"
import SmokeMistEffect from "@/src/components/effects/SmokeMistEffect"
import ScrollReveal from "@/src/components/effects/ScrollReveal"
import { MessageCircle } from "lucide-react"

export default function App() {
  const [currentView, setCurrentView] = useState<"store" | "product-detail" | "admin">("store")
  const [selectedProduct, setSelectedProduct] = useState<ProductRecord | null>(null)

  const handleOpenProductDetail = (product: ProductRecord) => {
    setSelectedProduct(product)
    setCurrentView("product-detail")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBackToStore = () => {
    setCurrentView("store")
    setSelectedProduct(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-[#080c16] text-slate-100 antialiased selection:bg-amber-400/20 selection:text-amber-100 overflow-x-hidden">
        {/* VIEW 1: MASTER ADMIN CONTROL PANEL (3 DATABASES) */}
        {currentView === "admin" ? (
          <AdminControlPanel
            onBackToStore={handleBackToStore}
            onSelectProduct={(p) => {
              setSelectedProduct(p)
              setCurrentView("product-detail")
            }}
          />
        ) : currentView === "product-detail" && selectedProduct ? (
          /* VIEW 2: DEDICATED PRODUCT DETAIL VIEW WITH WHOLESALE TIERS & CUSTOM LASER SIMULATOR */
          <>
            <div className="sticky top-0 z-50 w-full shadow-lg shadow-black/50 backdrop-blur-xl bg-[#080c16]/98 border-b border-amber-500/15">
              <TopUrgencyBar />
              <Navbar />
            </div>
            <ProductDetailView
              product={selectedProduct}
              onBack={handleBackToStore}
            />
            <Footer onOpenAdmin={() => setCurrentView("admin")} />
            <CartDrawer />
          </>
        ) : (
          /* VIEW 3: LIVE MODERN STOREFRONT WITH SUBTLE SURGICAL VAPOR & HIGH-CONVERSION AESTHETICS */
          <>
            {/* Rich, atmospheric smoke vapor effect in background */}
            <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen opacity-65">
              <SmokeMistEffect density="medium" tint="luxury" interactive={true} />
            </div>

            {/* Permanent Fixed / Sticky Top Header with ASH INSTRUMENTS Wordmark */}
            <header className="sticky top-0 z-50 w-full shadow-lg shadow-black/50 backdrop-blur-xl bg-[#080c16]/98 border-b border-amber-500/15">
              <TopUrgencyBar />
              <Navbar />
            </header>

            <main className="relative z-10">
              {/* Hero Section with Interactive Spotlight, Gleam & WhatsApp Buy */}
              <ScrollReveal duration={0.8} yOffset={20}>
                <Hero />
              </ScrollReveal>

              {/* Core Beauty Instruments Catalog with Currency Switcher & Direct Buy Triggers */}
              <ScrollReveal duration={0.7} yOffset={32}>
                <CatalogGrid onSelectProduct={handleOpenProductDetail} />
              </ScrollReveal>

              {/* Interactive Cutlery Studio: Steel & Finish Inspector (Mirror, Satin, Plasma Gold, DLC) */}
              <ScrollReveal duration={0.7} yOffset={32}>
                <InteractiveSteelInspector />
              </ScrollReveal>

              {/* Product Lines & Categories */}
              <ScrollReveal duration={0.7} yOffset={32}>
                <CategoriesShowcase />
              </ScrollReveal>

              {/* Manufacturer Quality, German/Japanese Alloys & OEM Hallmarking */}
              <ScrollReveal duration={0.7} yOffset={32}>
                <QualitySection />
              </ScrollReveal>

              {/* Verified Customer Reviews & Social Proof Grid */}
              <ScrollReveal duration={0.7} yOffset={32}>
                <TestimonialsSection />
              </ScrollReveal>

              {/* Wholesale & Custom Inquiries */}
              <ScrollReveal duration={0.7} yOffset={32}>
                <WholesaleInquirySection />
              </ScrollReveal>
            </main>

            {/* Global Footer with Discreet Staff Portal */}
            <div className="relative z-10">
              <Footer onOpenAdmin={() => setCurrentView("admin")} />
            </div>

            {/* Slide-over Bag / Cart Drawer */}
            <CartDrawer />

            {/* Floating WhatsApp Quick Action Button */}
            <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40">
              <a
                href="https://wa.me/923497560980?text=Hello%20ASH%20Instruments%2C%20I%20want%20to%20inquire%20about%20your%20laser-engraved%20beauty%20instruments%20and%20competitive%20wholesale%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-white shadow-xl shadow-emerald-950/40 transition-all duration-200 hover:scale-105 border border-emerald-400/30"
                title="Chat with ASH Instruments on WhatsApp (+923497560980)"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs font-bold tracking-wide">
                  WhatsApp: +923497560980
                </span>
              </a>
            </aside>
          </>
        )}
      </div>
    </CartProvider>
  )
}
