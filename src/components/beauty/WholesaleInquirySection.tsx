import React, { useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Mail, Send, CheckCircle2, Sparkles, Building, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/src/services/db"

export default function WholesaleInquirySection() {
  const [formData, setFormData] = useState({
    name: "",
    salonOrBusiness: "",
    email: "",
    whatsapp: "",
    productInterest: "Eyelash Tweezers & Volume Tools",
    quantity: "50-100 pcs",
    message: "",
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return

    setSubmitting(true)

    // Save lead to Database 1 (Clients/Visitors Leads)
    try {
      db.addClient({
        name: formData.name,
        salonName: formData.salonOrBusiness || "Independent Salon / Artist",
        email: formData.email,
        whatsapp: formData.whatsapp || "+923497560980",
        productInterest: formData.productInterest,
        estimatedQty: formData.quantity,
        status: "New Lead",
        notes: formData.message || "Requested wholesale pricing & catalog.",
        source: "Website Form",
      })
    } catch (err) {
      console.error("Failed to store lead in DB1:", err)
    }

    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  const quickWhatsappUrl = `https://wa.me/923497560980?text=${encodeURIComponent(
    `Hello ASH Instruments,\nName: ${formData.name || "Customer"}\nBusiness: ${formData.salonOrBusiness || "Salon/Academy"}\nProduct Interest: ${formData.productInterest}\nEstimated Qty: ${formData.quantity}\nNotes: ${formData.message || "Please share formal wholesale price list and catalog."}`
  )}`

  return (
    <section id="wholesale" className="py-16 sm:py-24 bg-[#080c16] border-b border-amber-500/15 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Direct Wholesale Desk</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Partner with <span className="gold-gradient-text">Askari Surgical Hubs</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Whether you are an independent lash artist looking for top-tier tweezers or a beauty school ordering student kits in bulk, we provide competitive factory direct prices and swift support.
            </p>

            <div className="mt-8 space-y-4">
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/923497560980"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40 transition-all shadow-md group"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">WhatsApp Factory Support</h4>
                  <p className="text-xs text-emerald-400 font-bold mt-0.5 font-mono">
                    +923497560980
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Instant replies for catalog requests, quotations & custom branding.
                  </p>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:askarisurgicalhubs@gmail.com"
                className="flex items-start gap-4 p-4 rounded-xl border border-amber-400/15 bg-slate-900/60 hover:border-amber-400/35 transition-all shadow-sm group"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Official Inquiries Email</h4>
                  <p className="text-xs text-amber-200 font-medium mt-0.5 font-mono">
                    askarisurgicalhubs@gmail.com
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Formal invoices, pro-forma quotes, and distributor contracts.
                  </p>
                </div>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] text-xs text-slate-400">
              <span className="font-semibold text-white">ASH Instruments (Askari Surgical Hubs)</span>
              <p className="mt-1">
                Direct export to USA, UK, Europe, Australia, UAE, and worldwide markets. 100% non-medical implements with zero FDA/CE permit barriers (HS Codes 8213 / 8214).
              </p>
            </div>
          </motion.div>

          {/* Form Card with Framer Motion entrance */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="studio-card rounded-2xl p-6 sm:p-8 border border-amber-500/20 shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Inquiry Logged to Askari Export Desk!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-white">{formData.name}</span>. Our export team at Askari Surgical Hubs has registered your request and will reach out to <span className="font-medium text-amber-200">{formData.email}</span> shortly.
                  </p>

                  <div className="pt-2">
                    <a
                      href={quickWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md">
                        <MessageCircle className="h-4 w-4" />
                        Send This Inquiry Directly to WhatsApp (+923497560980)
                      </Button>
                    </a>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: "",
                        salonOrBusiness: "",
                        email: "",
                        whatsapp: "",
                        productInterest: "Eyelash Tweezers & Volume Tools",
                        quantity: "50-100 pcs",
                        message: "",
                      })
                    }}
                    className="mt-3 text-xs border-amber-400/20 text-slate-300 hover:text-white"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="pb-3 border-b border-white/[0.08]">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>Wholesale Price Quote Request</span>
                      <span className="text-[10px] bg-amber-400/10 text-amber-300 border border-amber-400/25 px-2 py-0.5 rounded-full font-mono">
                        Direct Factory
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Request custom quotes, bulk sample kits, or private label branding with laser engraving.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="inq-name" className="text-xs text-slate-300 font-medium">Your Name *</Label>
                      <Input
                        id="inq-name"
                        placeholder="e.g. Elena Rostova"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="text-xs bg-slate-900/80 border-amber-400/20 text-white placeholder:text-slate-500 rounded-xl focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="inq-biz" className="text-xs text-slate-300 font-medium">Salon / Brand Name</Label>
                      <Input
                        id="inq-biz"
                        placeholder="e.g. Lash Velvet Studio"
                        value={formData.salonOrBusiness}
                        onChange={(e) => setFormData({ ...formData, salonOrBusiness: e.target.value })}
                        className="text-xs bg-slate-900/80 border-amber-400/20 text-white placeholder:text-slate-500 rounded-xl focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="inq-email" className="text-xs text-slate-300 font-medium">Email Address *</Label>
                      <Input
                        id="inq-email"
                        type="email"
                        placeholder="name@salon.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="text-xs bg-slate-900/80 border-amber-400/20 text-white placeholder:text-slate-500 rounded-xl focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="inq-wa" className="text-xs text-slate-300 font-medium">WhatsApp Number (with country code)</Label>
                      <Input
                        id="inq-wa"
                        placeholder="e.g. +1 555 123 4567"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="text-xs bg-slate-900/80 border-amber-400/20 text-white placeholder:text-slate-500 rounded-xl focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="inq-interest" className="text-xs text-slate-300 font-medium">Primary Instrument Interest</Label>
                      <select
                        id="inq-interest"
                        value={formData.productInterest}
                        onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                        className="w-full text-xs bg-slate-900 border border-amber-400/20 text-white rounded-xl h-9 px-3 focus:outline-none focus:border-amber-400"
                      >
                        <option value="Eyelash Tweezers & Volume Tools">Eyelash Tweezers & Volume Tools</option>
                        <option value="Manicure, Cuticle Nippers & Russian Scissors">Manicure, Cuticle Nippers & Russian Scissors</option>
                        <option value="Hair & Barber Shears 440C">Hair & Barber Shears 440C</option>
                        <option value="Damascus Straight Razors & Shavettes">Damascus Straight Razors & Shavettes</option>
                        <option value="Dermatology & Extraction Tools">Dermatology & Extraction Tools</option>
                        <option value="Full Salon Setup Bundle">Full Salon Setup Bundle</option>
                        <option value="Custom OEM Brand Manufacturing">Custom OEM Brand Manufacturing</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="inq-qty" className="text-xs text-slate-300 font-medium">Estimated Order Quantity</Label>
                      <select
                        id="inq-qty"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full text-xs bg-slate-900 border border-amber-400/20 text-white rounded-xl h-9 px-3 focus:outline-none focus:border-amber-400"
                      >
                        <option value="1-5 pcs (Sample Order)">1-5 pcs (Sample Order)</option>
                        <option value="10-25 pcs (Salon Pack)">10-25 pcs (Salon Pack)</option>
                        <option value="50-100 pcs (Academy Kit)">50-100 pcs (Academy Kit)</option>
                        <option value="100-500 pcs (Wholesale)">100-500 pcs (Wholesale)</option>
                        <option value="500+ pcs (Distributor Master Carton)">500+ pcs (Distributor Master Carton)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="inq-msg" className="text-xs text-slate-300 font-medium">Specifications / Custom Laser Branding Notes</Label>
                    <Textarea
                      id="inq-msg"
                      rows={3}
                      placeholder="Mention preferred finishes (Mirror, Satin, Gold Plasma), custom logo requirements, or shipping country..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="text-xs bg-slate-900/80 border-amber-400/20 text-white placeholder:text-slate-500 rounded-xl focus:border-amber-400 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs h-11 rounded-xl shadow-md shadow-amber-500/20 gap-2 transition-all"
                    >
                      <Send className="h-3.5 w-3.5" />
                      {submitting ? "Submitting Inquiry..." : "Submit Wholesale Quote Request"}
                    </Button>

                    <a
                      href={quickWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto text-xs h-11 px-4 gap-2 border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/50 hover:text-emerald-100 rounded-xl"
                      >
                        <MessageCircle className="h-4 w-4 text-emerald-400" />
                        Quick WhatsApp
                      </Button>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
