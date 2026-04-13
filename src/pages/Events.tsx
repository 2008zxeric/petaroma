import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface Event {
  id: string
  title: string
  type: 'offline' | 'online' | 'experience'
  status: 'upcoming' | 'ongoing' | 'ended'
  date: string
  time: string
  location: string
  image: string
  description: string
  capacity: number
  registered: number
  price?: number
  tags: string[]
}

const EVENTS: Event[] = [
  {
    id: '1',
    title: '雷雨季宠物安抚工作坊',
    type: 'offline',
    status: 'upcoming',
    date: '2024-04-20',
    time: '14:00-17:00',
    location: '上海·静安区宠物公园',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
    description: '专业芳疗师带你了解雷雨季节宠物的情绪管理，现场体验安抚精油的使用方法。',
    capacity: 30,
    registered: 24,
    price: 0,
    tags: ['免费', '线下', '上海']
  },
  {
    id: '2',
    title: '宠物芳疗入门线上课',
    type: 'online',
    status: 'ongoing',
    date: '2024-04-15 至 2024-05-15',
    time: '每周三 20:00',
    location: '线上直播',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
    description: '8节系统课程，从芳疗原理到实操技巧，成为毛孩子的专属芳疗师。',
    capacity: 500,
    registered: 367,
    price: 199,
    tags: ['线上', '系统课程', '可回放']
  },
  {
    id: '3',
    title: '柴犬专属舒缓日',
    type: 'experience',
    status: 'upcoming',
    date: '2024-04-28',
    time: '10:00-16:00',
    location: '北京·朝阳区宠物会所',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b9d24e4ce?w=800',
    description: '专为柴犬家庭打造，一对一芳疗咨询+集体互动游戏，让柴柴们放松一整天。',
    capacity: 15,
    registered: 12,
    price: 298,
    tags: ['柴犬专属', '体验日', '北京']
  },
  {
    id: '4',
    title: '分离焦虑主题分享会',
    type: 'online',
    status: 'upcoming',
    date: '2024-05-05',
    time: '19:30-21:00',
    location: '线上直播',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',
    description: '邀请动物行为学专家，深度解析宠物分离焦虑的成因与解决方案。',
    capacity: 200,
    registered: 156,
    price: 49,
    tags: ['线上', '专家分享', '答疑']
  },
  {
    id: '5',
    title: '春季宠物SPA体验日',
    type: 'experience',
    status: 'upcoming',
    date: '2024-05-12',
    time: '09:00-18:00',
    location: '广州·天河区宠物美容中心',
    image: 'https://images.unsplash.com/photo-1516734212189-6a8e1e8968aa?w=800',
    description: '专业洗护+芳疗舒缓，让毛孩子享受一整天的SPA护理。含它香洗护套装一份。',
    capacity: 20,
    registered: 8,
    price: 398,
    tags: ['体验', '广州', '含礼品']
  },
  {
    id: '6',
    title: '猫咪芳疗师认证班',
    type: 'offline',
    status: 'upcoming',
    date: '2024-05-20 至 2024-05-22',
    time: '全天',
    location: '深圳·南山区培训中心',
    image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=800',
    description: '3天密集培训，通过考核可获得它香认证猫咪芳疗师证书，开启专业之路。',
    capacity: 25,
    registered: 18,
    price: 1299,
    tags: ['认证', '线下', '深圳']
  }
]

const TYPE_FILTERS = [
  { id: 'all', name: '全部活动', icon: '🌸' },
  { id: 'offline', name: '线下活动', icon: '📍' },
  { id: 'online', name: '线上活动', icon: '💻' },
  { id: 'experience', name: '体验日', icon: '✨' },
]

