import { BeautyInstrument, BEAUTY_INSTRUMENTS } from "@/src/data/beauty-instruments"

// ==========================================
// DATABASE 1: CLIENTS & VISITORS CRM
// ==========================================
export interface ClientLead {
  id: string
  name: string
  salonName: string
  email: string
  whatsapp: string
  productInterest: string
  estimatedQty: string
  status: "New Lead" | "Contacted / Quoted" | "Order Confirmed" | "Dispatched"
  date: string
  notes: string
  source: "Website Form" | "WhatsApp Direct" | "Catalog Download"
}

// Initial Seed for Database 1
const initialClients: ClientLead[] = [
  {
    id: "lead-101",
    name: "Elena Rostova",
    salonName: "Lash Architecture Academy",
    email: "elena@lasharchitecture.com",
    whatsapp: "+1 (415) 890-2134",
    productInterest: "90° Fiber-Tip Mega Volume Tweezers",
    estimatedQty: "50 pcs (OEM Private Label)",
    status: "Contacted / Quoted",
    date: "Today, 10:45 AM",
    notes: "Requested custom laser logo and Rose Gold/Black PVD samples.",
    source: "Website Form",
  },
  {
    id: "lead-102",
    name: "Marco Rossi",
    salonName: "Milano Barber Hub",
    email: "m.rossi@milanobarber.it",
    whatsapp: "+39 345 678 9012",
    productInterest: "Japanese 440C Salon Hair Shears 6.0\"",
    estimatedQty: "25 pcs",
    status: "New Lead",
    date: "Yesterday, 3:20 PM",
    notes: "Interested in sample shears with brass click pivot.",
    source: "WhatsApp Direct",
  },
  {
    id: "lead-103",
    name: "Chloe Dupont",
    salonName: "Atelier Manucure Paris",
    email: "chloe@ateliermanucure.fr",
    whatsapp: "+33 6 12 34 56 78",
    productInterest: "Pro-Grade Cobalt Cuticle Nippers 4mm",
    estimatedQty: "100 pcs",
    status: "Order Confirmed",
    date: "Oct 8, 2026",
    notes: "Approved pro-forma invoice #ASH-2026-894. Dispatched via DHL Express.",
    source: "Website Form",
  },
  {
    id: "lead-104",
    name: "Dr. Sarah Jenkins",
    salonName: "DermAesthetic Clinic London",
    email: "s.jenkins@dermaesthetic.co.uk",
    whatsapp: "+44 7700 900123",
    productInterest: "Dermatological Comedone & Blackhead Extractor Set",
    estimatedQty: "30 pcs",
    status: "Dispatched",
    date: "Oct 7, 2026",
    notes: "Dispatched tracked air parcel. Tracking ID: DHL-84920419.",
    source: "Catalog Download",
  },
]

// ==========================================
// DATABASE 2: PRODUCT INVENTORY & SPECS
// ==========================================
export type ProductRecord = BeautyInstrument

// ==========================================
// DATABASE 3: ADMIN & AUTHORIZED USERS
// ==========================================
export interface AdminUser {
  id: string
  name: string
  email: string
  role: "Super Admin" | "Sales Manager" | "Catalog Specialist"
  status: "Active" | "Suspended"
  lastLogin: string
  permissions: string[]
}

const initialAdmins: AdminUser[] = [
  {
    id: "admin-1",
    name: "Malik Askari",
    email: "askarisurgicalhubs@gmail.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "Active Now",
    permissions: ["All Privileges", "Price Overrides", "Staff Management", "Database Export"],
  },
  {
    id: "admin-2",
    name: "Hamza Tariq",
    email: "sales@ashinstruments.com",
    role: "Sales Manager",
    status: "Active",
    lastLogin: "2 hours ago",
    permissions: ["CRM Leads", "WhatsApp Dispatch", "Invoicing", "Sample Orders"],
  },
  {
    id: "admin-3",
    name: "Zainab Shah",
    email: "qc@ashinstruments.com",
    role: "Catalog Specialist",
    status: "Active",
    lastLogin: "Yesterday",
    permissions: ["Product Inventory", "SEO Keywords", "Quality Audits"],
  },
]

// STORAGE KEYS
const STORAGE_KEYS = {
  CLIENTS: "ash_db_clients_v1",
  PRODUCTS: "ash_db_products_v8",
  ADMINS: "ash_db_admins_v1",
}

// Memory + LocalStorage synchronizer
class DatabaseEngine {
  private clients: ClientLead[] = []
  private products: ProductRecord[] = []
  private admins: AdminUser[] = []
  private listeners: (() => void)[] = []

  constructor() {
    this.init()
  }

