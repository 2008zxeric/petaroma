import { useCartStore } from '../store/cartStore'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const total = getTotal()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7]">
        {/* 顶部导航栏 */}
        <div className="bg-white/95 backdrop-blur-md border-b border-[#829682]/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-[#829682] hover:text-[#1B241B] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden md:inline">返回</span>
              </button>
              <h1 className="text-lg font-bold text-[#1B241B]">购物车</h1>
              <Link to="/shop" className="text-[#829682] hover:text-[#1B241B] text-sm">
                继续购物
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-[#1B241B] mb-2">购物车是空的</h2>
            <p className="text-[#829682] mb-6">快去挑选心仪的商品吧</p>
            <Link
              to="/shop"
              className="inline-block px-6 py-3 bg-[#829682] text-white rounded-full font-medium hover:bg-[#1B241B] transition-colors"
            >
              去逛逛
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* 顶部导航栏 */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#829682]/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#829682] hover:text-[#1B241B] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden md:inline">返回</span>
            </button>
            <h1 className="text-lg font-bold text-[#1B241B]">购物车 ({items.reduce((sum, i) => sum + i.quantity, 0)})</h1>
            <button 
              onClick={() => clearCart()}
              className="text-[#829682] hover:text-red-500 text-sm transition-colors"
            >
              清空
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        
        <div className="space-y-4">
          {items.map(item => (
            <div
              key={item.product.id}
              className="bg-white rounded-3xl p-4 flex gap-4 shadow-sm"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-2xl"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-[#1B241B] mb-1">{item.product.name}</h3>
                <p className="text-sm text-[#829682] mb-2">{item.product.name_en}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#D4B982] font-bold">¥{item.product.price}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-[#FDFBF7] text-[#1B241B] flex items-center justify-center hover:bg-[#829682]/20"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-[#FDFBF7] text-[#1B241B] flex items-center justify-center hover:bg-[#829682]/20"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.product.id)}
                className="self-start p-2 text-[#829682] hover:text-red-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* 结算 */}
        <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#829682]">商品件数</span>
            <span className="font-medium">{items.reduce((sum, i) => sum + i.quantity, 0)} 件</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-[#1B241B]">合计</span>
            <span className="text-2xl font-bold text-[#D4B982]">¥{total}</span>
          </div>
          <button
            className="w-full py-4 bg-[#829682] text-white rounded-2xl font-semibold hover:bg-[#1B241B] transition-colors"
            onClick={() => alert('结算功能开发中...')}
          >
            结算
          </button>
        </div>
      </div>
    </div>
  )
}
