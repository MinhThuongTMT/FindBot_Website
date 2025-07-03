// Product Categories Data from Python
const PRODUCT_CATEGORIES = {
  sua_nuoc: {
    name: "Sữa/Nước uống",
    key: "1",
    shelf_id: 1,
    positions: [
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
    ],
    color: [0, 255, 255],
    description: "Kệ 1: Sữa tươi, sữa hộp, nước uống các loại",
  },
  gao_muoi: {
    name: "Gạo/Muối/Đường",
    key: "2",
    shelf_id: 2,
    positions: [
      [3, 11],
      [3, 12],
      [3, 13],
      [3, 14],
      [3, 15],
      [4, 11],
      [4, 12],
      [4, 13],
      [4, 14],
      [4, 15],
      [5, 11],
      [5, 12],
      [5, 13],
      [5, 14],
      [5, 15],
    ],
    color: [255, 255, 0],
    description: "Kệ 2: Gạo, muối, đường, gia vị",
  },
  banh_keo: {
    name: "Bánh kẹo",
    key: "3",
    shelf_id: 3,
    positions: [
      [3, 19],
      [3, 20],
      [3, 21],
      [3, 22],
      [3, 23],
      [4, 19],
      [4, 20],
      [4, 21],
      [4, 22],
      [4, 23],
      [5, 19],
      [5, 20],
      [5, 21],
      [5, 22],
      [5, 23],
    ],
    color: [255, 192, 203],
    description: "Kệ 3: Bánh kẹo, snack, đồ ăn vặt",
  },
  mi_tom: {
    name: "Mì tôm",
    key: "4",
    shelf_id: 4,
    positions: [
      [3, 27],
      [3, 28],
      [3, 29],
      [3, 30],
      [3, 31],
      [4, 27],
      [4, 28],
      [4, 29],
      [4, 30],
      [4, 31],
      [5, 27],
      [5, 28],
      [5, 29],
      [5, 30],
      [5, 31],
    ],
    color: [255, 165, 0],
    description: "Kệ 4: Mì tôm, mì gói, đồ ăn liền",
  },
  rau_cu: {
    name: "Rau củ/Trái cây",
    key: "5",
    shelf_id: 5,
    positions: [
      [8, 3],
      [8, 4],
      [8, 5],
      [8, 6],
      [8, 7],
      [9, 3],
      [9, 4],
      [9, 5],
      [9, 6],
      [9, 7],
      [10, 3],
      [10, 4],
      [10, 5],
      [10, 6],
      [10, 7],
    ],
    color: [0, 255, 0],
    description: "Kệ 5: Rau củ tươi, trái cây",
  },
  thit_ca: {
    name: "Thịt cá",
    key: "6",
    shelf_id: 6,
    positions: [
      [8, 11],
      [8, 12],
      [8, 13],
      [8, 14],
      [8, 15],
      [9, 11],
      [9, 12],
      [9, 13],
      [9, 14],
      [9, 15],
      [10, 11],
      [10, 12],
      [10, 13],
      [10, 14],
      [10, 15],
    ],
    color: [255, 0, 0],
    description: "Kệ 6: Thịt tươi, cá, hải sản",
  },
  do_uong: {
    name: "Đồ uống có cồn",
    key: "7",
    shelf_id: 7,
    positions: [
      [8, 19],
      [8, 20],
      [8, 21],
      [8, 22],
      [8, 23],
      [9, 19],
      [9, 20],
      [9, 21],
      [9, 22],
      [9, 23],
      [10, 19],
      [10, 20],
      [10, 21],
      [10, 22],
      [10, 23],
    ],
    color: [0, 0, 255],
    description: "Kệ 7: Bia, rượu, đồ uống có cồn",
  },
  dong_lanh: {
    name: "Thực phẩm đông lạnh",
    key: "8",
    shelf_id: 8,
    positions: [
      [8, 27],
      [8, 28],
      [8, 29],
      [8, 30],
      [8, 31],
      [9, 27],
      [9, 28],
      [9, 29],
      [9, 30],
      [9, 31],
      [10, 27],
      [10, 28],
      [10, 29],
      [10, 30],
      [10, 31],
    ],
    color: [173, 216, 230],
    description: "Kệ 8: Thực phẩm đông lạnh",
  },
  gia_dung: {
    name: "Đồ gia dụng",
    key: "9",
    shelf_id: 9,
    positions: [
      [13, 3],
      [13, 4],
      [13, 5],
      [13, 6],
      [13, 7],
      [14, 3],
      [14, 4],
      [14, 5],
      [14, 6],
      [14, 7],
      [15, 3],
      [15, 4],
      [15, 5],
      [15, 6],
      [15, 7],
    ],
    color: [128, 0, 128],
    description: "Kệ 9: Đồ gia dụng, dụng cụ nhà bếp",
  },
  my_pham: {
    name: "Mỹ phẩm",
    key: "0",
    shelf_id: 10,
    positions: [
      [13, 11],
      [13, 12],
      [13, 13],
      [13, 14],
      [13, 15],
      [14, 11],
      [14, 12],
      [14, 13],
      [14, 14],
      [14, 15],
      [15, 11],
      [15, 12],
      [15, 13],
      [15, 14],
      [15, 15],
    ],
    color: [255, 20, 147],
    description: "Kệ 10: Mỹ phẩm, chăm sóc da",
  },
  thuoc_yte: {
    name: "Thuốc/Y tế",
    key: "q",
    shelf_id: 11,
    positions: [
      [13, 19],
      [13, 20],
      [13, 21],
      [13, 22],
      [13, 23],
      [14, 19],
      [14, 20],
      [14, 21],
      [14, 22],
      [14, 23],
      [15, 19],
      [15, 20],
      [15, 21],
      [15, 22],
      [15, 23],
    ],
    color: [255, 255, 255],
    description: "Kệ 11: Thuốc, dụng cụ y tế",
  },
  em_be: {
    name: "Đồ em bé",
    key: "w",
    shelf_id: 12,
    positions: [
      [13, 27],
      [13, 28],
      [13, 29],
      [13, 30],
      [13, 31],
      [14, 27],
      [14, 28],
      [14, 29],
      [14, 30],
      [14, 31],
      [15, 27],
      [15, 28],
      [15, 29],
      [15, 30],
      [15, 31],
    ],
    color: [255, 182, 193],
    description: "Kệ 12: Đồ dùng cho em bé",
  },
  ve_sinh: {
    name: "Vệ sinh/Tẩy rửa",
    key: "e",
    shelf_id: 13,
    positions: [
      [18, 3],
      [18, 4],
      [18, 5],
      [18, 6],
      [18, 7],
      [19, 3],
      [19, 4],
      [19, 5],
      [19, 6],
      [19, 7],
      [20, 3],
      [20, 4],
      [20, 5],
      [20, 6],
      [20, 7],
    ],
    color: [0, 255, 127],
    description: "Kệ 13: Chất tẩy rửa, vệ sinh",
  },
  thu_cung: {
    name: "Thú cưng",
    key: "r",
    shelf_id: 14,
    positions: [
      [18, 11],
      [18, 12],
      [18, 13],
      [18, 14],
      [18, 15],
      [19, 11],
      [19, 12],
      [19, 13],
      [19, 14],
      [19, 15],
      [20, 11],
      [20, 12],
      [20, 13],
      [20, 14],
      [20, 15],
    ],
    color: [210, 180, 140],
    description: "Kệ 14: Thức ăn, đồ dùng thú cưng",
  },
  dien_tu: {
    name: "Điện tử",
    key: "t",
    shelf_id: 15,
    positions: [
      [18, 19],
      [18, 20],
      [18, 21],
      [18, 22],
      [18, 23],
      [19, 19],
      [19, 20],
      [19, 21],
      [19, 22],
      [19, 23],
      [20, 19],
      [20, 20],
      [20, 21],
      [20, 22],
      [20, 23],
    ],
    color: [64, 64, 64],
    description: "Kệ 15: Điện tử, phụ kiện",
  },
  sach_vpham: {
    name: "Sách/Văn phòng phẩm",
    key: "y",
    shelf_id: 16,
    positions: [
      [18, 27],
      [18, 28],
      [18, 29],
      [18, 30],
      [18, 31],
      [19, 27],
      [19, 28],
      [19, 29],
      [19, 30],
      [19, 31],
      [20, 27],
      [20, 28],
      [20, 29],
      [20, 30],
      [20, 31],
    ],
    color: [160, 82, 45],
    description: "Kệ 16: Sách, văn phòng phẩm",
  },
  do_choi: {
    name: "Đồ chơi",
    key: "u",
    shelf_id: 17,
    positions: [
      [23, 3],
      [23, 4],
      [23, 5],
      [23, 6],
      [23, 7],
      [24, 3],
      [24, 4],
      [24, 5],
      [24, 6],
      [24, 7],
      [25, 3],
      [25, 4],
      [25, 5],
      [25, 6],
      [25, 7],
    ],
    color: [255, 69, 0],
    description: "Kệ 17: Đồ chơi trẻ em",
  },
  the_thao: {
    name: "Thể thao",
    key: "i",
    shelf_id: 18,
    positions: [
      [23, 11],
      [23, 12],
      [23, 13],
      [23, 14],
      [23, 15],
      [24, 11],
      [24, 12],
      [24, 13],
      [24, 14],
      [24, 15],
      [25, 11],
      [25, 12],
      [25, 13],
      [25, 14],
      [25, 15],
    ],
    color: [34, 139, 34],
    description: "Kệ 18: Dụng cụ thể thao",
  },
  hang_mua: {
    name: "Hàng theo mùa",
    key: "o",
    shelf_id: 19,
    positions: [
      [23, 19],
      [23, 20],
      [23, 21],
      [23, 22],
      [23, 23],
      [24, 19],
      [24, 20],
      [24, 21],
      [24, 22],
      [24, 23],
      [25, 19],
      [25, 20],
      [25, 21],
      [25, 22],
      [25, 23],
    ],
    color: [255, 215, 0],
    description: "Kệ 19: Hàng theo mùa, lễ hội",
  },
  banh_mi: {
    name: "Bánh mì",
    key: "p",
    shelf_id: 20,
    positions: [
      [23, 27],
      [23, 28],
      [23, 29],
      [23, 30],
      [23, 31],
      [24, 27],
      [24, 28],
      [24, 29],
      [24, 30],
      [24, 31],
      [25, 27],
      [25, 28],
      [25, 29],
      [25, 30],
      [25, 31],
    ],
    color: [139, 69, 19],
    description: "Kệ 20: Bánh mì, bánh ngọt",
  },
}

