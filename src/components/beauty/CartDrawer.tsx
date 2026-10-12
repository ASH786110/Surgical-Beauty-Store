import React, { useState } from "react"
import { useCart } from "@/src/context/CartContext"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, MessageCircle, CheckCircle2, ShoppingBag } from "lucide-react"
import { db } from "@/src/services/db"

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    totalCount,
    isCartOpen,
    setIsCartOpen,
    clearCart,
    getWhatsAppOrderUrl,
  } = useCart()

  const [customerName, setCustomerName] = useState("")
  const [salonName, setSalonName] = useState("")
  const [orderNotes, setOrderNotes] = useState("")
  const [isManualCheckingOut, setIsManualCheckingOut] = useState(false)
  const [orderSent, setOrderSent] = useState(false)

  // Calculate volume discount if >= 10 pieces
  const isWholesale = totalCount >= 10
  const discountRate = isWholesale ? 0.15 : 0
  const discountAmount = subtotal * discountRate
  const finalTotal = subtotal - discountAmount

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Store in Database 1 (Client Leads)
    try {
      db.addClient({
        name: customerName || "Online Order Partner",
        salonName: salonName || "Independent Studio",
        email: "order-pending@client.com",
        whatsapp: "+923497560980",
        productInterest: `${totalCount} Beauty Instruments`,
        estimatedQty: `${totalCount} units ($${finalTotal.toFixed(2)})`,
        status: "Contacted / Quoted",
        notes: `Order items: ${items.map((i) => `${i.instrument.name} (${i.quantity}x)`).join(", ")}. Notes: ${orderNotes}`,
        source: "Website Form",
      })
    } catch (err) {
      console.error("Failed to store order in DB1:", err)
    }

    setOrderSent(true)
  }

  const handleReset = () => {
    clearCart()
    setOrderSent(false)
    setIsManualCheckingOut(false)
    setIsCartOpen(false)
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col p-6 bg-[#090d16] border-l border-white/10 text-slate-100">
        <SheetHeader className="pb-4 border-b border-white/10">
          <SheetTitle className="flex items-center justify-between text-lg font-bold text-white">
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-cyan-400" />
              <span>ASH Beauty Order Bag</span>
              <span className="text-xs font-mono text-cyan-300 font-semibold bg-cyan-950/80 border border-cyan-800/60 px-2 py-0.5 rounded-full">
                {totalCount} items
              </span>
            </span>
          </SheetTitle>
        </SheetHeader>

        {orderSent ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Order Inquiry Transmitted
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              Thank you, <span className="font-semibold text-cyan-300">{customerName || "Valued Salon Partner"}</span>. Our export representative will confirm your order details, shipping timeline, and invoice directly.
            </p>

            <div className="w-full rounded-xl border border-white/10 bg-[#0d1322] p-4 text-left text-xs space-y-2 mt-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Company:</span>
                <span className="font-semibold text-white">{salonName || "Salon / Individual"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Units:</span>
                <span className="font-mono font-bold text-white tabular-nums">{totalCount} pcs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Order Total:</span>
                <span className="font-mono font-bold text-cyan-300 tabular-nums">${finalTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">WhatsApp Desk:</span>
                <span className="text-emerald-400 font-semibold">+923497560980</span>
              </div>
            </div>

            <Button onClick={handleReset} className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white rounded-xl font-semibold">
              Back to Catalog
            </Button>
          </div>
        ) : isManualCheckingOut ? (
          <form onSubmit={handleManualSubmit} className="flex-1 flex flex-col justify-between overflow-y-auto py-4 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h4 className="text-sm font-semibold text-white">Buyer & Salon Details</h4>
                <button
                  type="button"
                  onClick={() => setIsManualCheckingOut(false)}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  Back to Bag
                </button>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="c-name" className="text-xs text-slate-300">Your Name / Artist *</Label>
                <Input
                  id="c-name"
                  placeholder="e.g. Maria Gonzalez"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="text-xs bg-[#05070c] border-white/15 text-white rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="s-name" className="text-xs text-slate-300">Salon / Academy / Brand Name</Label>
                <Input
                  id="s-name"
                  placeholder="e.g. Precision Lash & Brow Academy"
                  value={salonName}
                  onChange={(e) => setSalonName(e.target.value)}
                  className="text-xs bg-[#05070c] border-white/15 text-white rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="o-notes" className="text-xs text-slate-300">Custom Logo Engraving or Packaging Notes</Label>
                <Textarea
                  id="o-notes"
                  placeholder="Describe your logo or preferred finish (Gold Plasma, Satin Matte, Titanium Black)..."
                  rows={3}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="text-xs bg-[#05070c] border-white/15 text-white rounded-xl"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <Button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white text-xs sm:text-sm font-semibold rounded-xl">
                Submit Order to Askari Hub (${finalTotal.toFixed(2)})
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Cart Items List */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <ShoppingBag className="h-10 w-10 text-slate-600 mb-3" />
                <p className="text-sm font-medium text-white">Your beauty bag is currently empty.</p>
                <p className="text-xs mt-1 text-slate-400">Browse our lash tweezers, cuticle nippers, and salon shears.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 text-xs border-white/15 bg-white/5 text-slate-200 hover:text-white hover:border-cyan-400 rounded-xl"
                  onClick={() => setIsCartOpen(false)}
                >
                  Explore Catalog
                </Button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto divide-y divide-white/10 pr-1 py-2">
                {items.map(({ instrument, quantity }) => (
                  <div key={instrument.id} className="py-4 flex gap-4 items-start">
                    <img
                      src={instrument.image}
                      alt={instrument.name}
                      className="h-16 w-16 rounded-lg object-cover bg-[#05070c] border border-white/10 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-cyan-400 uppercase">
                            {instrument.ref}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                            {instrument.name}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(instrument.id)}
                          className="text-slate-400 hover:text-red-400 p-1 transition-colors"
                          aria-label={`Remove ${instrument.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-1 text-xs text-slate-400">
                        {instrument.finish} · {instrument.alloy}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        {/* Quantity Stepper */}
                        <div className="flex items-center rounded-lg border border-white/15 bg-[#05070c] text-xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(instrument.id, quantity - 1)}
                            className="px-2.5 py-1 text-slate-300 hover:text-white font-bold"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-1 font-mono tabular-nums text-white">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(instrument.id, quantity + 1)}
                            className="px-2.5 py-1 text-slate-300 hover:text-white font-bold"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-mono text-xs font-bold text-cyan-300 tabular-nums">
                          ${(instrument.price * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Subtotal & Checkout Actions */}
            {items.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Retail Price Total:</span>
                    <span className="font-mono text-white tabular-nums">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {isWholesale ? (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Wholesale Discount (15% off 10+ pcs):</span>
                      <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 flex items-center justify-between bg-slate-900/60 p-2.5 rounded-lg border border-white/5">
                      <span>Add {10 - totalCount} more for 15% wholesale discount!</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                    <span>Estimated Total:</span>
                    <span className="font-mono text-cyan-300 tabular-nums">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* 1-Click WhatsApp Instant Order */}
                <a
                  href={getWhatsAppOrderUrl(customerName, orderNotes)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-950 rounded-xl h-11 border border-emerald-400/30">
                    <MessageCircle className="h-4 w-4" />
                    Instant Order via WhatsApp (+923497560980)
                  </Button>
                </a>

                {/* Secondary email checkout */}
                <Button
                  variant="outline"
                  onClick={() => setIsManualCheckingOut(true)}
                  className="w-full text-xs font-semibold border-white/15 bg-white/5 text-slate-200 hover:text-white hover:bg-white/10 rounded-xl h-10"
                >
                  Submit Order Inquiry Online
                </Button>

                <p className="text-[10px] text-slate-500 text-center">
                  Official Export Desk: askarisurgicalhubs@gmail.com
                </p>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
