// Enhanced Map System
const PRODUCT_CATEGORIES = {
    // Example categories
    fruits: {
      name: "Fruits",
      shelf_id: "A1",
      description: "Fresh fruits section",
      color: [255, 0, 0],
      positions: [
        [0, 0],
        [0, 1],
      ],
    },
    vegetables: {
      name: "Vegetables",
      shelf_id: "A2",
      description: "Fresh vegetables section",
      color: [0, 255, 0],
      positions: [
        [1, 0],
        [1, 1],
      ],
    },
  }
  
  const products = [
    { name: "Apple", category: "fruits" },
    { name: "Carrot", category: "vegetables" },
  ]
  
  class EnhancedMapSystem {
    constructor() {
      this.canvas = null
      this.ctx = null
      this.cellSize = 20
      this.mapWidth = 35
      this.mapHeight = 28
      this.showGrid = true
      this.selectedCategory = null
      this.hoveredPosition = null
      this.zoomLevel = 1
      this.panOffset = { x: 0, y: 0 }
      this.isDragging = false
      this.lastMousePos = { x: 0, y: 0 }
  
      this.init()
    }
  
    init() {
      this.setupCanvas()
      this.setupEventListeners()
      this.setupMapControls()
      this.createEnhancedLegend()
      this.render()
    }
  
    setupCanvas() {
      this.canvas = document.getElementById("supermarketMap")
      if (!this.canvas) return
  
      this.ctx = this.canvas.getContext("2d")
  
      // Set canvas size
      this.canvas.width = this.mapWidth * this.cellSize
      this.canvas.height = this.mapHeight * this.cellSize
  
      // Enable high DPI support
      const dpr = window.devicePixelRatio || 1
      const rect = this.canvas.getBoundingClientRect()
  
      this.canvas.width = rect.width * dpr
      this.canvas.height = rect.height * dpr
      this.ctx.scale(dpr, dpr)
  
      this.canvas.style.width = rect.width + "px"
      this.canvas.style.height = rect.height + "px"
    }
  
    setupEventListeners() {
      if (!this.canvas) return
  
      // Mouse events
      this.canvas.addEventListener("click", (e) => this.handleClick(e))
      this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e))
      this.canvas.addEventListener("mousedown", (e) => this.handleMouseDown(e))
      this.canvas.addEventListener("mouseup", (e) => this.handleMouseUp(e))
      this.canvas.addEventListener("mouseleave", () => this.handleMouseLeave())
  
      // Wheel event for zooming
      this.canvas.addEventListener("wheel", (e) => this.handleWheel(e))
  
      // Touch events for mobile
      this.canvas.addEventListener("touchstart", (e) => this.handleTouchStart(e))
      this.canvas.addEventListener("touchmove", (e) => this.handleTouchMove(e))
      this.canvas.addEventListener("touchend", (e) => this.handleTouchEnd(e))
    }
  
    setupMapControls() {
      // Reset button
      const resetBtn = document.getElementById("resetMapBtn")
      if (resetBtn) {
        resetBtn.addEventListener("click", () => this.resetView())
      }
  
      // Grid toggle
      const gridBtn = document.getElementById("toggleGridBtn")
      if (gridBtn) {
        gridBtn.addEventListener("click", () => this.toggleGrid())
      }
  
      // Add zoom controls
      this.addZoomControls()
  
      // Add search functionality
      this.addLegendSearch()
    }
  
    addZoomControls() {
      const mapToolbar = document.querySelector(".map-controls")
      if (!mapToolbar) return
  
      const zoomControls = document.createElement("div")
      zoomControls.className = "zoom-controls"
      zoomControls.innerHTML = `
        <button class="btn btn-secondary" id="zoomInBtn" title="Phóng to">
          <i class="fas fa-plus"></i>
        </button>
        <button class="btn btn-secondary" id="zoomOutBtn" title="Thu nhỏ">
          <i class="fas fa-minus"></i>
        </button>
        <button class="btn btn-secondary" id="fitToScreenBtn" title="Vừa màn hình">
          <i class="fas fa-expand-arrows-alt"></i>
        </button>
      `
  
      mapToolbar.appendChild(zoomControls)
  
      // Event listeners
      document.getElementById("zoomInBtn").addEventListener("click", () => this.zoomIn())
      document.getElementById("zoomOutBtn").addEventListener("click", () => this.zoomOut())
      document.getElementById("fitToScreenBtn").addEventListener("click", () => this.fitToScreen())
    }
  
    addLegendSearch() {
      const legendHeader = document.querySelector(".legend-header")
      if (!legendHeader) {
        const legend = document.querySelector(".map-legend")
        if (legend) {
          const header = document.createElement("div")
          header.className = "legend-header"
          header.innerHTML = `
            <h3>Chú Thích</h3>
            <input type="text" class="legend-search" placeholder="Tìm kiếm danh mục..." id="legendSearch">
          `
          legend.insertBefore(header, legend.firstChild)
        }
      }
  
      const searchInput = document.getElementById("legendSearch")
      if (searchInput) {
        searchInput.addEventListener("input", (e) => this.filterLegend(e.target.value))
      }
    }
  
    setupLegendInteractions() {
      // This will be called after legend is created
      const legendItems = document.querySelectorAll(".legend-item")
      legendItems.forEach((item, index) => {
        const categoryKey = Object.keys(PRODUCT_CATEGORIES)[index]
  
        item.addEventListener("click", () => {
          this.toggleCategoryHighlight(categoryKey)
        })
  
        item.addEventListener("mouseenter", () => {
          this.highlightCategory(categoryKey, true)
        })
  
        item.addEventListener("mouseleave", () => {
          this.highlightCategory(categoryKey, false)
        })
      })
    }
  
    handleClick(event) {
      const pos = this.getMousePosition(event)
      const gridPos = this.screenToGrid(pos.x, pos.y)
  
      if (this.isValidGridPosition(gridPos)) {
        const category = this.getCategoryAtPosition(gridPos.row, gridPos.col)
        if (category) {
          this.showCategoryInfo(category, gridPos)
        }
      }
    }
  
    handleMouseMove(event) {
      const pos = this.getMousePosition(event)
  
      if (this.isDragging) {
        const deltaX = pos.x - this.lastMousePos.x
        const deltaY = pos.y - this.lastMousePos.y
  
        this.panOffset.x += deltaX
        this.panOffset.y += deltaY
  
        this.render()
      } else {
        const gridPos = this.screenToGrid(pos.x, pos.y)
  
        if (this.isValidGridPosition(gridPos)) {
          this.hoveredPosition = gridPos
          this.updateCoordinateDisplay(gridPos)
          this.canvas.style.cursor = "pointer"
        } else {
          this.hoveredPosition = null
          this.canvas.style.cursor = "default"
        }
  
        this.render()
      }
  
      this.lastMousePos = pos
    }
  
    handleMouseDown(event) {
      this.isDragging = true
      this.lastMousePos = this.getMousePosition(event)
      this.canvas.style.cursor = "grabbing"
    }
  
    handleMouseUp(event) {
      this.isDragging = false
      this.canvas.style.cursor = "default"
    }
  
    handleMouseLeave() {
      this.hoveredPosition = null
      this.isDragging = false
      this.render()
    }
  
    handleWheel(event) {
      event.preventDefault()
  
      const pos = this.getMousePosition(event)
      const delta = event.deltaY > 0 ? 0.9 : 1.1
  
      this.zoomAt(pos.x, pos.y, delta)
    }
  
    handleTouchStart(event) {
      event.preventDefault()
      if (event.touches.length === 1) {
        const touch = event.touches[0]
        this.lastMousePos = this.getTouchPosition(touch)
        this.isDragging = true
      }
    }
  
    handleTouchMove(event) {
      event.preventDefault()
      if (event.touches.length === 1 && this.isDragging) {
        const touch = event.touches[0]
        const pos = this.getTouchPosition(touch)
  
        const deltaX = pos.x - this.lastMousePos.x
        const deltaY = pos.y - this.lastMousePos.y
  
        this.panOffset.x += deltaX
        this.panOffset.y += deltaY
  
        this.render()
        this.lastMousePos = pos
      }
    }
  
    handleTouchEnd(event) {
      event.preventDefault()
      this.isDragging = false
    }
  
    getMousePosition(event) {
      const rect = this.canvas.getBoundingClientRect()
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
    }
  
    getTouchPosition(touch) {
      const rect = this.canvas.getBoundingClientRect()
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }
    }
  
    screenToGrid(screenX, screenY) {
      const adjustedX = (screenX - this.panOffset.x) / this.zoomLevel
      const adjustedY = (screenY - this.panOffset.y) / this.zoomLevel
  
      return {
        col: Math.floor(adjustedX / this.cellSize),
        row: Math.floor(adjustedY / this.cellSize),
      }
    }
  
    gridToScreen(row, col) {
      return {
        x: col * this.cellSize * this.zoomLevel + this.panOffset.x,
        y: row * this.cellSize * this.zoomLevel + this.panOffset.y,
      }
    }
  
    isValidGridPosition(gridPos) {
      return gridPos.row >= 0 && gridPos.row < this.mapHeight && gridPos.col >= 0 && gridPos.col < this.mapWidth
    }
  
    getCategoryAtPosition(row, col) {
      return Object.entries(PRODUCT_CATEGORIES).find(([key, category]) =>
        category.positions.some(([r, c]) => r === row && c === col),
      )
    }
  
    render() {
      if (!this.ctx) return
  
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  
      // Save context
      this.ctx.save()
  
      // Apply zoom and pan
      this.ctx.translate(this.panOffset.x, this.panOffset.y)
      this.ctx.scale(this.zoomLevel, this.zoomLevel)
  
      // Draw grid
      if (this.showGrid) {
        this.drawGrid()
      }
  
      // Draw categories
      this.drawCategories()
  
      // Draw hover effect
      if (this.hoveredPosition) {
        this.drawHoverEffect()
      }
  
      // Restore context
      this.ctx.restore()
  
      // Draw UI elements (not affected by zoom/pan)
      this.drawMapInfo()
    }
  
    drawGrid() {
      this.ctx.strokeStyle = "#e2e8f0"
      this.ctx.lineWidth = 1 / this.zoomLevel
  
      // Vertical lines
      for (let x = 0; x <= this.mapWidth; x++) {
        this.ctx.beginPath()
        this.ctx.moveTo(x * this.cellSize, 0)
        this.ctx.lineTo(x * this.cellSize, this.mapHeight * this.cellSize)
        this.ctx.stroke()
      }
  
      // Horizontal lines
      for (let y = 0; y <= this.mapHeight; y++) {
        this.ctx.beginPath()
        this.ctx.moveTo(0, y * this.cellSize)
        this.ctx.lineTo(this.mapWidth * this.cellSize, y * this.cellSize)
        this.ctx.stroke()
      }
    }
  
    drawCategories() {
      Object.entries(PRODUCT_CATEGORIES).forEach(([key, category]) => {
        const [r, g, b] = category.color
        const isSelected = this.selectedCategory === key
        const alpha = isSelected ? 1 : 0.8
  
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
  
        category.positions.forEach(([row, col]) => {
          const x = col * this.cellSize
          const y = row * this.cellSize
  
          this.ctx.fillRect(x, y, this.cellSize, this.cellSize)
  
          // Add border for selected category
          if (isSelected) {
            this.ctx.strokeStyle = "#1e293b"
            this.ctx.lineWidth = 2 / this.zoomLevel
            this.ctx.strokeRect(x, y, this.cellSize, this.cellSize)
          }
        })
      })
    }
  
    drawHoverEffect() {
      if (!this.hoveredPosition) return
  
      const { row, col } = this.hoveredPosition
      const x = col * this.cellSize
      const y = row * this.cellSize
  
      // Highlight hovered cell
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
      this.ctx.fillRect(x, y, this.cellSize, this.cellSize)
  
      // Draw border
      this.ctx.strokeStyle = "#667eea"
      this.ctx.lineWidth = 3 / this.zoomLevel
      this.ctx.strokeRect(x, y, this.cellSize, this.cellSize)
    }
  
    drawMapInfo() {
      const mapInfo = document.querySelector(".map-info")
      if (!mapInfo) {
        // Create map info element
        const mapContainer = document.querySelector(".map-container")
        if (mapContainer) {
          const infoDiv = document.createElement("div")
          infoDiv.className = "map-info"
          infoDiv.innerHTML = `
            <div><strong>Hướng dẫn:</strong></div>
            <div>• Click để xem thông tin</div>
            <div>• Kéo để di chuyển</div>
            <div>• Cuộn chuột để zoom</div>
            <div>• Click danh mục để highlight</div>
          `
          mapContainer.appendChild(infoDiv)
        }
      }
    }
  
    updateCoordinateDisplay(gridPos) {
      let coordDisplay = document.querySelector(".map-coordinates")
      if (!coordDisplay) {
        const mapContainer = document.querySelector(".map-container")
        if (mapContainer) {
          coordDisplay = document.createElement("div")
          coordDisplay.className = "map-coordinates"
          mapContainer.appendChild(coordDisplay)
        }
      }
  
      if (coordDisplay) {
        coordDisplay.textContent = `(${gridPos.row}, ${gridPos.col})`
      }
    }
  
    showCategoryInfo(categoryData, position) {
      const [key, category] = categoryData
  
      const infoDiv = document.createElement("div")
      infoDiv.className = "category-info"
      infoDiv.innerHTML = `
        <div style="text-align: left;">
          <p><strong>Kệ:</strong> ${category.shelf_id}</p>
          <p><strong>Vị trí:</strong> (${position.row}, ${position.col})</p>
          <p><strong>Mô tả:</strong> ${category.description}</p>
          <p><strong>Tổng vị trí:</strong> ${category.positions.length} ô</p>
        </div>
      `
      document.body.appendChild(infoDiv)
  
      setTimeout(() => {
        document.body.removeChild(infoDiv)
      }, 3000)
    }
  
    toggleCategoryHighlight(categoryKey) {
      if (this.selectedCategory === categoryKey) {
        this.selectedCategory = null
      } else {
        this.selectedCategory = categoryKey
      }
  
      // Update legend item appearance
      this.updateLegendHighlight(categoryKey)
      this.render()
    }
  
    highlightCategory(categoryKey, highlight) {
      if (highlight && !this.selectedCategory) {
        this.selectedCategory = categoryKey
        this.render()
      } else if (!highlight && this.selectedCategory === categoryKey) {
        this.selectedCategory = null
        this.render()
      }
    }
  
    updateLegendHighlight(categoryKey) {
      const legendItems = document.querySelectorAll(".legend-item")
      const categoryKeys = Object.keys(PRODUCT_CATEGORIES)
      const index = categoryKeys.indexOf(categoryKey)
  
      legendItems.forEach((item, i) => {
        if (i === index) {
          item.classList.toggle("highlighted")
        } else {
          item.classList.remove("highlighted")
        }
      })
    }
  
    filterLegend(searchTerm) {
      const legendItems = document.querySelectorAll(".legend-item")
      const categoryKeys = Object.keys(PRODUCT_CATEGORIES)
  
      legendItems.forEach((item, index) => {
        const category = PRODUCT_CATEGORIES[categoryKeys[index]]
        const matchesSearch =
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.description.toLowerCase().includes(searchTerm.toLowerCase())
  
        item.style.display = matchesSearch ? "flex" : "none"
      })
    }
  
    zoomIn() {
      this.zoomLevel = Math.min(this.zoomLevel * 1.2, 3)
      this.render()
    }
  
    zoomOut() {
      this.zoomLevel = Math.max(this.zoomLevel / 1.2, 0.5)
      this.render()
    }
  
    zoomAt(x, y, factor) {
      const newZoom = Math.max(0.5, Math.min(3, this.zoomLevel * factor))
  
      if (newZoom !== this.zoomLevel) {
        // Adjust pan to zoom at mouse position
        this.panOffset.x = x - (x - this.panOffset.x) * (newZoom / this.zoomLevel)
        this.panOffset.y = y - (y - this.panOffset.y) * (newZoom / this.zoomLevel)
  
        this.zoomLevel = newZoom
        this.render()
      }
    }
  
    fitToScreen() {
      const canvasRect = this.canvas.getBoundingClientRect()
      const mapPixelWidth = this.mapWidth * this.cellSize
      const mapPixelHeight = this.mapHeight * this.cellSize
  
      const scaleX = canvasRect.width / mapPixelWidth
      const scaleY = canvasRect.height / mapPixelHeight
  
      this.zoomLevel = Math.min(scaleX, scaleY) * 0.9 // 90% to add some padding
      this.panOffset = {
        x: (canvasRect.width - mapPixelWidth * this.zoomLevel) / 2,
        y: (canvasRect.height - mapPixelHeight * this.zoomLevel) / 2,
      }
  
      this.render()
    }
  
    resetView() {
      this.zoomLevel = 1
      this.panOffset = { x: 0, y: 0 }
      this.selectedCategory = null
      this.hoveredPosition = null
  
      // Reset legend highlights
      document.querySelectorAll(".legend-item").forEach((item) => {
        item.classList.remove("highlighted")
      })
  
      this.render()
    }
  
    toggleGrid() {
      this.showGrid = !this.showGrid
      this.render()
  
      // Update button text
      const gridBtn = document.getElementById("toggleGridBtn")
      if (gridBtn) {
        const icon = gridBtn.querySelector("i")
        if (this.showGrid) {
          icon.className = "fas fa-th"
          gridBtn.title = "Ẩn lưới"
        } else {
          icon.className = "fas fa-th-large"
          gridBtn.title = "Hiện lưới"
        }
      }
    }
  
    createEnhancedLegend() {
      const legendContainer = document.getElementById("mapLegend")
      if (!legendContainer) return
  
      legendContainer.innerHTML = Object.entries(PRODUCT_CATEGORIES)
        .map(([key, category]) => {
          const [r, g, b] = category.color
          const productCount = products.filter((p) => p.category === key).length
  
          return `
            <div class="legend-item" data-category="${key}">
              <div class="legend-color" style="background-color: rgb(${r}, ${g}, ${b});"></div>
              <div class="legend-info">
                <div class="legend-name">${category.name}</div>
                <div class="legend-details">
                  <span>Kệ ${category.shelf_id}</span>
                  <span>${productCount} sản phẩm</span>
                  <span>${category.positions.length} vị trí</span>
                </div>
              </div>
            </div>
          `
        })
        .join("")
  
      // Setup interactions after creating legend
      this.setupLegendInteractions()
    }
  
    updateLegendProductCounts() {
      const legendItems = document.querySelectorAll(".legend-item")
      const categoryKeys = Object.keys(PRODUCT_CATEGORIES)
  
      legendItems.forEach((item, index) => {
        const categoryKey = categoryKeys[index]
        const productCount = products.filter((p) => p.category === categoryKey).length
        const countSpan = item.querySelector(".legend-details span:nth-child(2)")
        if (countSpan) {
          countSpan.textContent = `${productCount} sản phẩm`
        }
      })
    }
  
    resize() {
      this.setupCanvas()
      this.render()
    }
  }
  
  // Initialize enhanced map system
  const enhancedMapSystem = new EnhancedMapSystem()
  