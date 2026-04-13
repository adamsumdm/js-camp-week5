// ========================================
// 第五週作業：電商資料處理系統
// ========================================

// ========== 提供的資料結構 ==========

// 產品資料
const products = [
  { id: 'prod-1', title: '經典白T', category: '衣服', origin_price: 500, price: 399, images: 'https://example.com/t1.jpg' },
  { id: 'prod-2', title: '牛仔褲', category: '褲子', origin_price: 1200, price: 899, images: 'https://example.com/p1.jpg' },
  { id: 'prod-3', title: '帆布鞋', category: '鞋子', origin_price: 1800, price: 1299, images: 'https://example.com/s1.jpg' },
  { id: 'prod-4', title: '棒球帽', category: '配件', origin_price: 350, price: 299, images: 'https://example.com/h1.jpg' },
  { id: 'prod-5', title: '運動外套', category: '衣服', origin_price: 2000, price: 1599, images: 'https://example.com/j1.jpg' }
];

// 購物車資料(產品與數量清單)
const carts = [
  { id: 'cart-1', product: products[0], quantity: 2 },
  { id: 'cart-2', product: products[2], quantity: 1 },
  { id: 'cart-3', product: products[4], quantity: 1 }
];

// 訂單資料
const orders = [
  {
    id: 'order-1',
    createdAt: 1704067200, // Unix timestamp
    paid: false,
    total: 2097,
    user: { name: '王小明', tel: '0912345678', email: 'ming@example.com', address: '台北市信義區', payment: 'ATM' },
    products: [
      { ...products[0], quantity: 2 },
      { ...products[2], quantity: 1 }
    ]
  },
  {
    id: 'order-2',
    createdAt: 1704153600,
    paid: true,
    total: 899,
    user: { name: '李小華', tel: '0923456789', email: 'hua@example.com', address: '台中市西區', payment: 'Credit Card' },
    products: [
      { ...products[1], quantity: 1 }
    ]
  }
];

// ========================================
// 任務一：產品查詢模組 (基礎)
// ========================================

/**
 * 1. 根據 ID 查詢產品
 * @param {Array} products - 產品陣列
 * @param {string} productId - 產品 ID
 * @returns {Object|null} - 回傳產品物件，找不到回傳 null
 */
function getProductById(products, productId) {
  // 請實作此函式
  return products.find(product => product.id === productId) || null;
}

/**
 * 2. 根據分類篩選產品
 * @param {Array} products - 產品陣列
 * @param {string} category - 分類名稱
 * @returns {Array} - 回傳符合分類的產品陣列，若 category 為 '全部' 則回傳全部產品
 */
function getProductsByCategory(products, category) {
  // 請實作此函式
  if(category === "全部")
    return products;
  return products.filter(product => product.category === category);
}

/**
 * 3. 計算產品折扣率
 * @param {Object} product - 產品物件
 * @returns {string} - 回傳折扣百分比，例如 '8折' 或 '79折'
 * 計算方式：Math.round((price / origin_price) * 100) / 10
 */
function getDiscountRate(product) {
  // 請實作此函式
  const rate = Math.round((product.price / product.origin_price) * 100) / 10 ;
  return `${rate}折`;
}

/**
 * 4. 取得所有產品分類（不重複）
 * @param {Array} products - 產品陣列
 * @returns {Array} - 回傳分類陣列，例如 ['衣服', '褲子', '鞋子', '配件']
 */
function getAllCategories(products) {
  // 請實作此函式
  const categories = products.map(product => product.category);
  return [...new Set(categories)];
}

// ========================================
// 任務二：購物車計算模組 (中階)
// ========================================

/**
 * 1. 計算購物車原價總金額
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳數字（原價 × 數量 的總和）
 */
function calculateCartOriginalTotal(carts) {
  // 請實作此函式
  const totalOriPrice = carts.reduce((accumulator,orderItem) => accumulator + (orderItem.product.origin_price * orderItem.quantity),0);
  return totalOriPrice;
}

/**
 * 2. 計算購物車售價總金額
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳數字（售價 × 數量 的總和）
 */
function calculateCartTotal(carts) {
  // 請實作此函式
  const totalPrice = carts.reduce((accumulator,orderItem) => accumulator + (orderItem.product.price * orderItem.quantity),0);
  return totalPrice;
}

/**
 * 3. 計算總共省下多少錢
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳原價總金額 - 售價總金額
 */
function calculateSavings(carts) {
  // 請實作此函式
  const discount = calculateCartOriginalTotal(carts) - calculateCartTotal(carts);
  return discount;
}

