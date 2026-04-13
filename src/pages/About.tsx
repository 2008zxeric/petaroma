import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function About() {
  const [activeValue, setActiveValue] = useState(0)
  const navigate = useNavigate()
  
  const values = [
    {
      icon: '🌿',
      title: '天然至上',
      desc: '100%纯天然植物精油',
      detail: '我们坚持使用全球优质产区的天然植物精油，拒绝任何化学合成成分。每一滴都经过严格检测，确保纯度与活性。'
    },
    {
      icon: '🔬',
      title: '科研驱动',
      desc: '基于宠物行为学研究',
      detail: '与国内顶尖动物行为学实验室合作，深入研究宠物的嗅觉感知与情绪调节机制，用科学数据指导产品研发。'
    },
    {
      icon: '💚',
      title: '去人类中心化',
      desc: '站在宠物视角思考',
      detail: '我们相信，宠物芳疗的核心是尊重宠物的选择。产品设计始终以宠物的感官体验为第一优先，而非人类的主观感受。'
    },
    {
      icon: '🤝',
      title: '人宠共融',
      desc: '建立更深的情感连接',
      detail: '我们希望芳疗成为人与宠物之间的桥梁，帮助宠物主人更深入理解毛孩子的情绪语言，建立更亲密的伙伴关系。'
    }
  ]

  const milestones = [
    { year: '2022', title: '品牌创立', desc: '它香正式成立，开启宠物芳疗新篇章' },
    { year: '2023', title: '科研突破', desc: '联合发布国内首份宠物芳疗研究报告' },
    { year: '2024', title: '产品线扩张', desc: '推出雷雨安、暂别安等7大产品线' },
    { year: '2024', title: '用户突破', desc: '服务超过10万+宠物家庭' },
  ]

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
            <h1 className="text-lg font-bold text-[#1B241B]">品牌故事</h1>
            
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

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B241B] via-[#2a3a2a] to-[#3d5d3d]">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#D4B982" strokeWidth="0.5"/>
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <p className="text-[#D4B982] font-medium tracking-widest mb-4 uppercase text-sm">Our Story</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#FDFBF7] mb-6 leading-tight">
              用天然芳香<br/>
              <span className="text-[#D4B982]">守护每一只毛孩子</span>
            </h1>
            <p className="text-xl text-[#FDFBF7]/80 leading-relaxed mb-8">
              我们相信，宠物不只是我们的陪伴者，更是独立的情感个体。<br/>
              它香，致力于用科学验证的天然芳疗，帮助每一只毛孩子找到内心的平静。
            </p>
            <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4B982] text-[#1B241B] rounded-full font-semibold hover:bg-[#FDFBF7] transition-colors">
              探索产品
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
        
        {/* 装饰元素 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full fill-[#FDFBF7]">
            <path d="M0,64L1440,128L1440,320L0,320Z"/>
          </svg>
        </div>
      </section>

      {/* 品牌理念 */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#829682] font-medium tracking-widest mb-3 uppercase text-sm">Our Philosophy</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B241B] mb-4">去人类中心化</h2>
            <p className="text-xl text-[#829682] max-w-2xl mx-auto">
              我们相信真正的宠物芳疗，应该从宠物的感官世界出发，而非人类的主观感受。
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div 
                key={value.title}
                onClick={() => setActiveValue(idx)}
                className={`bg-white rounded-3xl p-6 cursor-pointer transition-all duration-300 ${
                  activeValue === idx 
                    ? 'shadow-xl scale-105 ring-2 ring-[#829682]' 
                    : 'shadow-sm hover:shadow-lg'
                }`}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-[#1B241B] mb-2">{value.title}</h3>
                <p className="text-[#829682] text-sm mb-4">{value.desc}</p>
                {activeValue === idx && (
                  <p className="text-[#1B241B] text-sm leading-relaxed animate-fade-in">{value.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 创始故事 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-[#829682]/10">
                <img 
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800" 
                  alt="创始人与宠物"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#D4B982]/20 rounded-3xl -z-10"></div>
            </div>
            
            <div className="space-y-6">
              <p className="text-[#829682] font-medium tracking-widest uppercase text-sm">Founder's Story</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B241B]">
                从一只怕雷的柴犬开始
              </h2>
              <div className="space-y-4 text-[#829682] leading-relaxed">
                <p>
                  2022年的一个雷雨夜，我家的柴犬"豆包"再次躲在床下发抖。作为宠物主人的无力感让我开始思考：
                  能否用更自然的方式，帮助毛孩子度过这些恐惧时刻？
                </p>
                <p>
                  经过深入研究，我发现芳疗在欧美已广泛应用于宠物情绪管理。但市面上的产品大多是"人用配方"，
                  没有真正考虑宠物的嗅觉敏感度和偏好。
                </p>
                <p>
                  于是，它香诞生了。我们联合动物行为学专家，从零开始研发真正适合宠物的芳疗产品——
                  让每一滴精油都能温柔地抚平毛孩子的焦虑。
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="w-16 h-16 rounded-full bg-[#829682]/10 flex items-center justify-center text-3xl">
                  🐕
                </div>
                <div>
                  <p className="font-semibold text-[#1B241B]">创始人</p>
                  <p className="text-[#829682]">与豆包的故事</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 发展历程 */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#829682] font-medium tracking-widest mb-3 uppercase text-sm">Our Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B241B]">发展历程</h2>
          </div>

          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#829682]/20 -translate-x-1/2"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, idx) => (
                <div 
                  key={milestone.year}
                  className={`relative flex items-center gap-8 ${
                    idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block bg-white rounded-2xl p-6 shadow-sm ${
                      idx % 2 === 0 ? 'mr-8' : 'ml-8'
                    }`}>
                      <p className="text-2xl font-bold text-[#D4B982] mb-2">{milestone.year}</p>
                      <h3 className="text-lg font-semibold text-[#1B241B] mb-1">{milestone.title}</h3>
                      <p className="text-[#829682]">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#829682] ring-4 ring-[#FDFBF7]"></div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 团队介绍 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#829682] font-medium tracking-widest mb-3 uppercase text-sm">Our Team</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B241B] mb-4">专业的团队</h2>
            <p className="text-[#829682] max-w-2xl mx-auto">
              我们汇聚了芳疗专家、动物行为学研究者、宠物营养师，只为给毛孩子最好的。
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: '芳疗研发团队', icon: '🌿', desc: '法国ISIPCA认证芳疗师领衔' },
              { name: '动物行为学顾问', icon: '🔬', desc: '中科院动物行为学博士' },
              { name: '宠物营养专家', icon: '🥗', desc: '美国宠物营养协会会员' },
              { name: '宠物护理师', icon: '🐾', desc: '持证高级宠物护理师' },
            ].map(member => (
              <div key={member.name} className="bg-[#FDFBF7] rounded-3xl p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white flex items-center justify-center text-4xl shadow-sm">
                  {member.icon}
                </div>
                <h3 className="font-semibold text-[#1B241B] mb-1">{member.name}</h3>
                <p className="text-sm text-[#829682]">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 数据展示 */}
      <section className="py-20 bg-[#1B241B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10万+', label: '服务宠物家庭' },
              { value: '98%', label: '用户满意度' },
              { value: '7', label: '产品线覆盖场景' },
              { value: '100%', label: '天然成分承诺' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl font-bold text-[#D4B982] mb-2">{stat.value}</div>
                <div className="text-[#FDFBF7]/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1B241B] mb-4">准备好守护你的毛孩子了吗？</h2>
          <p className="text-[#829682] mb-8">
            加入它香大家庭，用天然芳疗为宠物创造更安心的生活环境。
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/shop" className="px-8 py-4 bg-[#829682] text-white rounded-full font-semibold hover:bg-[#1B241B] transition-colors">
              去逛逛商城
            </Link>
            <Link to="/events" className="px-8 py-4 bg-white text-[#1B241B] rounded-full font-semibold border border-[#829682]/30 hover:bg-[#829682]/10 transition-colors">
              参加活动
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
