import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import ProductGrid from './components/ProductGrid'
import ProductDetail from './components/ProductDetail'
import SafetyStandard from './components/SafetyStandard'
import AIConsultant from './components/AIConsultant'
import ImageLab from './components/ImageLab'
import HomeQR from './components/HomeQR'
import ScentConsole from './components/ScentConsole'
import Footer from './components/Footer'
import Shop from './src/pages/Shop'
import Cart from './src/pages/Cart'
import ProductDetailPage from './src/pages/ProductDetail'
import About from './src/pages/About'
import Events from './src/pages/Events'
import Admin from './src/pages/Admin'
import { useCartStore } from './src/store/cartStore'

// 全局导航组件
function GlobalNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null)
  const [pressProgress, setPressProgress] = useState(0)
  const cartCount = useCartStore(state => state.getCount())
  
  const navItems = [
    { path: '/', label: '首页' },
    { path: '/shop', label: '商城' },
    { path: '/about', label: '品牌故事' },
    { path: '/events', label: '活动社区' },
  ]
  
  // 长按 Logo 3 秒进入后台
  const handlePressStart = () => {
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / 3000, 1)
      setPressProgress(progress)
      if (progress >= 1) {
        navigate('/admin')
        clearInterval(timer)
        setPressProgress(0)
      }
    }, 50)
    setPressTimer(timer)
  }
  
  const handlePressEnd = () => {
    if (pressTimer) {
      clearInterval(pressTimer)
      setPressTimer(null)
    }
    setPressProgress(0)
  }
  
  const isActive = (path: string) => location.pathname === path
  
  // 后台页面或首页不显示导航（首页有自己的 Header）
  if (location.pathname === '/admin' || location.pathname === '/') {
    return null
  }
  
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#829682]/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - 长按进入后台 */}
          <div 
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            className="relative cursor-pointer select-none"
          >
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-bold font-serif-brand text-[#1B241B]">
                它香
              </span>
              <span className="hidden md:inline text-xs text-[#829682] font-personal">
                PetScent
              </span>
            </Link>
            {pressProgress > 0 && (
              <div className="absolute -inset-2 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 80 40">
                  <rect
                    x="2" y="2" width="76" height="36" rx="8"
                    fill="none"
                    stroke="#D4B982"
                    strokeWidth="2"
                    strokeDasharray={`${pressProgress * 200} 200`}
                  />
                </svg>
              </div>
            )}
          </div>
          
          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive(item.path) 
                    ? 'text-[#829682]' 
                    : 'text-[#1B241B] hover:text-[#829682]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* 右侧操作区 */}
          <div className="flex items-center gap-4">
            {/* 购物车图标 */}
            <Link 
              to="/cart" 
              className="relative p-2 text-[#1B241B] hover:text-[#829682] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4B982] text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* 移动端菜单按钮 */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1B241B]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-t border-[#829682]/10">
          <nav className="px-4 py-6 space-y-4">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-lg font-medium ${
                  isActive(item.path) 
                    ? 'text-[#829682]' 
                    : 'text-[#1B241B]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

// 首页组件
function HomePage() {
  const [consoleOpen, setConsoleOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  useEffect(() => {
    document.title = "它香 宠物芳香生活"
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      {/* 原有的首页 Header 保留用于首页内部导航 */}
      <Header onOpenConsole={() => setConsoleOpen(true)} />
      
      <main className="flex-grow">
        {!selectedProductId ? (
          <div className="animate-fade-in">
            <Hero />
            <Philosophy />
            <ProductGrid onSelectProduct={(id) => setSelectedProductId(id)} />
            <SafetyStandard lang="zh" />
            <div id="image-lab">
              <ImageLab lang="zh" />
            </div>
            <AIConsultant />
            <HomeQR />
          </div>
        ) : (
          <ProductDetail 
            productId={selectedProductId} 
            onBack={() => setSelectedProductId(null)} 
          />
        )}
      </main>
      
      <Footer />

      {consoleOpen && (
        <ScentConsole lang="zh" onClose={() => setConsoleOpen(false)} />
      )}
    </div>
  )
}

// 商城页面布局
function ShopLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.title = "商城 - 它香 PetScent"
  }, [])
  
  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-20">
      {children}
    </div>
  )
}

// 购物车浮窗按钮
function CartFloat() {
  const location = useLocation()
  const cartCount = useCartStore(state => state.getCount())
  
  // 在购物车页和后台页不显示
  if (location.pathname === '/cart' || location.pathname === '/admin') {
    return null
  }
  
  return (
    <Link
      to="/cart"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#829682] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1B241B] transition-all hover:scale-110"
    >
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4B982] text-white text-xs font-bold rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  )
}

// 主应用
const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* 全局导航 - 后台页面除外 */}
      <GlobalNav />
      
      {/* 页面内容 */}
      <Routes>
        {/* 首页 */}
        <Route path="/" element={<HomePage />} />
        
        {/* 商城 */}
        <Route path="/shop" element={
          <ShopLayout>
            <Shop />
          </ShopLayout>
        } />
        
        {/* 购物车 */}
        <Route path="/cart" element={
          <ShopLayout>
            <Cart />
          </ShopLayout>
        } />
        
        {/* 产品详情 */}
        <Route path="/product/:id" element={
          <ShopLayout>
            <ProductDetailPage />
          </ShopLayout>
        } />
        
        {/* 品牌故事 */}
        <Route path="/about" element={
          <ShopLayout>
            <About />
          </ShopLayout>
        } />
        
        {/* 活动社区 */}
        <Route path="/events" element={
          <ShopLayout>
            <Events />
          </ShopLayout>
        } />
        
        {/* 后台管理 */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
      
      {/* 购物车浮窗 */}
      <CartFloat />
    </BrowserRouter>
  )
}

export default App
