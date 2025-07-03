// Main Application Controller
class SupermarketApp {
  constructor() {
    this.currentTab = "dashboard"
    this.products = []
    this.categories = [
      "Thực phẩm tươi sống",
      "Đồ uống",
      "Bánh kẹo",
      "Gia vị",
      "Đồ gia dụng",
      "Chăm sóc cá nhân",
      "Khác",
    ]
    this.shelves = []
    this.searchResults = []
    this.notifications = []

    this.init()
  }

  init() {
    this.loadSampleData()
    this.setupEventListeners()
    this.updateStats()
    this.initializeSearch()
  }

  loadSampleData() {
    // Generate sample products
    this.products = [
      {
        id: 1,
        name: "Sữa tươi Vinamilk",
        category: "Đồ uống",
        shelf: "B1",
        position: "B1-01",
        price: 25000,
        quantity: 50,
        status: "available",
      },
      {
        id: 2,
        name: "Bánh mì sandwich",
        category: "Thực phẩm tươi sống",
        shelf: "A1",
        position: "A1-05",
        price: 15000,
        quantity: 20,
        status: "available",
      },
      {
        id: 3,
        name: "Nước ngọt Coca Cola",
        category: "Đồ uống",
        shelf: "B2",
        position: "B2-03",
        price: 12000,
        quantity: 5,
        status: "low-stock",
      },
      {
        id: 4,
        name: "Kẹo Alpenliebe",
        category: "Bánh kẹo",
        shelf: "C1",
        position: "C1-02",
        price: 8000,
        quantity: 0,
        status: "out-of-stock",
      },
      {
        id: 5,
        name: "Dầu ăn Neptune",
        category: "Gia vị",
        shelf: "D1",
        position: "D1-01",
        price: 45000,
        quantity: 30,
        status: "available",
      },
    ]

    // Generate shelf data
    for (const row of ["A", "B", "C", "D"]) {
      for (let num = 1; num <= 5; num++) {
        this.shelves.push(`${row}${num}`)
      }
    }

    this.updateProductsTable()
    this.updateFilters()
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", () => {
        const tab = item.dataset.tab
        if (tab) {
          this.switchTab(tab)
        }
      })
    })

    // Quick actions
    document.getElementById("quickAddProduct")?.addEventListener("click", () => {
      this.switchTab("products")
      this.showAddProductModal()
    })

    document.getElementById("quickViewMap")?.addEventListener("click", () => {
      this.switchTab("map")
    })

    document.getElementById("quickSearch")?.addEventListener("click", () => {
      this.switchTab("search")
      document.getElementById("quickSearchInput")?.focus()
    })

    // Product management
    document.getElementById("addProductBtn")?.addEventListener("click", () => {
      this.showAddProductModal()
    })

    // Filters
    document.getElementById("categoryFilter")?.addEventListener("change", (e) => {
      this.filterProducts()
    })

    document.getElementById("shelfFilter")?.addEventListener("change", (e) => {
      this.filterProducts()
    })

    document.getElementById("productSearch")?.addEventListener("input", (e) => {
      this.filterProducts()
    })

    // Global search
    document.getElementById("globalSearch")?.addEventListener("input", (e) => {
      this.performGlobalSearch(e.target.value)
    })

    // Search functionality
    document.getElementById("quickSearchInput")?.addEventListener("input", (e) => {
      this.performQuickSearch(e.target.value)
    })

    document.getElementById("clearQuickSearch")?.addEventListener("click", () => {
      this.clearSearch()
    })

    // Settings
    document.getElementById("darkModeToggle")?.addEventListener("change", (e) => {
      this.toggleDarkMode(e.target.checked)
    })

    // Sidebar toggle for mobile
    document.querySelector(".menu-toggle")?.addEventListener("click", () => {
      this.toggleSidebar()
    })

    // Notification button
    document.getElementById("notificationBtn")?.addEventListener("click", () => {
      this.showNotifications()
    })
  }

  switchTab(tabName) {
    // Update navigation
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active")
    })

    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add("active")

    // Update content
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active")
    })

    document.getElementById(tabName)?.classList.add("active")

    // Update page title
    const titles = {
      dashboard: "Dashboard",
      products: "Quản Lý Sản Phẩm",
      map: "Bản Đồ Siêu Thị",
      search: "Tìm Kiếm & Lọc",
      analytics: "Thống Kê",
      settings: "Cài Đặt",
    }

    document.querySelector(".page-title").textContent = titles[tabName] || "Dashboard"
    this.currentTab = tabName

    // Tab-specific initialization
    if (tabName === "map" && window.SupermarketMap) {
      setTimeout(() => window.SupermarketMap.draw(), 100)
    }

    if (tabName === "analytics" && window.ChartsSystem) {
      setTimeout(() => window.ChartsSystem.refreshCharts(), 100)
    }
  }

  // Product Management
  showAddProductModal() {
    const Swal = window.Swal // Declare Swal variable
    Swal.fire({
      title: "Thêm Sản Phẩm Mới",
      html: `
        <form id="addProductForm" style="text-align: left;">
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Tên sản phẩm:</label>
            <input type="text" id="productName" class="swal2-input" placeholder="Nhập tên sản phẩm" required>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Danh mục:</label>
            <select id="productCategory" class="swal2-select" required>
              <option value="">Chọn danh mục</option>
              ${this.categories.map((cat) => `<option value="${cat}">${cat}</option>`).join("")}
            </select>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Kệ:</label>
            <select id="productShelf" class="swal2-select" required>
              <option value="">Chọn kệ</option>
              ${this.shelves.map((shelf) => `<option value="${shelf}">${shelf}</option>`).join("")}
            </select>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Vị trí:</label>
            <input type="text" id="productPosition" class="swal2-input" placeholder="VD: A1-01" required>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Giá (VNĐ):</label>
            <input type="number" id="productPrice" class="swal2-input" placeholder="Nhập giá" min="0" required>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Số lượng:</label>
            <input type="number" id="productQuantity" class="swal2-input" placeholder="Nhập số lượng" min="0" required>
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: "Thêm sản phẩm",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#667eea",
      cancelButtonColor: "#64748b",
      width: "500px",
      preConfirm: () => {
        const name = document.getElementById("productName").value.trim()
        const category = document.getElementById("productCategory").value
        const shelf = document.getElementById("productShelf").value
        const position = document.getElementById("productPosition").value.trim()
        const price = Number.parseInt(document.getElementById("productPrice").value)
        const quantity = Number.parseInt(document.getElementById("productQuantity").value)

        if (!name || !category || !shelf || !position || !price || quantity < 0) {
          Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin!")
          return false
        }

        return { name, category, shelf, position, price, quantity }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.addProduct(result.value)
      }
    })
  }

  addProduct(productData) {
    const Swal = window.Swal // Declare Swal variable
    const newProduct = {
      id: Math.max(...this.products.map((p) => p.id), 0) + 1,
      ...productData,
      status: productData.quantity === 0 ? "out-of-stock" : productData.quantity < 10 ? "low-stock" : "available",
    }

    this.products.push(newProduct)
    this.updateProductsTable()
    this.updateStats()

    // Update map if available
    if (window.SupermarketMap) {
      const shelfData = window.SupermarketMap.getShelfData()
      const shelf = shelfData.find((s) => s.id === productData.shelf)
      if (shelf) {
        shelf.products++
        window.SupermarketMap.updateShelfData(productData.shelf, shelf)
      }
    }

    Swal.fire({
      icon: "success",
      title: "Thành công!",
      text: "Sản phẩm đã được thêm vào hệ thống.",
      timer: 2000,
      showConfirmButton: false,
    })

    this.addNotification("Đã thêm sản phẩm mới: " + productData.name)
  }

  editProduct(productId) {
    const Swal = window.Swal // Declare Swal variable
    const product = this.products.find((p) => p.id === productId)
    if (!product) return

    Swal.fire({
      title: "Chỉnh Sửa Sản Phẩm",
      html: `
        <form id="editProductForm" style="text-align: left;">
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Tên sản phẩm:</label>
            <input type="text" id="editProductName" class="swal2-input" value="${product.name}" required>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Danh mục:</label>
            <select id="editProductCategory" class="swal2-select" required>
              ${this.categories
                .map((cat) => `<option value="${cat}" ${cat === product.category ? "selected" : ""}>${cat}</option>`)
                .join("")}
            </select>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Kệ:</label>
            <select id="editProductShelf" class="swal2-select" required>
              ${this.shelves
                .map(
                  (shelf) => `<option value="${shelf}" ${shelf === product.shelf ? "selected" : ""}>${shelf}</option>`,
                )
                .join("")}
            </select>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Vị trí:</label>
            <input type="text" id="editProductPosition" class="swal2-input" value="${product.position}" required>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Giá (VNĐ):</label>
            <input type="number" id="editProductPrice" class="swal2-input" value="${product.price}" min="0" required>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Số lượng:</label>
            <input type="number" id="editProductQuantity" class="swal2-input" value="${product.quantity}" min="0" required>
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#667eea",
      cancelButtonColor: "#64748b",
      width: "500px",
      preConfirm: () => {
        const name = document.getElementById("editProductName").value.trim()
        const category = document.getElementById("editProductCategory").value
        const shelf = document.getElementById("editProductShelf").value
        const position = document.getElementById("editProductPosition").value.trim()
        const price = Number.parseInt(document.getElementById("editProductPrice").value)
        const quantity = Number.parseInt(document.getElementById("editProductQuantity").value)

        if (!name || !category || !shelf || !position || !price || quantity < 0) {
          Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin!")
          return false
        }

        return { name, category, shelf, position, price, quantity }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Object.assign(product, result.value)
        product.status =
          result.value.quantity === 0 ? "out-of-stock" : result.value.quantity < 10 ? "low-stock" : "available"

        this.updateProductsTable()
        this.updateStats()

        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công!",
          text: "Thông tin sản phẩm đã được cập nhật.",
          timer: 2000,
          showConfirmButton: false,
        })

        this.addNotification("Đã cập nhật sản phẩm: " + product.name)
      }
    })
  }

  deleteProduct(productId) {
    const Swal = window.Swal // Declare Swal variable
    const product = this.products.find((p) => p.id === productId)
    if (!product) return

    Swal.fire({
      title: "Xác nhận xóa",
      text: `Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
    }).then((result) => {
      if (result.isConfirmed) {
        this.products = this.products.filter((p) => p.id !== productId)
        this.updateProductsTable()
        this.updateStats()

        Swal.fire({
          icon: "success",
          title: "Đã xóa!",
          text: "Sản phẩm đã được xóa khỏi hệ thống.",
          timer: 2000,
          showConfirmButton: false,
        })

        this.addNotification("Đã xóa sản phẩm: " + product.name)
      }
    })
  }

  updateProductsTable() {
    const tbody = document.getElementById("productsTableBody")
    if (!tbody) return

    const filteredProducts = this.getFilteredProducts()

    tbody.innerHTML = filteredProducts
      .map(
        (product) => `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.shelf}</td>
        <td>${product.position}</td>
        <td>${product.price.toLocaleString("vi-VN")} ₫</td>
        <td>${product.quantity}</td>
        <td>
          <span class="status-badge status-${product.status}">
            ${this.getStatusText(product.status)}
          </span>
        </td>
        <td>
          <div class="action-buttons">
            <button class="action-btn edit" onclick="window.SupermarketApp.editProduct(${product.id})" title="Chỉnh sửa">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete" onclick="window.SupermarketApp.deleteProduct(${product.id})" title="Xóa">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `,
      )
      .join("")
  }

  getFilteredProducts() {
    let filtered = [...this.products]

    const categoryFilter = document.getElementById("categoryFilter")?.value
    const shelfFilter = document.getElementById("shelfFilter")?.value
    const searchTerm = document.getElementById("productSearch")?.value?.toLowerCase()

    if (categoryFilter) {
      filtered = filtered.filter((p) => p.category === categoryFilter)
    }

    if (shelfFilter) {
      filtered = filtered.filter((p) => p.shelf === shelfFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.category.toLowerCase().includes(searchTerm) ||
          p.shelf.toLowerCase().includes(searchTerm),
      )
    }

    return filtered
  }

  filterProducts() {
    this.updateProductsTable()
  }

  filterProductsByShelf(shelfId) {
    const shelfFilter = document.getElementById("shelfFilter")
    if (shelfFilter) {
      shelfFilter.value = shelfId
      this.filterProducts()
    }
  }

  updateFilters() {
    // Update category filter
    const categoryFilter = document.getElementById("categoryFilter")
    if (categoryFilter) {
      categoryFilter.innerHTML =
        '<option value="">Tất cả danh mục</option>' +
        this.categories.map((cat) => `<option value="${cat}">${cat}</option>`).join("")
    }

    // Update shelf filter
    const shelfFilter = document.getElementById("shelfFilter")
    if (shelfFilter) {
      shelfFilter.innerHTML =
        '<option value="">Tất cả kệ</option>' +
        this.shelves.map((shelf) => `<option value="${shelf}">${shelf}</option>`).join("")
    }
  }

  getStatusText(status) {
    const statusTexts = {
      available: "Còn hàng",
      "low-stock": "Sắp hết",
      "out-of-stock": "Hết hàng",
    }
    return statusTexts[status] || status
  }

  // Search Functionality
  initializeSearch() {
    this.updateSearchStats()
  }

  performQuickSearch(query) {
    const clearBtn = document.getElementById("clearQuickSearch")
    const resultsHeader = document.getElementById("resultsHeader")
    const searchResults = document.getElementById("searchResults")
    const noResults = document.getElementById("noResults")

    if (!query.trim()) {
      clearBtn.style.display = "none"
      resultsHeader.style.display = "none"
      searchResults.innerHTML =
        '<div class="no-results" id="noResults"><div class="no-results-icon"><i class="fas fa-search"></i></div><h3>Bắt đầu tìm kiếm</h3><p>Sử dụng thanh tìm kiếm để tìm sản phẩm</p></div>'
      this.updateSearchResultCount(0)
      return
    }

    clearBtn.style.display = "block"

    const results = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.shelf.toLowerCase().includes(query.toLowerCase()),
    )

    this.displaySearchResults(results, query)
    this.updateSearchResultCount(results.length)
  }

  displaySearchResults(results, query) {
    const resultsHeader = document.getElementById("resultsHeader")
    const searchResults = document.getElementById("searchResults")
    const resultsTitle = document.getElementById("resultsTitle")
    const resultsSubtitle = document.getElementById("resultsSubtitle")

    resultsHeader.style.display = "block"
    resultsTitle.textContent = `Kết quả cho "${query}"`
    resultsSubtitle.textContent = `Tìm thấy ${results.length} sản phẩm`

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">
            <i class="fas fa-search"></i>
          </div>
          <h3>Không tìm thấy kết quả</h3>
          <p>Không có sản phẩm nào phù hợp với từ khóa "${query}"</p>
        </div>
      `
      return
    }

    const resultsHtml = results
      .map(
        (product) => `
      <div class="search-result-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #f3f4f6; transition: background 0.2s ease;" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='white'">
        <div style="flex: 1;">
          <h4 style="margin: 0 0 0.5rem 0; color: #1e293b; font-weight: 600;">${product.name}</h4>
          <div style="display: flex; gap: 1rem; margin-bottom: 0.5rem;">
            <span style="font-size: 0.875rem; color: #64748b;"><i class="fas fa-tag" style="margin-right: 0.25rem;"></i>${product.category}</span>
            <span style="font-size: 0.875rem; color: #64748b;"><i class="fas fa-map-marker-alt" style="margin-right: 0.25rem;"></i>${product.shelf} - ${product.position}</span>
          </div>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <span style="font-weight: 600; color: #667eea; font-size: 1.1rem;">${product.price.toLocaleString("vi-VN")} ₫</span>
            <span class="status-badge status-${product.status}" style="font-size: 0.75rem;">${this.getStatusText(product.status)}</span>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-secondary" onclick="window.SupermarketApp.viewProductOnMap('${product.shelf}')" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
            <i class="fas fa-map"></i> Xem trên bản đồ
          </button>
          <button class="btn btn-primary" onclick="window.SupermarketApp.editProduct(${product.id})" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
            <i class="fas fa-edit"></i> Chỉnh sửa
          </button>
        </div>
      </div>
    `,
      )
      .join("")

    searchResults.innerHTML = resultsHtml
  }

  viewProductOnMap(shelfId) {
    this.switchTab("map")
    if (window.SupermarketMap) {
      setTimeout(() => {
        window.SupermarketMap.highlightShelf(shelfId)
      }, 100)
    }
  }

  clearSearch() {
    document.getElementById("quickSearchInput").value = ""
    this.performQuickSearch("")
  }

  updateSearchResultCount(count) {
    const countEl = document.getElementById("searchResultCount")
    if (countEl) {
      countEl.textContent = count
    }
  }

  updateSearchStats() {
    const totalEl = document.getElementById("totalSearchableProducts")
    if (totalEl) {
      totalEl.textContent = this.products.length
    }
  }

  performGlobalSearch(query) {
    if (!query.trim()) return

    const results = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    )

    if (results.length > 0) {
      // Switch to search tab and show results
      this.switchTab("search")
      document.getElementById("quickSearchInput").value = query
      this.performQuickSearch(query)
    }
  }

  // Statistics and Dashboard
  updateStats() {
    // Update total products
    const totalProductsEl = document.getElementById("totalProducts")
    if (totalProductsEl) {
      totalProductsEl.textContent = this.products.length
    }

    // Update search stats
    this.updateSearchStats()

    // Update charts if available
    if (window.ChartsSystem) {
      window.ChartsSystem.refreshCharts()
    }
  }

  // Notifications
  addNotification(message) {
    this.notifications.unshift({
      id: Date.now(),
      message,
      timestamp: new Date(),
      read: false,
    })

    // Keep only last 10 notifications
    this.notifications = this.notifications.slice(0, 10)

    this.updateNotificationBadge()
  }

  updateNotificationBadge() {
    const badge = document.getElementById("notificationBadge")
    if (badge) {
      const unreadCount = this.notifications.filter((n) => !n.read).length
      badge.textContent = unreadCount
      badge.style.display = unreadCount > 0 ? "flex" : "none"
    }
  }

  showNotifications() {
    const Swal = window.Swal // Declare Swal variable
    const notificationsHtml = this.notifications
      .map(
        (notification) => `
      <div style="padding: 1rem; border-bottom: 1px solid #f3f4f6; ${notification.read ? "opacity: 0.7;" : ""}">
        <div style="font-weight: 500; color: #1e293b; margin-bottom: 0.25rem;">${notification.message}</div>
        <div style="font-size: 0.875rem; color: #64748b;">${notification.timestamp.toLocaleString("vi-VN")}</div>
      </div>
    `,
      )
      .join("")

    Swal.fire({
      title: "Thông báo",
      html: `
        <div style="max-height: 400px; overflow-y: auto; text-align: left;">
          ${notificationsHtml || '<p style="text-align: center; color: #64748b; padding: 2rem;">Không có thông báo nào</p>'}
        </div>
      `,
      confirmButtonText: "Đóng",
      confirmButtonColor: "#667eea",
      width: "500px",
    })

    // Mark all as read
    this.notifications.forEach((n) => (n.read = true))
    this.updateNotificationBadge()
  }

  // UI Controls
  toggleSidebar() {
    const sidebar = document.querySelector(".sidebar")
    sidebar.classList.toggle("active")
  }

  toggleDarkMode(enabled) {
    if (enabled) {
      document.body.classList.add("dark-mode")
      localStorage.setItem("darkMode", "true")
    } else {
      document.body.classList.remove("dark-mode")
      localStorage.setItem("darkMode", "false")
    }
  }

  // Public API
  getProducts() {
    return this.products
  }

  getProductById(id) {
    return this.products.find((p) => p.id === id)
  }

  getCurrentTab() {
    return this.currentTab
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is authenticated
  if (window.AuthSystem && window.AuthSystem.isAuthenticated()) {
    window.SupermarketApp = new SupermarketApp()
  }
})

// Make app available globally for other scripts
window.SupermarketApp = null