// Sample Products Data
let products = [
  {
    id: 1,
    name: "Sữa tươi TH True Milk",
    category: "sua_nuoc",
    price: 25000,
    quantity: 50,
    status: "available",
    description: "Sữa tươi nguyên chất 1L",
  },
  {
    id: 2,
    name: "Gạo ST25",
    category: "gao_muoi",
    price: 180000,
    quantity: 20,
    status: "available",
    description: "Gạo thơm ST25 túi 5kg",
  },
  {
    id: 3,
    name: "Bánh quy Oreo",
    category: "banh_keo",
    price: 35000,
    quantity: 5,
    status: "low_stock",
    description: "Bánh quy Oreo vị socola",
  },
  {
    id: 4,
    name: "Mì tôm Hảo Hảo",
    category: "mi_tom",
    price: 4500,
    quantity: 0,
    status: "out_of_stock",
    description: "Mì tôm chua cay",
  },
  {
    id: 5,
    name: "Cà rốt",
    category: "rau_cu",
    price: 15000,
    quantity: 30,
    status: "available",
    description: "Cà rốt tươi 1kg",
  },
  {
    id: 6,
    name: "Thịt bò úc",
    category: "thit_ca",
    price: 350000,
    quantity: 15,
    status: "available",
    description: "Thịt bò úc cao cấp 1kg",
  },
  {
    id: 7,
    name: "Bia Heineken",
    category: "do_uong",
    price: 22000,
    quantity: 8,
    status: "low_stock",
    description: "Bia Heineken lon 330ml",
  },
  {
    id: 8,
    name: "Tôm đông lạnh",
    category: "dong_lanh",
    price: 180000,
    quantity: 25,
    status: "available",
    description: "Tôm sú đông lạnh 500g",
  },
]

let currentEditingProduct = null

// DOM Elements
const navItems = document.querySelectorAll(".nav-item")
const tabContents = document.querySelectorAll(".tab-content")
const pageTitle = document.querySelector(".page-title")
const menuToggle = document.querySelector(".menu-toggle")
const sidebar = document.querySelector(".sidebar")
const productModal = document.getElementById("productModal")
const addProductBtn = document.getElementById("addProductBtn")
const modalClose = document.querySelector(".modal-close")
const cancelBtn = document.getElementById("cancelBtn")
const saveBtn = document.getElementById("saveBtn")
const productForm = document.getElementById("productForm")

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  setupEventListeners()
  updateDashboard()
  renderProductsTable()
  initializeMap()
  populateFilters()
  setupSearch()
})

function initializeApp() {
  // Set active tab
  showTab("dashboard")

  // Initialize dark mode
  const darkModeToggle = document.getElementById("darkModeToggle")
  if (darkModeToggle) {
    darkModeToggle.addEventListener("change", toggleDarkMode)
  }

  // Initialize enhanced systems
  if (typeof authSystem !== "undefined") {
    authSystem.checkAuthStatus()
  }

  if (typeof enhancedMapSystem !== "undefined") {
    enhancedMapSystem.createEnhancedLegend()
  }
}