export default function Events() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showModal, setShowModal] = useState<Event | null>(null)
  const navigate = useNavigate()
  
  const filteredEvents = activeFilter === 'all' 
    ? EVENTS 
    : EVENTS.filter(e => e.type === activeFilter)
  
  const upcomingCount = EVENTS.filter(e => e.status === 'upcoming').length

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* 顶部导航栏 */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#829682]/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* 左侧返回按钮 */}
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#829682] hover:text-[#1B241B] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden md:inline">返回</span>
            </button>
            
            {/* 中间标题 */}
            <h1 className="text-lg font-bold text-[#1B241B]">活动社区</h1>
            
            {/* 右侧首页按钮 */}
            <Link to="/" className="flex items-center gap-2 text-[#829682] hover:text-[#1B241B] transition-colors">
              <span className="hidden md:inline">首页</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B241B] to-[#2a4a2a]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-[#D4B982] blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#829682] blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#D4B982] font-medium tracking-widest mb-4 uppercase text-sm">PetScent Community</p>
          <h1 className="text-4xl md:text-6xl font-bold text-[#FDFBF7] mb-4">
            它香社区活动
          </h1>
          <p className="text-xl text-[#FDFBF7]/80 max-w-2xl mx-auto mb-6">
            和我们一起，为毛孩子创造更美好的生活体验
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4B982]/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#D4B982] animate-pulse"></span>
            <span className="text-[#D4B982] font-medium">{upcomingCount} 场活动即将开始</span>
          </div>
        </div>
      </section>

      {/* 筛选 */}
      <section className="sticky top-0 z-10 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#829682]/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {TYPE_FILTERS.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${
                  activeFilter === filter.id
                    ? 'bg-[#1B241B] text-white shadow-lg'
                    : 'bg-white text-[#1B241B] hover:bg-[#829682]/10'
                }`}
              >
                <span>{filter.icon}</span>
                <span className="font-medium">{filter.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 活动列表 */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onRegister={() => setShowModal(event)}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌸</div>
            <p className="text-xl text-[#829682]">暂无相关活动</p>
          </div>
        )}
      </section>

      {/* 社区介绍 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#829682] font-medium tracking-widest mb-3 uppercase text-sm">Join Our Community</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B241B] mb-6">
                加入它香社区<br/>和万位宠主一起成长
              </h2>
              <div className="space-y-4 text-[#829682]">
                <p>
                  它香社区聚集了来自全国各地的宠物芳疗爱好者。无论你是新手还是资深玩家，
                  都能在这里找到志同道合的伙伴。
                </p>
                <ul className="space-y-3">
                  {[
                    '每周线上分享会，专家答疑解惑',
                    '线下活动优先报名权',
                    '新品试用体验官招募',
                    '专属会员折扣与积分福利'
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#829682]/10 flex items-center justify-center text-[#829682]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '👥', value: '10,000+', label: '社区成员' },
                { icon: '🎉', value: '50+', label: '年度活动' },
                { icon: '📚', value: '100+', label: '专业课程' },
                { icon: '💬', value: '5,000+', label: '每日互动' },
              ].map(stat => (
                <div key={stat.label} className="bg-[#FDFBF7] rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-[#1B241B]">{stat.value}</div>
                  <div className="text-sm text-[#829682]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 往期回顾 */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#829682] font-medium tracking-widest mb-3 uppercase text-sm">Past Events</p>
            <h2 className="text-3xl font-bold text-[#1B241B]">往期精彩回顾</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
              'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
              'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
              'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400',
            ].map((img, idx) => (
              <div key={idx} className="aspect-square rounded-2xl overflow-hidden group cursor-pointer">
                <img 
                  src={img} 
                  alt={`往期活动 ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#829682] to-[#1B241B]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#FDFBF7] mb-4">想举办自己的宠物活动？</h2>
          <p className="text-[#FDFBF7]/80 mb-8">
            我们欢迎全国各地宠物店主、宠物公园、宠物会所与我们合作，共同推广科学芳疗理念。
          </p>
          <button className="px-8 py-4 bg-[#D4B982] text-[#1B241B] rounded-full font-semibold hover:bg-[#FDFBF7] transition-colors">
            联系合作
          </button>
        </div>
      </section>

      {/* 报名弹窗 */}
      {showModal && (
        <RegisterModal event={showModal} onClose={() => setShowModal(null)} />
      )}
    </div>
  )
}

