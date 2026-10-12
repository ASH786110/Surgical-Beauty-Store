import React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Palette, Package, MessageCircle, Sparkles, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function QualitySection() {
  return (
    <section id="quality" className="py-16 sm:py-24 bg-[#080c16] border-b border-amber-500/15 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Manufacturer Metallurgical Craft</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Why top lash artists & salon academies trust <span className="gold-gradient-text">ASH Instruments</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Askari Surgical Hubs combines decades of artisanal metallurgical expertise with modern CNC tolerance grinding and premium consumer cutlery finishing. 100% compliant for direct salon, barber, and retail distribution without medical device regulatory roadblocks.
            </p>

            <div className="mt-8 space-y-3.5">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-amber-400/15">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/25">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Zero Light-Gap Stereo Inspection</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Every tweezer tip and nipper jaw is calibrated under 20x stereo-microscopes to verify flush closure with zero light leakage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-amber-400/15">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/25">
                  <Palette className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Custom Private Label & PVD Finishes</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Gold Plasma, Satin Anti-Glare, Titanium Black Nitride, and Diamond knurl grips with your salon logo permanently laser-etched.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-amber-400/15">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/25">
                  <Package className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Direct Worldwide Tracked Air Freight</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Fast door-to-door delivery with tracked DHL, FedEx, and EMS for salon chains, distributors, and academies.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://wa.me/923497560980?text=Hello%20ASH%20Instruments%2C%20I%20am%20interested%20in%20custom%20branding%20and%20private%20label%20beauty%20instruments."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold h-11 px-6 rounded-xl shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]">
                  <MessageCircle className="h-4 w-4" />
                  Discuss Custom Branding on WhatsApp (+923497560980)
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="studio-card rounded-2xl p-6 sm:p-8 border border-amber-500/20 shadow-2xl">
              <h3 className="text-base font-bold text-white pb-4 border-b border-white/[0.08] flex items-center justify-between">
                <span>Wholesale Direct Guarantee</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-md">
                  Factory Direct Sialkot
                </span>
              </h3>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-white text-sm">Real Stainless Steel Chemistry:</strong>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      AISI 420 (German DIN 1.4021) and Japanese 440C Cobalt alloys heat-treated to Rockwell HRC 50–56. 100% rust-free in high-pressure autoclaves.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-white text-sm">Permanent Fiber Laser Engraving:</strong>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      High-frequency galvo fiber laser marks sharp, high-contrast hallmarks that will never rub off, oxidize, or wear away under chemical sanitization.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-white text-sm">0.02mm Tip Alignment Tolerance:</strong>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Hand-inspected under high-power stereo magnification. Guarantees zero eyelash slippage on ultra-thin 0.03mm volume lashes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-white text-sm">100% Replacement Warranty:</strong>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      If any instrument fails the light-gap test or exhibits alignment defects upon unboxing, we provide immediate free replacement or refund.
                    </p>
                  </div>
                </div>
              </div>

              {/* Universal Customs & Non-Medical Clearance Badge */}
              <div className="mt-8 p-4 rounded-xl bg-slate-900/80 border border-amber-400/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-amber-200">100% Non-Medical Universal Direct Import</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Zero FDA / MDR CE Medical Permit Barriers · Fast Direct Tracked Air Delivery (HS Codes 8213 / 8214)
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded shrink-0">
                  DIRECT CUSTOMS CLEARANCE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
