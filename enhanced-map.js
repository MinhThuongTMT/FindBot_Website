// Enhanced Supermarket Map System
import Swal from "sweetalert2"

class SupermarketMap {
  constructor() {
    this.canvas = null
    this.ctx = null
    this.scale = 1
    this.offsetX = 0
    this.offsetY = 0
    this.isDragging = false
    this.lastMouseX = 0
    this.lastMouseY = 0
    this.showGrid = true
    this.selectedShelf = null
    this.hoveredShelf = null

    // Map data
    this.mapData = {
      width: 800,
      height: 600,
      shelves: [
        // Row A
        {
          id: "A1",
          x: 100,
          y: 100,
          width: 80,
          height: 40,
          category: "Thực phẩm tươi sống",
          products: 25,
          capacity: 30,
        },
        {
          id: "A2",
          x: 200,
          y: 100,
          width: 80,
          height: 40,
          category: "Thực phẩm tươi sống",
          products: 28,
          capacity: 30,
        },
        {
          id: "A3",
          x: 300,
          y: 100,
          width: 80,
          height: 40,
          category: "Thực phẩm tươi sống",
          products: 22,
          capacity: 30,
        },
        {
          id: "A4",
          x: 400,
          y: 100,
          width: 80,
          height: 40,
          category: "Thực phẩm tươi sống",
          products: 30,
          capacity: 30,
        },
        {
          id: "A5",
          x: 500,
          y: 100,
          width: 80,
          height: 40,
          category: "Thực phẩm tươi sống",
          products: 26,
          capacity: 30,
        },

        // Row B
        { id: "B1", x: 100, y: 200, width: 80, height: 40, category: "Đồ uống", products: 35, capacity: 40 },
        { id: "B2", x: 200, y: 200, width: 80, height: 40, category: "Đồ uống", products: 38, capacity: 40 },
        { id: "B3", x: 300, y: 200, width: 80, height: 40, category: "Đồ uống", products: 32, capacity: 40 },
        { id: "B4", x: 400, y: 200, width: 80, height: 40, category: "Đồ uống", products: 40, capacity: 40 },
        { id: "B5", x: 500, y: 200, width: 80, height: 40, category: "Đồ uống", products: 36, capacity: 40 },

        // Row C
        { id: "C1", x: 100, y: 300, width: 80, height: 40, category: "Bánh kẹo", products: 20, capacity: 25 },
        { id: "C2", x: 200, y: 300, width: 80, height: 40, category: "Bánh kẹo", products: 23, capacity: 25 },
        { id: "C3", x: 300, y: 300, width: 80, height: 40, category: "Bánh kẹo", products: 18, capacity: 25 },
        { id: "C4", x: 400, y: 300, width: 80, height: 40, category: "Bánh kẹo", products: 25, capacity: 25 },
        { id: "C5", x: 500, y: 300, width: 80, height: 40, category: "Bánh kẹo", products: 21, capacity: 25 },

        // Row D
        { id: "D1", x: 100, y: 400, width: 80, height: 40, category: "Gia vị", products: 15, capacity: 20 },
        { id: "D2", x: 200, y: 400, width: 80, height: 40, category: "Gia vị", products: 18, capacity: 20 },
        { id: "D3", x: 300, y: 400, width: 80, height: 40, category: "Gia vị", products: 12, capacity: 20 },
        { id: "D4", x: 400, y: 400, width: 80, height: 40, category: "Gia vị", products: 20, capacity: 20 },
        { id: "D5", x: 500, y: 400, width: 80, height: 40, category: "Gia vị", products: 16, capacity: 20 },
      ],
      checkouts: [
        { id: "Checkout1", x: 650, y: 500, width: 100, height: 60 },
        { id: "Checkout2", x: 650, y: 400, width: 100, height: 60 },
      ],
      entrance: { x: 50, y: 550, width: 100, height: 30 },
      storage: { x: 650, y: 50, width: 100, height: 100 },
    }

    this.categoryColors = {
      "Thực phẩm tươi sống": "#667eea",
      "Đồ uống": "#764ba2",
      "Bánh kẹo": "#f093fb",
      "Gia vị": "#f5576c",
      "Đồ gia dụng": "#4facfe",
      "Chăm sóc cá nhân": "#00f2fe",
      Khác: "#43e97b",
    }

    this.init()
  }

