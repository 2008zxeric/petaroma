import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 产品类型（与前台一致）
export interface Product {
  id: string
  name: string
  name_en: string
  description: string
  price: number
  original_price?: number
  category: string
  image: string
  images: string[]
  in_stock: boolean
  stock: number
  tags: string[]
  featured: boolean
  rating?: number
  sales?: number
  created_at: string
}

// 订单类型
export interface Order {
  id: string
  user_id: string
  user_name: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  address: string
  phone: string
  remark?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  product_id: string
  product_name: string
  price: number
  quantity: number
  image: string
}

// 用户类型
export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  address: string
  total_orders: number
  total_spent: number
  created_at: string
  last_order_at?: string
}

// 默认产品数据（与前台 Shop.tsx 同步）
const DEFAULT_PRODUCTS: Product[] = [
  // 雷雨安抚系列
  { id: '1', name: '雷雨安·安抚精油 30ml', name_en: 'Storm Calm', description: '专为雷雨天气焦虑的宠物设计，含真实薰衣草与佛手柑精油', price: 168, category: 'storm', image: 'https://images.unsplash.com/photo-1587300003388-2581a5c5ac00?w=600', images: [], in_stock: true, stock: 100, tags: ['雷雨', '焦虑'], featured: true, rating: 4.8, sales: 3280, created_at: '2024-01-01' },
  { id: '2', name: '雷雨安·安抚套装', name_en: 'Storm Calm Set', description: '精油30ml + 扩香石 + 使用指南，雷雨季必备', price: 268, original_price: 320, category: 'storm', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dcd?w=600', images: [], in_stock: true, stock: 50, tags: ['套装', '雷雨'], featured: true, rating: 4.9, sales: 1560, created_at: '2024-01-01' },
  { id: '3', name: '安抚扩香石·云朵款', name_en: 'Cloud Diffuser', description: '天然火山石扩香，可持续释放芳香6-8小时', price: 68, category: 'storm', image: 'https://images.unsplash.com/photo-1615136662246-45bf0d7a9a6e?w=600', images: [], in_stock: true, stock: 200, tags: ['扩香石', '配件'], featured: false, rating: 4.6, sales: 890, created_at: '2024-01-01' },
  
  // 分离焦虑系列
  { id: '4', name: '暂别安·分离焦虑精油 30ml', name_en: 'Separation Calm', description: '缓解宠物独处时的分离焦虑，培养安全感', price: 188, category: 'separation', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600', images: [], in_stock: true, stock: 80, tags: ['分离焦虑', '独处'], featured: true, rating: 4.9, sales: 4120, created_at: '2024-01-01' },
  { id: '5', name: '安全感安抚玩具', name_en: 'Comfort Toy', description: '内置心跳模拟器，给独处宠物妈妈般的陪伴', price: 128, category: 'separation', image: 'https://images.unsplash.com/photo-1601758228041-f3b2950c2a3c?w=600', images: [], in_stock: true, stock: 120, tags: ['玩具', '安全感'], featured: false, rating: 4.7, sales: 2340, created_at: '2024-01-01' },
  { id: '6', name: '暂别安·训练喷雾', name_en: 'Training Spray', description: '喷洒在玩具或窝垫上，增强安抚效果', price: 98, category: 'separation', image: 'https://images.unsplash.com/photo-1552053831-71594a276e69?w=600', images: [], in_stock: true, stock: 150, tags: ['喷雾', '训练'], featured: false, rating: 4.5, sales: 1890, created_at: '2024-01-01' },
  
  // 出行放松系列
  { id: '7', name: '出行安·旅途放松精油 30ml', name_en: 'Travel Calm', description: '让宠物在车程、航空旅行中保持平静', price: 158, category: 'travel', image: 'https://images.unsplash.com/photo-1587300003388-2581a5c5ac00?w=600', images: [], in_stock: true, stock: 120, tags: ['出行', '旅途'], featured: true, rating: 4.7, sales: 1890, created_at: '2024-01-01' },
  { id: '8', name: '车载扩香器', name_en: 'Car Diffuser', description: 'USB充电车载扩香，静音设计不干扰驾驶', price: 158, original_price: 198, category: 'travel', image: 'https://images.unsplash.com/photo-1548192746-dd52654f2bf7?w=600', images: [], in_stock: true, stock: 80, tags: ['车载', '配件'], featured: false, rating: 4.6, sales: 1560, created_at: '2024-01-01' },
  { id: '9', name: '出行便携套装', name_en: 'Travel Kit', description: '精油10ml + 便携扩香器，说走就走', price: 198, category: 'travel', image: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=600', images: [], in_stock: true, stock: 60, tags: ['便携', '套装'], featured: true, rating: 4.8, sales: 2780, created_at: '2024-01-01' },
  
  // 睡眠安神系列
  { id: '10', name: '窝窝安·睡眠精油 30ml', name_en: 'Nest Calm', description: '帮助宠物放松入睡，提升睡眠质量', price: 178, category: 'nest', image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600', images: [], in_stock: true, stock: 90, tags: ['睡眠', '夜晚'], featured: true, rating: 4.9, sales: 3560, created_at: '2024-01-01' },
  { id: '11', name: '窝窝安·香薰机', name_en: 'Aromatherapy Machine', description: '超声波静音香薰机，智能定时，卧室专用', price: 328, original_price: 398, category: 'nest', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600', images: [], in_stock: true, stock: 50, tags: ['香薰机', '静音'], featured: true, rating: 4.8, sales: 1240, created_at: '2024-01-01' },
  { id: '12', name: '睡眠安抚玩具', name_en: 'Sleep Toy', description: '内置天然草本填充，帮助宠物安稳入睡', price: 88, category: 'nest', image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=600', images: [], in_stock: true, stock: 180, tags: ['玩具', '睡眠'], featured: false, rating: 4.5, sales: 980, created_at: '2024-01-01' },
  { id: '13', name: '窝窝安·纯棉安抚巾', name_en: 'Calm Blanket', description: '带有熟悉主人气味的安全感安抚巾', price: 68, category: 'nest', image: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=600', images: [], in_stock: true, stock: 250, tags: ['安抚巾', '安全感'], featured: false, rating: 4.7, sales: 2100, created_at: '2024-01-01' },
  
  // 清洁护理系列
  { id: '14', name: '宠物除臭喷雾', name_en: 'Odor Eliminator', description: '分解型除臭，根源去除异味，不伤害宠物嗅觉', price: 78, category: 'care', image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ce2910?w=600', images: [], in_stock: true, stock: 300, tags: ['除臭', '清洁'], featured: false, rating: 4.6, sales: 4560, created_at: '2024-01-01' },
  { id: '15', name: '温和洗护精油', name_en: 'Gentle Shampoo', description: '添加薰衣草精油，温和清洁的同时舒缓情绪', price: 128, original_price: 158, category: 'care', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad4d7?w=600', images: [], in_stock: true, stock: 100, tags: ['洗护', '清洁'], featured: false, rating: 4.7, sales: 1890, created_at: '2024-01-01' },
  { id: '16', name: '环境驱虫精油', name_en: 'Natural Repellent', description: '天然植物驱虫配方，安全驱避跳蚤蜱虫', price: 98, category: 'care', image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600', images: [], in_stock: true, stock: 150, tags: ['驱虫', '防护'], featured: false, rating: 4.5, sales: 2340, created_at: '2024-01-01' },
  
  // 营养保健系列
  { id: '17', name: '关节养护精油', name_en: 'Joint Care', description: '促进关节灵活，缓解老年宠物运动不适', price: 198, category: 'health', image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600', images: [], in_stock: true, stock: 80, tags: ['关节', '老年'], featured: false, rating: 4.6, sales: 1230, created_at: '2024-01-01' },
  { id: '18', name: '皮毛滋养精油', name_en: 'Coat Nourish', description: '改善毛发质量，让宠物皮毛更柔亮', price: 168, category: 'health', image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf9b08?w=600', images: [], in_stock: true, stock: 100, tags: ['皮毛', '美容'], featured: false, rating: 4.7, sales: 1890, created_at: '2024-01-01' },
  { id: '19', name: '免疫增强精油', name_en: 'Immune Boost', description: '提升宠物自身免疫力，预防常见疾病', price: 228, category: 'health', image: 'https://images.unsplash.com/photo-1511040022017-6749d07f6ade?w=600', images: [], in_stock: true, stock: 60, tags: ['免疫', '保健'], featured: false, rating: 4.5, sales: 980, created_at: '2024-01-01' },
  
  // 配件工具系列
  { id: '20', name: '精油收纳盒', name_en: 'Oil Storage Box', description: '分格设计，保护精油不受光照影响', price: 58, category: 'accessory', image: 'https://images.unsplash.com/photo-1596462502278-81699f06ccec?w=600', images: [], in_stock: true, stock: 200, tags: ['收纳', '配件'], featured: false, rating: 4.4, sales: 1560, created_at: '2024-01-01' },
  { id: '21', name: '滴管套装（10支）', name_en: 'Dropper Set', description: '精准取用精油，带刻度设计', price: 38, category: 'accessory', image: 'https://images.unsplash.com/photo-1556228578-0d85b42864d9?w=600', images: [], in_stock: true, stock: 300, tags: ['工具', '滴管'], featured: false, rating: 4.3, sales: 2890, created_at: '2024-01-01' },
  
  // 礼盒套装系列
  { id: '22', name: '新手入门套装', name_en: 'Starter Kit', description: '3款人气精油 + 扩香石 + 使用手册', price: 399, original_price: 498, category: 'set', image: 'https://images.unsplash.com/photo-1587300003388-2581a5c5ac00?w=600', images: [], in_stock: true, stock: 40, tags: ['套装', '入门'], featured: true, rating: 4.9, sales: 2450, created_at: '2024-01-01' },
  { id: '23', name: '尊享礼盒', name_en: 'Premium Gift Box', description: '全系列6款精油 + 香薰机 + 定制礼盒', price: 888, original_price: 1080, category: 'set', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600', images: [], in_stock: true, stock: 20, tags: ['礼盒', '高端'], featured: true, rating: 5.0, sales: 890, created_at: '2024-01-01' },
  { id: '24', name: '安神套装', name_en: 'Calm Gift Set', description: '雷雨安 + 暂别安 + 窝窝安，全方位安抚', price: 488, original_price: 598, category: 'set', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dcd?w=600', images: [], in_stock: true, stock: 30, tags: ['套装', '安抚'], featured: true, rating: 4.8, sales: 1890, created_at: '2024-01-01' },
]

// 模拟订单数据
const DEFAULT_ORDERS: Order[] = [
  { id: 'ORD001', user_id: 'U001', user_name: '小柴妈妈', items: [{ product_id: '1', product_name: '雷雨安·安抚精油 30ml', price: 168, quantity: 2, image: '' }], total: 368, status: 'paid', address: '上海市浦东新区张江高科技园区', phone: '138****8888', remark: '请在工作日配送', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'ORD002', user_id: 'U002', user_name: '金毛大王', items: [{ product_id: '4', product_name: '暂别安·分离焦虑精油 30ml', price: 188, quantity: 1, image: '' }], total: 199, status: 'shipped', address: '北京市朝阳区望京SOHO', phone: '139****9999', created_at: new Date(Date.now() - 86400000).toISOString(), updated_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 'ORD003', user_id: 'U003', user_name: '布偶铲屎官', items: [{ product_id: '22', product_name: '新手入门套装', price: 399, quantity: 1, image: '' }, { product_id: '3', product_name: '安抚扩香石·云朵款', price: 68, quantity: 2, image: '' }], total: 488, status: 'pending', address: '广州市天河区珠江新城', phone: '136****6666', created_at: new Date(Date.now() - 172800000).toISOString(), updated_at: new Date(Date.now() - 172800000).toISOString() },
  { id: 'ORD004', user_id: 'U004', user_name: '柯基爱骨骨', items: [{ product_id: '10', product_name: '窝窝安·睡眠精油 30ml', price: 178, quantity: 1, image: '' }], total: 158, status: 'delivered', address: '深圳市南山区科技园', phone: '137****7777', created_at: new Date(Date.now() - 259200000).toISOString(), updated_at: new Date(Date.now() - 259200000).toISOString() },
  { id: 'ORD005', user_id: 'U001', user_name: '小柴妈妈', items: [{ product_id: '23', product_name: '尊享礼盒', price: 888, quantity: 1, image: '' }], total: 888, status: 'delivered', address: '上海市浦东新区张江高科技园区', phone: '138****8888', created_at: new Date(Date.now() - 345600000).toISOString(), updated_at: new Date(Date.now() - 345600000).toISOString() },
]

// 模拟用户数据
const DEFAULT_USERS: User[] = [
  { id: 'U001', name: '小柴妈妈', email: 'xiaochai@example.com', phone: '138****8888', address: '上海市浦东新区张江高科技园区', total_orders: 2, total_spent: 1256, created_at: '2024-01-15', last_order_at: new Date().toISOString() },
  { id: 'U002', name: '金毛大王', email: 'jinmao@example.com', phone: '139****9999', address: '北京市朝阳区望京SOHO', total_orders: 1, total_spent: 199, created_at: '2024-02-20', last_order_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 'U003', name: '布偶铲屎官', email: 'buou@example.com', phone: '136****6666', address: '广州市天河区珠江新城', total_orders: 1, total_spent: 488, created_at: '2024-03-01', last_order_at: new Date(Date.now() - 172800000).toISOString() },
  { id: 'U004', name: '柯基爱骨骨', email: 'keji@example.com', phone: '137****7777', address: '深圳市南山区科技园', total_orders: 1, total_spent: 158, created_at: '2024-03-10', last_order_at: new Date(Date.now() - 259200000).toISOString() },
]

// 产品 Store
interface ProductStore {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProduct: (id: string) => Product | undefined
  updateStock: (id: string, quantity: number) => void
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: DEFAULT_PRODUCTS,
      addProduct: (product) => set((state) => ({ 
        products: [...state.products, { ...product, created_at: new Date().toISOString() }] 
      })),
      updateProduct: (id, updates) => set((state) => ({
        products: state.products.map((p) => p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id)
      })),
      getProduct: (id) => get().products.find((p) => p.id === id),
      updateStock: (id, quantity) => set((state) => ({
        products: state.products.map((p) => p.id === id ? { ...p, stock: Math.max(0, p.stock - quantity) } : p)
      })),
    }),
    { name: 'admin-products' }
  )
)

// 订单 Store
interface OrderStore {
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (id: string, status: Order['status']) => void
  deleteOrder: (id: string) => void
  getOrder: (id: string) => Order | undefined
  getOrdersByStatus: (status: Order['status']) => Order[]
  getOrdersByDate: (startDate: string, endDate: string) => Order[]
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: DEFAULT_ORDERS,
      addOrder: (order) => set((state) => ({ 
        orders: [{ ...order, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }, ...state.orders] 
      })),
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map((o) => o.id === id ? { ...o, status, updated_at: new Date().toISOString() } : o)
      })),
      deleteOrder: (id) => set((state) => ({
        orders: state.orders.filter((o) => o.id !== id)
      })),
      getOrder: (id) => get().orders.find((o) => o.id === id),
      getOrdersByStatus: (status) => get().orders.filter((o) => o.status === status),
      getOrdersByDate: (startDate, endDate) => get().orders.filter((o) => 
        o.created_at >= startDate && o.created_at <= endDate
      ),
    }),
    { name: 'admin-orders' }
  )
)

// 用户 Store
interface UserStore {
  users: User[]
  addUser: (user: User) => void
  updateUser: (id: string, updates: Partial<User>) => void
  deleteUser: (id: string) => void
  getUser: (id: string) => User | undefined
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: DEFAULT_USERS,
      addUser: (user) => set((state) => ({ 
        users: [...state.users, { ...user, created_at: new Date().toISOString() }] 
      })),
      updateUser: (id, updates) => set((state) => ({
        users: state.users.map((u) => u.id === id ? { ...u, ...updates } : u)
      })),
      deleteUser: (id) => set((state) => ({
        users: state.users.filter((u) => u.id !== id)
      })),
      getUser: (id) => get().users.find((u) => u.id === id),
    }),
    { name: 'admin-users' }
  )
)

// 统计计算
export const useStats = () => {
  const orders = useOrderStore((state) => state.orders)
  const products = useProductStore((state) => state.products)
  
  const today = new Date().toDateString()
  const todayOrders = orders.filter(o => new Date(o.created_at).toDateString() === today)
  
  const todaySales = todayOrders.reduce((sum, o) => sum + o.total, 0)
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const lowStockProducts = products.filter(p => p.stock < 20).length
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  
  const salesByCategory = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + (p.sales || 0)
    return acc
  }, {} as Record<string, number>)

  return {
    todayOrders: todayOrders.length,
    todaySales,
    pendingOrders,
    lowStockProducts,
    totalRevenue,
    totalOrders: orders.length,
    salesByCategory,
  }
}
