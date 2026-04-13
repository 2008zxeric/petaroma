import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import type { Product } from '../types/ecommerce'

// 模拟商品数据 - 丰富的宠物芳疗产品线
const DEMO_PRODUCTS: Product[] = [
  // 雷雨安抚系列
  {
    id: '1', name: '雷雨安·安抚精油 30ml', name_en: 'Thunder Calm', description: '专为雷雨天气设计的宠物安抚精油，帮助宠物度过恐惧时光',
    price: 168, original_price: 198, category: 'thunder', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600', images: [], in_stock: true, stock: 100, tags: ['雷雨', '安抚', '焦虑'], featured: true, rating: 4.9, sales: 3280, created_at: ''
  },
  {
    id: '2', name: '雷雨安·安抚精油 50ml', name_en: 'Thunder Calm Plus', description: '大容量装，一整季安心陪伴',
    price: 268, category: 'thunder', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600', images: [], in_stock: true, stock: 80, tags: ['雷雨', '大容量'], featured: false, rating: 4.8, sales: 1560, created_at: ''
  },
  {
    id: '3', name: '雷雨安·安抚喷雾', name_en: 'Thunder Spray', description: '随身携带的快速安抚喷雾，即时舒缓宠物情绪',
    price: 128, original_price: 158, category: 'thunder', image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600', images: [], in_stock: true, stock: 150, tags: ['喷雾', '便携'], featured: false, rating: 4.7, sales: 890, created_at: ''
  },
  
  // 分离焦虑系列
  {
    id: '4', name: '暂别安·分离焦虑精油 30ml', name_en: 'Absence Soothe', description: '缓解宠物独自在家的分离焦虑，让毛孩子安心独处',
    price: 188, category: 'absence', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600', images: [], in_stock: true, stock: 80, tags: ['分离焦虑', '独处'], featured: true, rating: 4.9, sales: 4120, created_at: ''
  },
  {
    id: '5', name: '暂别安·缓释贴片', name_en: 'Calm Patches', description: '贴在项圈上的缓释贴片，长效8小时安抚',
    price: 98, category: 'absence', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600', images: [], in_stock: true, stock: 200, tags: ['贴片', '长效'], featured: false, rating: 4.6, sales: 2340, created_at: ''
  },
  {
    id: '6', name: '独处训练喷雾套装', name_en: 'Alone Training Set', description: '含精油+训练指南+安抚玩具，系统性解决分离焦虑',
    price: 358, original_price: 428, category: 'absence', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600', images: [], in_stock: true, stock: 40, tags: ['套装', '训练'], featured: true, rating: 4.8, sales: 680, created_at: ''
  },
  
  // 出行放松系列
  {
    id: '7', name: '出行安·旅途放松精油 30ml', name_en: 'Travel Ease', description: '带宠物出行时的放松神器，让旅程更轻松愉快',
    price: 158, category: 'travel', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600', images: [], in_stock: true, stock: 120, tags: ['出行', '放松'], featured: true, rating: 4.7, sales: 1890, created_at: ''
  },
  {
    id: '8', name: '出行安·车载扩散器', name_en: 'Car Diffuser', description: 'USB充电，车载专用扩香系统',
    price: 198, original_price: 258, category: 'travel', image: 'https://images.unsplash.com/photo-1517146783982-95e460b9020e?w=600', images: [], in_stock: true, stock: 60, tags: ['车载', '扩散器'], featured: false, rating: 4.5, sales: 760, created_at: ''
  },
  {
    id: '9', name: '航空出行安抚套装', name_en: 'Flight Calm Set', description: '含减压喷雾+耳部安抚贴+安抚精油，飞行全程安心',
    price: 298, category: 'travel', image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=600', images: [], in_stock: true, stock: 35, tags: ['航空', '套装'], featured: false, rating: 4.6, sales: 420, created_at: ''
  },
  
  // 睡眠安神系列
  {
    id: '10', name: '窝窝安·睡眠精油 30ml', name_en: 'Nest Calm', description: '帮助宠物放松入睡，提升睡眠质量的天然精油',
    price: 178, category: 'nest', image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600', images: [], in_stock: true, stock: 90, tags: ['睡眠', '夜晚'], featured: true, rating: 4.9, sales: 3560, created_at: ''
  },
  {
    id: '11', name: '窝窝安·香薰机', name_en: 'Aromatherapy Machine', description: '超声波静音香薰机，智能定时，卧室专用',
    price: 328, original_price: 398, category: 'nest', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600', images: [], in_stock: true, stock: 50, tags: ['香薰机', '静音'], featured: true, rating: 4.8, sales: 1240, created_at: ''
  },
  {
    id: '12', name: '睡眠安抚玩具', name_en: 'Sleep Toy', description: '内置天然草本填充，帮助宠物安稳入睡的安抚玩具',
    price: 88, category: 'nest', image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=600', images: [], in_stock: true, stock: 180, tags: ['玩具', '睡眠'], featured: false, rating: 4.5, sales: 980, created_at: ''
  },
  {
    id: '13', name: '窝窝安·纯棉安抚巾', name_en: 'Calm Blanket', description: '带有熟悉主人气味的安全感安抚巾',
    price: 68, category: 'nest', image: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=600', images: [], in_stock: true, stock: 250, tags: ['安抚巾', '安全感'], featured: false, rating: 4.7, sales: 2100, created_at: ''
  },
  
  // 清洁护理系列
  {
    id: '14', name: '宠物除臭喷雾', name_en: 'Odor Eliminator', description: '分解型除臭，根源去除异味，不伤害宠物嗅觉',
    price: 78, category: 'care', image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=600', images: [], in_stock: true, stock: 300, tags: ['除臭', '清洁'], featured: false, rating: 4.6, sales: 4560, created_at: ''
  },
  {
    id: '15', name: '温和洗护精油', name_en: 'Gentle Shampoo', description: '添加薰衣草精油，温和清洁的同时舒缓情绪',
    price: 128, original_price: 158, category: 'care', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600', images: [], in_stock: true, stock: 100, tags: ['洗护', '清洁'], featured: false, rating: 4.7, sales: 1890, created_at: ''
  },
  {
    id: '16', name: '环境驱虫精油', name_en: 'Natural Repellent', description: '天然植物驱虫配方，安全驱避跳蚤蜱虫',
    price: 98, category: 'care', image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600', images: [], in_stock: true, stock: 150, tags: ['驱虫', '防护'], featured: false, rating: 4.5, sales: 2340, created_at: ''
  },
  
  // 营养保健系列
  {
    id: '17', name: '情绪舒缓营养片', name_en: 'Calm Supplements', description: '含L-茶氨酸和褪黑素，从内部调理宠物情绪',
    price: 198, category: 'health', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600', images: [], in_stock: true, stock: 80, tags: ['营养', '保健'], featured: true, rating: 4.8, sales: 1670, created_at: ''
  },
  {
    id: '18', name: 'Omega芳疗油', name_en: 'Omega Oil', description: '内服外用皆可的芳疗基础油，滋养皮肤毛发',
    price: 158, category: 'health', image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600', images: [], in_stock: true, stock: 90, tags: ['Omega', '护肤'], featured: false, rating: 4.6, sales: 890, created_at: ''
  },
  
  // 配件工具
  {
    id: '19', name: '宠物芳疗扩散器', name_en: 'Aroma Diffuser', description: '静音智能扩散器，均匀释放精油芳香',
    price: 268, original_price: 328, category: 'accessories', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600', images: [], in_stock: true, stock: 50, tags: ['配件', '扩散器'], featured: false, rating: 4.7, sales: 1230, created_at: ''
  },
  {
    id: '20', name: '精油存储瓶套装', name_en: 'Storage Set', description: '深色玻璃瓶套装，避光保存精油活性',
    price: 68, category: 'accessories', image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600', images: [], in_stock: true, stock: 400, tags: ['配件', '存储'], featured: false, rating: 4.4, sales: 3400, created_at: ''
  },
  {
    id: '21', name: '宠物专用扩香项链', name_en: 'Pet Pendant', description: '为宠物设计的时尚扩香项链，精油随身环绕',
    price: 88, category: 'accessories', image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600', images: [], in_stock: true, stock: 120, tags: ['项链', '时尚'], featured: false, rating: 4.5, sales: 560, created_at: ''
  },
  
  // 礼盒套装
  {
    id: '22', name: '安神套装', name_en: 'Calm Set', description: '包含雷雨安+暂别安+扩散器，全方位守护毛孩子',
    price: 488, original_price: 598, category: 'set', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600', images: [], in_stock: true, stock: 30, tags: ['套装', '礼盒'], featured: true, rating: 4.9, sales: 890, created_at: ''
  },
  {
    id: '23', name: '新手入门套装', name_en: 'Starter Set', description: '含安抚精油+扩散器+使用指南，新手首选',
    price: 368, original_price: 458, category: 'set', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600', images: [], in_stock: true, stock: 50, tags: ['入门', '套装'], featured: true, rating: 4.8, sales: 1560, created_at: ''
  },
  {
    id: '24', name: '尊享礼盒', name_en: 'Premium Gift Box', description: '全系列明星产品集合，送礼自用皆宜',
    price: 1288, original_price: 1588, category: 'set', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600', images: [], in_stock: true, stock: 15, tags: ['尊享', '礼盒'], featured: true, rating: 5.0, sales: 120, created_at: ''
  }
]

