import React, { useState, useEffect } from "react"
import { CheckCircle2, ShoppingBag, X, MessageCircle, Sparkles } from "lucide-react"

interface RecentOrder {
  id: string
  buyer: string
  city: string
  country: string
  product: string
  qty: string
  timeAgo: string
  avatar: string
}

const RECENT_ORDERS: RecentOrder[] = [
  {
    id: "1",
    buyer: "Dr. Farhan Al-Mansoor",
    city: "Dubai",
    country: "UAE",
    product: "90° Fiber-Tip Mega Volume Tweezers",
    qty: "25 pcs",
    timeAgo: "3 minutes ago",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "2",
    buyer: "Elena Rostova",
    city: "Lash Architecture Academy",
    country: "Milan, Italy",
    product: "Diamond Grip Russian Volume Set",
    qty: "50 pcs (Custom OEM)",
    timeAgo: "11 minutes ago",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "3",
    buyer: "Marcus Sterling",
    city: "Mayfair London",
    country: "United Kingdom",
    product: "Japanese 440C Barber Shears 6.0\"",
    qty: "15 pcs",
    timeAgo: "24 minutes ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "4",
    buyer: "Chloé Manucure",
    city: "Paris",
    country: "France",
    product: "Pro Cobalt Cuticle Nippers 4mm",
    qty: "100 pcs",
    timeAgo: "39 minutes ago",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "5",
    buyer: "Dr. Ayesha Tariq",
    city: "Lahore / Islamabad",
    country: "Pakistan",
    product: "Dermatological Comedone Extractors",
    qty: "30 sets",
    timeAgo: "52 minutes ago",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
  },
]

export default function RecentOrdersTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    if (isDismissed) return

    const interval = setInterval(() => {
      // Smooth fade out
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_ORDERS.length)
        setIsVisible(true)
      }, 500)
    }, 7000)

    return () => clearInterval(interval)
  }, [isDismissed])

  if (isDismissed) return null

  const order = RECENT_ORDERS[currentIndex]

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
      }`}
    >
      <div className="relative flex items-center gap-3.5 rounded-2xl border border-amber-400/30 bg-[#0c1220]/95 p-3.5 pr-8 shadow-2xl backdrop-blur-xl shadow-amber-950/30 max-w-sm">
        {/* Top gold badge */}
        <div className="absolute -top-2 left-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-slate-950 shadow-md">
          <Sparkles className="h-2.5 w-2.5" />
          Live Factory Order
        </div>

        {/* Customer photo */}
        <div className="relative shrink-0">
          <img
            src={order.avatar}
            alt={order.buyer}
            className="h-11 w-11 rounded-full object-cover border-2 border-cyan-400/50 shadow-md"
          />
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
            <CheckCircle2 className="h-3 w-3" />
          </span>
        </div>

        {/* Text details */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
            <span className="truncate">{order.buyer}</span>
            <span className="text-[10px] text-cyan-300 font-normal">({order.city}, {order.country})</span>
          </div>
          <p className="text-[11px] font-medium text-amber-300 truncate mt-0.5">
            Ordered: {order.qty} × {order.product}
          </p>
          <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400">
            <span>{order.timeAgo}</span>
            <span className="inline-block h-1 w-1 rounded-full bg-slate-600" />
            <a
              href={`https://wa.me/923497560980?text=Hello%20ASH%20Instruments%2C%20I%20saw%20the%20recent%20order%20for%20${encodeURIComponent(order.product)}%20and%20want%20to%20order%20the%20same.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="h-3 w-3" />
              Order Same
            </a>
          </div>
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 text-slate-500 hover:text-slate-300 p-1 transition-colors"
          title="Dismiss notification"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
