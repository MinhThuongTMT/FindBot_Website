import { Chart } from "@/components/ui/chart"
// Charts and Analytics System
const products = [] // Declare products variable
const PRODUCT_CATEGORIES = {} // Declare PRODUCT_CATEGORIES variable

class ChartsSystem {
  constructor() {
    this.charts = {}
    this.chartColors = {
      primary: "#667eea",
      secondary: "#764ba2",
      success: "#10b981",
      warning: "#f59e0b",
      danger: "#ef4444",
      info: "#3b82f6",
      light: "#f8fafc",
      dark: "#1e293b",
    }
    this.init()
  }

  init() {
    // Initialize charts when analytics tab is shown
    document.addEventListener("DOMContentLoaded", () => {
      this.setupChartEventListeners()
    })
  }

  setupChartEventListeners() {
    // Listen for tab changes
    const navItems = document.querySelectorAll(".nav-item")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (item.dataset.tab === "analytics") {
          setTimeout(() => this.initializeAllCharts(), 100)
        }
      })
    })

    // Refresh charts button
    this.addRefreshButton()
  }

  addRefreshButton() {
    const analyticsHeader = document.querySelector(".analytics-header")
    if (analyticsHeader) {
      const refreshBtn = document.createElement("button")
      refreshBtn.className = "btn btn-secondary"
      refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Làm mới biểu đồ'
      refreshBtn.addEventListener("click", () => {
        this.destroyCharts()
        setTimeout(() => this.initializeAllCharts(), 100)
      })
      analyticsHeader.appendChild(refreshBtn)
    }
  }

  initializeAllCharts() {
    this.createCategoryChart()
    this.createShelfOccupancyChart()
    this.createProductStatusChart()
    this.createPriceDistributionChart()
    this.createInventoryTrendChart()
    this.createTopProductsChart()
  }

  createCategoryChart() {
    const ctx = document.getElementById("categoryChart")
    if (!ctx) return

    // Destroy existing chart
    if (this.charts.categoryChart) {
      this.charts.categoryChart.destroy()
    }

    // Calculate category data
    const categoryData = this.getCategoryData()

    this.charts.categoryChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: categoryData.labels,
        datasets: [
          {
            data: categoryData.data,
            backgroundColor: categoryData.colors,
            borderWidth: 3,
            borderColor: "#ffffff",
            hoverBorderWidth: 5,
            hoverBorderColor: "#ffffff",
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
                family: "Inter",
              },
              generateLabels: (chart) => {
                const data = chart.data
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const value = data.datasets[0].data[i]
                    const total = data.datasets[0].data.reduce((a, b) => a + b, 0)
                    const percentage = ((value / total) * 100).toFixed(1)
                    return {
                      text: `${label} (${percentage}%)`,
                      fillStyle: data.datasets[0].backgroundColor[i],
                      strokeStyle: data.datasets[0].borderColor,
                      lineWidth: data.datasets[0].borderWidth,
                      pointStyle: "circle",
                      hidden: false,
                      index: i,
                    }
                  })
                }
                return []
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "#667eea",
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.parsed
                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                const percentage = ((value / total) * 100).toFixed(1)
                return `${label}: ${value} sản phẩm (${percentage}%)`
              },
            },
          },
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000,
          easing: "easeOutQuart",
        },
        cutout: "60%",
      },
    })
  }

  createShelfOccupancyChart() {
    const ctx = document.getElementById("shelfChart")
    if (!ctx) return

    // Destroy existing chart
    if (this.charts.shelfChart) {
      this.charts.shelfChart.destroy()
    }

    const shelfData = this.getShelfOccupancyData()

    this.charts.shelfChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: shelfData.labels,
        datasets: [
          {
            label: "Số lượng sản phẩm",
            data: shelfData.data,
            backgroundColor: this.createGradient(ctx, this.chartColors.primary, this.chartColors.secondary),
            borderColor: this.chartColors.primary,
            borderWidth: 2,
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
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "#667eea",
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              title: (context) => `Kệ ${context[0].label}`,
              label: (context) => `Số sản phẩm: ${context.parsed.y}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: "#64748b",
              font: {
                family: "Inter",
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
              drawBorder: false,
            },
          },
          x: {
            ticks: {
              color: "#64748b",
              font: {
                family: "Inter",
              },
            },
            grid: {
              display: false,
            },
          },
        },
        animation: {
          duration: 1000,
          easing: "easeOutQuart",
        },
      },
    })
  }

  createProductStatusChart() {
    // Add this chart to analytics section
    const analyticsGrid = document.querySelector(".analytics-grid")
    if (!analyticsGrid) return

    // Check if chart container already exists
    let statusChartContainer = document.getElementById("statusChartContainer")
    if (!statusChartContainer) {
      statusChartContainer = document.createElement("div")
      statusChartContainer.id = "statusChartContainer"
      statusChartContainer.className = "analytics-card"
      statusChartContainer.innerHTML = `
        <h3>Trạng Thái Sản Phẩm</h3>
        <div class="chart-container">
          <canvas id="statusChart"></canvas>
        </div>
      `
      analyticsGrid.appendChild(statusChartContainer)
    }

    const ctx = document.getElementById("statusChart")
    if (!ctx) return

    // Destroy existing chart
    if (this.charts.statusChart) {
      this.charts.statusChart.destroy()
    }

    const statusData = this.getProductStatusData()

    this.charts.statusChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: statusData.labels,
        datasets: [
          {
            data: statusData.data,
            backgroundColor: [
              this.chartColors.success, // Available - Green
              this.chartColors.warning, // Low Stock - Yellow
              this.chartColors.danger, // Out of Stock - Red
            ],
            borderColor: ["#ffffff", "#ffffff", "#ffffff"],
            borderWidth: 3,
            hoverBorderWidth: 5,
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
                family: "Inter",
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "#667eea",
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.parsed
                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                const percentage = ((value / total) * 100).toFixed(1)
                return `${label}: ${value} (${percentage}%)`
              },
            },
          },
        },
        animation: {
          animateRotate: true,
          duration: 1000,
          easing: "easeOutQuart",
        },
      },
    })
  }

  createPriceDistributionChart() {
    // Add this chart to analytics section
    const analyticsGrid = document.querySelector(".analytics-grid")
    if (!analyticsGrid) return

    // Check if chart container already exists
    let priceChartContainer = document.getElementById("priceChartContainer")
    if (!priceChartContainer) {
      priceChartContainer = document.createElement("div")
      priceChartContainer.id = "priceChartContainer"
      priceChartContainer.className = "analytics-card"
      priceChartContainer.innerHTML = `
        <h3>Phân Bố Giá Sản Phẩm</h3>
        <div class="chart-container">
          <canvas id="priceChart"></canvas>
        </div>
      `
      analyticsGrid.appendChild(priceChartContainer)
    }

    const ctx = document.getElementById("priceChart")
    if (!ctx) return

    // Destroy existing chart
    if (this.charts.priceChart) {
      this.charts.priceChart.destroy()
    }

    const priceData = this.getPriceDistributionData()

    this.charts.priceChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: priceData.labels,
        datasets: [
          {
            label: "Số lượng sản phẩm",
            data: priceData.data,
            borderColor: this.chartColors.primary,
            backgroundColor: this.createGradient(ctx, this.chartColors.primary, "transparent", 0.1),
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: this.chartColors.primary,
            pointBorderColor: "#ffffff",
            pointBorderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 8,
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
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "#667eea",
            borderWidth: 1,
            cornerRadius: 8,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: "#64748b",
              font: {
                family: "Inter",
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
              drawBorder: false,
            },
          },
          x: {
            title: {
              display: true,
              text: "Khoảng giá (VNĐ)",
              color: "#64748b",
              font: {
                family: "Inter",
                weight: "500",
              },
            },
            ticks: {
              color: "#64748b",
              font: {
                family: "Inter",
              },
            },
            grid: {
              display: false,
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        animation: {
          duration: 1000,
          easing: "easeOutQuart",
        },
      },
    })
  }

  createInventoryTrendChart() {
    // Add this chart to analytics section
    const analyticsGrid = document.querySelector(".analytics-grid")
    if (!analyticsGrid) return

    // Check if chart container already exists
    let trendChartContainer = document.getElementById("trendChartContainer")
    if (!trendChartContainer) {
      trendChartContainer = document.createElement("div")
      trendChartContainer.id = "trendChartContainer"
      trendChartContainer.className = "analytics-card"
      trendChartContainer.innerHTML = `
        <h3>Xu Hướng Tồn Kho</h3>
        <div class="chart-container">
          <canvas id="trendChart"></canvas>
        </div>
      `
      analyticsGrid.appendChild(trendChartContainer)
    }

    const ctx = document.getElementById("trendChart")
    if (!ctx) return

    // Destroy existing chart
    if (this.charts.trendChart) {
      this.charts.trendChart.destroy()
    }

    const trendData = this.getInventoryTrendData()

    this.charts.trendChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: trendData.labels,
        datasets: [
          {
            label: "Tổng sản phẩm",
            data: trendData.totalProducts,
            borderColor: this.chartColors.primary,
            backgroundColor: this.chartColors.primary + "20",
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointRadius: 5,
          },
          {
            label: "Sản phẩm có sẵn",
            data: trendData.availableProducts,
            borderColor: this.chartColors.success,
            backgroundColor: this.chartColors.success + "20",
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointRadius: 5,
          },
          {
            label: "Sản phẩm sắp hết",
            data: trendData.lowStockProducts,
            borderColor: this.chartColors.warning,
            backgroundColor: this.chartColors.warning + "20",
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              usePointStyle: true,
              font: {
                family: "Inter",
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "#667eea",
            borderWidth: 1,
            cornerRadius: 8,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "#64748b",
              font: {
                family: "Inter",
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
              drawBorder: false,
            },
          },
          x: {
            ticks: {
              color: "#64748b",
              font: {
                family: "Inter",
              },
            },
            grid: {
              display: false,
            },
          },
        },
        animation: {
          duration: 1000,
          easing: "easeOutQuart",
        },
      },
    })
  }

  createTopProductsChart() {
    // Add this chart to analytics section
    const analyticsGrid = document.querySelector(".analytics-grid")
    if (!analyticsGrid) return

    // Check if chart container already exists
    let topProductsContainer = document.getElementById("topProductsContainer")
    if (!topProductsContainer) {
      topProductsContainer = document.createElement("div")
      topProductsContainer.id = "topProductsContainer"
      topProductsContainer.className = "analytics-card"
      topProductsContainer.innerHTML = `
        <h3>Top Sản Phẩm Theo Số Lượng</h3>
        <div class="chart-container">
          <canvas id="topProductsChart"></canvas>
        </div>
      `
      analyticsGrid.appendChild(topProductsContainer)
    }

    const ctx = document.getElementById("topProductsChart")
    if (!ctx) return

    // Destroy existing chart
    if (this.charts.topProductsChart) {
      this.charts.topProductsChart.destroy()
    }

    const topProductsData = this.getTopProductsData()

    this.charts.topProductsChart = new Chart(ctx, {
      type: "horizontalBar",
      data: {
        labels: topProductsData.labels,
        datasets: [
          {
            label: "Số lượng",
            data: topProductsData.data,
            backgroundColor: this.createGradient(ctx, this.chartColors.info, this.chartColors.primary),
            borderColor: this.chartColors.info,
            borderWidth: 2,
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "#667eea",
            borderWidth: 1,
            cornerRadius: 8,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: "#64748b",
              font: {
                family: "Inter",
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: "#64748b",
              font: {
                family: "Inter",
                size: 11,
              },
            },
            grid: {
              display: false,
            },
          },
        },
        animation: {
          duration: 1000,
          easing: "easeOutQuart",
        },
      },
    })
  }

  // Data calculation methods
  getCategoryData() {
    const categoryCount = {}
    const categoryColors = {}

    // Count products by category
    products.forEach((product) => {
      const category = PRODUCT_CATEGORIES[product.category]
      if (category) {
        categoryCount[category.name] = (categoryCount[category.name] || 0) + 1
        if (!categoryColors[category.name]) {
          const [r, g, b] = category.color
          categoryColors[category.name] = `rgba(${r}, ${g}, ${b}, 0.8)`
        }
      }
    })

    return {
      labels: Object.keys(categoryCount),
      data: Object.values(categoryCount),
      colors: Object.keys(categoryCount).map((name) => categoryColors[name]),
    }
  }

  getShelfOccupancyData() {
    const shelfCount = {}

    // Count products by shelf
    products.forEach((product) => {
      const category = PRODUCT_CATEGORIES[product.category]
      if (category) {
        const shelfId = category.shelf_id
        shelfCount[shelfId] = (shelfCount[shelfId] || 0) + 1
      }
    })

    // Sort by shelf ID
    const sortedShelves = Object.keys(shelfCount).sort((a, b) => Number.parseInt(a) - Number.parseInt(b))

    return {
      labels: sortedShelves,
      data: sortedShelves.map((shelfId) => shelfCount[shelfId]),
    }
  }

  getProductStatusData() {
    const statusCount = {
      "Có sẵn": 0,
      "Sắp hết": 0,
      "Hết hàng": 0,
    }

    products.forEach((product) => {
      switch (product.status) {
        case "available":
          statusCount["Có sẵn"]++
          break
        case "low_stock":
          statusCount["Sắp hết"]++
          break
        case "out_of_stock":
          statusCount["Hết hàng"]++
          break
      }
    })

    return {
      labels: Object.keys(statusCount),
      data: Object.values(statusCount),
    }
  }

  getPriceDistributionData() {
    const priceRanges = {
      "0-50K": 0,
      "50K-100K": 0,
      "100K-200K": 0,
      "200K-500K": 0,
      "500K+": 0,
    }

    products.forEach((product) => {
      const price = product.price
      if (price < 50000) {
        priceRanges["0-50K"]++
      } else if (price < 100000) {
        priceRanges["50K-100K"]++
      } else if (price < 200000) {
        priceRanges["100K-200K"]++
      } else if (price < 500000) {
        priceRanges["200K-500K"]++
      } else {
        priceRanges["500K+"]++
      }
    })

    return {
      labels: Object.keys(priceRanges),
      data: Object.values(priceRanges),
    }
  }

  getInventoryTrendData() {
    // Generate mock trend data for the last 7 days
    const labels = []
    const totalProducts = []
    const availableProducts = []
    const lowStockProducts = []

    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      labels.push(date.toLocaleDateString("vi-VN", { month: "short", day: "numeric" }))

      // Mock data with some variation
      const total = products.length + Math.floor(Math.random() * 10) - 5
      const available = products.filter((p) => p.status === "available").length + Math.floor(Math.random() * 5) - 2
      const lowStock = products.filter((p) => p.status === "low_stock").length + Math.floor(Math.random() * 3) - 1

      totalProducts.push(Math.max(0, total))
      availableProducts.push(Math.max(0, available))
      lowStockProducts.push(Math.max(0, lowStock))
    }

    return {
      labels,
      totalProducts,
      availableProducts,
      lowStockProducts,
    }
  }

  getTopProductsData() {
    // Get top 5 products by quantity
    const sortedProducts = [...products]
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)
      .reverse() // Reverse for horizontal bar chart

    return {
      labels: sortedProducts.map((p) => (p.name.length > 20 ? p.name.substring(0, 20) + "..." : p.name)),
      data: sortedProducts.map((p) => p.quantity),
    }
  }

  // Utility methods
  createGradient(ctx, color1, color2, opacity = 1) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(
      0,
      color1 +
        Math.floor(opacity * 255)
          .toString(16)
          .padStart(2, "0"),
    )
    gradient.addColorStop(
      1,
      color2 +
        Math.floor(opacity * 255)
          .toString(16)
          .padStart(2, "0"),
    )
    return gradient
  }

  updateCharts() {
    // Update all charts with new data
    Object.values(this.charts).forEach((chart) => {
      if (chart && typeof chart.update === "function") {
        chart.update()
      }
    })
  }

  destroyCharts() {
    Object.values(this.charts).forEach((chart) => {
      if (chart && typeof chart.destroy === "function") {
        chart.destroy()
      }
    })
    this.charts = {}
  }

  // Export chart data
  exportChartData() {
    const data = {
      categories: this.getCategoryData(),
      shelves: this.getShelfOccupancyData(),
      status: this.getProductStatusData(),
      prices: this.getPriceDistributionData(),
      trends: this.getInventoryTrendData(),
      topProducts: this.getTopProductsData(),
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `supermarket-analytics-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Print charts
  printCharts() {
    const printWindow = window.open("", "_blank")
    const chartsHtml = Array.from(document.querySelectorAll(".analytics-card"))
      .map((card) => card.outerHTML)
      .join("")

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Báo cáo thống kê - Findbot</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .analytics-card { margin-bottom: 30px; page-break-inside: avoid; }
          h3 { color: #1e293b; margin-bottom: 15px; }
          canvas { max-width: 100%; height: auto; }
        </style>
      </head>
      <body>
        <h1>Báo cáo thống kê - Findbot Supermarket</h1>
        <p>Ngày xuất: ${new Date().toLocaleDateString("vi-VN")}</p>
        ${chartsHtml}
      </body>
      </html>
    `)

    printWindow.document.close()
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 1000)
  }
}

// Initialize charts system
const chartsSystem = new ChartsSystem()

// Add export and print buttons to analytics header
document.addEventListener("DOMContentLoaded", () => {
  const analyticsHeader = document.querySelector(".analytics-header")
  if (analyticsHeader) {
    const buttonGroup = document.createElement("div")
    buttonGroup.className = "analytics-actions"
    buttonGroup.style.display = "flex"
    buttonGroup.style.gap = "0.5rem"

    const exportBtn = document.createElement("button")
    exportBtn.className = "btn btn-outline"
    exportBtn.innerHTML = '<i class="fas fa-download"></i> Xuất dữ liệu'
    exportBtn.addEventListener("click", () => chartsSystem.exportChartData())

    const printBtn = document.createElement("button")
    printBtn.className = "btn btn-outline"
    printBtn.innerHTML = '<i class="fas fa-print"></i> In báo cáo'
    printBtn.addEventListener("click", () => chartsSystem.printCharts())

    buttonGroup.appendChild(exportBtn)
    buttonGroup.appendChild(printBtn)
    analyticsHeader.appendChild(buttonGroup)
  }
})