/**
 * 4. 計算購物車商品總數量
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳所有商品的 quantity 總和
 */
function calculateCartItemCount(carts) {
  // 請實作此函式
  return carts.reduce((acc, orderItem) => acc + orderItem.quantity,0);
}

/**
 * todo and review
 * 5. 檢查產品是否已在購物車中
 * @param {Array} carts - 購物車陣列
 * @param {string} productId - 產品 ID
 * @returns {boolean} - 回傳 true 或 false
 */
function isProductInCart(carts, productId) {
  // 請實作此函式
  console.log(`call isProductInCart, product.id:${productId}`);
  return carts.some(orderItem => orderItem.product.id === productId);
}

// ========================================
// 任務三：購物車操作模組 (進階)
// ========================================

/**
 * 1. 新增商品到購物車
 * @param {Array} carts - 購物車陣列
 * @param {Object} product - 產品物件
 * @param {number} quantity - 數量
 * @returns {Array} - 回傳新的購物車陣列（不要修改原陣列）
 * 如果產品已存在，合併數量；如果不存在，新增一筆
 */
function addToCart(carts, product, quantity) {
  
  if(isProductInCart(carts,product.id)){
    // 產品已存在，合併數量
    console.log('產品已存在，合併數量');
    // 回傳新整理好的購物車陣列
    return carts.map((cartItem) => {
      if(cartItem.product.id === product.id){
        // 回傳該筆產品物件（添加數量）
        return {...cartItem, quantity: cartItem.quantity + quantity};
      }else{
        // 回傳該筆產品物件（原封不動）
        return cartItem;
      }
    });
  }else{
    // 產品不存在，新增一筆購物車項目
    // newCarts.push(product);
    console.log('產品不存在，新增至購物車');
    const newCartItem = {
      id: `cart-${Date.now()}`,
      product: product,
      quantity: quantity
    }
    return [...carts, newCartItem];
  }
}

/**
 * 2. 更新購物車商品數量
 * @param {Array} carts - 購物車陣列
 * @param {string} cartId - 購物車項目 ID
 * @param {number} newQuantity - 新數量
 * @returns {Array} - 回傳新的購物車陣列，如果 newQuantity <= 0，移除該商品
 */
function updateCartItemQuantity(carts, cartId, newQuantity) {
  // 請實作此函式
  // 確認數量是否為正整數，<= 0 就移除該商品（filter）
  if(newQuantity<=0){
    return carts.filter(cartItem => cartItem.id !== cartId);
  }
  // 更新商品：依據此 cartId 更新數量（map）
  return carts.map(cartItem => {
    if(cartItem.id === cartId){
      // 比對到就可以更新數量
      return {...carts, quantity:newQuantity};
    }
    // 不需異動，直接回傳該項目
    return cartItem;
  })
}

/**
 * 3. 從購物車移除商品
 * @param {Array} carts - 購物車陣列
 * @param {string} cartId - 購物車項目 ID
 * @returns {Array} - 回傳移除後的新購物車陣列
 */
function removeFromCart(carts, cartId) {
  // 請實作此函式
  return carts.filter(cartItem => cartItem.id !== cartId);
}

/**
 * 4. 清空購物車
 * @returns {Array} - 回傳空陣列
 */
function clearCart() {
  // 請實作此函式
  return [];
}

// ========================================
// 任務四：訂單統計模組 (挑戰)
// ========================================

/**
 * 1. 計算訂單總營收
 * @param {Array} orders - 訂單陣列
 * @returns {number} - 只計算已付款 (paid: true) 的訂單
 */
function calculateTotalRevenue(orders) {
  // 請實作此函式
  return filterOrdersByStatus(orders, true).reduce(
    (total, curPaidItem) => { //訂單第一層：訂單資訊
     return total + curPaidItem.products.reduce((subtotal,productItem) => { // 訂單第二層：商品資訊與購買數量
       return subtotal + (productItem.price * productItem.quantity);
    }, 0); // 訂單第二層單一商品價格初始 0 
    }, 0); // 訂單第一層全部商品價格初始 0 
}

/**
 * 2. 篩選訂單狀態
 * @param {Array} orders - 訂單陣列
 * @param {boolean} isPaid - true 回傳已付款訂單，false 回傳未付款訂單
 * @returns {Array} - 回傳篩選後的訂單陣列
 */
function filterOrdersByStatus(orders, isPaid) {
  // 請實作此函式
  return orders.filter(orderItem => orderItem.paid === isPaid);
}