  init() {
    this.canvas = document.getElementById("supermarketMap")
    if (!this.canvas) return

    this.ctx = this.canvas.getContext("2d")
    this.setupEventListeners()
    this.updateLegend()
    this.draw()
  }

  setupEventListeners() {
    // Mouse events
    this.canvas.addEventListener("mousedown", (e) => this.handleMouseDown(e))
    this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e))
    this.canvas.addEventListener("mouseup", (e) => this.handleMouseUp(e))
    this.canvas.addEventListener("wheel", (e) => this.handleWheel(e))
    this.canvas.addEventListener("click", (e) => this.handleClick(e))

    // Control buttons
    document.getElementById("resetMapBtn")?.addEventListener("click", () => this.resetView())
    document.getElementById("toggleGridBtn")?.addEventListener("click", () => this.toggleGrid())

    // Prevent context menu
    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault())
  }

  handleMouseDown(e) {
    const rect = this.canvas.getBoundingClientRect()
    this.lastMouseX = e.clientX - rect.left
    this.lastMouseY = e.clientY - rect.top
    this.isDragging = true
    this.canvas.style.cursor = "grabbing"
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    if (this.isDragging) {
      const deltaX = mouseX - this.lastMouseX
      const deltaY = mouseY - this.lastMouseY

      this.offsetX += deltaX
      this.offsetY += deltaY

      this.lastMouseX = mouseX
      this.lastMouseY = mouseY

      this.draw()
    } else {
      // Check for hover
      const worldX = (mouseX - this.offsetX) / this.scale
      const worldY = (mouseY - this.offsetY) / this.scale

      const hoveredShelf = this.getShelfAt(worldX, worldY)
      if (hoveredShelf !== this.hoveredShelf) {
        this.hoveredShelf = hoveredShelf
        this.canvas.style.cursor = hoveredShelf ? "pointer" : "grab"
        this.draw()
      }
    }
  }

  handleMouseUp(e) {
    this.isDragging = false
    this.canvas.style.cursor = this.hoveredShelf ? "pointer" : "grab"
  }

  handleWheel(e) {
    e.preventDefault()

    const rect = this.canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const wheel = e.deltaY < 0 ? 1 : -1
    const zoom = Math.exp(wheel * 0.1)
    const newScale = Math.max(0.5, Math.min(3, this.scale * zoom))

    if (newScale !== this.scale) {
      const worldX = (mouseX - this.offsetX) / this.scale
      const worldY = (mouseY - this.offsetY) / this.scale

      this.scale = newScale

      this.offsetX = mouseX - worldX * this.scale
      this.offsetY = mouseY - worldY * this.scale

      this.draw()
    }
  }

  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const worldX = (mouseX - this.offsetX) / this.scale
    const worldY = (mouseY - this.offsetY) / this.scale

    const clickedShelf = this.getShelfAt(worldX, worldY)
    if (clickedShelf) {
      this.selectedShelf = clickedShelf
      this.showShelfDetails(clickedShelf)
      this.draw()
    } else {
      this.selectedShelf = null
      this.draw()
    }
  }

  getShelfAt(x, y) {
    return this.mapData.shelves.find(
      (shelf) => x >= shelf.x && x <= shelf.x + shelf.width && y >= shelf.y && y <= shelf.y + shelf.height,
    )
  }

  showShelfDetails(shelf) {
    const occupancyRate = Math.round((shelf.products / shelf.capacity) * 100)
    const statusColor = occupancyRate >= 90 ? "#ef4444" : occupancyRate >= 70 ? "#f59e0b" : "#10b981"

    Swal.fire({
      title: `Kệ ${shelf.id}`,
      html: `
        <div style="text-align: left; padding: 1rem;">
          <div style="margin-bottom: 1rem;">
            <strong>Danh mục:</strong> ${shelf.category}
          </div>
          <div style="margin-bottom: 1rem;">
            <strong>Số lượng sản phẩm:</strong> ${shelf.products}/${shelf.capacity}
          </div>
          <div style="margin-bottom: 1rem;">
            <strong>Tỷ lệ lấp đầy:</strong> 
            <span style="color: ${statusColor}; font-weight: bold;">${occupancyRate}%</span>
          </div>
          <div style="margin-bottom: 1rem;">
            <div style="background: #f3f4f6; border-radius: 10px; height: 20px; overflow: hidden;">
              <div style="background: ${statusColor}; height: 100%; width: ${occupancyRate}%; transition: width 0.3s ease;"></div>
            </div>
          </div>
          <div style="margin-top: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px; border-left: 4px solid ${statusColor};">
            <strong>Trạng thái:</strong> 
            ${
              occupancyRate >= 90
                ? "Gần đầy - Cần bổ sung"
                : occupancyRate >= 70
                  ? "Bình thường"
                  : "Còn nhiều chỗ trống"
            }
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Quản lý sản phẩm",
      cancelButtonText: "Đóng",
      confirmButtonColor: "#667eea",
      cancelButtonColor: "#64748b",
    }).then((result) => {
      if (result.isConfirmed) {
        // Switch to products tab and filter by shelf
        if (window.SupermarketApp) {
          window.SupermarketApp.switchTab("products")
          // Filter products by shelf if the function exists
          if (window.SupermarketApp.filterProductsByShelf) {
            window.SupermarketApp.filterProductsByShelf(shelf.id)
          }
        }
      }
    })
  }

  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Save context
    this.ctx.save()

    // Apply transformations
    this.ctx.translate(this.offsetX, this.offsetY)
    this.ctx.scale(this.scale, this.scale)

    // Draw grid
    if (this.showGrid) {
      this.drawGrid()
    }

    // Draw map elements
    this.drawShelves()
    this.drawCheckouts()
    this.drawEntrance()
    this.drawStorage()
    this.drawLabels()

    // Restore context
    this.ctx.restore()

    // Draw UI elements (not affected by transformations)
    this.drawZoomInfo()
  }

  drawGrid() {
    const gridSize = 50
    const startX = Math.floor(-this.offsetX / this.scale / gridSize) * gridSize
    const startY = Math.floor(-this.offsetY / this.scale / gridSize) * gridSize
    const endX = startX + this.canvas.width / this.scale + gridSize
    const endY = startY + this.canvas.height / this.scale + gridSize

    this.ctx.strokeStyle = "rgba(0, 0, 0, 0.1)"
    this.ctx.lineWidth = 1 / this.scale

    // Vertical lines
    for (let x = startX; x <= endX; x += gridSize) {
      this.ctx.beginPath()
      this.ctx.moveTo(x, startY)
      this.ctx.lineTo(x, endY)
      this.ctx.stroke()
    }

    // Horizontal lines
    for (let y = startY; y <= endY; y += gridSize) {
      this.ctx.beginPath()
      this.ctx.moveTo(startX, y)
      this.ctx.lineTo(endX, y)
      this.ctx.stroke()
    }
  }

  drawShelves() {
    this.mapData.shelves.forEach((shelf) => {
      const occupancyRate = shelf.products / shelf.capacity
      const baseColor = this.categoryColors[shelf.category] || "#64748b"
      const isSelected = this.selectedShelf && this.selectedShelf.id === shelf.id
      const isHovered = this.hoveredShelf && this.hoveredShelf.id === shelf.id

      // Draw shelf background
      this.ctx.fillStyle = baseColor
      if (isSelected) {
        this.ctx.fillStyle = this.lightenColor(baseColor, 0.3)
      } else if (isHovered) {
        this.ctx.fillStyle = this.lightenColor(baseColor, 0.1)
      }

      this.ctx.fillRect(shelf.x, shelf.y, shelf.width, shelf.height)

      // Draw occupancy indicator
      const indicatorHeight = 6
      const indicatorY = shelf.y + shelf.height - indicatorHeight
      const indicatorWidth = shelf.width * occupancyRate

      this.ctx.fillStyle = occupancyRate >= 0.9 ? "#ef4444" : occupancyRate >= 0.7 ? "#f59e0b" : "#10b981"
      this.ctx.fillRect(shelf.x, indicatorY, indicatorWidth, indicatorHeight)

      // Draw border
      this.ctx.strokeStyle = isSelected ? "#1e293b" : isHovered ? "#475569" : "#e2e8f0"
      this.ctx.lineWidth = isSelected ? 3 / this.scale : isHovered ? 2 / this.scale : 1 / this.scale
      this.ctx.strokeRect(shelf.x, shelf.y, shelf.width, shelf.height)

      // Draw shelf ID
      this.ctx.fillStyle = "#ffffff"
      this.ctx.font = `bold ${12 / this.scale}px Inter`
      this.ctx.textAlign = "center"
      this.ctx.textBaseline = "middle"
      this.ctx.fillText(shelf.id, shelf.x + shelf.width / 2, shelf.y + shelf.height / 2 - 3)

      // Draw occupancy percentage
      this.ctx.font = `${10 / this.scale}px Inter`
      this.ctx.fillText(
        `${Math.round(occupancyRate * 100)}%`,
        shelf.x + shelf.width / 2,
        shelf.y + shelf.height / 2 + 8,
      )
    })
  }

  drawCheckouts() {
    this.mapData.checkouts.forEach((checkout) => {
      // Draw checkout counter
      this.ctx.fillStyle = "#f59e0b"
      this.ctx.fillRect(checkout.x, checkout.y, checkout.width, checkout.height)

      this.ctx.strokeStyle = "#d97706"
      this.ctx.lineWidth = 2 / this.scale
      this.ctx.strokeRect(checkout.x, checkout.y, checkout.width, checkout.height)

      // Draw label
      this.ctx.fillStyle = "#ffffff"
      this.ctx.font = `bold ${12 / this.scale}px Inter`
      this.ctx.textAlign = "center"
      this.ctx.textBaseline = "middle"
      this.ctx.fillText("Thu ngân", checkout.x + checkout.width / 2, checkout.y + checkout.height / 2)
    })
  }

  drawEntrance() {
    const entrance = this.mapData.entrance

    // Draw entrance
    this.ctx.fillStyle = "#10b981"
    this.ctx.fillRect(entrance.x, entrance.y, entrance.width, entrance.height)

    this.ctx.strokeStyle = "#059669"
    this.ctx.lineWidth = 2 / this.scale
    this.ctx.strokeRect(entrance.x, entrance.y, entrance.width, entrance.height)

    // Draw label
    this.ctx.fillStyle = "#ffffff"
    this.ctx.font = `bold ${12 / this.scale}px Inter`
    this.ctx.textAlign = "center"
    this.ctx.textBaseline = "middle"
    this.ctx.fillText("Lối vào", entrance.x + entrance.width / 2, entrance.y + entrance.height / 2)
  }

  drawStorage() {
    const storage = this.mapData.storage

    // Draw storage
    this.ctx.fillStyle = "#64748b"
    this.ctx.fillRect(storage.x, storage.y, storage.width, storage.height)

    this.ctx.strokeStyle = "#475569"
    this.ctx.lineWidth = 2 / this.scale
    this.ctx.strokeRect(storage.x, storage.y, storage.width, storage.height)

    // Draw label
    this.ctx.fillStyle = "#ffffff"
    this.ctx.font = `bold ${12 / this.scale}px Inter`
    this.ctx.textAlign = "center"
    this.ctx.textBaseline = "middle"
    this.ctx.fillText("Kho", storage.x + storage.width / 2, storage.y + storage.height / 2)
  }

  drawLabels() {
    // Draw row labels
    const rows = ["A", "B", "C", "D"]
    rows.forEach((row, index) => {
      const y = 100 + index * 100
      this.ctx.fillStyle = "#374151"
      this.ctx.font = `bold ${16 / this.scale}px Inter`
      this.ctx.textAlign = "center"
      this.ctx.textBaseline = "middle"
      this.ctx.fillText(`Dãy ${row}`, 50, y + 20)
    })
  }

  drawZoomInfo() {
    // Draw zoom level
    this.ctx.save()
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    this.ctx.fillRect(10, 10, 120, 30)
    this.ctx.fillStyle = "#ffffff"
    this.ctx.font = "12px Inter"
    this.ctx.textAlign = "left"
    this.ctx.textBaseline = "middle"
    this.ctx.fillText(`Zoom: ${Math.round(this.scale * 100)}%`, 20, 25)
    this.ctx.restore()
  }

  updateLegend() {
    const legendEl = document.getElementById("mapLegend")
    if (!legendEl) return

    const legendItems = [
      { color: "#10b981", label: "Lối vào", type: "area" },
      { color: "#f59e0b", label: "Thu ngân", type: "area" },
      { color: "#64748b", label: "Kho hàng", type: "area" },
      ...Object.entries(this.categoryColors).map(([category, color]) => ({
        color,
        label: category,
        type: "shelf",
      })),
    ]

    const legendHtml = legendItems
      .map(
        (item) => `
      <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem;">
        <div style="width: 16px; height: 16px; background: ${item.color}; border-radius: ${item.type === "area" ? "4px" : "2px"}; border: 1px solid #e5e7eb;"></div>
        <span style="font-size: 0.875rem; color: #374151;">${item.label}</span>
      </div>
    `,
      )
      .join("")

    legendEl.innerHTML = legendHtml
  }

  resetView() {
    this.scale = 1
    this.offsetX = 0
    this.offsetY = 0
    this.selectedShelf = null
    this.hoveredShelf = null
    this.draw()
  }

  toggleGrid() {
    this.showGrid = !this.showGrid
    const btn = document.getElementById("toggleGridBtn")
    if (btn) {
      btn.innerHTML = this.showGrid ? '<i class="fas fa-th"></i> Ẩn lưới' : '<i class="fas fa-th"></i> Hiện lưới'
    }
    this.draw()
  }

  lightenColor(color, amount) {
    const num = Number.parseInt(color.replace("#", ""), 16)
    const amt = Math.round(2.55 * amount * 100)
    const R = (num >> 16) + amt
    const G = ((num >> 8) & 0x00ff) + amt
    const B = (num & 0x0000ff) + amt
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }

  // Public methods
  highlightShelf(shelfId) {
    const shelf = this.mapData.shelves.find((s) => s.id === shelfId)
    if (shelf) {
      this.selectedShelf = shelf
      // Center the view on the shelf
      this.offsetX = this.canvas.width / 2 - (shelf.x + shelf.width / 2) * this.scale
      this.offsetY = this.canvas.height / 2 - (shelf.y + shelf.height / 2) * this.scale
      this.draw()
    }
  }

  getShelfData() {
    return this.mapData.shelves
  }

  updateShelfData(shelfId, data) {
    const shelf = this.mapData.shelves.find((s) => s.id === shelfId)
    if (shelf) {
      Object.assign(shelf, data)
      this.draw()
    }
  }
}

// Initialize map when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.SupermarketMap = new SupermarketMap()
})
