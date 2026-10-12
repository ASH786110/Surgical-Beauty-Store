import React, { useState } from "react"
import { motion } from "framer-motion"
import { Star, ShieldCheck, Sparkles, MessageCircle, Quote, ThumbsUp, CheckCircle2 } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  role: string
  salonOrBusiness: string
  country: string
  flag: string
  rating: number
  instrumentUsed: string
  initials: string
  avatarBg: string
  reviewTitle: string
  quote: string
  verifiedBuyer: boolean
  likes: number
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Jessica Vance",
    role: "Master Lash Educator & Salon Director",
    salonOrBusiness: "Luxe Lash Academy",
    country: "London, United Kingdom",
    flag: "🇬🇧",
    rating: 5,
    instrumentUsed: "ASH-LASH-090 90° Fiber-Tip Tweezers",
    initials: "JV",
    avatarBg: "from-amber-500 to-amber-700",
    reviewTitle: "Absolute zero hand strain, grips 0.03mm Russian fans on the first squeeze!",
    quote:
      "I have bought tweezers from Germany, Switzerland, and the US at triple the price. The ASH Instruments fiber-tip mega volume tweezers are miles ahead. The diamond micro-etched tip grips 10D fans without dropping a single lash, and the authentic laser engraving looks magnificent in our academy kits.",
    verifiedBuyer: true,
    likes: 42,
  },
  {
    id: "test-2",
    name: "Marco Rossi",
    role: "Master Barber & Atelier Owner",
    salonOrBusiness: "Barbiere di Milano",
    country: "Milan, Italy",
    flag: "🇮🇹",
    rating: 5,
    instrumentUsed: "ASH-HAIR-600 Japanese 440C Convex Shears",
    initials: "MR",
    avatarBg: "from-slate-600 to-slate-800",
    reviewTitle: "Butter-smooth slide cutting. The 440C cobalt balance is extraordinary.",
    quote:
      "Direct factory cutlery from Askari Surgical Hubs is a game changer for professional salons. The convex clam shell blades cut like silk with zero hair bending. Our barbers use them 10 hours a day and the edge retention after 6 months is still factory-fresh.",
    verifiedBuyer: true,
    likes: 38,
  },
  {
    id: "test-3",
    name: "Dr. Laila Al-Zahrani",
    role: "Clinical Dermatologist & Medical Esthetician",
    salonOrBusiness: "Royal Aesthetic Dermatology",
    country: "Riyadh & Dubai, UAE",
    flag: "🇦🇪",
    rating: 5,
    instrumentUsed: "ASH-DERM-300 Medical Comedone & Lancet Set",
    initials: "LZ",
    avatarBg: "from-emerald-600 to-teal-800",
    reviewTitle: "Medical-grade stainless alloy that withstands 134°C autoclave without tarnishing.",
    quote:
      "In our clinic, autoclave sterilization is non-negotiable. ASH Instruments uses certified surgical steel that stays completely rust-free. The micro-loops extract without bruising patient tissue. Outstanding precision.",
    verifiedBuyer: true,
    likes: 29,
  },
  {
    id: "test-4",
    name: "Camille Laurent",
    role: "Celebrity Nail Artist & Studio Founder",
    salonOrBusiness: "Atelier Ongles Paris",
    country: "Paris, France",
    flag: "🇫🇷",
    rating: 5,
    instrumentUsed: "ASH-MANI-404 Pro Cobalt Cuticle Nipper 4mm",
    initials: "CL",
    avatarBg: "from-purple-600 to-indigo-800",
    reviewTitle: "The jaw alignment under microscope is 100% flawless. No pinching.",
    quote:
      "The hand-sharpened 4mm blades nip cuticles with zero pulling or tearing. The satin matte finish is comfortable under daylight lamps. My manicurists refuse to touch any other nipper brand now.",
    verifiedBuyer: true,
    likes: 34,
  },
  {
    id: "test-5",
    name: "Dmitri Volkova",
    role: "Beauty Academy Distributor",
    salonOrBusiness: "Volkov Cutlery & Beauty Supplies",
    country: "Stockholm, Sweden",
    flag: "🇸🇪",
    rating: 5,
    instrumentUsed: "Custom Laser Engraved Salon Bundles (200+ pcs)",
    initials: "DV",
    avatarBg: "from-sky-600 to-blue-800",
    reviewTitle: "OEM laser branding and factory rates saved our academy over €8,000.",
    quote:
      "Askari Surgical Hubs handled our private label branding flawlessly. Every tweezer came stamped with our academy logo alongside the ASH Instruments hallmark. Zero rejected pieces out of a 200-piece export shipment.",
    verifiedBuyer: true,
    likes: 51,
  },
  {
    id: "test-6",
    name: "Tariq Mahmood",
    role: "Salon Chain Operations Head",
    salonOrBusiness: "Signature Barbers & Grooming Lounge",
    country: "Lahore / Karachi, Pakistan",
    flag: "🇵🇰",
    rating: 5,
    instrumentUsed: "Full Salon Setup (Shears, Nippers, Razors)",
    initials: "TM",
    avatarBg: "from-amber-600 to-amber-900",
    reviewTitle: "Best Sialkot manufacturing quality. Proud to support local master craftsmen.",
    quote:
      "Their customer support on WhatsApp (+923497560980) was instant. Custom orders arrived neatly packaged, perfectly balanced, and razor sharp. Authentic Sialkot surgical excellence at genuine factory prices.",
    verifiedBuyer: true,
    likes: 47,
  },
]