function setupEventListeners() {
  // Navigation
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const tabName = item.dataset.tab
      showTab(tabName)
    })
  })

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active")
    })
  }

  // Product modal
  if (addProductBtn) addProductBtn.addEventListener("click", () => openProductModal())
  if (modalClose) modalClose.addEventListener("click", () => closeProductModal())
  if (cancelBtn) cancelBtn.addEventListener("click", () => closeProductModal())
  if (saveBtn) saveBtn.addEventListener("click", () => saveProduct())

  // Global search
  const globalSearch = document.getElementById("globalSearch")
  if (globalSearch) {
    globalSearch.addEventListener("input", handleGlobalSearch)
  }

  // Product filters
  const categoryFilter = document.getElementById("categoryFilter")
  const shelfFilter = document.getElementById("shelfFilter")
  const productSearch = document.getElementById("productSearch")

  if (categoryFilter) categoryFilter.addEventListener("change", filterProducts)
  if (shelfFilter) shelfFilter.addEventListener("change", filterProducts)
  if (productSearch) productSearch.addEventListener("input", filterProducts)

  // Advanced search
  const advancedSearchBtn = document.getElementById("advancedSearchBtn")
  if (advancedSearchBtn) {
    advancedSearchBtn.addEventListener("click", performAdvancedSearch)
  }

  // Map controls
  const resetMapBtn = document.getElementById("resetMapBtn")
  const toggleGridBtn = document.getElementById("toggleGridBtn")

  if (resetMapBtn) resetMapBtn.addEventListener("click", resetMap)
  if (toggleGridBtn) toggleGridBtn.addEventListener("click", toggleGrid)

  /* ----------- Advanced Filters (new UI) ----------- */
  /* Khối bộ lọc nâng cao đã được di chuyển vào lớp EnhancedSearchSystem nên phần dưới được vô hiệu hóa để tránh trùng lặp. */
  // const filterToggleBtn = ... (đã di chuyển)
  // const applyFiltersBtn = ...

  // Populate select options for category and shelf
  // this.populateFilterSelects() // Đã chuyển vào EnhancedSearchSystem

  // Sort results
  const sortSelect = document.getElementById("sortResults")
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => this.sortResults(e.target.value))
  }

  const sortOptionSelect = document.getElementById("sortOption")
  if (sortOptionSelect) {
    sortOptionSelect.addEventListener("change", (e) => {
      const value = e.target.value
      let sortKey = ""
      switch (value) {
        case "price_asc":
          sortKey = "price"
          break
        case "price_desc":
          sortKey = "price-desc"
          break
        case "quantity_asc":
          sortKey = "quantity"
          break
        case "quantity_desc":
          sortKey = "quantity-desc"
          break
        default:
          sortKey = ""
      }
      if (sortKey) this.sortResults(sortKey)
    })
  }
}

function showTab(tabName) {
  // Update navigation
  navItems.forEach((item) => {
    item.classList.remove("active")
    if (item.dataset.tab === tabName) {
      item.classList.add("active")
    }
  })

  // Update content
  tabContents.forEach((content) => {
    content.classList.remove("active")
    if (content.id === tabName) {
      content.classList.add("active")
    }
  })

  // Update page title
  const titles = {
    dashboard: "Dashboard",
    products: "Quản Lý Sản Phẩm",
    map: "Bản Đồ Siêu Thị",
    search: "Tìm Kiếm & Lọc",
    analytics: "Thống Kê",
    settings: "Cài Đặt",
  }
  if (pageTitle) pageTitle.textContent = titles[tabName] || "Dashboard"

  // Initialize tab-specific content
  if (tabName === "map") {
    setTimeout(() => initializeMap(), 100)
  } else if (tabName === "analytics") {
    setTimeout(() => initializeCharts(), 100)
  }
}

function updateDashboard() {
  // Update stats
  const totalProductsEl = document.getElementById("totalProducts")
  const totalCategoriesEl = document.getElementById("totalCategories")
  const totalShelvesEl = document.getElementById("totalShelves")
  const occupancyRateEl = document.getElementById("occupancyRate")

  if (totalProductsEl) totalProductsEl.textContent = products.length
  if (totalCategoriesEl) totalCategoriesEl.textContent = Object.keys(PRODUCT_CATEGORIES).length
  if (totalShelvesEl) totalShelvesEl.textContent = Object.keys(PRODUCT_CATEGORIES).length

  const availableProducts = products.filter((p) => p.status === "available").length
  const occupancyRate = Math.round((availableProducts / products.length) * 100) || 0
  if (occupancyRateEl) occupancyRateEl.textContent = occupancyRate + "%"

  // Update popular categories
  updatePopularCategories()

  // Update recent activity
  updateRecentActivity()
}

