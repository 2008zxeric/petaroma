import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { translations } from '../translations'
import Logo from './Logo'
import { useCartStore } from '../src/store/cartStore'

interface Props { onOpenConsole: () => void; }

const Header: React.FC<Props> = ({ onOpenConsole }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null)
  const [pressProgress, setPressProgress] = useState(0)
  const navigate = useNavigate()
  const cartCount = useCartStore(state => state.getCount())
  const t = translations.zh.nav

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false)
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 首页内部导航（锚点）
  const HomeNavLinks = ({ mobile }: { mobile?: boolean }) => (
    <>
      <button onClick={() => scrollTo('top')} className={`group text-left ${mobile ? 'text-lg py-5 border-b border-brand-green/5' : 'flex flex-col items-center'}`}>
        <span className="text-ink group-hover:text-brand-green transition-colors">{t.story.split(' ')[0]}</span>
        {!mobile && <span className="text-[7px] text-ink/20 font-display italic uppercase mt-0.5 tracking-widest">{t.story.split(' ')[1]}</span>}
      </button>
      <button onClick={() => scrollTo('products')} className={`group text-left ${mobile ? 'text-lg py-5 border-b border-brand-green/5' : 'flex flex-col items-center'}`}>
        <span className="text-ink group-hover:text-brand-green transition-colors">{t.series.split(' ')[0]}</span>
        {!mobile && <span className="text-[7px] text-ink/20 font-display italic uppercase mt-0.5 tracking-widest">{t.series.split(' ')[1]}</span>}
      </button>
      <button onClick={() => scrollTo('image-lab')} className={`group text-left ${mobile ? 'text-lg py-5 border-b border-brand-green/5' : 'flex flex-col items-center'}`}>
        <span className="text-ink group-hover:text-brand-green transition-colors">{t.lab.split(' ')[0]}</span>
        {!mobile && <span className="text-[7px] text-ink/20 font-display italic uppercase mt-0.5 tracking-widest">{t.lab.split(' ')[1]}</span>}
      </button>
      <button onClick={() => scrollTo('ai-consultant')} className={`group text-left ${mobile ? 'text-lg py-5' : 'flex flex-col items-center'}`}>
        <span className="text-ink group-hover:text-brand-green transition-colors">{t.consultant.split(' ')[0]}</span>
        {!mobile && <span className="text-[7px] text-ink/20 font-display italic uppercase mt-0.5 tracking-widest">{t.consultant.split(' ')[1]}</span>}
      </button>
    </>
  )

  // 全局导航链接
  const GlobalNavLinks = ({ mobile }: { mobile?: boolean }) => (
    <>
      <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className={`group text-left ${mobile ? 'text-lg py-5 border-b border-brand-green/5' : 'flex flex-col items-center'}`}>
        <span className="text-ink group-hover:text-brand-green transition-colors">商城</span>
        {!mobile && <span className="text-[7px] text-ink/20 font-display italic uppercase mt-0.5 tracking-widest">Shop</span>}
      </Link>
      <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`group text-left ${mobile ? 'text-lg py-5 border-b border-brand-green/5' : 'flex flex-col items-center'}`}>
        <span className="text-ink group-hover:text-brand-green transition-colors">品牌</span>
        {!mobile && <span className="text-[7px] text-ink/20 font-display italic uppercase mt-0.5 tracking-widest">About</span>}
      </Link>
      <Link to="/events" onClick={() => setMobileMenuOpen(false)} className={`group text-left ${mobile ? 'text-lg py-5' : 'flex flex-col items-center'}`}>
        <span className="text-ink group-hover:text-brand-green transition-colors">活动</span>
        {!mobile && <span className="text-[7px] text-ink/20 font-display italic uppercase mt-0.5 tracking-widest">Events</span>}
      </Link>
    </>
  )

  return (
    <>
      <nav className={`fixed w-full z-[60] transition-all duration-500 px-5 py-4 md:px-12 md:py-2 ${isScrolled || mobileMenuOpen ? 'glass-nav shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo - 长按 3 秒进入后台 */}
          <div 
            className="cursor-pointer relative"
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
          >
            <Logo imgClassName="w-16 md:w-20" align="left" isExpandable={true} />
            {pressProgress > 0 && (
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 80 80">
                  <circle
                    cx="40" cy="40" r="38"
                    fill="none"
                    stroke="#D4B982"
                    strokeWidth="2"
                    strokeDasharray={`${pressProgress * 240} 240`}
                    transform="rotate(-90 40 40)"
                  />
                </svg>
              </div>
            )}
          </div>
          
          {/* 桌面端导航 */}
          <div className="hidden lg:flex items-center gap-8 text-[10px] tracking-[0.25em] uppercase font-bold">
            {/* 首页内部导航 */}
            <div className="flex items-center gap-6 pr-6 border-r border-brand-green/20">
              <HomeNavLinks />
            </div>
            {/* 全局导航 */}
            <div className="flex items-center gap-6">
              <GlobalNavLinks />
            </div>
            {/* 控制台按钮 */}
            <button onClick={onOpenConsole} className="w-10 h-10 flex items-center justify-center bg-brand-green/5 text-brand-green rounded-full hover:bg-brand-green hover:text-white transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2"/></svg>
            </button>
            {/* 购物车 */}
            <Link to="/cart" className="relative w-10 h-10 flex items-center justify-center bg-brand-green/5 text-brand-green rounded-full hover:bg-brand-green hover:text-white transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4B982] text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="lg:hidden flex items-center gap-3">
            <Link to="/cart" className="relative p-2 text-ink">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4B982] text-white text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-ink">
              <span className={`h-0.5 w-6 bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* 移动端菜单 */}
      <div className={`fixed inset-0 z-50 bg-canvas/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col h-full pt-28 px-10 font-serif-brand">
          <p className="text-xs text-ink/40 uppercase tracking-widest mb-6">首页导航</p>
          <HomeNavLinks mobile />
          <div className="h-px bg-brand-green/10 my-6"></div>
          <p className="text-xs text-ink/40 uppercase tracking-widest mb-6">更多页面</p>
          <GlobalNavLinks mobile />
        </div>
      </div>
    </>
  )
}

export default Header