const CATEGORIES = [
  { id: 'all', name: '全部', icon: '🌸', count: 24 },
  { id: 'thunder', name: '雷雨安抚', icon: '⛈️', count: 3 },
  { id: 'absence', name: '分离焦虑', icon: '🏠', count: 3 },
  { id: 'travel', name: '出行放松', icon: '🚗', count: 3 },
  { id: 'nest', name: '睡眠安神', icon: '🌙', count: 4 },
  { id: 'care', name: '清洁护理', icon: '🛁', count: 3 },
  { id: 'health', name: '营养保健', icon: '💊', count: 2 },
  { id: 'accessories', name: '配件工具', icon: '🔧', count: 3 },
  { id: 'set', name: '礼盒套装', icon: '🎁', count: 3 }
]

const SORT_OPTIONS = [
  { id: 'featured', name: '精选推荐' },
  { id: 'sales', name: '销量优先' },
  { id: 'price-asc', name: '价格从低到高' },
  { id: 'price-desc', name: '价格从高到低' },
  { id: 'rating', name: '评分最高' }
]

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const addItem = useCartStore(state => state.addItem)
  
  // 筛选和排序
  const filteredProducts = useMemo(() => {
    let products = activeCategory === 'all' 
      ? DEMO_PRODUCTS 
      : DEMO_PRODUCTS.filter(p => p.category === activeCategory)
    
    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      products = products.filter(p => 
        p.name.includes(query) || 
        p.name_en.toLowerCase().includes(query) ||
        p.tags.some(t => t.includes(query))
      )
    }
    
    // 排序
    switch (sortBy) {
      case 'sales':
        return [...products].sort((a, b) => (b.sales || 0) - (a.sales || 0))
      case 'price-asc':
        return [...products].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...products].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0))
      default:
        return products.filter(p => p.featured)
    }
  }, [activeCategory, searchQuery, sortBy])
  
  const allProducts = useMemo(() => {
    let products = activeCategory === 'all' 
      ? DEMO_PRODUCTS 
      : DEMO_PRODUCTS.filter(p => p.category === activeCategory)
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      products = products.filter(p => 
        p.name.includes(query) || 
        p.name_en.toLowerCase().includes(query) ||
        p.tags.some(t => t.includes(query))
      )
    }
    switch (sortBy) {
      case 'sales': return [...products].sort((a, b) => (b.sales || 0) - (a.sales || 0))
      case 'price-asc': return [...products].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...products].sort((a, b) => b.price - a.price)
      case 'rating': return [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0))
      default: return products
    }
  }, [activeCategory, searchQuery, sortBy])

  const featuredProducts = DEMO_PRODUCTS.filter(p => p.featured)
  const categoryCount = CATEGORIES.find(c => c.id === activeCategory)?.count || 0

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Banner */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B241B] via-[#2a3a2a] to-[#3d4d3d]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23D4B982%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
          </div>
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#D4B982]/20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-[#829682]/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <p className="text-[#D4B982] font-medium mb-3 tracking-widest uppercase text-sm">Pet Aromatherapy Expert</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#FDFBF7] mb-4">
              守护每一只毛孩子
            </h1>
            <p className="text-[#FDFBF7]/80 text-lg md:text-xl max-w-xl mx-auto mb-6">
              天然宠物芳疗专家，让爱与安心常伴左右
            </p>
            <div className="flex items-center justify-center gap-4">
              <span className="flex items-center gap-2 text-[#FDFBF7]/60 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                顺丰包邮
              </span>
              <span className="flex items-center gap-2 text-[#FDFBF7]/60 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                30天无理由退换
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 搜索和筛选 */}
      <section className="sticky top-0 z-20 bg-[#FDFBF7]/98 backdrop-blur-md border-b border-[#829682]/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* 搜索框 */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="搜索商品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[#829682]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#829682]/30 focus:border-[#829682] transition-all"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#829682]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#829682] hover:text-[#1B241B]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* 排序 */}
            <div className="flex items-center gap-3">
              <span className="text-[#829682] text-sm">排序：</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl border border-[#829682]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#829682]/30 text-[#1B241B]"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 分类导航 */}
      <section className="bg-white border-b border-[#829682]/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-[#1B241B] text-white shadow-lg scale-105'
                    : 'bg-[#FDFBF7] text-[#1B241B] hover:bg-[#829682]/10 hover:scale-102'
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="font-medium">{cat.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === cat.id ? 'bg-white/20' : 'bg-[#829682]/10'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 精选推荐 - 仅在全部且无搜索时显示 */}
      {activeCategory === 'all' && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1B241B] flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-[#D4B982] to-[#829682] rounded-full"></span>
              精选推荐
              <span className="text-sm font-normal text-[#829682] ml-2">官方严选·品质保证</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredProducts.slice(0, 6).map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={addItem} 
              />
            ))}
          </div>
        </section>
      )}

      {/* 产品列表 */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#1B241B] flex items-center gap-3">
            <span className="w-1 h-8 bg-[#829682] rounded-full"></span>
            {CATEGORIES.find(c => c.id === activeCategory)?.name || '全部商品'}
            <span className="text-sm font-normal text-[#829682] ml-2">共 {allProducts.length} 件</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {allProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAdd={addItem} 
            />
          ))}
        </div>
        
        {allProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-[#829682] mb-2">未找到相关商品</p>
            <p className="text-[#829682]/60">试试其他关键词或分类</p>
          </div>
        )}
      </section>

      {/* 底部信任标识 */}
      <section className="bg-[#1B241B] py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '🌿', title: '天然成分', desc: '100%纯天然植物精油' },
              { icon: '🔬', title: '科研验证', desc: '宠物行为学专家研发' },
              { icon: '💚', title: '安全优先', desc: '温和不刺激宠物嗅觉' },
              { icon: '📦', title: '极速发货', desc: '顺丰包邮次日达' }
            ].map(item => (
              <div key={item.title} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-[#FDFBF7] font-semibold mb-1">{item.title}</h3>
                <p className="text-[#FDFBF7]/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B241B] text-[#FDFBF7] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">它香·PetScent</h3>
              <p className="text-[#FDFBF7]/60 mb-4">中国首个去人类中心化宠物芳疗品牌</p>
              <div className="flex gap-3">
                <span className="w-10 h-10 rounded-full bg-[#FDFBF7]/10 flex items-center justify-center text-lg">📕</span>
                <span className="w-10 h-10 rounded-full bg-[#FDFBF7]/10 flex items-center justify-center text-lg">📘</span>
                <span className="w-10 h-10 rounded-full bg-[#FDFBF7]/10 flex items-center justify-center text-lg">📱</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">产品分类</h4>
              <ul className="space-y-2 text-[#FDFBF7]/60">
                <li><a href="#" className="hover:text-[#D4B982]">雷雨安抚系列</a></li>
                <li><a href="#" className="hover:text-[#D4B982]">分离焦虑系列</a></li>
                <li><a href="#" className="hover:text-[#D4B982]">睡眠安神系列</a></li>
                <li><a href="#" className="hover:text-[#D4B982]">礼盒套装</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">客户服务</h4>
              <ul className="space-y-2 text-[#FDFBF7]/60">
                <li><a href="#" className="hover:text-[#D4B982]">购物指南</a></li>
                <li><a href="#" className="hover:text-[#D4B982]">配送说明</a></li>
                <li><a href="#" className="hover:text-[#D4B982]">退换政策</a></li>
                <li><a href="#" className="hover:text-[#D4B982]">常见问题</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">联系我们</h4>
              <ul className="space-y-2 text-[#FDFBF7]/60">
                <li>微信：petscent</li>
                <li>邮箱：hello@petscent.com</li>
                <li>小红书：PetScent它香</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#FDFBF7]/10 pt-8 text-center text-[#FDFBF7]/40">
            © 2024 PetScent. All rights reserved. | 沪ICP备xxxxxxxx号
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product, q?: number) => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  
  const handleClick = () => {
    // 点击跳转到产品详情页
    navigate(`/product/${product.id}`)
  }
  
  return (
    <div 
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden bg-[#FDFBF7]">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        {/* 优惠标签 */}
        {product.original_price && (
          <span className="absolute top-3 left-3 bg-[#D4B982] text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
            特惠
          </span>
        )}
        {/* 销售标签 */}
        {product.sales && product.sales > 1000 && (
          <span className="absolute top-3 right-3 bg-[#1B241B]/80 text-white text-xs px-2 py-1 rounded-full">
            销 {product.sales >= 1000 ? `${(product.sales/1000).toFixed(1)}k+` : product.sales}
          </span>
        )}
        {/* 悬浮操作按钮 */}
        <div className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={(e) => { e.stopPropagation(); onAdd(product, 1); }}
            className="w-full py-2.5 bg-[#D4B982] text-white rounded-xl text-sm font-medium hover:bg-[#c4a672] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            加入购物车
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-[#1B241B] line-clamp-1 flex-1">{product.name}</h3>
          {product.rating && (
            <div className="flex items-center gap-1 text-sm text-[#D4B982] shrink-0">
              <span>★</span>
              <span className="text-[#1B241B]">{product.rating}</span>
            </div>
          )}
        </div>
        <p className="text-sm text-[#829682] mb-3 line-clamp-1">{product.name_en}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-[#D4B982]">¥{product.price}</span>
            {product.original_price && (
              <span className="text-sm text-[#829682] line-through ml-2">¥{product.original_price}</span>
            )}
          </div>
        </div>
        {/* 标签 */}
        <div className="flex flex-wrap gap-1 mt-3">
          {product.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-[#FDFBF7] text-[#829682] rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