export default function TestimonialsSection() {
  const [likesState, setLikesState] = useState<{ [key: string]: number }>(
    TESTIMONIALS.reduce((acc, t) => ({ ...acc, [t.id]: t.likes }), {})
  )
  const [hasLiked, setHasLiked] = useState<{ [key: string]: boolean }>({})

  const handleLike = (id: string) => {
    if (hasLiked[id]) return
    setLikesState((prev) => ({ ...prev, [id]: prev[id] + 1 }))
    setHasLiked((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <section id="testimonials" className="relative py-20 bg-[#080c16] border-b border-amber-500/15 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Verified Customer Reviews
          </div>

          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl text-white tracking-tight">
            Trusted by Salons, Academies & Cutlery Distributors Worldwide
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Read verified feedback from licensed beauty masters, barbers, and surgical tool distributors across UK, USA, UAE, and Europe who rely on ASH Instruments.
          </p>

          {/* Clean Proof Stats Ribbon */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-amber-400/15 bg-slate-900/60 backdrop-blur-sm">
            <div>
              <div className="text-2xl font-bold text-amber-300 font-mono">4.98 / 5.0</div>
              <div className="flex items-center justify-center gap-0.5 mt-1 text-amber-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-300" />
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Average Quality Rating</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">99.8%</div>
              <div className="text-[11px] font-semibold text-slate-200 mt-1">Zero-Defect Rate</div>
              <p className="text-[11px] text-slate-400">Microscope Inspected</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">38+ Countries</div>
              <div className="text-[11px] font-semibold text-slate-200 mt-1">Worldwide Export</div>
              <p className="text-[11px] text-slate-400">DHL & FedEx Express</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400 font-mono">100% Rust-Free</div>
              <div className="text-[11px] font-semibold text-slate-200 mt-1">Surgical Steel</div>
              <p className="text-[11px] text-slate-400">Autoclavable Guarantee</p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid Layout with Framer Motion */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: (idx % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="studio-card rounded-2xl p-6 flex flex-col justify-between group relative hover:border-amber-400/35 transition-all"
            >
              <Quote className="absolute top-4 right-4 h-7 w-7 text-white/5 pointer-events-none" />

              <div>
                {/* User Header */}
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center text-white text-xs font-bold border border-white/20 shadow-inner`}>
                      {t.initials}
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white text-[9px]">
                      <CheckCircle2 className="h-3 w-3" />
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-white truncate">{t.name}</h3>
                      <span title={t.country} className="text-xs">{t.flag}</span>
                    </div>
                    <p className="text-xs text-amber-200/90 font-medium truncate">{t.role}</p>
                    <p className="text-[11px] text-slate-400 truncate">{t.salonOrBusiness} · {t.country}</p>
                  </div>
                </div>

                {/* Rating & Verified Badge */}
                <div className="mt-4 flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                    ))}
                    <span className="ml-1 text-xs font-bold text-amber-300">5.0</span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="h-3 w-3" />
                    Verified Salon
                  </div>
                </div>

                {/* Instrument Used */}
                <div className="mt-3 inline-block rounded-md bg-slate-800/80 border border-amber-400/15 px-2.5 py-1 text-[11px] font-mono text-amber-200">
                  Tool: {t.instrumentUsed}
                </div>

                {/* Title & Quote */}
                <h4 className="mt-3 text-sm font-bold text-white leading-snug">
                  "{t.reviewTitle}"
                </h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {t.quote}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <button
                  onClick={() => handleLike(t.id)}
                  className={`inline-flex items-center gap-1.5 text-xs transition-colors ${
                    hasLiked[t.id] ? "text-amber-300 font-semibold" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>Helpful ({likesState[t.id]})</span>
                </button>

                <a
                  href={`https://wa.me/923497560980?text=${encodeURIComponent(
                    `Hello ASH Instruments, I read the review for ${t.instrumentUsed} and want to order it at factory direct pricing.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>Order This Tool</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
