import React, { createContext, useContext, useState } from "react"
import { BeautyInstrument, BEAUTY_INSTRUMENTS } from "@/src/data/beauty-instruments"

export interface CartItem {
  instrument: BeautyInstrument
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (instrument: BeautyInstrument, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalCount: number
  subtotal: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  getWhatsAppOrderUrl: (customerName?: string, notes?: string) => string
  getEmailOrderMailto: (customerName?: string, notes?: string) => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    {
      instrument: BEAUTY_INSTRUMENTS[0], // 90° Fiber-Tip Lash Tweezers
      quantity: 2,
    },
    {
      instrument: BEAUTY_INSTRUMENTS[1], // Pro Cuticle Nipper
      quantity: 1,
    },
  ])

  const [isCartOpen, setIsCartOpen] = useState(false)

  const addItem = (instrument: BeautyInstrument, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.instrument.id === instrument.id)
      if (existing) {
        return prev.map((item) =>
          item.instrument.id === instrument.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { instrument, quantity }]
    })
    setIsCartOpen(true)
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.instrument.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.instrument.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.instrument.price * item.quantity,
    0
  )

  const getWhatsAppOrderUrl = (customerName = "Valued Customer", notes = "") => {
    const lines = [
      `Hello ASH Instruments (Askari Surgical Hubs),`,
      `I would like to place an order for Beauty Instruments:`,
      ...items.map(
        (i) =>
          `• ${i.instrument.name} [REF: ${i.instrument.ref}] - Qty: ${i.quantity} @ $${i.instrument.price.toFixed(2)} = $${(i.instrument.price * i.quantity).toFixed(2)}`
      ),
      `Total Units: ${totalCount}`,
      `Estimated Subtotal: $${subtotal.toFixed(2)}`,
      customerName ? `Client Name: ${customerName}` : "",
      notes ? `Notes / Custom Branding: ${notes}` : "",
      `Please confirm stock availability and shipping rates. Thank you!`
    ].filter(Boolean)

    const encoded = encodeURIComponent(lines.join("\n"))
    return `https://wa.me/923497560980?text=${encoded}`
  }

  const getEmailOrderMailto = (customerName = "Valued Customer", notes = "") => {
    const subject = encodeURIComponent(`Order Inquiry - ASH Instruments (${totalCount} units)`)
    const body = encodeURIComponent(
      `Hello ASH Instruments,\n\nI would like to order the following beauty instruments:\n` +
      items.map(
        (i) => `- ${i.instrument.name} (REF: ${i.instrument.ref}) x ${i.quantity} = $${(i.instrument.price * i.quantity).toFixed(2)}`
      ).join("\n") +
      `\n\nTotal: $${subtotal.toFixed(2)}\nCustomer Name: ${customerName}\nNotes: ${notes}\n\nPlease reply with invoice and shipping timeline.`
    )
    return `mailto:askarisurgicalhubs@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        getWhatsAppOrderUrl,
        getEmailOrderMailto,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