function EventCard({ event, onRegister }: { event: Event; onRegister: () => void }) {
  const progress = (event.registered / event.capacity) * 100
  const isHot = progress > 80
  
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* 类型标签 */}
        <div className="absolute top-4 left-4 flex gap-2">
          {event.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/90 text-[#1B241B] text-xs rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
        
        {/* 状态标签 */}
        {isHot && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-[#D4B982] text-white text-xs rounded-full font-medium">
            🔥 即将满员
          </div>
        )}
        
        {/* 底部信息 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-sm opacity-80">{event.date} · {event.time}</p>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-[#1B241B] mb-2">{event.title}</h3>
        <p className="text-[#829682] text-sm mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex items-center gap-2 text-sm text-[#829682] mb-4">
          <span>📍</span>
          <span className="truncate">{event.location}</span>
        </div>
        
        {/* 报名进度 */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[#829682]">已报名 {event.registered}/{event.capacity}</span>
            <span className="text-[#829682]">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-[#829682]/10 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all ${isHot ? 'bg-[#D4B982]' : 'bg-[#829682]'}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            {event.price === 0 ? (
              <span className="text-lg font-bold text-[#829682]">免费</span>
            ) : (
              <span className="text-lg font-bold text-[#D4B982]">¥{event.price}</span>
            )}
          </div>
          <button 
            onClick={onRegister}
            className="px-6 py-2.5 bg-[#1B241B] text-white rounded-full font-medium hover:bg-[#829682] transition-colors"
          >
            立即报名
          </button>
        </div>
      </div>
    </div>
  )
}

function RegisterModal({ event, onClose }: { event: Event; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '', pet_name: '', pet_type: '', message: '' })
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div 
        className="relative bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-auto"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FDFBF7] flex items-center justify-center hover:bg-[#829682]/20"
        >
          ✕
        </button>
        
        <div className="p-6">
          <h2 className="text-xl font-bold text-[#1B241B] mb-2">{event.title}</h2>
          <p className="text-[#829682] text-sm mb-6">{event.date} · {event.time}</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1B241B] mb-1">您的姓名 *</label>
              <input 
                type="text"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-[#829682]/20 focus:outline-none focus:ring-2 focus:ring-[#829682]"
                placeholder="请输入姓名"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#1B241B] mb-1">联系电话 *</label>
              <input 
                type="tel"
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-[#829682]/20 focus:outline-none focus:ring-2 focus:ring-[#829682]"
                placeholder="请输入手机号"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1B241B] mb-1">宠物名称</label>
                <input 
                  type="text"
                  value={form.pet_name}
                  onChange={e => setForm({...form, pet_name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-[#829682]/20 focus:outline-none focus:ring-2 focus:ring-[#829682]"
                  placeholder="毛孩子名字"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B241B] mb-1">宠物类型</label>
                <select 
                  value={form.pet_type}
                  onChange={e => setForm({...form, pet_type: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-[#829682]/20 focus:outline-none focus:ring-2 focus:ring-[#829682]"
                >
                  <option value="">请选择</option>
                  <option value="dog">狗狗</option>
                  <option value="cat">猫咪</option>
                  <option value="other">其他</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#1B241B] mb-1">备注信息</label>
              <textarea 
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-[#829682]/20 focus:outline-none focus:ring-2 focus:ring-[#829682] resize-none"
                rows={3}
                placeholder="如有特殊需求请说明"
              />
            </div>
          </div>
          
          <button 
            onClick={() => { alert('报名成功！我们会尽快联系您。'); onClose(); }}
            className="w-full mt-6 py-4 bg-[#1B241B] text-white rounded-2xl font-semibold hover:bg-[#829682] transition-colors"
          >
            确认报名
          </button>
          
          <p className="text-center text-xs text-[#829682] mt-4">
            提交即表示同意活动条款，我们会在活动前2天短信通知
          </p>
        </div>
      </div>
    </div>
  )
}