/**
 * 3. 產生訂單統計報表
 * @param {Array} orders - 訂單陣列
 * @returns {Object} - 回傳格式：
 * {
 *   totalOrders: 2,
 *   paidOrders: 1,
 *   unpaidOrders: 1,
 *   totalRevenue: 899,
 *   averageOrderValue: 1498  // 所有訂單平均金額
 * }
 */
function generateOrderReport(orders) {
  // 請實作此函式
  let statReport = {};
  let totalOrders = orders.length;
  let paidOrders = filterOrdersByStatus(orders, true).length;
  let uppaidOrders = filterOrdersByStatus(orders, false).length;
  let totalRevenue = calculateTotalRevenue(orders);
  let totalOrderValue = orders.reduce(
    (total, curPaidItem) => { //訂單第一層：訂單資訊
     return total + curPaidItem.products.reduce((subtotal,productItem) => { // 訂單第二層：商品資訊與購買數量
       return subtotal + (productItem.price * productItem.quantity);
    }, 0); // 訂單第二層單一商品價格初始 0 
    }, 0); // 訂單第一層全部商品價格初始 0 
  let averageOrderValue = totalOrderValue / totalOrders;

  statReport = { "totalOrders": totalOrders, "paidOrders": paidOrders, "unpaidOrders": uppaidOrders, "totalRevenue": totalRevenue, "averageOrderValue": averageOrderValue };
  console.log(`generateOrderReport(orders) : ${statReport}`);
  return statReport;

}

/**
 * 4. 依付款方式統計
 * @param {Array} orders - 訂單陣列
 * @returns {Object} - 回傳格式：
 * {
 *   'ATM': [order1],
 *   'Credit Card': [order2]
 * }
 */
function groupOrdersByPayment(orders) {
  // 請實作此函式
  const groupOrdersByPayChannel = {};
  groupOrdersByPayChannel[`ATM`] = fileterPayChannelByOrders(orders, "ATM");
  groupOrdersByPayChannel[`Credit Card`] = fileterPayChannelByOrders(orders, "Credit Card");
  console.log(`groupOrdersByPayChannel：${groupOrdersByPayChannel}`);
  return groupOrdersByPayChannel;
}

/**
 * 4. 依付款方式統計
 * @param {Array} orders - 訂單陣列
 * @param {String} channelType - 付款渠道
 * @returns {Array} - 回傳格式：
 */
function fileterPayChannelByOrders(orders, channelType){
  return orders.filter(orderItem => orderItem.user.payment === channelType);
}

// ========================================
// 測試區域（可自行修改測試）
// ========================================

// 任務一測試
console.log('=== 任務一測試 ===');
console.log('getProductById:', getProductById(products, 'prod-1'));
console.log('getProductsByCategory:', getProductsByCategory(products, '衣服'));
console.log('getDiscountRate:', getDiscountRate(products[0]));
console.log('getAllCategories:', getAllCategories(products));

// 任務二測試
console.log('\n=== 任務二測試 ===');
console.log('calculateCartOriginalTotal:', calculateCartOriginalTotal(carts));
console.log('calculateCartTotal:', calculateCartTotal(carts));
console.log('calculateSavings:', calculateSavings(carts));
console.log('calculateCartItemCount:', calculateCartItemCount(carts));
console.log('isProductInCart:', isProductInCart(carts, 'prod-1'));

// 任務三測試
console.log('\n=== 任務三測試 ===');
console.log('addToCart:', addToCart(carts, products[1], 2));
console.log('updateCartItemQuantity:', updateCartItemQuantity(carts, 'cart-1', 5));
console.log('removeFromCart:', removeFromCart(carts, 'cart-1'));
console.log('clearCart:', clearCart());

// 任務四測試
console.log('\n=== 任務四測試 ===');
console.log('calculateTotalRevenue:', calculateTotalRevenue(orders));
console.log('filterOrdersByStatus:', filterOrdersByStatus(orders, true));
console.log('generateOrderReport:', generateOrderReport(orders));
console.log('groupOrdersByPayment:', groupOrdersByPayment(orders));

// ========================================
// 匯出函式供測試使用
// ========================================
module.exports = {
  getProductById,
  getProductsByCategory,
  getDiscountRate,
  getAllCategories,
  calculateCartOriginalTotal,
  calculateCartTotal,
  calculateSavings,
  calculateCartItemCount,
  isProductInCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  calculateTotalRevenue,
  filterOrdersByStatus,
  generateOrderReport,
  groupOrdersByPayment
};
