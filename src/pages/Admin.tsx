import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore, useOrderStore, useUserStore, useStats, Product, Order, User } from '../store/adminStore'

type Tab = 'overview' | 'products' | 'orders' | 'users'
type OrderFilter = 'all' | 'pending' | 'paid' | 'shipped' | 'delivered'

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* 顶部导航 */}
      <header className="bg-[#1B241B] text-white sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg">
              {sidebarOpen ? '◀' : '▶'}
            </button>
            <Link to="/" className="text-xl font-bold">它香·后台管理</Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-[#D4B982] text-[#1B241B] text-sm rounded-full font-medium">管理员</span>
            <Link to="/" className="text-sm hover:text-[#D4B982]">返回前台</Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* 侧边栏 */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-[#829682]/20 transition-all duration-300 overflow-hidden`}>
          <nav className="p-4 space-y-2">
            {[
              { id: 'overview' as Tab, name: '数据概览', icon: '📊' },
              { id: 'products' as Tab, name: '商品管理', icon: '🏷️' },
              { id: 'orders' as Tab, name: '订单管理', icon: '📦' },
              { id: 'users' as Tab, name: '用户管理', icon: '👥' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-[#1B241B] text-white' 
                    : 'text-[#829682] hover:bg-[#829682]/10'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'overview' && <OverviewPanel />}
          {activeTab === 'products' && <ProductsPanel />}
          {activeTab === 'orders' && <OrdersPanel />}
          {activeTab === 'users' && <UsersPanel />}
        </main>
      </div>
    </div>
  )
}

// 数据概览面板
function OverviewPanel() {
  const stats = useStats()
  const orders = useOrderStore((s) => s.orders)
  const products = useProductStore((s) => s.products)

  const recentOrders = orders.slice(0, 5)
  const lowStockProducts = products.filter(p => p.stock < 20).slice(0, 5)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1B241B]">数据概览</h1>
      
      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon="📦" label="今日订单" value={stats.todayOrders} />
        <StatCard icon="💰" label="今日销售额" value={`¥${stats.todaySales}`} />
        <StatCard icon="⏳" label="待处理订单" value={stats.pendingOrders} highlight />
        <StatCard icon="⚠️" label="库存预警" value={stats.lowStockProducts} highlight />
      </div>

      {/* 双列布局 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 最近订单 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#1B241B] mb-4">最近订单</h2>
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-[#829682]/10 last:border-0">
                <div>
                  <p className="font-medium text-[#1B241B]">{order.user_name}</p>
                  <p className="text-sm text-[#829682]">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#D4B982]">¥{order.total}</p>
                  <OrderStatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 库存预警 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#1B241B] mb-4">库存预警</h2>
          {lowStockProducts.length === 0 ? (
            <p className="text-[#829682]">库存充足</p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between py-2 border-b border-[#829682]/10 last:border-0">
                  <p className="text-[#1B241B]">{product.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-semibold">{product.stock}件</span>
                    <span className="text-[#829682] text-sm">/ 安全库存 20</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 销售趋势 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#1B241B] mb-4">品类销售分布</h2>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(stats.salesByCategory).map(([cat, sales]) => (
            <div key={cat} className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#D4B982]/20 flex items-center justify-center">
                <span className="text-2xl">{getCategoryIcon(cat)}</span>
              </div>
              <p className="font-semibold text-[#1B241B]">{sales}</p>
              <p className="text-sm text-[#829682]">{getCategoryName(cat)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 商品管理面板
function ProductsPanel() {
  const products = useProductStore((s) => s.products)
  const addProduct = useProductStore((s) => s.addProduct)
  const updateProduct = useProductStore((s) => s.updateProduct)
  const deleteProduct = useProductStore((s) => s.deleteProduct)
  
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.includes(search) || p.name_en.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'all' || p.category === category
    return matchSearch && matchCategory
  })

  const handleSave = (product: Product) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, product)
    } else {
      addProduct({ ...product, id: Date.now().toString() })
    }
    setShowForm(false)
    setEditingProduct(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1B241B]">商品管理</h1>
        <button
          onClick={() => { setEditingProduct(null); setShowForm(true) }}
          className="px-6 py-2 bg-[#1B241B] text-white rounded-xl font-medium hover:bg-[#2a3a2a] transition-colors"
        >
          + 添加商品
        </button>
      </div>

      {/* 筛选 */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="搜索商品..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-[#829682]/30 rounded-xl focus:outline-none focus:border-[#D4B982]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-[#829682]/30 rounded-xl focus:outline-none focus:border-[#D4B982]"
        >
          <option value="all">全部分类</option>
          <option value="storm">雷雨安抚</option>
          <option value="separation">分离焦虑</option>
          <option value="travel">出行放松</option>
          <option value="nest">睡眠安神</option>
          <option value="care">清洁护理</option>
          <option value="health">营养保健</option>
          <option value="accessory">配件工具</option>
          <option value="set">礼盒套装</option>
        </select>
      </div>

      {/* 商品列表 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-[#FDFBF7] border-b border-[#829682]/10">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-[#829682]">商品</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-[#829682]">分类</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-[#829682]">价格</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-[#829682]">库存</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-[#829682]">销量</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-[#829682]">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} className="border-b border-[#829682]/10 hover:bg-[#FDFBF7]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-[#1B241B]">{product.name}</p>
                      <p className="text-sm text-[#829682]">{product.name_en}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#829682]">{getCategoryName(product.category)}</td>
                <td className="px-6 py-4">
                  <span className="text-[#D4B982] font-semibold">¥{product.price}</span>
                  {product.original_price && (
                    <span className="text-sm text-[#829682] line-through ml-2">¥{product.original_price}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={product.stock < 20 ? 'text-red-500 font-semibold' : 'text-[#1B241B]'}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#829682]">{product.sales || 0}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => { setEditingProduct(product); setShowForm(true) }}
                    className="text-[#829682] hover:text-[#1B241B] mr-4"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('确定删除此商品？')) deleteProduct(product.id)
                    }}
                    className="text-red-400 hover:text-red-600"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 编辑/添加弹窗 */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingProduct(null) }}
        />
      )}
    </div>
  )
}