function updatePopularCategories() {
  const categoryCount = {}
  products.forEach((product) => {
    categoryCount[product.category] = (categoryCount[product.category] || 0) + 1
  })

  const sortedCategories = Object.entries(categoryCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const container = document.getElementById("popularCategories")
  if (container) {
    container.innerHTML = sortedCategories
      .map(([categoryKey, count]) => {
        const category = PRODUCT_CATEGORIES[categoryKey]
        return `
          <div class="category-item" style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #f3f4f6;">
              <span>${category ? category.name : categoryKey}</span>
              <span style="font-weight: 600; color: #667eea;">${count}</span>
          </div>
        `
      })
      .join("")
  }
}

function updateRecentActivity() {
  const activities = [
    { action: "Thêm sản phẩm", item: "Sữa tươi TH True Milk", time: "2 phút trước" },
    { action: "Cập nhật kho", item: "Bánh quy Oreo", time: "15 phút trước" },
    { action: "Xóa sản phẩm", item: "Nước ngọt Coca Cola", time: "1 giờ trước" },
    { action: "Thêm danh mục", item: "Đồ uống năng lượng", time: "2 giờ trước" },
  ]

  const container = document.getElementById("recentActivity")
  if (container) {
    container.innerHTML = activities
      .map(
        (activity) => `
        <div class="activity-item" style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #f3f4f6;">
            <div>
                <div style="font-weight: 500;">${activity.action}</div>
                <div style="font-size: 0.875rem; color: #64748b;">${activity.item}</div>
            </div>
            <div style="font-size: 0.75rem; color: #64748b;">${activity.time}</div>
        </div>
      `,
      )
      .join("")
  }
}

function renderProductsTable() {
  const tbody = document.getElementById("productsTableBody")
  if (!tbody) return

  tbody.innerHTML = products
    .map((product) => {
      const category = PRODUCT_CATEGORIES[product.category]
      const statusClass = `status-${product.status.replace("_", "-")}`
      const statusText = {
        available: "Có sẵn",
        low_stock: "Sắp hết",
        out_of_stock: "Hết hàng",
      }

      return `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${category ? category.name : product.category}</td>
            <td>Kệ ${category ? category.shelf_id : "N/A"}</td>
            <td>${category ? `(${category.positions[0][0]}, ${category.positions[0][1]})` : "N/A"}</td>
            <td>${formatCurrency(product.price)}</td>
            <td>${product.quantity}</td>
            <td><span class="status-badge ${statusClass}">${statusText[product.status]}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="editProduct(${product.id})" title="Sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteProduct(${product.id})" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
      `
    })
    .join("")

  // Update charts and map
  if (typeof chartsSystem !== "undefined") {
    chartsSystem.updateCharts()
  }

  if (typeof enhancedMapSystem !== "undefined") {
    enhancedMapSystem.updateLegendProductCounts()
  }
}

function populateFilters() {
  // Category filters
  const categorySelects = [
    document.getElementById("categoryFilter"),
    document.getElementById("productCategory"),
    document.getElementById("advancedCategory"),
  ]

  categorySelects.forEach((select) => {
    if (select) {
      const isMultiple = select.hasAttribute("multiple")
      if (!isMultiple) {
        select.innerHTML = '<option value="">Tất cả danh mục</option>'
      } else {
        select.innerHTML = ""
      }

      Object.entries(PRODUCT_CATEGORIES).forEach(([key, category]) => {
        const option = document.createElement("option")
        option.value = key
        option.textContent = category.name
        select.appendChild(option)
      })
    }
  })

  // Shelf filter
  const shelfFilter = document.getElementById("shelfFilter")
  if (shelfFilter) {
    shelfFilter.innerHTML = '<option value="">Tất cả kệ</option>'
    Object.values(PRODUCT_CATEGORIES).forEach((category) => {
      const option = document.createElement("option")
      option.value = category.shelf_id
      option.textContent = `Kệ ${category.shelf_id}`
      shelfFilter.appendChild(option)
    })
  }
}

function filterProducts() {
  const categoryFilter = document.getElementById("categoryFilter")
  const shelfFilter = document.getElementById("shelfFilter")
  const productSearch = document.getElementById("productSearch")

  if (!categoryFilter || !shelfFilter || !productSearch) return

  const categoryValue = categoryFilter.value
  const shelfValue = shelfFilter.value
  const searchTerm = productSearch.value.toLowerCase()

  const filteredProducts = products.filter((product) => {
    const category = PRODUCT_CATEGORIES[product.category]
    const matchesCategory = !categoryValue || product.category === categoryValue
    const matchesShelf = !shelfValue || (category && category.shelf_id.toString() === shelfValue)
    const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm)

    return matchesCategory && matchesShelf && matchesSearch
  })

  // Re-render table with filtered products
  const tbody = document.getElementById("productsTableBody")
  if (!tbody) return

  tbody.innerHTML = filteredProducts
    .map((product) => {
      const category = PRODUCT_CATEGORIES[product.category]
      const statusClass = `status-${product.status.replace("_", "-")}`
      const statusText = {
        available: "Có sẵn",
        low_stock: "Sắp hết",
        out_of_stock: "Hết hàng",
      }

      return `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${category ? category.name : product.category}</td>
            <td>Kệ ${category ? category.shelf_id : "N/A"}</td>
            <td>${category ? `(${category.positions[0][0]}, ${category.positions[0][1]})` : "N/A"}</td>
            <td>${formatCurrency(product.price)}</td>
            <td>${product.quantity}</td>
            <td><span class="status-badge ${statusClass}">${statusText[product.status]}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="editProduct(${product.id})" title="Sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteProduct(${product.id})" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
      `
    })
    .join("")
}

function openProductModal(product = null) {
  currentEditingProduct = product
  const modal = document.getElementById("productModal")
  const modalTitle = document.getElementById("modalTitle")
  const form = document.getElementById("productForm")

  if (!modal || !modalTitle || !form) return

  if (product) {
    modalTitle.textContent = "Sửa Sản Phẩm"
    const productName = document.getElementById("productName")
    const productCategory = document.getElementById("productCategory")
    const productPrice = document.getElementById("productPrice")
    const productQuantity = document.getElementById("productQuantity")
    const productDescription = document.getElementById("productDescription")

    if (productName) productName.value = product.name
    if (productCategory) productCategory.value = product.category
    if (productPrice) productPrice.value = product.price
    if (productQuantity) productQuantity.value = product.quantity
    if (productDescription) productDescription.value = product.description || ""
  } else {
    modalTitle.textContent = "Thêm Sản Phẩm"
    form.reset()
  }

  modal.classList.add("active")
}

function closeProductModal() {
  const modal = document.getElementById("productModal")
  if (modal) {
    modal.classList.remove("active")
  }
  currentEditingProduct = null
}

function saveProduct() {
  const productName = document.getElementById("productName")
  const productCategory = document.getElementById("productCategory")
  const productPrice = document.getElementById("productPrice")
  const productQuantity = document.getElementById("productQuantity")
  const productDescription = document.getElementById("productDescription")

  if (!productName || !productCategory || !productPrice || !productQuantity) return

  const name = productName.value
  const category = productCategory.value
  const price = Number.parseInt(productPrice.value)
  const quantity = Number.parseInt(productQuantity.value)
  const description = productDescription ? productDescription.value : ""

  if (!name || !category || !price || quantity === undefined) {
    alert("Vui lòng điền đầy đủ thông tin bắt buộc!")
    return
  }

  let status = "available"
  if (quantity === 0) status = "out_of_stock"
  else if (quantity <= 10) status = "low_stock"

  if (currentEditingProduct) {
    // Update existing product
    const index = products.findIndex((p) => p.id === currentEditingProduct.id)
    if (index !== -1) {
      products[index] = {
        ...products[index],
        name,
        category,
        price,
        quantity,
        status,
        description,
      }
    }
  } else {
    // Add new product
    const newProduct = {
      id: Math.max(...products.map((p) => p.id), 0) + 1,
      name,
      category,
      price,
      quantity,
      status,
      description,
    }
    products.push(newProduct)
  }

  renderProductsTable()
  updateDashboard()
  closeProductModal()
}

function editProduct(id) {
  const product = products.find((p) => p.id === id)
  if (product) {
    openProductModal(product)
  }
}

function deleteProduct(id) {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
    products = products.filter((p) => p.id !== id)
    renderProductsTable()
    updateDashboard()
  }
}

function handleGlobalSearch(event) {
  const searchTerm = event.target.value.toLowerCase()
  if (searchTerm.length < 2) return

  const results = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      PRODUCT_CATEGORIES[product.category]?.name.toLowerCase().includes(searchTerm),
  )

  // Show search suggestions (you can implement a dropdown here)
  console.log("Search results:", results)
}

function performAdvancedSearch() {
  const advancedProductName = document.getElementById("advancedProductName")
  const advancedCategory = document.getElementById("advancedCategory")
  const minPrice = document.getElementById("minPrice")
  const maxPrice = document.getElementById("maxPrice")
  const advancedStatus = document.getElementById("advancedStatus")

  if (!advancedProductName || !advancedCategory || !minPrice || !maxPrice || !advancedStatus) return

  const name = advancedProductName.value.toLowerCase()
  const categories = Array.from(advancedCategory.selectedOptions).map((o) => o.value)
  const minPriceValue = Number.parseInt(minPrice.value) || 0
  const maxPriceValue = Number.parseInt(maxPrice.value) || Number.POSITIVE_INFINITY
  const status = advancedStatus.value

  const results = products.filter((product) => {
    const matchesName = !name || product.name.toLowerCase().includes(name)
    const matchesCategory = categories.length === 0 || categories.includes(product.category)
    const matchesPrice = product.price >= minPriceValue && product.price <= maxPriceValue
    const matchesStatus = !status || product.status === status

    return matchesName && matchesCategory && matchesPrice && matchesStatus
  })

  displaySearchResults(results)
}