  private init() {
    try {
      // 1. Clients
      const storedClients = localStorage.getItem(STORAGE_KEYS.CLIENTS)
      this.clients = storedClients ? JSON.parse(storedClients) : initialClients

      // 2. Products (load and synchronize with latest default instruments)
      const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS)
      if (storedProducts) {
        const parsed: ProductRecord[] = JSON.parse(storedProducts)
        const parsedMap = new Map(parsed.map((p) => [p.id, p]))

        // Keep fresh images, sizes, departments, and pricing for default catalog products while retaining any custom items
        const syncedDefaults = BEAUTY_INSTRUMENTS.map((defaultItem) => {
          const custom = parsedMap.get(defaultItem.id)
          if (!custom) return defaultItem
          return {
            ...custom,
            category: defaultItem.category,
            department: defaultItem.department,
            image: defaultItem.image,
            size: defaultItem.size,
            weight: defaultItem.weight,
            qualityGrade: defaultItem.qualityGrade,
            msrpPrice: defaultItem.msrpPrice,
            price: defaultItem.price,
            wholesalePrice: defaultItem.wholesalePrice,
            specifications: defaultItem.specifications,
          }
        })

        const defaultIds = new Set(BEAUTY_INSTRUMENTS.map((b) => b.id))
        const userAddedProducts = parsed.filter((p) => !defaultIds.has(p.id))
        this.products = [...syncedDefaults, ...userAddedProducts]
      } else {
        this.products = BEAUTY_INSTRUMENTS
      }

      // 3. Admins
      const storedAdmins = localStorage.getItem(STORAGE_KEYS.ADMINS)
      this.admins = storedAdmins ? JSON.parse(storedAdmins) : initialAdmins
    } catch {
      this.clients = initialClients
      this.products = BEAUTY_INSTRUMENTS
      this.admins = initialAdmins
    }
  }

  private saveClients() {
    try {
      localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(this.clients))
    } catch {}
    this.notify()
  }

  private saveProducts() {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products))
    } catch {}
    this.notify()
  }

  private saveAdmins() {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(this.admins))
    } catch {}
    this.notify()
  }

  private notify() {
    this.listeners.forEach((fn) => fn())
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  // --- DB 1: CLIENTS API ---
  public getClients(): ClientLead[] {
    return [...this.clients]
  }

  public addClient(lead: Omit<ClientLead, "id" | "date">): ClientLead {
    const newLead: ClientLead = {
      ...lead,
      id: `lead-${Date.now()}`,
      date: "Just now",
    }
    this.clients.unshift(newLead)
    this.saveClients()
    return newLead
  }

  public updateClientStatus(id: string, status: ClientLead["status"]) {
    this.clients = this.clients.map((c) => (c.id === id ? { ...c, status } : c))
    this.saveClients()
  }

  public deleteClient(id: string) {
    this.clients = this.clients.filter((c) => c.id !== id)
    this.saveClients()
  }

  // --- DB 2: PRODUCTS API ---
  public getProducts(): ProductRecord[] {
    return [...this.products]
  }

  public getProductById(id: string): ProductRecord | undefined {
    return this.products.find((p) => p.id === id)
  }

  public addProduct(product: Omit<ProductRecord, "id">): ProductRecord {
    const newProduct: ProductRecord = {
      ...product,
      id: `prod-${Date.now()}`,
    }
    this.products.unshift(newProduct)
    this.saveProducts()
    return newProduct
  }

  public updateProduct(id: string, updates: Partial<ProductRecord>) {
    this.products = this.products.map((p) => (p.id === id ? { ...p, ...updates } : p))
    this.saveProducts()
  }

  public toggleProductStock(id: string) {
    this.products = this.products.map((p) =>
      p.id === id ? { ...p, inStock: !p.inStock } : p
    )
    this.saveProducts()
  }

  public deleteProduct(id: string) {
    this.products = this.products.filter((p) => p.id !== id)
    this.saveProducts()
  }

  public resetProductsToDefault() {
    this.products = [...BEAUTY_INSTRUMENTS]
    this.saveProducts()
  }

  // --- DB 3: ADMINS API ---
  public getAdmins(): AdminUser[] {
    return [...this.admins]
  }

  public addAdmin(admin: Omit<AdminUser, "id" | "lastLogin">): AdminUser {
    const newAdmin: AdminUser = {
      ...admin,
      id: `admin-${Date.now()}`,
      lastLogin: "Never logged in",
    }
    this.admins.push(newAdmin)
    this.saveAdmins()
    return newAdmin
  }

  public toggleAdminStatus(id: string) {
    this.admins = this.admins.map((a) =>
      a.id === id
        ? { ...a, status: a.status === "Active" ? "Suspended" : "Active" }
        : a
    )
    this.saveAdmins()
  }

  public deleteAdmin(id: string) {
    this.admins = this.admins.filter((a) => a.id !== id)
    this.saveAdmins()
  }
}

export const db = new DatabaseEngine()
