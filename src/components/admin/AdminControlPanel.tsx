import React, { useState, useEffect } from "react"
import { db, ClientLead, ProductRecord, AdminUser } from "@/src/services/db"
import { STORE_SEO_KEYWORDS } from "@/src/data/seo-keywords"
import {
  Users,
  Package,
  ShieldCheck,
  Search,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  MessageCircle,
  Mail,
  Copy,
  Check,
  Globe,
  TrendingUp,
  ArrowLeft,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AdminControlPanelProps {
  onBackToStore: () => void
  onSelectProduct?: (product: ProductRecord) => void
}

export default function AdminControlPanel({
  onBackToStore,
  onSelectProduct,
}: AdminControlPanelProps) {
  const [activeTab, setActiveTab] = useState<"products" | "clients" | "admins" | "seo">("products")
  const [products, setProducts] = useState<ProductRecord[]>(db.getProducts())
  const [clients, setClients] = useState<ClientLead[]>(db.getClients())
  const [admins, setAdmins] = useState<AdminUser[]>(db.getAdmins())

  // Search & Filter state
  const [productSearch, setProductSearch] = useState("")
  const [clientSearch, setClientSearch] = useState("")
  const [clientStatusFilter, setClientStatusFilter] = useState("All")

  // Modals state
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ProductRecord | null>(null)
  const [showAddClientModal, setShowAddClientModal] = useState(false)
  const [showAddAdminModal, setShowAddAdminModal] = useState(false)
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null)

  // Subscribe to DB updates
  useEffect(() => {
    const unsubscribe = db.subscribe(() => {
      setProducts(db.getProducts())
      setClients(db.getClients())
      setAdmins(db.getAdmins())
    })
    return unsubscribe
  }, [])

  // Product Form State
  const [productForm, setProductForm] = useState({
    ref: "",
    name: "",
    category: "Lash & Brow" as ProductRecord["category"],
    alloy: "German Inox" as ProductRecord["alloy"],
    finish: "Satin Matte Non-Glare" as ProductRecord["finish"],
    msrpPrice: 38.0,
    price: 15.0,
    wholesalePrice: 9.5,
    inStock: true,
    image: "/src/assets/images/hero_ash_instruments_tray_1791532125541.jpg",
    description: "",
    bladeOrTip: "Micro-fine calibrated tip",
    hardnessRating: "HRC 50",
    length: "120 mm",
    sterilization: "Autoclave 134°C Safe",
  })

  // Client Form State
  const [clientForm, setClientForm] = useState({
    name: "",
    salonName: "",
    email: "",
    whatsapp: "",
    productInterest: "90° Mega Volume Eyelash Tweezers",
    estimatedQty: "50 pcs",
    notes: "",
    status: "New Lead" as ClientLead["status"],
  })

  // Admin Form State
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    role: "Sales Manager" as AdminUser["role"],
    permissions: "CRM Leads, WhatsApp Orders",
  })

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!productForm.name || !productForm.ref) return

    if (editingProduct) {
      db.updateProduct(editingProduct.id, {
        ref: productForm.ref,
        name: productForm.name,
        category: productForm.category,
        alloy: productForm.alloy,
        finish: productForm.finish,
        price: Number(productForm.price),
        wholesalePrice: Number(productForm.wholesalePrice),
        msrpPrice: Number(productForm.msrpPrice || Number(productForm.price) * 2.2),
        description: productForm.description,
        specifications: {
          ...editingProduct.specifications,
          bladeOrTip: productForm.bladeOrTip,
          hardnessRating: productForm.hardnessRating,
          length: productForm.length,
          sterilization: productForm.sterilization,
        },
      })
      setEditingProduct(null)
    } else {
      db.addProduct({
        ref: productForm.ref,
        name: productForm.name,
        category: productForm.category,
        alloy: productForm.alloy,
        finish: productForm.finish,
        msrpPrice: Number(productForm.msrpPrice || Number(productForm.price) * 2.2),
        price: Number(productForm.price),
        wholesalePrice: Number(productForm.wholesalePrice),
        inStock: productForm.inStock,
        size: productForm.length || "120 mm (4.75\")",
        weight: "28.0 g",
        qualityGrade: "Export Grade · Hand-Honed Surgical Cutlery",
        rating: 5.0,
        reviewCount: 1,
        image: productForm.image,
        description: productForm.description,
        noCertificateNeeded: true,
        hsCode: "HS 8213.00 / 8214.20",
        keyFeatures: [
          "Laser-etched 'ASH INSTRUMENTS' official brand hallmark",
          "Hand-honed surgical steel aligned under 10x magnification",
          "Engineered for high-volume salon & academy durability",
        ],
        specifications: {
          bladeOrTip: productForm.bladeOrTip,
          hardnessRating: productForm.hardnessRating,
          sterilization: productForm.sterilization,
          length: productForm.length,
          warranty: "Lifetime Craftsmanship Guarantee",
        },
      })
      setShowAddProductModal(false)
    }
  }

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientForm.name || !clientForm.email) return

    db.addClient({
      name: clientForm.name,
      salonName: clientForm.salonName || "Independent Artist",
      email: clientForm.email,
      whatsapp: clientForm.whatsapp || "+923497560980",
      productInterest: clientForm.productInterest,
      estimatedQty: clientForm.estimatedQty,
      status: clientForm.status,
      notes: clientForm.notes,
      source: "Website Form",
    })

    setShowAddClientModal(false)
    setClientForm({
      name: "",
      salonName: "",
      email: "",
      whatsapp: "",
      productInterest: "90° Mega Volume Eyelash Tweezers",
      estimatedQty: "50 pcs",
      notes: "",
      status: "New Lead",
    })
  }

  const handleSaveAdmin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!adminForm.name || !adminForm.email) return

    db.addAdmin({
      name: adminForm.name,
      email: adminForm.email,
      role: adminForm.role,
      status: "Active",
      permissions: adminForm.permissions.split(",").map((s) => s.trim()),
    })

    setShowAddAdminModal(false)
    setAdminForm({
      name: "",
      email: "",
      role: "Sales Manager",
      permissions: "CRM Leads, WhatsApp Orders",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text)
    setCopiedKeyword(text)
    setTimeout(() => setCopiedKeyword(null), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar for Control Panel */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onBackToStore}
            className="gap-2 border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Live Store
          </Button>

          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
            <img
              src="/src/assets/images/logo_ash_instruments_1791532110951.jpg"
              alt="ASH Instruments Logo"
              className="h-8 w-8 rounded-full border border-slate-700 object-cover"
            />
            <div>
              <div className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
                <span>ASH Instruments Control Panel</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700">
                  3 DBs Active
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Askari Surgical Hubs · Export Portal Desk
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/923497560980"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 border-emerald-600/40 text-emerald-400 bg-emerald-950/20 hover:bg-emerald-900/40 text-xs"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp Desk (+923497560980)
            </Button>
          </a>

          <a
            href="mailto:askarisurgicalhubs@gmail.com"
            className="hidden md:inline-flex text-xs text-slate-400 hover:text-white"
          >
            askarisurgicalhubs@gmail.com
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Strip across the 3 Databases */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Database 1: Clients & CRM</span>
              <Users className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-2 tabular-nums">
              {clients.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {clients.filter((c) => c.status === "New Lead").length} pending inquiries
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Database 2: Products</span>
              <Package className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-2 tabular-nums">
              {products.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {products.filter((p) => p.inStock).length} in stock · 100% laser engraved
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Database 3: Admins / Staff</span>
              <ShieldCheck className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-2 tabular-nums">
              {admins.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Role-Based Access Control
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Google Keywords Hub</span>
              <Globe className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-2 tabular-nums">
              80+
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              20 keywords per page / product
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
              activeTab === "products"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Package className="h-4 w-4" />
            <span>Database 2: Products Inventory ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("clients")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
              activeTab === "clients"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Database 1: Clients & CRM ({clients.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("admins")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
              activeTab === "admins"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Database 3: Admins & Staff ({admins.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("seo")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
              activeTab === "seo"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Globe className="h-4 w-4" />
            <span>Google SEO & Keywords Hub</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: DATABASE 2 - PRODUCTS INVENTORY                   */}
        {/* ======================================================== */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Database 2: Product Inventory & Technical Specs
                </h3>
                <p className="text-xs text-slate-400">
                  Manage product SKUs, factory wholesale rates, stock flags, and laser engravings.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <Input
                    placeholder="Search SKU or name..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="pl-8 text-xs bg-slate-900 border-slate-800 text-white"
                  />
                </div>

                <Button
                  size="sm"
                  onClick={() => {
                    setEditingProduct(null)
                    setProductForm({
                      ref: `ASH-NEW-${Math.floor(100 + Math.random() * 900)}`,
                      name: "",
                      category: "Lash & Brow",
                      alloy: "German Inox",
                      finish: "Satin Matte Non-Glare",
                      msrpPrice: 38.0,
                      price: 16.0,
                      wholesalePrice: 10.0,
                      inStock: true,
                      image: "/src/assets/images/hero_ash_instruments_tray_1791532125541.jpg",
                      description: "Official laser-engraved ASH Instruments precision cutlery.",
                      bladeOrTip: "Hand-calibrated precision tip",
                      hardnessRating: "HRC 50",
                      length: "120 mm",
                      sterilization: "Autoclave 134°C Safe",
                    })
                    setShowAddProductModal(true)
                  }}
                  className="gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  <Plus className="h-4 w-4" />
                  Add New Instrument
                </Button>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="border-b border-slate-800 bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Instrument</th>
                    <th className="py-3 px-4">REF Code</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Alloy & Finish</th>
                    <th className="py-3 px-4">Direct Price</th>
                    <th className="py-3 px-4">Wholesale Rate</th>
                    <th className="py-3 px-4">Stock Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {products
                    .filter((p) =>
                      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.ref.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.category.toLowerCase().includes(productSearch.toLowerCase())
                    )
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-10 w-10 rounded object-cover bg-slate-950 border border-slate-800 shrink-0"
                          />
                          <div>
                            <div className="font-semibold text-white line-clamp-1">{item.name}</div>
                            <div className="text-[10px] text-slate-500 line-clamp-1">
                              {item.specifications.bladeOrTip}
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-mono text-blue-400 font-semibold">
                          {item.ref}
                        </td>

                        <td className="py-3 px-4 text-slate-300">
                          {item.category}
                        </td>

                        <td className="py-3 px-4 text-slate-400">
                          <div>{item.alloy}</div>
                          <div className="text-[10px] text-slate-500">{item.finish}</div>
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-white tabular-nums">
                          ${item.price.toFixed(2)}
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-emerald-400 tabular-nums">
                          ${item.wholesalePrice.toFixed(2)}
                        </td>

                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => db.toggleProductStock(item.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                              item.inStock
                                ? "bg-emerald-950/60 text-emerald-300 border border-emerald-700"
                                : "bg-red-950/60 text-red-300 border border-red-700"
                            }`}
                          >
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right space-x-1">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(item)
                              setProductForm({
                                ref: item.ref,
                                name: item.name,
                                category: item.category,
                                alloy: item.alloy,
                                finish: item.finish,
                                msrpPrice: item.msrpPrice || item.price * 2.2,
                                price: item.price,
                                wholesalePrice: item.wholesalePrice,
                                inStock: item.inStock,
                                image: item.image,
                                description: item.description,
                                bladeOrTip: item.specifications.bladeOrTip,
                                hardnessRating: item.specifications.hardnessRating,
                                length: item.specifications.length,
                                sterilization: item.specifications.sterilization,
                              })
                              setShowAddProductModal(true)
                            }}
                            className="p-1 text-slate-400 hover:text-white"
                            title="Edit Product"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => db.deleteProduct(item.id)}
                            className="p-1 text-slate-400 hover:text-red-400"
                            title="Delete Product"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: DATABASE 1 - CLIENTS & VISITORS CRM               */}
        {/* ======================================================== */}
        {activeTab === "clients" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Database 1: Clients & Visitors CRM
                </h3>
                <p className="text-xs text-slate-400">
                  Track wholesale inquiries, client academies, WhatsApp orders, and dispatch statuses.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <Input
                    placeholder="Search client name or salon..."
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className="pl-8 text-xs bg-slate-900 border-slate-800 text-white"
                  />
                </div>

                <Button
                  size="sm"
                  onClick={() => setShowAddClientModal(true)}
                  className="gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                >
                  <Plus className="h-4 w-4" />
                  Record New Client Lead
                </Button>
              </div>
            </div>

            {/* Clients Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="border-b border-slate-800 bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Client / Salon</th>
                    <th className="py-3 px-4">Contact Info</th>
                    <th className="py-3 px-4">Product Interest</th>
                    <th className="py-3 px-4">Est. Quantity</th>
                    <th className="py-3 px-4">Lead Status</th>
                    <th className="py-3 px-4">Received</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {clients
                    .filter((c) =>
                      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
                      c.salonName.toLowerCase().includes(clientSearch.toLowerCase()) ||
                      c.email.toLowerCase().includes(clientSearch.toLowerCase())
                    )
                    .map((client) => (
                      <tr key={client.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-white">{client.name}</div>
                          <div className="text-[11px] text-slate-400">{client.salonName}</div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="text-slate-300">{client.email}</div>
                          <div className="text-[11px] font-mono text-emerald-400">{client.whatsapp}</div>
                        </td>

                        <td className="py-3 px-4 text-slate-300">
                          {client.productInterest}
                        </td>

                        <td className="py-3 px-4 font-mono font-medium text-slate-200">
                          {client.estimatedQty}
                        </td>

                        <td className="py-3 px-4">
                          <select
                            value={client.status}
                            onChange={(e) =>
                              db.updateClientStatus(
                                client.id,
                                e.target.value as ClientLead["status"]
                              )
                            }
                            className="bg-slate-950 border border-slate-700 text-xs rounded px-2 py-1 text-slate-200"
                          >
                            <option value="New Lead">New Lead</option>
                            <option value="Contacted / Quoted">Contacted / Quoted</option>
                            <option value="Order Confirmed">Order Confirmed</option>
                            <option value="Dispatched">Dispatched</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 text-slate-400 text-[11px]">
                          {client.date}
                        </td>

                        <td className="py-3 px-4 text-right space-x-2">
                          <a
                            href={`https://wa.me/${client.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Hello ${client.name}, this is ASH Instruments (Askari Surgical Hubs) regarding your inquiry for ${client.productInterest}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block p-1 text-emerald-400 hover:text-emerald-300"
                            title="Direct WhatsApp"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </a>

                          <button
                            type="button"
                            onClick={() => db.deleteClient(client.id)}
                            className="p-1 text-slate-400 hover:text-red-400"
                            title="Delete Lead"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: DATABASE 3 - ADMINS & AUTHORIZED USERS            */}
        {/* ======================================================== */}
        {activeTab === "admins" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Database 3: Administrator & User Roles
                </h3>
                <p className="text-xs text-slate-400">
                  Role-based access permissions for Askari Surgical Hubs management team.
                </p>
              </div>

              <Button
                size="sm"
                onClick={() => setShowAddAdminModal(true)}
                className="gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                <Plus className="h-4 w-4" />
                Add Authorized Staff User
              </Button>
            </div>

            {/* Admins Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="border-b border-slate-800 bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">User Name</th>
                    <th className="py-3 px-4">Official Email</th>
                    <th className="py-3 px-4">Assigned Role</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Permissions</th>
                    <th className="py-3 px-4">Last Active</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {admins.map((adm) => (
                    <tr key={adm.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white">
                        {adm.name}
                      </td>

                      <td className="py-3 px-4 text-slate-300 font-mono">
                        {adm.email}
                      </td>

                      <td className="py-3 px-4">
                        <span className="bg-slate-800 text-blue-400 border border-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                          {adm.role}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`text-[11px] font-semibold ${
                            adm.status === "Active" ? "text-emerald-400" : "text-red-400"
                          }`}
                        >
                          ● {adm.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-400 text-[11px]">
                        {adm.permissions.join(", ")}
                      </td>

                      <td className="py-3 px-4 text-slate-400 text-[11px]">
                        {adm.lastLogin}
                      </td>

                      <td className="py-3 px-4 text-right space-x-1">
                        <button
                          type="button"
                          onClick={() => db.toggleAdminStatus(adm.id)}
                          className="px-2 py-1 text-[11px] text-slate-300 hover:text-white border border-slate-700 rounded"
                        >
                          {adm.status === "Active" ? "Suspend" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: GOOGLE SEO & 20 ACCEPTED KEYWORDS HUB             */}
        {/* ======================================================== */}
        {activeTab === "seo" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">
                Google SEO & Commercial Keywords Center
              </h3>
              <p className="text-xs text-slate-400">
                20 Google-indexed commercial keywords per category and page, formatted for Google Search Console, Google Ads, and Meta Tags.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {STORE_SEO_KEYWORDS.map((group, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="font-bold text-white text-sm">{group.category}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{group.pageTitle}</p>
                    </div>
                    <span className="font-mono text-xs text-blue-400 font-bold px-2 py-0.5 rounded bg-blue-950 border border-blue-800">
                      20 Google Keywords
                    </span>
                  </div>

                  {/* Keywords Pills */}
                  <div>
                    <div className="text-[11px] text-slate-400 mb-2 font-medium">
                      High-Volume Commercial Search Terms:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.googleAcceptedKeywords.map((kw, kIdx) => (
                        <button
                          key={kIdx}
                          type="button"
                          onClick={() => copyToClipboard(kw)}
                          className="text-[11px] bg-slate-950 hover:bg-blue-900/40 text-slate-300 hover:text-white border border-slate-800 px-2 py-0.5 rounded transition-colors text-left flex items-center gap-1"
                          title="Click to copy keyword"
                        >
                          <span>{kw}</span>
                          {copiedKeyword === kw && <Check className="h-3 w-3 text-emerald-400 inline" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Copy All Button */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Google Ads & Meta Tag Ready</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(group.googleAcceptedKeywords.join(", "))}
                      className="gap-1.5 text-xs border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy All 20 Keywords
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT PRODUCT                                */}
      {/* ======================================================== */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white space-y-4">
            <h3 className="text-lg font-bold">
              {editingProduct ? "Edit Product & Original Content" : "Add New Instrument to Database 2"}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">REF / SKU Code *</Label>
                  <Input
                    required
                    value={productForm.ref}
                    onChange={(e) => setProductForm({ ...productForm, ref: e.target.value })}
                    className="text-xs bg-slate-950 border-slate-800 text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Instrument Name *</Label>
                  <Input
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="text-xs bg-slate-950 border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Category</Label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        category: e.target.value as ProductRecord["category"],
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 text-xs rounded p-2 text-white"
                  >
                    <option value="Lash & Brow">Lash & Brow</option>
                    <option value="Nail & Cuticle">Nail & Cuticle</option>
                    <option value="Hair & Barber">Hair & Barber</option>
                    <option value="Dermatology & Skin">Dermatology & Skin</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Direct Price ($)</Label>
                  <Input
                    type="number"
                    step="0.5"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="text-xs bg-slate-950 border-slate-800 text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Wholesale 10+ ($)</Label>
                  <Input
                    type="number"
                    step="0.5"
                    required
                    value={productForm.wholesalePrice}
                    onChange={(e) =>
                      setProductForm({ ...productForm, wholesalePrice: Number(e.target.value) })
                    }
                    className="text-xs bg-slate-950 border-slate-800 text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Original Technical Content Description *</Label>
                <Textarea
                  required
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="text-xs bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Tip / Blade Profile</Label>
                  <Input
                    value={productForm.bladeOrTip}
                    onChange={(e) => setProductForm({ ...productForm, bladeOrTip: e.target.value })}
                    className="text-xs bg-slate-950 border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Hardness Rating (HRC)</Label>
                  <Input
                    value={productForm.hardnessRating}
                    onChange={(e) =>
                      setProductForm({ ...productForm, hardnessRating: e.target.value })
                    }
                    className="text-xs bg-slate-950 border-slate-800 text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddProductModal(false)}
                  className="text-xs border-slate-700 bg-slate-800 text-slate-300"
                >
                  Cancel
                </Button>
                <Button type="submit" className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold">
                  Save Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD CLIENT RECORD                                 */}
      {/* ======================================================== */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white space-y-4">
            <h3 className="text-lg font-bold">Record Client Lead in Database 1</h3>

            <form onSubmit={handleSaveClient} className="space-y-3 text-xs">
              <div className="space-y-1">
                <Label className="text-xs">Contact Person Name *</Label>
                <Input
                  required
                  placeholder="e.g. Jessica Miller"
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  className="text-xs bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Salon / Academy Name</Label>
                <Input
                  placeholder="e.g. Velvet Lash Lounge"
                  value={clientForm.salonName}
                  onChange={(e) => setClientForm({ ...clientForm, salonName: e.target.value })}
                  className="text-xs bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Email *</Label>
                  <Input
                    required
                    type="email"
                    value={clientForm.email}
                    onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                    className="text-xs bg-slate-950 border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">WhatsApp Number</Label>
                  <Input
                    value={clientForm.whatsapp}
                    onChange={(e) => setClientForm({ ...clientForm, whatsapp: e.target.value })}
                    className="text-xs bg-slate-950 border-slate-800 text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Product of Interest</Label>
                <Input
                  value={clientForm.productInterest}
                  onChange={(e) => setClientForm({ ...clientForm, productInterest: e.target.value })}
                  className="text-xs bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddClientModal(false)}
                  className="text-xs border-slate-700 bg-slate-800 text-slate-300"
                >
                  Cancel
                </Button>
                <Button type="submit" className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                  Save Client Lead
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD ADMIN RECORD                                  */}
      {/* ======================================================== */}
      {showAddAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white space-y-4">
            <h3 className="text-lg font-bold">Add Authorized User to Database 3</h3>

            <form onSubmit={handleSaveAdmin} className="space-y-3 text-xs">
              <div className="space-y-1">
                <Label className="text-xs">Full Name *</Label>
                <Input
                  required
                  placeholder="Staff member name"
                  value={adminForm.name}
                  onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                  className="text-xs bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Official Email *</Label>
                <Input
                  required
                  type="email"
                  placeholder="staff@ashinstruments.com"
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  className="text-xs bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Role Assignment</Label>
                <select
                  value={adminForm.role}
                  onChange={(e) =>
                    setAdminForm({
                      ...adminForm,
                      role: e.target.value as AdminUser["role"],
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 text-xs rounded p-2 text-white"
                >
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Catalog Specialist">Catalog Specialist</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddAdminModal(false)}
                  className="text-xs border-slate-700 bg-slate-800 text-slate-300"
                >
                  Cancel
                </Button>
                <Button type="submit" className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold">
                  Create Staff Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