function displaySearchResults(results) {
  const container = document.getElementById("searchResults")
  if (!container) return

  if (results.length === 0) {
    container.innerHTML = "<p>Không tìm thấy sản phẩm nào phù hợp.</p>"
    return
  }

  container.innerHTML = `
    <h3>Kết quả tìm kiếm (${results.length} sản phẩm)</h3>
    <div class="search-results-grid">
        ${results
          .map((product) => {
            const category = PRODUCT_CATEGORIES[product.category]
            return `
                <div class="search-result-card" style="background: white; padding: 1rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h4>${product.name}</h4>
                    <p><strong>Danh mục:</strong> ${category ? category.name : product.category}</p>
                    <p><strong>Giá:</strong> ${formatCurrency(product.price)}</p>
                    <p><strong>Số lượng:</strong> ${product.quantity}</p>
                    <p><strong>Vị trí:</strong> Kệ ${category ? category.shelf_id : "N/A"}</p>
                </div>
            `
          })
          .join("")}
    </div>
  `
}

function initializeMap() {
  if (typeof enhancedMapSystem !== "undefined") {
    enhancedMapSystem.render()
    enhancedMapSystem.createEnhancedLegend()
  } else {
    // Fallback to original map code
    const canvas = document.getElementById("supermarketMap")
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const cellSize = 20
    const mapWidth = 35
    const mapHeight = 28

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1

    for (let x = 0; x <= mapWidth; x++) {
      ctx.beginPath()
      ctx.moveTo(x * cellSize, 0)
      ctx.lineTo(x * cellSize, mapHeight * cellSize)
      ctx.stroke()
    }

    for (let y = 0; y <= mapHeight; y++) {
      ctx.beginPath()
      ctx.moveTo(0, y * cellSize)
      ctx.lineTo(mapWidth * cellSize, y * cellSize)
      ctx.stroke()
    }

    // Draw categories
    Object.entries(PRODUCT_CATEGORIES).forEach(([key, category]) => {
      const [r, g, b] = category.color
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`

      category.positions.forEach(([row, col]) => {
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
      })
    })

    // Create legend
    createMapLegend()

    // Add click handler for map interaction
    canvas.addEventListener("click", handleMapClick)
  }
}

function createMapLegend() {
  const legendContainer = document.getElementById("mapLegend")
  if (!legendContainer) return

  legendContainer.innerHTML = Object.entries(PRODUCT_CATEGORIES)
    .map(([key, category]) => {
      const [r, g, b] = category.color
      return `
        <div class="legend-item">
            <div class="legend-color" style="background-color: rgb(${r}, ${g}, ${b});"></div>
            <div>
                <div style="font-weight: 500;">${category.name}</div>
                <div style="font-size: 0.75rem; color: #64748b;">Kệ ${category.shelf_id}</div>
            </div>
        </div>
      `
    })
    .join("")
}

function handleMapClick(event) {
  const canvas = event.target
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const cellSize = 20
  const col = Math.floor(x / cellSize)
  const row = Math.floor(y / cellSize)

  // Find which category this position belongs to
  const category = Object.entries(PRODUCT_CATEGORIES).find(([key, cat]) =>
    cat.positions.some(([r, c]) => r === row && c === col),
  )

  if (category) {
    const [key, cat] = category
    alert(`Vị trí: (${row}, ${col})\nDanh mục: ${cat.name}\nKệ: ${cat.shelf_id}\nMô tả: ${cat.description}`)
  }
}

function resetMap() {
  initializeMap()
}

function toggleGrid() {
  // This would toggle grid visibility - implementation depends on your needs
  console.log("Toggle grid functionality")
}

function initializeCharts() {
  if (typeof chartsSystem !== "undefined") {
    chartsSystem.initializeAllCharts()
  } else {
    // Fallback code
    const categoryChart = document.getElementById("categoryChart")
    const shelfChart = document.getElementById("shelfChart")

    if (categoryChart) {
      const ctx = categoryChart.getContext("2d")
      ctx.fillStyle = "#667eea"
      ctx.fillRect(10, 10, 100, 100)
      ctx.fillStyle = "white"
      ctx.font = "14px Inter"
      ctx.fillText("Category Chart", 20, 60)
    }

    if (shelfChart) {
      const ctx = shelfChart.getContext("2d")
      ctx.fillStyle = "#f093fb"
      ctx.fillRect(10, 10, 100, 100)
      ctx.fillStyle = "white"
      ctx.font = "14px Inter"
      ctx.fillText("Shelf Chart", 20, 60)
    }
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode")
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"))
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount)
}

// Setup search functionality
function setupSearch() {
  const searchInputs = document.querySelectorAll('input[type="text"]')
  searchInputs.forEach((input) => {
    if (input.placeholder && input.placeholder.includes("Tìm kiếm")) {
      input.addEventListener(
        "input",
        debounce(function () {
          // Implement real-time search
          console.log("Searching for:", this.value)
        }, 300),
      )
    }
  })
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Load saved settings
document.addEventListener("DOMContentLoaded", () => {
  const savedDarkMode = localStorage.getItem("darkMode")
  if (savedDarkMode === "true") {
    document.body.classList.add("dark-mode")
    const toggle = document.getElementById("darkModeToggle")
    if (toggle) toggle.checked = true
  }
})

// Enhanced Search System
class EnhancedSearchSystem {
  constructor() {
    this.selectedCategories = new Set()
    this.searchResults = []
    this.currentView = "grid"
    this.isVoiceSearchActive = false
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.populateCategoryGrid()
    this.updateSearchStats()
  }

  setupEventListeners() {
    // Quick search
    const quickSearchInput = document.getElementById("quickSearchInput")
    if (quickSearchInput) {
      quickSearchInput.addEventListener("input", (e) => this.handleQuickSearch(e))
      quickSearchInput.addEventListener("focus", () => this.showSuggestions())
      quickSearchInput.addEventListener("blur", () => {
        setTimeout(() => this.hideSuggestions(), 200)
      })
    }

    // Clear search
    const clearSearchBtn = document.getElementById("clearQuickSearch")
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener("click", () => this.clearQuickSearch())
    }

    // Voice search
    const voiceSearchBtn = document.getElementById("voiceSearchBtn")
    if (voiceSearchBtn) {
      voiceSearchBtn.addEventListener("click", () => this.toggleVoiceSearch())
    }

    // Toggle filters
    const toggleFiltersBtn = document.getElementById("toggleFiltersBtn")
    if (toggleFiltersBtn) {
      toggleFiltersBtn.addEventListener("click", () => this.toggleFilters())
    }

    // Category search
    const categorySearchInput = document.getElementById("categorySearchInput")
    if (categorySearchInput) {
      categorySearchInput.addEventListener("input", (e) => this.filterCategories(e.target.value))
    }

    // Category actions
    const selectAllBtn = document.getElementById("selectAllCategories")
    const clearAllBtn = document.getElementById("clearAllCategories")
    if (selectAllBtn) selectAllBtn.addEventListener("click", () => this.selectAllCategories())
    if (clearAllBtn) clearAllBtn.addEventListener("click", () => this.clearAllCategories())

    // Price presets
    document.querySelectorAll(".price-preset-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => this.applyPricePreset(e.target))
    })

    // Quantity slider
    const quantitySlider = document.getElementById("quantityRange")
    if (quantitySlider) {
      quantitySlider.addEventListener("input", (e) => this.updateQuantityValue(e.target.value))
    }

    // Filter actions
    const advancedSearchBtn = document.getElementById("advancedSearchBtn")
    const resetFiltersBtn = document.getElementById("resetFiltersBtn")
    const saveFiltersBtn = document.getElementById("saveFiltersBtn")

    if (advancedSearchBtn) advancedSearchBtn.addEventListener("click", () => this.performAdvancedSearch())
    if (resetFiltersBtn) resetFiltersBtn.addEventListener("click", () => this.resetFilters())
    if (saveFiltersBtn) saveFiltersBtn.addEventListener("click", () => this.saveFilters())

    // View toggle
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => this.changeView(e.target.dataset.view))
    })

    // Sort results
    const sortSelect = document.getElementById("sortResults")
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => this.sortResults(e.target.value))
    }

    // ----------- Advanced Filters (new UI) -------------
    const filterToggleBtn2 = document.getElementById("toggleFilterPanel")
    const filterPanel2 = document.getElementById("advancedFilters")
    if (filterToggleBtn2 && filterPanel2) {
      filterToggleBtn2.addEventListener("click", () => {
        const isHidden = filterPanel2.style.display === "none"
        filterPanel2.style.display = isHidden ? "block" : "none"
        filterToggleBtn2.classList.toggle("active", isHidden)
      })
    }

    const applyFiltersBtn2 = document.getElementById("applyFiltersBtn")
    const clearFiltersBtn2 = document.getElementById("clearFiltersBtn")
    if (applyFiltersBtn2) {
      applyFiltersBtn2.addEventListener("click", () => {
        const query = document.getElementById("quickSearchInput")?.value || ""
        this.performQuickSearch(query)
      })
    }

    if (clearFiltersBtn2) {
      clearFiltersBtn2.addEventListener("click", () => {
        document.getElementById("filterCategory")?.selectedOptions?.forEach((o) => (o.selected = false))
        document.getElementById("filterShelf")?.selectedOptions?.forEach((o) => (o.selected = false))
        const statusSel2 = document.getElementById("filterStatus")
        if (statusSel2) statusSel2.value = ""
        const min2 = document.getElementById("filterPriceMin")
        const max2 = document.getElementById("filterPriceMax")
        if (min2) min2.value = ""
        if (max2) max2.value = ""
        const query = document.getElementById("quickSearchInput")?.value || ""
        this.performQuickSearch(query)
      })
    }

    // Initialize filter selects
    this.populateFilterSelects()
  }

  populateCategoryGrid() {
    const categoryGrid = document.getElementById("categoryGrid")
    if (!categoryGrid) return

    categoryGrid.innerHTML = Object.entries(PRODUCT_CATEGORIES)
      .map(([key, category]) => {
        const [r, g, b] = category.color
        const productCount = products.filter((p) => p.category === key).length

        return `
        <div class="category-item" data-category="${key}">
          <div class="category-color" style="background-color: rgb(${r}, ${g}, ${b});"></div>
          <div class="category-info">
            <div class="category-name">${category.name}</div>
            <div class="category-details">
              <span>Kệ ${category.shelf_id}</span>
              <span>${productCount} SP</span>
            </div>
          </div>
          <div class="category-checkbox"></div>
        </div>
      `
      })
      .join("")

    // Add click handlers
    categoryGrid.querySelectorAll(".category-item").forEach((item) => {
      item.addEventListener("click", () => this.toggleCategory(item.dataset.category))
    })
  }

  updateSearchStats() {
    const totalProducts = products.length
    const resultCount = this.searchResults.length

    const totalSearchableProducts = document.getElementById("totalSearchableProducts")
    const searchResultCount = document.getElementById("searchResultCount")

    if (totalSearchableProducts) totalSearchableProducts.textContent = totalProducts
    if (searchResultCount) searchResultCount.textContent = resultCount
  }

  handleQuickSearch(event) {
    const searchTerm = event.target.value.toLowerCase()
    const clearBtn = document.getElementById("clearQuickSearch")

    if (searchTerm.length > 0) {
      if (clearBtn) clearBtn.style.display = "block"
      this.showSuggestions(searchTerm)

      if (searchTerm.length >= 2) {
        this.performQuickSearch(searchTerm)
      }
    } else {
      if (clearBtn) clearBtn.style.display = "none"
      this.hideSuggestions()
      this.clearResults()
    }
  }

  showSuggestions(searchTerm = "") {
    const suggestionsContainer = document.getElementById("searchSuggestions")
    if (!suggestionsContainer) return

    if (searchTerm.length < 2) {
      this.hideSuggestions()
      return
    }

    const suggestions = products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          PRODUCT_CATEGORIES[product.category]?.name.toLowerCase().includes(searchTerm),
      )
      .slice(0, 5)
      .map(
        (product) => `
        <div class="suggestion-item" data-product-id="${product.id}">
          <strong>${this.highlightMatch(product.name, searchTerm)}</strong>
          <small> - ${PRODUCT_CATEGORIES[product.category]?.name || product.category}</small>
        </div>
      `,
      )

    if (suggestions.length > 0) {
      suggestionsContainer.innerHTML = suggestions.join("")
      suggestionsContainer.style.display = "block"

      // Add click handlers
      suggestionsContainer.querySelectorAll(".suggestion-item").forEach((item) => {
        item.addEventListener("click", () => {
          const productId = Number.parseInt(item.dataset.productId)
          this.selectSuggestion(productId)
        })
      })
    } else {
      this.hideSuggestions()
    }
  }

  hideSuggestions() {
    const suggestionsContainer = document.getElementById("searchSuggestions")
    if (suggestionsContainer) {
      suggestionsContainer.style.display = "none"
    }
  }

  highlightMatch(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, "gi")
    return text.replace(regex, "<mark>$1</mark>")
  }

  selectSuggestion(productId) {
    const product = products.find((p) => p.id === productId)
    if (product) {
      const quickSearchInput = document.getElementById("quickSearchInput")
      if (quickSearchInput) {
        quickSearchInput.value = product.name
        this.hideSuggestions()
        this.performQuickSearch(product.name.toLowerCase())
      }
    }
  }

  clearQuickSearch() {
    const quickSearchInput = document.getElementById("quickSearchInput")
    const clearQuickSearch = document.getElementById("clearQuickSearch")

    if (quickSearchInput) quickSearchInput.value = ""
    if (clearQuickSearch) clearQuickSearch.style.display = "none"
    this.hideSuggestions()
    this.clearResults()
  }

  toggleVoiceSearch() {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      if (typeof Swal !== "undefined") {
        Swal.fire({
          icon: "error",
          title: "Không hỗ trợ",
          text: "Trình duyệt của bạn không hỗ trợ tìm kiếm bằng giọng nói",
        })
      } else {
        alert("Trình duyệt của bạn không hỗ trợ tìm kiếm bằng giọng nói")
      }
      return
    }

    const voiceBtn = document.getElementById("voiceSearchBtn")

    if (this.isVoiceSearchActive) {
      this.stopVoiceSearch()
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = "vi-VN"
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      this.isVoiceSearchActive = true
      if (voiceBtn) {
        voiceBtn.classList.add("recording")
        voiceBtn.innerHTML = '<i class="fas fa-stop"></i>'
      }
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      const quickSearchInput = document.getElementById("quickSearchInput")
      if (quickSearchInput) {
        quickSearchInput.value = transcript
        this.handleQuickSearch({ target: { value: transcript } })
      }
    }

    recognition.onend = () => {
      this.stopVoiceSearch()
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      this.stopVoiceSearch()
    }

    recognition.start()
    this.recognition = recognition
  }

  stopVoiceSearch() {
    this.isVoiceSearchActive = false
    const voiceBtn = document.getElementById("voiceSearchBtn")
    if (voiceBtn) {
      voiceBtn.classList.remove("recording")
      voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>'
    }

    if (this.recognition) {
      this.recognition.stop()
    }
  }

  toggleFilters() {
    const filtersContent = document.getElementById("filtersContent")
    const toggleBtn = document.getElementById("toggleFiltersBtn")

    if (!filtersContent || !toggleBtn) return

    if (filtersContent.classList.contains("collapsed")) {
      filtersContent.classList.remove("collapsed")
      toggleBtn.classList.remove("collapsed")
      const span = toggleBtn.querySelector("span")
      if (span) span.textContent = "Thu gọn"
    } else {
      filtersContent.classList.add("collapsed")
      toggleBtn.classList.add("collapsed")
      const span = toggleBtn.querySelector("span")
      if (span) span.textContent = "Mở rộng"
    }
  }

  filterCategories(searchTerm) {
    const categoryItems = document.querySelectorAll(".category-item")

    categoryItems.forEach((item) => {
      const categoryName = item.querySelector(".category-name")
      if (categoryName) {
        const isVisible = categoryName.textContent.toLowerCase().includes(searchTerm.toLowerCase())
        item.style.display = isVisible ? "flex" : "none"
      }
    })
  }

  toggleCategory(categoryKey) {
    const categoryItem = document.querySelector(`[data-category="${categoryKey}"]`)

    if (this.selectedCategories.has(categoryKey)) {
      this.selectedCategories.delete(categoryKey)
      if (categoryItem) categoryItem.classList.remove("selected")
    } else {
      this.selectedCategories.add(categoryKey)
      if (categoryItem) categoryItem.classList.add("selected")
    }
  }

  selectAllCategories() {
    Object.keys(PRODUCT_CATEGORIES).forEach((key) => {
      this.selectedCategories.add(key)
      const item = document.querySelector(`[data-category="${key}"]`)
      if (item) item.classList.add("selected")
    })
  }

  clearAllCategories() {
    this.selectedCategories.clear()
    document.querySelectorAll(".category-item").forEach((item) => {
      item.classList.remove("selected")
    })
  }

  applyPricePreset(button) {
    const minPrice = button.dataset.min
    const maxPrice = button.dataset.max

    const minPriceInput = document.getElementById("minPrice")
    const maxPriceInput = document.getElementById("maxPrice")

    if (minPriceInput) minPriceInput.value = minPrice || ""
    if (maxPriceInput) maxPriceInput.value = maxPrice || ""

    // Update active state
    document.querySelectorAll(".price-preset-btn").forEach((btn) => {
      btn.classList.remove("active")
    })
    button.classList.add("active")
  }

  updateQuantityValue(value) {
    const quantityValue = document.getElementById("quantityValue")
    if (quantityValue) {
      quantityValue.textContent = value === "0" ? "0+" : `${value}+`
    }
  }

  performQuickSearch(searchTerm) {
    // Tạo Fuse.js instance nếu chưa có hoặc dữ liệu thay đổi
    if (!this.fuse || this.fuse._docs?.length !== products.length) {
      this.fuse = new Fuse(products, {
        keys: [
          {
            name: "name",
            weight: 0.6,
          },
          {
            name: "category",
            weight: 0.3,
          },
          {
            name: "description",
            weight: 0.1,
          },
        ],
        threshold: 0.35,
        includeScore: true,
        useExtendedSearch: true,
      })
    }

    let results = []
    const query = searchTerm.trim()
    if (query) {
      results = this.fuse.search(query).map((r) => r.item)
    } else {
      results = [...products]
    }

    // Áp dụng bộ lọc nâng cao
    results = this.applyFilters(results)

    this.displayResults(results, query ? `Kết quả cho "${query}"` : "Tất cả sản phẩm")
  }

  performAdvancedSearch() {
    const filters = this.getFilterValues()

    const results = products.filter((product) => {
      // Name filter
      if (filters.name && !product.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      // Price filter
      if (filters.minPrice && product.price < filters.minPrice) return false
      if (filters.maxPrice && product.price > filters.maxPrice) return false

      // Status filter
      if (filters.status && product.status !== filters.status) return false

      // Quantity filter
      if (filters.minQuantity && product.quantity < filters.minQuantity) return false

      return true
    })

    this.displayResults(results, "Kết quả lọc nâng cao")
  }

  getFilterValues() {
    const advancedProductName = document.getElementById("advancedProductName")
    const minPrice = document.getElementById("minPrice")
    const maxPrice = document.getElementById("maxPrice")
    const statusFilter = document.querySelector('input[name="statusFilter"]:checked')
    const quantityRange = document.getElementById("quantityRange")

    return {
      name: advancedProductName ? advancedProductName.value : "",
      categories: Array.from(this.selectedCategories),
      minPrice: minPrice ? Number.parseInt(minPrice.value) || null : null,
      maxPrice: maxPrice ? Number.parseInt(maxPrice.value) || null : null,
      status: statusFilter ? statusFilter.value || null : null,
      minQuantity: quantityRange ? Number.parseInt(quantityRange.value) || 0 : 0,
    }
  }

  displayResults(results, title) {
    this.searchResults = results
    this.updateSearchStats()

    const resultsHeader = document.getElementById("resultsHeader")
    const resultsTitle = document.getElementById("resultsTitle")
    const resultsSubtitle = document.getElementById("resultsSubtitle")
    const searchResults = document.getElementById("searchResults")
    const noResults = document.getElementById("noResults")

    if (resultsTitle) resultsTitle.textContent = title
    if (resultsSubtitle) resultsSubtitle.textContent = `Tìm thấy ${results.length} sản phẩm`

    if (results.length > 0) {
      if (resultsHeader) resultsHeader.style.display = "flex"
      if (noResults) noResults.style.display = "none"
      this.renderResults(results)
    } else {
      if (resultsHeader) resultsHeader.style.display = "none"
      if (searchResults) {
        searchResults.innerHTML = `
          <div class="no-results">
            <div class="no-results-icon">
              <i class="fas fa-search-minus"></i>
            </div>
            <h3>Không tìm thấy kết quả</h3>
            <p>Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        `
      }
    }
  }

  renderResults(results) {
    const searchResults = document.getElementById("searchResults")
    if (!searchResults) return

    if (this.currentView === "grid") {
      searchResults.innerHTML = `
        <div class="search-results-grid">
          ${results.map((product) => this.createProductCard(product)).join("")}
        </div>
      `
    } else {
      searchResults.innerHTML = `
        <div class="search-results-list">
          ${results.map((product) => this.createProductListItem(product)).join("")}
        </div>
      `
    }
  }

  createProductCard(product) {
    const category = PRODUCT_CATEGORIES[product.category]
    const statusClass = `status-${product.status.replace("_", "-")}`
    const statusText = {
      available: "Có sẵn",
      low_stock: "Sắp hết",
      out_of_stock: "Hết hàng",
    }

    return `
      <div class="search-result-card" onclick="editProduct(${product.id})">
        <h4>${product.name}</h4>
        <p><strong>Danh mục:</strong> ${category ? category.name : product.category}</p>
        <p><strong>Giá:</strong> ${formatCurrency(product.price)}</p>
        <p><strong>Số lượng:</strong> ${product.quantity}</p>
        <p><strong>Vị trí:</strong> Kệ ${category ? category.shelf_id : "N/A"}</p>
        <p><strong>Trạng thái:</strong> <span class="status-badge ${statusClass}">${statusText[product.status]}</span></p>
      </div>
    `
  }

  createProductListItem(product) {
    // Similar to card but in list format
    return this.createProductCard(product) // Simplified for now
  }

  changeView(view) {
    this.currentView = view

    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.classList.remove("active")
    })
    const viewBtn = document.querySelector(`[data-view="${view}"]`)
    if (viewBtn) viewBtn.classList.add("active")

    if (this.searchResults.length > 0) {
      this.renderResults(this.searchResults)
    }
  }

  sortResults(sortBy) {
    if (this.searchResults.length === 0) return

    const sortedResults = [...this.searchResults].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "price":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "quantity":
          return a.quantity - b.quantity
        case "quantity-desc":
          return b.quantity - a.quantity
        default:
          return 0
      }
    })

    this.renderResults(sortedResults)
  }

  resetFilters() {
    // Clear all form inputs
    const advancedProductName = document.getElementById("advancedProductName")
    const minPrice = document.getElementById("minPrice")
    const maxPrice = document.getElementById("maxPrice")
    const quantityRange = document.getElementById("quantityRange")
    const statusFilterDefault = document.querySelector('input[name="statusFilter"][value=""]')

    if (advancedProductName) advancedProductName.value = ""
    if (minPrice) minPrice.value = ""
    if (maxPrice) maxPrice.value = ""
    if (quantityRange) quantityRange.value = "0"
    if (statusFilterDefault) statusFilterDefault.checked = true

    // Clear categories
    this.clearAllCategories()

    // Clear price presets
    document.querySelectorAll(".price-preset-btn").forEach((btn) => {
      btn.classList.remove("active")
    })

    // Update quantity display
    this.updateQuantityValue("0")

    // Clear results
    this.clearResults()
  }

  saveFilters() {
    const filters = this.getFilterValues()
    localStorage.setItem("supermarket_saved_filters", JSON.stringify(filters))

    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "success",
        title: "Đã lưu bộ lọc",
        text: "Bộ lọc đã được lưu thành công",
        timer: 1500,
        showConfirmButton: false,
      })
    } else {
      alert("Đã lưu bộ lọc thành công")
    }
  }

  clearResults() {
    this.searchResults = []
    this.updateSearchStats()

    const resultsHeader = document.getElementById("resultsHeader")
    const searchResults = document.getElementById("searchResults")

    if (resultsHeader) resultsHeader.style.display = "none"
    if (searchResults) {
      searchResults.innerHTML = `
        <div class="no-results" id="noResults">
          <div class="no-results-icon">
            <i class="fas fa-search"></i>
          </div>
          <h3>Bắt đầu tìm kiếm</h3>
          <p>Sử dụng thanh tìm kiếm hoặc bộ lọc để tìm sản phẩm</p>
        </div>
      `
    }
  }

  /**
   * Trả về object bộ lọc hiện tại được lấy từ UI advancedFilters
   */
  getActiveFilters() {
    const catSelect = document.getElementById("filterCategory")
    const shelfSelect = document.getElementById("filterShelf")
    const statusSelect = document.getElementById("filterStatus")
    const priceMinInput = document.getElementById("filterPriceMin")
    const priceMaxInput = document.getElementById("filterPriceMax")

    return {
      categories: catSelect ? Array.from(catSelect.selectedOptions).map((o) => o.value) : [],
      shelves: shelfSelect ? Array.from(shelfSelect.selectedOptions).map((o) => o.value) : [],
      status: statusSelect ? statusSelect.value : "",
      priceMin: priceMinInput ? Number(priceMinInput.value) || null : null,
      priceMax: priceMaxInput ? Number(priceMaxInput.value) || null : null,
    }
  }

  /**
   * Áp dụng bộ lọc lên danh sách kết quả
   */
  applyFilters(list) {
    const filters = this.getActiveFilters()
    return list.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false
      if (filters.shelves.length && !filters.shelves.includes(PRODUCT_CATEGORIES[p.category]?.shelf_id?.toString() || "")) return false
      if (filters.status && p.status !== filters.status) return false
      if (filters.priceMin !== null && p.price < filters.priceMin) return false
      if (filters.priceMax !== null && p.price > filters.priceMax) return false
      return true
    })
  }

  /**
   * Thêm option cho các select bộ lọc dựa trên dữ liệu có sẵn
   */
  populateFilterSelects() {
    const catSelect = document.getElementById("filterCategory")
    const shelfSelect = document.getElementById("filterShelf")

    if (catSelect && catSelect.options.length === 0) {
      Object.entries(PRODUCT_CATEGORIES).forEach(([key, cat]) => {
        const opt = document.createElement("option")
        opt.value = key
        opt.textContent = cat.name
        catSelect.appendChild(opt)
      })
    }

    if (shelfSelect && shelfSelect.options.length === 0) {
      // Collect unique shelf ids
      const shelves = new Set()
      Object.values(PRODUCT_CATEGORIES).forEach((cat) => shelves.add(cat.shelf_id.toString()))
      Array.from(shelves).sort((a,b)=>Number(a)-Number(b)).forEach((shelfId) => {
        const opt = document.createElement("option")
        opt.value = shelfId
        opt.textContent = `Kệ ${shelfId}`
        shelfSelect.appendChild(opt)
      })
    }
  }
}

// Initialize enhanced search system
const enhancedSearchSystem = new EnhancedSearchSystem()
