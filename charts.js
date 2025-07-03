import { Chart } from "@/components/ui/chart"
// Charts System sử dụng Chart.js CDN đã load trong index.html
// Lấy dữ liệu trực tiếp từ biến toàn cục `products` và `PRODUCT_CATEGORIES` khai báo trong script.js

class ChartsSystem {
  constructor() {
    this.charts = {}
    this.chartData = {
      categories: [],
      shelves: [],
      stock: [],
    }
    this.init()
  }

  init() {
    this.prepareData()
    this.createCategoryChart()
    this.createShelfChart()
    this.createStockChart()
    this.updateDashboardStats()
  }

  prepareData() {
    const allProducts = window.products || []
    const categoriesMap = new Map()
    const shelvesMap = new Map()
    const stockMap = { available: 0, "low-stock": 0, "out-of-stock": 0 }

    allProducts.forEach((p) => {
      // Category count
      const catEntry = categoriesMap.get(p.category) || 0
      categoriesMap.set(p.category, catEntry + 1)

      // Shelf count via PRODUCT_CATEGORIES
      const catInfo = window.PRODUCT_CATEGORIES ? window.PRODUCT_CATEGORIES[p.category] : null
      const shelfId = catInfo ? catInfo.shelf_id : "Khác"
      const shelfKey = `Kệ ${shelfId}`
      shelvesMap.set(shelfKey, (shelvesMap.get(shelfKey) || 0) + 1)

      // Stock status
      stockMap[p.status] = (stockMap[p.status] || 0) + 1
    })

    // Build categories array
    const palette = ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe", "#00f2fe", "#43e97b", "#8b5cf6"]
    let colorIdx = 0
    this.chartData.categories = Array.from(categoriesMap.entries()).map(([key, count]) => {
      const catInfo = window.PRODUCT_CATEGORIES ? window.PRODUCT_CATEGORIES[key] : null
      const color = catInfo?.color ? `rgb(${catInfo.color.join(",")})` : palette[colorIdx++ % palette.length]
      return { name: catInfo ? catInfo.name : key, value: count, color }
    })

    // Shelves
    const maxCount = Math.max(...shelvesMap.values(), 1)
    this.chartData.shelves = Array.from(shelvesMap.entries()).map(([name, count]) => {
      const occupancy = Math.round((count / maxCount) * 100)
      return { name, occupancy, capacity: maxCount }
    })

    // Stock status
    this.chartData.stock = [
      { name: "Có sẵn", key: "available", value: stockMap["available"], color: "#10b981" },
      { name: "Sắp hết", key: "low-stock", value: stockMap["low-stock"], color: "#f59e0b" },
      { name: "Hết hàng", key: "out-of-stock", value: stockMap["out-of-stock"], color: "#ef4444" },
    ]
  }

  createCategoryChart() {
    const ctx = document.getElementById("categoryChart")
    if (!ctx) return

    this.charts.category = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: this.chartData.categories.map((cat) => cat.name),
        datasets: [
          {
            data: this.chartData.categories.map((cat) => cat.value),
            backgroundColor: this.chartData.categories.map((cat) => cat.color),
            borderWidth: 0,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.parsed
                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                const percentage = ((value / total) * 100).toFixed(1)
                return `${label}: ${value}% (${percentage}%)`
              },
            },
          },
        },
        animation: {
          animateRotate: true,
          duration: 2000,
        },
      },
    })
  }

  createShelfChart() {
    const ctx = document.getElementById("shelfChart")
    if (!ctx) return

    this.charts.shelf = new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.chartData.shelves.map((shelf) => shelf.name),
        datasets: [
          {
            label: "Tỷ lệ lấp đầy (%)",
            data: this.chartData.shelves.map((shelf) => shelf.occupancy),
            backgroundColor: "rgba(102, 126, 234, 0.8)",
            borderColor: "rgba(102, 126, 234, 1)",
            borderWidth: 1,
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => `Lấp đầy: ${context.parsed.y}%`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: (value) => value + "%",
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        animation: {
          duration: 2000,
          easing: "easeInOutQuart",
        },
      },
    })
  }

  createStockChart() {
    const ctx = document.getElementById("stockChart")
    if (!ctx) return

    this.charts.stock = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: this.chartData.stock.map((s) => s.name),
        datasets: [
          {
            data: this.chartData.stock.map((s) => s.value),
            backgroundColor: this.chartData.stock.map((s) => s.color),
            borderWidth: 0,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 20,
              usePointStyle: true,
              font: { size: 12 },
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed} sản phẩm`,
            },
          },
        },
        animation: { animateRotate: true, duration: 1800 },
      },
    })
  }

  updateDashboardStats() {
    // Update popular categories
    const popularCategoriesEl = document.getElementById("popularCategories")
    if (popularCategoriesEl) {
      const topCategories = this.chartData.categories
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)
        .map(
          (cat, index) => `
        <div class="category-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid #f3f4f6;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: ${cat.color};"></div>
            <span style="font-weight: 500; color: #374151;">${cat.name}</span>
          </div>
          <span style="font-weight: 600; color: #667eea;">${cat.value}%</span>
        </div>
      `,
        )
        .join("")

      popularCategoriesEl.innerHTML = topCategories
    }

    // Update recent activity
    const recentActivityEl = document.getElementById("recentActivity")
    if (recentActivityEl) {
      const activities = [
        {
          action: "Thêm sản phẩm mới",
          item: "Sữa tươi Vinamilk",
          time: "5 phút trước",
          icon: "fas fa-plus",
          color: "#10b981",
        },
        {
          action: "Cập nhật giá",
          item: "Bánh mì sandwich",
          time: "15 phút trước",
          icon: "fas fa-edit",
          color: "#f59e0b",
        },
        {
          action: "Xóa sản phẩm",
          item: "Nước ngọt hết hạn",
          time: "1 giờ trước",
          icon: "fas fa-trash",
          color: "#ef4444",
        },
        {
          action: "Thêm danh mục",
          item: "Đồ chơi trẻ em",
          time: "2 giờ trước",
          icon: "fas fa-folder-plus",
          color: "#8b5cf6",
        },
      ]

      const activitiesHtml = activities
        .map(
          (activity) => `
        <div class="activity-item" style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem 0; border-bottom: 1px solid #f3f4f6;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: ${activity.color}20; display: flex; align-items: center; justify-content: center;">
            <i class="${activity.icon}" style="color: ${activity.color}; font-size: 0.875rem;"></i>
          </div>
          <div style="flex: 1;">
            <div style="font-weight: 500; color: #374151; margin-bottom: 0.25rem;">${activity.action}</div>
            <div style="font-size: 0.875rem; color: #6b7280;">${activity.item}</div>
          </div>
          <div style="font-size: 0.75rem; color: #9ca3af;">${activity.time}</div>
        </div>
      `,
        )
        .join("")

      recentActivityEl.innerHTML = activitiesHtml
    }
  }

  updateChartData(chartType, newData) {
    if (this.charts[chartType]) {
      this.charts[chartType].data = newData
      this.charts[chartType].update()
    }
  }

  refreshCharts() {
    Object.values(this.charts).forEach((chart) => {
      chart.update()
    })
  }

  destroyCharts() {
    Object.values(this.charts).forEach((chart) => {
      chart.destroy()
    })
    this.charts = {}
  }
}

// Initialize charts when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.ChartsSystem = new ChartsSystem()
})
