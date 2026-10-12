import React, { useState } from "react"
import { Star, CheckCircle, Quote, ThumbsUp } from "lucide-react"

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  category: "SaaS" | "Branding" | "E-Commerce" | "All"
  quote: string
  date: string
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "VP of Product",
    company: "FinScale Technologies",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    rating: 5,
    category: "SaaS",
    quote:
      "Nexus Studio completely elevated our product interface. Our onboarding conversion jumped by 38% within the first month after redesign. Their attention to detail and rapid delivery is unmatched.",
    date: "2 weeks ago",
  },
  {
    id: "2",
    name: "Marcus Vance",
    role: "Founder & CEO",
    company: "OrbitAI",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    rating: 5,
    category: "SaaS",
    quote:
      "From wireframes to production-ready design tokens, the collaboration felt seamless. They didn't just design screens—they helped refine our entire customer experience and core architecture.",
    date: "1 month ago",
  },
  {
    id: "3",
    name: "Elena Rostova",
    role: "Head of Marketing",
    company: "Lumina Labs",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80",
    rating: 5,
    category: "Branding",
    quote:
      "Our rebrand received overwhelming praise from our community and investors alike. The visual identity system is versatile, sophisticated, and instantly sets us apart in a crowded marketplace.",
    date: "3 weeks ago",
  },
  {
    id: "4",
    name: "David Kim",
    role: "Co-Founder",
    company: "Veloce Commerce",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
    rating: 5,
    category: "E-Commerce",
    quote:
      "They delivered a high-converting storefront redesign ahead of schedule for Q4. Checkout drop-off rates fell significantly, and customer reviews constantly highlight the clean UX.",
    date: "Last month",
  },
  {
    id: "5",
    name: "Amina Al-Mansoor",
    role: "Director of UX",
    company: "Stratis Cloud",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
    rating: 5,
    category: "SaaS",
    quote:
      "The component library and design system they created gave our engineers incredible speed. What used to take our front-end team weeks now takes days thanks to their solid documentation.",
    date: "2 months ago",
  },
  {
    id: "6",
    name: "Julien Mercier",
    role: "Creative Director",
    company: "Atelier Mode",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80",
    rating: 5,
    category: "Branding",
    quote:
      "True artisans. They combine strategic commercial thinking with striking editorial aesthetics. Working with them was the best creative decision we made this year.",
    date: "Just now",
  },
]

interface TestimonialsProps {
  testimonials?: Testimonial[]
}

export default function Testimonials({
  testimonials = defaultTestimonials,
}: TestimonialsProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All")

  const categories = ["All", "SaaS", "Branding", "E-Commerce"]

  const filteredTestimonials =
    selectedFilter === "All"
      ? testimonials
      : testimonials.filter((t) => t.category === selectedFilter)

  return (
    <section id="testimonials" className="relative py-20 lg:py-28 bg-muted/20 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-foreground">
            <ThumbsUp className="h-3.5 w-3.5 text-primary" />
            <span>Social Proof & Reviews</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
            Loved by founders, engineers, and market leaders
          </h2>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Don't just take our word for it. Here is what world-class teams say about partnering with our studio.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  selectedFilter === cat
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
                }`}
              >
                {cat === "All" ? "All Stories" : `${cat} Projects`}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xs transition-all duration-200 hover:shadow-md hover:border-primary/30"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-muted-foreground/30" />
                </div>

                {/* Quote Text */}
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-card-foreground/90 italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-5 border-t border-border/60 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-background border border-border/80"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-sm text-foreground truncate">
                      {item.name}
                    </h3>
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.role} • <span className="font-medium text-foreground/80">{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Social Proof Banner */}
        <div className="mt-14 rounded-2xl border border-border/80 bg-background/80 p-6 sm:p-8 text-center backdrop-blur-xs flex flex-col sm:flex-row items-center justify-around gap-6">
          <div>
            <div className="text-3xl font-extrabold text-foreground">99.4%</div>
            <div className="text-xs text-muted-foreground mt-0.5">On-time project delivery</div>
          </div>
          <div className="hidden sm:block h-8 w-px bg-border" />
          <div>
            <div className="text-3xl font-extrabold text-foreground">4.9 / 5.0</div>
            <div className="text-xs text-muted-foreground mt-0.5">Average customer rating</div>
          </div>
          <div className="hidden sm:block h-8 w-px bg-border" />
          <div>
            <div className="text-3xl font-extrabold text-foreground">$120M+</div>
            <div className="text-xs text-muted-foreground mt-0.5">Client capital raised</div>
          </div>
        </div>
      </div>
    </section>
  )
}
