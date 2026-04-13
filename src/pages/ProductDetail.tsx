import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import type { Product } from '../types/ecommerce'

// 模拟商品数据
const PRODUCTS: Product[] = [
  { id: '1', name: '雷雨安·安抚精油 30ml', name_en: 'Thunder Calm', description: '专为雷雨天气设计的宠物安抚精油，帮助宠物度过恐惧时光。采用100%纯天然植物配方，温和不刺激宠物嗅觉，快速安抚焦虑情绪。', price: 168, original_price: 198, category: 'thunder', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800', images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800', 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800', 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800'], in_stock: true, stock: 100, tags: ['雷雨', '安抚', '焦虑'], featured: true, rating: 4.9, sales: 3280, created_at: '' },
  { id: '2', name: '雷雨安·安抚精油 50ml', name_en: 'Thunder Calm Plus', description: '大容量装，一整季安心陪伴。更强效的配方，适合大型犬或多宠物家庭使用。', price: 268, category: 'thunder', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800', images: [], in_stock: true, stock: 80, tags: ['雷雨', '大容量'], featured: false, rating: 4.8, sales: 1560, created_at: '' },
  { id: '3', name: '雷雨安·安抚喷雾', name_en: 'Thunder Spray', description: '随身携带的快速安抚喷雾，即时舒缓宠物情绪。', price: 128, original_price: 158, category: 'thunder', image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800', images: [], in_stock: true, stock: 150, tags: ['喷雾', '便携'], featured: false, rating: 4.7, sales: 890, created_at: '' },
  { id: '4', name: '暂别安·分离焦虑精油 30ml', name_en: 'Absence Soothe', description: '缓解宠物独自在家的分离焦虑，让毛孩子安心独处。天然草本配方，持续8小时舒缓效果。', price: 188, category: 'absence', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800', images: [], in_stock: true, stock: 80, tags: ['分离焦虑', '独处'], featured: true, rating: 4.9, sales: 4120, created_at: '' },
  { id: '5', name: '暂别安·缓释贴片', name_en: 'Calm Patches', description: '贴在项圈上的缓释贴片，长效8小时安抚。', price: 98, category: 'absence', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800', images: [], in_stock: true, stock: 200, tags: ['贴片', '长效'], featured: false, rating: 4.6, sales: 2340, created_at: '' },
  { id: '6', name: '独处训练喷雾套装', name_en: 'Alone Training Set', description: '含精油+训练指南+安抚玩具，系统性解决分离焦虑。', price: 358, original_price: 428, category: 'absence', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800', images: [], in_stock: true, stock: 40, tags: ['套装', '训练'], featured: true, rating: 4.8, sales: 680, created_at: '' },
  { id: '7', name: '出行安·旅途放松精油 30ml', name_en: 'Travel Ease', description: '带宠物出行时的放松神器，让旅程更轻松愉快。适合车载、航空等多种出行场景。', price: 158, category: 'travel', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800', images: [], in_stock: true, stock: 120, tags: ['出行', '放松'], featured: true, rating: 4.7, sales: 1890, created_at: '' },
  { id: '10', name: '窝窝安·睡眠精油 30ml', name_en: 'Nest Calm', description: '帮助宠物放松入睡，提升睡眠质量的天然精油。适合夜间使用，营造安宁氛围。', price: 178, category: 'nest', image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800', images: [], in_stock: true, stock: 90, tags: ['睡眠', '夜晚'], featured: true, rating: 4.9, sales: 3560, created_at: '' },
  { id: '22', name: '安神套装', name_en: 'Calm Set', description: '包含雷雨安+暂别安+扩散器，全方位守护毛孩子。最适合新手入门，覆盖90%安抚场景。', price: 488, original_price: 598, category: 'set', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800', images: [], in_stock: true, stock: 30, tags: ['套装', '礼盒'], featured: true, rating: 4.9, sales: 890, created_at: '' },
]

// 模拟评价数据
const REVIEWS = [
  { id: '1', user: '小柴妈妈', avatar: '🐕', rating: 5, content: '我家柴犬每次打雷都吓得到处躲，用了这个之后明显平静很多，真的有效！', date: '2024-03-15', helpful: 128 },
  { id: '2', user: '柯基爱骨骨', avatar: '🦮', rating: 5, content: '分离焦虑严重，出门就拆家。现在出门前喷一点，回来家里都好好的，太神奇了！', date: '2024-03-12', helpful: 96 },
  { id: '3', user: '金毛大王', avatar: '🐕‍🦺', rating: 4, content: '味道很好闻，狗狗也不排斥。效果感觉需要持续用，用了两周现在好多了。', date: '2024-03-08', helpful: 45 },
  { id: '4', user: '布偶铲屎官', avatar: '🐱', rating: 5, content: '猫咪也能用！我家布偶猫胆子小，来客人就躲，现在淡定多了。', date: '2024-03-05', helpful: 82 },
]

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'usage' | 'reviews'>('description')
  const [currentImage, setCurrentImage] = useState(0)
  const addItem = useCartStore(state => state.addItem)
  
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0]
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  
  // 构建图片列表
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image]
  
  // 滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* 面包屑导航 + 返回按钮 */}
      <div className="bg-white border-b border-[#829682]/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* 左侧返回按钮 */}
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-[#829682] hover:text-[#1B241B] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden md:inline">返回</span>
            </button>
            
            {/* 面包屑 */}
            <div className="flex items-center gap-2 text-sm text-[#829682]">
              <Link to="/" className="hover:text-[#1B241B]">首页</Link>
              <span>/</span>
              <Link to="/shop" className="hover:text-[#1B241B]">商城</Link>
              <span>/</span>
              <span className="text-[#1B241B] truncate max-w-[150px]">{product.name}</span>
            </div>
            
            {/* 右侧占位 */}
            <div className="w-16 md:w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 产品图片 */}
          <div className="space-y-4">
            {/* 主图 */}
            <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-lg">
              <img 
                src={images[currentImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* 缩略图 */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 transition-all ${
                      currentImage === idx 
                        ? 'ring-2 ring-[#829682] ring-offset-2' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 产品信息 */}
          <div className="space-y-6">
            {/* 标签 */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-[#829682]/10 text-[#829682] text-sm rounded-full">
                  #{tag}
                </span>
              ))}
              {product.featured && (
                <span className="px-3 py-1 bg-[#D4B982] text-white text-sm rounded-full">
                  精选推荐
                </span>
              )}
            </div>

            {/* 标题 */}
            <div>
              <p className="text-[#829682] text-sm mb-1">{product.name_en}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1B241B]">{product.name}</h1>
            </div>

            {/* 评分与销量 */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className={i <= Math.floor(product.rating || 5) ? 'text-[#D4B982]' : 'text-[#829682]/30'}>★</span>
                ))}
                <span className="ml-1 font-semibold text-[#1B241B]">{product.rating}</span>
              </div>
              <span className="text-[#829682]">|</span>
              <span className="text-[#829682]">销量 {product.sales?.toLocaleString()}+</span>
              <span className="text-[#829682]">|</span>
              <span className="text-[#829682]">库存 {product.stock}件</span>
            </div>

            {/* 价格 */}
            <div className="bg-gradient-to-r from-[#FDFBF7] to-[#829682]/5 rounded-2xl p-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-[#D4B982]">¥{product.price}</span>
                {product.original_price && (
                  <>
                    <span className="text-xl text-[#829682] line-through">¥{product.original_price}</span>
                    <span className="px-2 py-1 bg-[#D4B982]/10 text-[#D4B982] text-sm rounded-lg">
                      省 ¥{product.original_price - product.price}
                    </span>
                  </>
                )}
              </div>
              <div className="mt-3 flex items-center gap-4 text-sm text-[#829682]">
                <span>✓ 顺丰包邮</span>
                <span>✓ 30天无理由退换</span>
                <span>✓ 正品保证</span>
              </div>
            </div>

            {/* 数量选择 */}
            <div className="flex items-center gap-6">
              <span className="text-[#829682]">数量</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl bg-white border border-[#829682]/20 flex items-center justify-center hover:bg-[#829682]/10 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 rounded-xl bg-white border border-[#829682]/20 flex items-center justify-center hover:bg-[#829682]/10 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* 购买按钮 */}
            <div className="flex gap-4">
              <button 
                onClick={() => addItem(product, quantity)}
                className="flex-1 py-4 bg-[#829682] text-white rounded-2xl font-semibold hover:bg-[#1B241B] transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                加入购物车
              </button>
              <button className="flex-1 py-4 bg-[#D4B982] text-white rounded-2xl font-semibold hover:bg-[#c4a672] transition-colors">
                立即购买
              </button>
            </div>

            {/* 服务承诺 */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#829682]/10">
              {[
                { icon: '🌿', title: '天然成分', desc: '100%纯天然' },
                { icon: '🔬', title: '科研验证', desc: '宠物行为学' },
                { icon: '💚', title: '安全温和', desc: '不刺激嗅觉' },
              ].map(item => (
                <div key={item.title} className="text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-medium text-[#1B241B] text-sm">{item.title}</div>
                  <div className="text-[#829682] text-xs">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 详情标签页 */}
        <div className="mt-12">
          <div className="flex border-b border-[#829682]/20">
            {[
              { id: 'description', name: '产品详情' },
              { id: 'usage', name: '使用方法' },
              { id: 'reviews', name: `用户评价 (${REVIEWS.length})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === tab.id 
                    ? 'text-[#1B241B]' 
                    : 'text-[#829682] hover:text-[#1B241B]'
                }`}
              >
                {tab.name}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#829682]"></span>
                )}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-bold text-[#1B241B] mb-4">产品介绍</h3>
                <p className="text-[#829682] leading-relaxed mb-6">{product.description}</p>
                
                <h4 className="text-lg font-semibold text-[#1B241B] mb-3">成分说明</h4>
                <ul className="text-[#829682] space-y-2 mb-6">
                  <li>• 真正薰衣草精油 (Lavandula angustifolia) - 舒缓镇静</li>
                  <li>• 罗马洋甘菊精油 (Chamaemelum nobile) - 抗焦虑</li>
                  <li>• 佛手柑精油 (Citrus bergamia) - 提振情绪</li>
                  <li>• 基础油：甜杏仁油 (Prunus dulcis)</li>
                </ul>
                
                <h4 className="text-lg font-semibold text-[#1B241B] mb-3">适用对象</h4>
                <p className="text-[#829682]">所有犬种、猫科动物，特别适合焦虑敏感型宠物。孕期、哺乳期宠物请咨询兽医后使用。</p>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#1B241B] mb-4">使用指南</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="text-3xl mb-3">💧</div>
                    <h4 className="font-semibold text-[#1B241B] mb-2">精油扩香</h4>
                    <p className="text-[#829682] text-sm">将3-5滴精油加入扩散器，每次使用30-60分钟，每日2-3次。</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="text-3xl mb-3">🐕</div>
                    <h4 className="font-semibold text-[#1B241B] mb-2">项圈涂抹</h4>
                    <p className="text-[#829682] text-sm">1-2滴涂抹于项圈内侧，让香气自然扩散，每4-6小时补涂。</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="text-3xl mb-3">🏠</div>
                    <h4 className="font-semibold text-[#1B241B] mb-2">环境喷洒</h4>
                    <p className="text-[#829682] text-sm">稀释后喷洒于宠物休息区域，避开眼鼻，让宠物自主选择靠近。</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="text-3xl mb-3">⚠️</div>
                    <h4 className="font-semibold text-[#1B241B] mb-2">注意事项</h4>
                    <p className="text-[#829682] text-sm">远离眼睛、鼻子；首次使用少量测试；存放于阴凉处；远离儿童。</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* 评分概览 */}
                <div className="bg-white rounded-2xl p-6 flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#1B241B]">{product.rating}</div>
                    <div className="flex justify-center my-2">
                      {[1,2,3,4,5].map(i => (
                        <span key={i} className="text-[#D4B982]">★</span>
                      ))}
                    </div>
                    <div className="text-[#829682] text-sm">{REVIEWS.length} 条评价</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5,4,3,2,1].map(star => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-sm text-[#829682] w-8">{star}星</span>
                        <div className="flex-1 h-2 bg-[#829682]/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#D4B982] rounded-full" style={{ width: `${star === 5 ? 80 : star === 4 ? 15 : 5}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 评价列表 */}
                <div className="space-y-4">
                  {REVIEWS.map(review => (
                    <div key={review.id} className="bg-white rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#829682]/10 flex items-center justify-center text-2xl">
                          {review.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-[#1B241B]">{review.user}</span>
                            <span className="text-[#829682] text-sm">{review.date}</span>
                          </div>
                          <div className="flex mb-2">
                            {[1,2,3,4,5].map(i => (
                              <span key={i} className={i <= review.rating ? 'text-[#D4B982]' : 'text-[#829682]/30'}>★</span>
                            ))}
                          </div>
                          <p className="text-[#829682]">{review.content}</p>
                          <div className="mt-3 flex items-center gap-4 text-sm">
                            <button className="text-[#829682] hover:text-[#1B241B]">👍 有帮助 ({review.helpful})</button>
                            <button className="text-[#829682] hover:text-[#1B241B]">回复</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 相关推荐 */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#1B241B] mb-6">相关推荐</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <Link 
                  key={p.id} 
                  to={`/product/${p.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-[#1B241B] line-clamp-1">{p.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[#D4B982] font-bold">¥{p.price}</span>
                      {p.rating && <span className="text-sm text-[#829682]">★ {p.rating}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
