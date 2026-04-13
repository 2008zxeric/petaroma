// 商品类型
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
  rating?: number      // 评分
  sales?: number       // 销量
  created_at: string
}

// 购物车商品
export interface CartItem {
  product: Product
  quantity: number
}

// 用户类型
export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  avatar_url?: string
  created_at: string
}

// 地址类型
export interface Address {
  id: string
  user_id: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  is_default: boolean
}

// 订单类型
export interface Order {
  id: string
  user_id: string
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: OrderItem[]
  address: Address
  created_at: string
  paid_at?: string
  shipped_at?: string
  delivered_at?: string
}

// 订单项
export interface OrderItem {
  product_id: string
  product_name: string
  price: number
  quantity: number
  image: string
}

// 产品分类
export type ProductCategory = 
  | 'thunder'    // 雷雨安
  | 'absence'    // 暂别安
  | 'travel'     // 出行安
  | 'nest'       // 窝窝安
  | 'accessories' // 配件
  | '套装'        // 套装