// 订单管理面板
function OrdersPanel() {
  const orders = useOrderStore((s) => s.orders)
  const updateOrderStatus = useOrderStore((s) => s.updateOrderStatus)
  const deleteOrder = useOrderStore((s) => s.deleteOrder)
  
  const [filter, setFilter] = useState<OrderFilter>('all')
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter(o => {
    const matchFilter = filter === 'all' || o.status === filter
    const matchSearch = o.id.includes(search) || o.user_name.includes(search)
    return matchFilter && matchSearch
  })

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    // 需要更新 orders 数组而不是 products
    const order = orders.find(o => o.id === orderId)
    if (order) {
      // 直接用 set 更新
      useOrderStore.getState().orders = useOrderStore.getState().orders.map(o => 
        o.id === orderId ? { ...o, status: newStatus, updated_at: new Date().toISOString() } : o
      )
      // 强制重新渲染
      window.location.reload()
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1B241B]">订单管理</h1>

      {/* 筛选 */}
      <div className="flex gap-4 items-center">
        <div className="flex bg-white rounded-xl p-1 shadow-sm">
          {(['all', 'pending', 'paid', 'shipped', 'delivered'] as OrderFilter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f ? 'bg-[#1B241B] text-white' : 'text-[#829682] hover:bg-[#829682]/10'
              }`}
            >
              {f === 'all' ? '全部' : f === 'pending' ? '待付款' : f === 'paid' ? '已付款' : f === 'shipped' ? '已发货' : '已完成'}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="搜索订单号/用户..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-[#829682]/30 rounded-xl focus:outline-none focus:border-[#D4B982]"
        />
      </div>

      {/* 订单列表 */}
      <div className="space-y-4">
        {filteredOrders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[#829682]">{order.id}</span>
                <OrderStatusBadge status={order.status} />
              </div>
              <span className="text-sm text-[#829682]">
                {new Date(order.created_at).toLocaleString('zh-CN')}
              </span>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-[#1B241B]">{order.user_name}</p>
                <p className="text-sm text-[#829682]">{order.phone} · {order.address}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {order.items.map((item, idx) => (
                    <span key={idx} className="text-sm bg-[#FDFBF7] px-3 py-1 rounded-full">
                      {item.product_name} x{item.quantity}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#D4B982]">¥{order.total}</p>
                {order.remark && (
                  <p className="text-sm text-[#829682] mt-1">备注: {order.remark}</p>
                )}
              </div>
            </div>

            {/* 状态流转按钮 */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#829682]/10">
              <span className="text-sm text-[#829682] mr-2">更改状态:</span>
              {order.status !== 'delivered' && order.status !== 'cancelled' && (
                <>
                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'paid')}
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      确认付款
                    </button>
                  )}
                  {order.status === 'paid' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'shipped')}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      确认发货
                    </button>
                  )}
                  {order.status === 'shipped' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'delivered')}
                      className="px-3 py-1 text-sm bg-[#D4B982] text-[#1B241B] rounded-lg hover:bg-[#c5a870]"
                    >
                      确认完成
                    </button>
                  )}
                </>
              )}
              <button
                onClick={() => {
                  if (confirm('确定删除此订单？')) deleteOrder(order.id)
                }}
                className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded-lg ml-auto"
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 用户管理面板
function UsersPanel() {
  const users = useUserStore((s) => s.users)
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter(u => 
    u.name.includes(search) || u.email.includes(search) || u.phone.includes(search)
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1B241B]">用户管理</h1>

      <input
        type="text"
        placeholder="搜索用户名/邮箱/手机..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-[#829682]/30 rounded-xl focus:outline-none focus:border-[#D4B982]"
      />

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-[#FDFBF7] border-b border-[#829682]/10">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-[#829682]">用户</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-[#829682]">联系方式</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-[#829682]">订单数</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-[#829682]">累计消费</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-[#829682]">注册时间</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-[#829682]">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b border-[#829682]/10 hover:bg-[#FDFBF7]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D4B982]/30 flex items-center justify-center text-lg">
                      {user.name[0]}
                    </div>
                    <span className="font-medium text-[#1B241B]">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[#1B241B]">{user.phone}</p>
                  <p className="text-sm text-[#829682]">{user.email}</p>
                </td>
                <td className="px-6 py-4 text-[#1B241B]">{user.total_orders}</td>
                <td className="px-6 py-4 text-[#D4B982] font-semibold">¥{user.total_spent}</td>
                <td className="px-6 py-4 text-[#829682]">{user.created_at}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-[#829682] hover:text-[#1B241B]"
                  >
                    查看
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 用户详情弹窗 */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedUser(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full p-8" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#D4B982]/30 flex items-center justify-center text-3xl mb-4">
                {selectedUser.name[0]}
              </div>
              <h2 className="text-xl font-bold text-[#1B241B]">{selectedUser.name}</h2>
              <p className="text-[#829682]">{selectedUser.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#FDFBF7] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-[#D4B982]">{selectedUser.total_orders}</p>
                <p className="text-sm text-[#829682]">总订单数</p>
              </div>
              <div className="bg-[#FDFBF7] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-[#D4B982]">¥{selectedUser.total_spent}</p>
                <p className="text-sm text-[#829682]">累计消费</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#829682]">手机号</span>
                <span className="text-[#1B241B]">{selectedUser.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#829682]">收货地址</span>
                <span className="text-[#1B241B]">{selectedUser.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#829682]">注册时间</span>
                <span className="text-[#1B241B]">{selectedUser.created_at}</span>
              </div>
              {selectedUser.last_order_at && (
                <div className="flex justify-between">
                  <span className="text-[#829682]">最近下单</span>
                  <span className="text-[#1B241B]">{new Date(selectedUser.last_order_at).toLocaleDateString('zh-CN')}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="w-full mt-6 py-3 bg-[#1B241B] text-white rounded-xl font-medium hover:bg-[#2a3a2a] transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// 商品编辑表单
function ProductForm({ product, onSave, onClose }: { product: Product | null; onSave: (p: Product) => void; onClose: () => void }) {
  const [form, setForm] = useState<Product>(product || {
    id: '',
    name: '',
    name_en: '',
    description: '',
    price: 0,
    category: 'storm',
    image: '',
    images: [],
    in_stock: true,
    stock: 100,
    tags: [],
    featured: false,
    rating: 5,
    sales: 0,
    created_at: '',
  })

  const handleSave = () => {
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto p-8" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-[#1B241B] mb-6">{product ? '编辑商品' : '添加商品'}</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#829682] mb-1">商品名称</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border border-[#829682]/30 rounded-xl focus:outline-none focus:border-[#D4B982]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#829682] mb-1">英文名称</label>
              <input
                type="text"
                value={form.name_en}
                onChange={(e) => setForm({ ...form, name_en: e.target.value })}
                className="w-full px-4 py-2 border border-[#829682]/30 rounded-xl focus:outline-none focus:border-[#D4B982]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#829682] mb-1">商品描述</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-[#829682]/30 rounded-xl focus:outline-none focus:border-[#D4B982]"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[#829682] mb-1">价格</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-[#829682]/30 rounded-xl focus:outline-none focus:border-[#D4B982]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#829682] mb-1">原价（可选）</label>
              <input
                type="number"
                value={form.original_price || ''}
                onChange={(e) => setForm({ ...form, original_price: Number(e.target.value) || undefined })}
                className="w-full px-4 py-2 border border-[#829682]/30 rounded-xl focus:outline-none focus:border-[#D4B982]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#829682] mb-1">库存</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-[#829682]/30 rounded-xl focus:outline-none focus:border-[#D4B982]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#829682] mb-1">分类</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2 border border-[#829682]/30 rounded-xl focus:outline-none focus:border-[#D4B982]"
              >
                <option value="storm">雷雨安抚</option>
                <option value="separation">分离焦虑</option>
                <option value="travel">出行放松</option>
                <option value="nest">睡眠安神</option>
                <option value="care">清洁护理</option>
                <option value="health">营养保健</option>
                <option value="accessory">配件工具</option>
                <option value="set">礼盒套装</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#829682] mb-1">图片URL</label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full px-4 py-2 border border-[#829682]/30 rounded-xl focus:outline-none focus:border-[#D4B982]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#829682] mb-1">标签（逗号分隔）</label>
              <input
                type="text"
                value={form.tags.join(',')}
                onChange={(e) => setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()) })}
                className="w-full px-4 py-2 border border-[#829682]/30 rounded-xl focus:outline-none focus:border-[#D4B982]"
              />
            </div>
            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-5 h-5 rounded text-[#D4B982]"
                />
                <span className="text-[#1B241B]">推荐商品</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.in_stock}
                  onChange={(e) => setForm({ ...form, in_stock: e.target.checked })}
                  className="w-5 h-5 rounded text-[#D4B982]"
                />
                <span className="text-[#1B241B]">在售</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-[#829682]/30 rounded-xl text-[#829682] font-medium hover:bg-[#829682]/10 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-[#1B241B] text-white rounded-xl font-medium hover:bg-[#2a3a2a] transition-colors"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  )
}

// 辅助组件
function StatCard({ icon, label, value, highlight }: { icon: string; label: string; value: number | string; highlight?: boolean }) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm ${highlight && Number(value) > 0 ? 'ring-2 ring-[#D4B982]' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {highlight && Number(value) > 0 && (
          <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">!</span>
        )}
      </div>
      <p className="text-2xl font-bold text-[#1B241B]">{value}</p>
      <p className="text-sm text-[#829682]">{label}</p>
    </div>
  )
}

function OrderStatusBadge({ status }: { status: Order['status'] }) {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-600',
    paid: 'bg-green-100 text-green-600',
    shipped: 'bg-blue-100 text-blue-600',
    delivered: 'bg-gray-100 text-gray-600',
    cancelled: 'bg-red-100 text-red-600',
  }
  const labels = {
    pending: '待付款',
    paid: '已付款',
    shipped: '已发货',
    delivered: '已完成',
    cancelled: '已取消',
  }
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

function getCategoryName(cat: string): string {
  const map: Record<string, string> = {
    storm: '雷雨安抚',
    separation: '分离焦虑',
    travel: '出行放松',
    nest: '睡眠安神',
    care: '清洁护理',
    health: '营养保健',
    accessory: '配件工具',
    set: '礼盒套装',
  }
  return map[cat] || cat
}

function getCategoryIcon(cat: string): string {
  const map: Record<string, string> = {
    storm: '⛈️',
    separation: '💔',
    travel: '🚗',
    nest: '🌙',
    care: '🧴',
    health: '💊',
    accessory: '🧰',
    set: '🎁',
  }
  return map[cat] || '📦'
}
