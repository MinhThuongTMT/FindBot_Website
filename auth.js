// Enhanced Authentication System with 10-second Loading
class AuthenticationSystem {
  constructor() {
    this.currentUser = null
    this.users = this.loadUsers()
    this.sessionTimeout = 30 * 60 * 1000 // 30 minutes
    this.sessionTimer = null
    this.loginAttempts = new Map()
    this.maxLoginAttempts = 5
    this.lockoutDuration = 15 * 60 * 1000 // 15 minutes
    this.loadingDuration = 10000 // 10 seconds

    this.init()
  }

  init() {
    this.loadSampleUsers()
    this.setupEventListeners()
    this.startLoadingSequence()
  }

  startLoadingSequence() {
    const loadingScreen = document.getElementById("loadingScreen")
    const progressFill = document.getElementById("progressFill")
    const loadingText = document.getElementById("loadingText")
    const loadingPercentage = document.getElementById("loadingPercentage")

    const loadingSteps = [
      { text: "Đang khởi tạo hệ thống...", duration: 1000 },
      { text: "Đang tải cơ sở dữ liệu...", duration: 1500 },
      { text: "Đang kiểm tra kết nối...", duration: 1000 },
      { text: "Đang cấu hình bảo mật...", duration: 1500 },
      { text: "Đang tải giao diện...", duration: 1500 },
      { text: "Đang hoàn tất thiết lập...", duration: 1000 },
      { text: "Sẵn sàng sử dụng!", duration: 2500 },
    ]

    let currentStep = 0
    let totalProgress = 0
    const totalDuration = loadingSteps.reduce((sum, step) => sum + step.duration, 0)

    const updateProgress = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        loadingText.textContent = step.text

        const stepProgress = (step.duration / totalDuration) * 100
        const targetProgress = totalProgress + stepProgress

        // Animate progress bar
        const startProgress = totalProgress
        const startTime = Date.now()

        const animateProgress = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / step.duration, 1)
          const currentProgress = startProgress + stepProgress * progress

          progressFill.style.width = `${currentProgress}%`
          loadingPercentage.textContent = `${Math.round(currentProgress)}%`

          if (progress < 1) {
            requestAnimationFrame(animateProgress)
          } else {
            totalProgress = targetProgress
            currentStep++
            if (currentStep < loadingSteps.length) {
              setTimeout(updateProgress, 100)
            } else {
              // Loading complete
              setTimeout(() => {
                this.hideLoadingScreen()
              }, 500)
            }
          }
        }

        animateProgress()
      }
    }

    updateProgress()
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen")
    const authContainer = document.getElementById("authContainer")

    loadingScreen.classList.add("hidden")

    setTimeout(() => {
      loadingScreen.style.display = "none"
      authContainer.style.display = "flex"
      this.checkAuthStatus()
    }, 500)
  }

  loadSampleUsers() {
    if (this.users.length === 0) {
      this.users = [
        {
          id: 1,
          username: "admin",
          email: "admin@findbot.com",
          password: this.hashPassword("admin123"),
          firstName: "Quản Trị",
          lastName: "Viên",
          role: "manager",
          avatar: "/placeholder.svg?height=100&width=100",
          phone: "0123456789",
          joinDate: new Date("2024-01-01").toISOString(),
          lastLogin: null,
          isActive: true,
          emailVerified: true,
        },
        {
          id: 2,
          username: "staff01",
          email: "staff@findbot.com",
          password: this.hashPassword("staff123"),
          firstName: "Nhân Viên",
          lastName: "Một",
          role: "staff",
          avatar: "/placeholder.svg?height=100&width=100",
          phone: "0987654321",
          joinDate: new Date("2024-02-01").toISOString(),
          lastLogin: null,
          isActive: true,
          emailVerified: true,
        },
        {
          id: 3,
          username: "viewer01",
          email: "viewer@findbot.com",
          password: this.hashPassword("viewer123"),
          firstName: "Người Xem",
          lastName: "Một",
          role: "viewer",
          avatar: "/placeholder.svg?height=100&width=100",
          phone: "0555666777",
          joinDate: new Date("2024-03-01").toISOString(),
          lastLogin: null,
          isActive: true,
          emailVerified: true,
        },
      ]
      this.saveUsers()
    }
  }

  setupEventListeners() {
    // Form switching
    document.getElementById("showRegisterForm")?.addEventListener("click", (e) => {
      e.preventDefault()
      this.switchToRegister()
    })

    document.getElementById("showLoginForm")?.addEventListener("click", (e) => {
      e.preventDefault()
      this.switchToLogin()
    })

    document.getElementById("forgotPasswordLink")?.addEventListener("click", (e) => {
      e.preventDefault()
      this.switchToForgotPassword()
    })

    document.getElementById("backToLogin")?.addEventListener("click", (e) => {
      e.preventDefault()
      this.switchToLogin()
    })

    // Form submissions
    document.getElementById("loginForm")?.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleLogin()
    })

    document.getElementById("registerForm")?.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleRegister()
    })

    document.getElementById("forgotForm")?.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleForgotPassword()
    })

    // Password toggles
    document.querySelectorAll(".password-toggle").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault()
        this.togglePasswordVisibility(btn)
      })
    })

    // Real-time validation
    document.getElementById("registerEmail")?.addEventListener("blur", (e) => {
      this.validateEmail(e.target.value, "emailValidation")
    })

    document.getElementById("registerUsername")?.addEventListener("blur", (e) => {
      this.validateUsername(e.target.value, "usernameValidation")
    })

    document.getElementById("registerPassword")?.addEventListener("input", (e) => {
      this.checkPasswordStrength(e.target.value, "passwordStrength")
    })

    document.getElementById("confirmPassword")?.addEventListener("input", (e) => {
      this.validatePasswordMatch("registerPassword", "confirmPassword", "confirmPasswordValidation")
    })

    // Demo accounts
    document.getElementById("demoAccountsBtn")?.addEventListener("click", () => {
      this.showDemoAccounts()
    })

    // Terms and Privacy
    document.getElementById("termsLink")?.addEventListener("click", (e) => {
      e.preventDefault()
      this.showModal("termsModal")
    })

    document.getElementById("privacyLink")?.addEventListener("click", (e) => {
      e.preventDefault()
      this.showModal("privacyModal")
    })

    // User dropdown and profile
    document.getElementById("userDropdown")?.addEventListener("click", () => {
      this.toggleUserDropdown()
    })

    document.getElementById("profileBtn")?.addEventListener("click", (e) => {
      e.preventDefault()
      this.showProfileModal()
    })

    document.getElementById("changePasswordBtn")?.addEventListener("click", (e) => {
      e.preventDefault()
      this.showChangePasswordModal()
    })

    document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
      e.preventDefault()
      this.handleLogout()
    })

    // Profile form
    document.getElementById("saveProfileBtn")?.addEventListener("click", () => {
      this.saveProfile()
    })

    document.getElementById("cancelProfileBtn")?.addEventListener("click", () => {
      this.closeModal("profileModal")
    })

    // Change password form
    document.getElementById("savePasswordBtn")?.addEventListener("click", () => {
      this.changePassword()
    })

    document.getElementById("cancelPasswordBtn")?.addEventListener("click", () => {
      this.closeModal("changePasswordModal")
    })

    // Modal close buttons
    document.querySelectorAll(".modal-close").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal")
        if (modal) {
          this.closeModal(modal.id)
        }
      })
    })

    // Close modals on outside click
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.closeModal(e.target.id)
      }
      if (!e.target.closest(".user-profile")) {
        this.closeUserDropdown()
      }
    })

    // Session activity tracking
    ;["mousedown", "mousemove", "keypress", "scroll", "touchstart"].forEach((event) => {
      document.addEventListener(event, () => this.resetSessionTimer(), true)
    })
  }

  // Form Switching Methods
  switchToLogin() {
    this.hideAllAuthCards()
    setTimeout(() => {
      document.getElementById("loginCard").classList.add("active")
    }, 300)
  }

  switchToRegister() {
    this.hideAllAuthCards()
    setTimeout(() => {
      document.getElementById("registerCard").classList.add("active")
    }, 300)
  }

  switchToForgotPassword() {
    this.hideAllAuthCards()
    setTimeout(() => {
      document.getElementById("forgotCard").classList.add("active")
    }, 300)
  }

  hideAllAuthCards() {
    document.querySelectorAll(".auth-card").forEach((card) => {
      card.classList.remove("active")
    })
  }

  // Authentication Methods
  async handleLogin() {
    const form = document.getElementById("loginForm")
    const submitBtn = document.getElementById("loginBtn")
    const email = document.getElementById("loginEmail").value.trim()
    const password = document.getElementById("loginPassword").value
    const rememberMe = document.getElementById("rememberMe").checked

    if (!email || !password) {
      this.showAlert("error", "Lỗi", "Vui lòng điền đầy đủ thông tin!")
      return
    }

    // Check for account lockout
    if (this.isAccountLocked(email)) {
      this.showAlert(
        "error",
        "Tài khoản bị khóa",
        "Tài khoản đã bị khóa do đăng nhập sai quá nhiều lần. Vui lòng thử lại sau 15 phút.",
      )
      return
    }

    this.setButtonLoading(submitBtn, true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = this.users.find(
        (u) => (u.email === email || u.username === email) && u.isActive && this.verifyPassword(password, u.password),
      )

      if (user) {
        // Reset login attempts on successful login
        this.loginAttempts.delete(email)

        // Update user login info
        user.lastLogin = new Date().toISOString()
        this.currentUser = user
        this.saveUsers()

        if (rememberMe) {
          localStorage.setItem(
            "findbot_remember_user",
            JSON.stringify({
              id: user.id,
              token: this.generateToken(),
            }),
          )
        }

        this.showAuthenticatedApp()
        this.showAlert("success", "Đăng nhập thành công!", `Chào mừng ${user.firstName} ${user.lastName}`, 2000)
      } else {
        // Track failed login attempts
        this.trackFailedLogin(email)
        this.showAlert("error", "Đăng nhập thất bại", "Email/tên đăng nhập hoặc mật khẩu không đúng!")
      }
    } catch (error) {
      this.showAlert("error", "Lỗi hệ thống", "Có lỗi xảy ra, vui lòng thử lại!")
    } finally {
      this.setButtonLoading(submitBtn, false)
    }
  }

  async handleRegister() {
    const form = document.getElementById("registerForm")
    const submitBtn = document.getElementById("registerBtn")

    const formData = {
      firstName: document.getElementById("registerFirstName").value.trim(),
      lastName: document.getElementById("registerLastName").value.trim(),
      email: document.getElementById("registerEmail").value.trim(),
      username: document.getElementById("registerUsername").value.trim(),
      password: document.getElementById("registerPassword").value,
      confirmPassword: document.getElementById("confirmPassword").value,
      role: document.getElementById("registerRole").value,
      phone: document.getElementById("registerPhone").value.trim(),
      agreeTerms: document.getElementById("agreeTerms").checked,
    }

    // Validation
    if (!this.validateRegistrationForm(formData)) {
      return
    }

    this.setButtonLoading(submitBtn, true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if user already exists
      if (this.users.find((u) => u.email === formData.email || u.username === formData.username)) {
        this.showAlert("error", "Lỗi", "Email hoặc tên đăng nhập đã tồn tại!")
        return
      }

      // Create new user
      const newUser = {
        id: Math.max(...this.users.map((u) => u.id), 0) + 1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        password: this.hashPassword(formData.password),
        role: formData.role,
        phone: formData.phone,
        avatar: "/placeholder.svg?height=100&width=100",
        joinDate: new Date().toISOString(),
        lastLogin: null,
        isActive: true,
        emailVerified: false,
      }

      this.users.push(newUser)
      this.saveUsers()

      this.showAlert("success", "Đăng ký thành công!", "Tài khoản đã được tạo. Vui lòng đăng nhập.", 3000)

      // Clear form and switch to login
      form.reset()
      setTimeout(() => this.switchToLogin(), 2000)
    } catch (error) {
      this.showAlert("error", "Lỗi hệ thống", "Có lỗi xảy ra, vui lòng thử lại!")
    } finally {
      this.setButtonLoading(submitBtn, false)
    }
  }

  async handleForgotPassword() {
    const submitBtn = document.getElementById("forgotBtn")
    const email = document.getElementById("forgotEmail").value.trim()

    if (!email) {
      this.showAlert("error", "Lỗi", "Vui lòng nhập địa chỉ email!")
      return
    }

    if (!this.isValidEmail(email)) {
      this.showAlert("error", "Lỗi", "Địa chỉ email không hợp lệ!")
      return
    }

    this.setButtonLoading(submitBtn, true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const user = this.users.find((u) => u.email === email)

      if (user) {
        // In a real app, you would send an email here
        this.showAlert(
          "success",
          "Email đã được gửi!",
          "Vui lòng kiểm tra email để nhận hướng dẫn đặt lại mật khẩu.",
          5000,
        )
      } else {
        // Don't reveal if email exists for security
        this.showAlert(
          "success",
          "Email đã được gửi!",
          "Nếu email tồn tại trong hệ thống, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu.",
          5000,
        )
      }

      setTimeout(() => this.switchToLogin(), 3000)
    } catch (error) {
      this.showAlert("error", "Lỗi hệ thống", "Có lỗi xảy ra, vui lòng thử lại!")
    } finally {
      this.setButtonLoading(submitBtn, false)
    }
  }

  handleLogout() {
    const Swal = window.Swal // Declare Swal variable
    Swal.fire({
      title: "Đăng xuất",
      text: "Bạn có chắc chắn muốn đăng xuất?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
    }).then((result) => {
      if (result.isConfirmed) {
        this.performLogout()
      }
    })
  }

  performLogout() {
    this.currentUser = null
    localStorage.removeItem("findbot_remember_user")
    localStorage.removeItem("findbot_session_token")
    this.clearSessionTimer()

    // Hide app and show auth
    document.getElementById("appContainer").style.display = "none"
    document.getElementById("authContainer").style.display = "flex"

    this.switchToLogin()

    this.showAlert("success", "Đã đăng xuất", "Hẹn gặp lại bạn!", 2000)
  }

  // Profile Management
  showProfileModal() {
    if (!this.currentUser) return

    const modal = document.getElementById("profileModal")

    // Populate form
    document.getElementById("profileFirstName").value = this.currentUser.firstName
    document.getElementById("profileLastName").value = this.currentUser.lastName
    document.getElementById("profileEmail").value = this.currentUser.email
    document.getElementById("profileUsername").value = this.currentUser.username
    document.getElementById("profilePhone").value = this.currentUser.phone || ""
    document.getElementById("profileRole").value = this.getRoleDisplayName(this.currentUser.role)
    document.getElementById("profileAvatar").src = this.currentUser.avatar

    // Update stats
    document.getElementById("profileJoinDate").textContent = new Date(this.currentUser.joinDate).toLocaleDateString(
      "vi-VN",
    )
    document.getElementById("profileLastLogin").textContent = this.currentUser.lastLogin
      ? new Date(this.currentUser.lastLogin).toLocaleDateString("vi-VN")
      : "Chưa có"

    this.showModal("profileModal")
    this.closeUserDropdown()
  }

  saveProfile() {
    if (!this.currentUser) return

    const firstName = document.getElementById("profileFirstName").value.trim()
    const lastName = document.getElementById("profileLastName").value.trim()
    const email = document.getElementById("profileEmail").value.trim()
    const phone = document.getElementById("profilePhone").value.trim()

    if (!firstName || !lastName || !email) {
      this.showAlert("error", "Lỗi", "Vui lòng điền đầy đủ thông tin bắt buộc!")
      return
    }

    if (!this.isValidEmail(email)) {
      this.showAlert("error", "Lỗi", "Địa chỉ email không hợp lệ!")
      return
    }

    // Check if email is taken by another user
    const existingUser = this.users.find((u) => u.email === email && u.id !== this.currentUser.id)
    if (existingUser) {
      this.showAlert("error", "Lỗi", "Email này đã được sử dụng bởi tài khoản khác!")
      return
    }

    // Update user data
    this.currentUser.firstName = firstName
    this.currentUser.lastName = lastName
    this.currentUser.email = email
    this.currentUser.phone = phone

    // Update in users array
    const userIndex = this.users.findIndex((u) => u.id === this.currentUser.id)
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.currentUser }
      this.saveUsers()
    }

    this.updateUserInterface()
    this.closeModal("profileModal")

    this.showAlert("success", "Cập nhật thành công!", "Thông tin hồ sơ đã được cập nhật.", 2000)
  }

  showChangePasswordModal() {
    this.showModal("changePasswordModal")
    this.closeUserDropdown()

    // Clear form
    document.getElementById("changePasswordForm").reset()

    // Setup password strength checker for new password
    document.getElementById("newPassword").addEventListener("input", (e) => {
      this.checkPasswordStrength(e.target.value, "newPasswordStrength")
    })
  }

  async changePassword() {
    const currentPassword = document.getElementById("currentPassword").value
    const newPassword = document.getElementById("newPassword").value
    const confirmNewPassword = document.getElementById("confirmNewPassword").value

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      this.showAlert("error", "Lỗi", "Vui lòng điền đầy đủ thông tin!")
      return
    }

    if (!this.verifyPassword(currentPassword, this.currentUser.password)) {
      this.showAlert("error", "Lỗi", "Mật khẩu hiện tại không đúng!")
      return
    }

    if (newPassword !== confirmNewPassword) {
      this.showAlert("error", "Lỗi", "Mật khẩu mới và xác nhận không khớp!")
      return
    }

    if (newPassword.length < 6) {
      this.showAlert("error", "Lỗi", "Mật khẩu mới phải có ít nhất 6 ký tự!")
      return
    }

    if (currentPassword === newPassword) {
      this.showAlert("error", "Lỗi", "Mật khẩu mới phải khác mật khẩu hiện tại!")
      return
    }

    try {
      // Update password
      this.currentUser.password = this.hashPassword(newPassword)

      // Update in users array
      const userIndex = this.users.findIndex((u) => u.id === this.currentUser.id)
      if (userIndex !== -1) {
        this.users[userIndex] = { ...this.currentUser }
        this.saveUsers()
      }

      this.closeModal("changePasswordModal")
      this.showAlert("success", "Đổi mật khẩu thành công!", "Mật khẩu của bạn đã được cập nhật.", 2000)
    } catch (error) {
      this.showAlert("error", "Lỗi hệ thống", "Có lỗi xảy ra, vui lòng thử lại!")
    }
  }

  // Demo Accounts
  showDemoAccounts() {
    const demoAccounts = [
      {
        role: "Quản lý",
        username: "admin",
        password: "admin123",
        description: "Có thể thực hiện tất cả các thao tác quản lý",
        badge: "manager",
      },
      {
        role: "Nhân viên",
        username: "staff01",
        password: "staff123",
        description: "Có thể thêm, sửa sản phẩm và xem báo cáo",
        badge: "staff",
      },
      {
        role: "Người xem",
        username: "viewer01",
        password: "viewer123",
        description: "Chỉ có thể xem thông tin, không thể chỉnh sửa",
        badge: "viewer",
      },
    ]

    const accountsHtml = demoAccounts
      .map(
        (account) => `
      <div class="demo-account" data-username="${account.username}" data-password="${account.password}">
        <div class="demo-account-header">
          <span class="demo-account-role">${account.role}</span>
          <span class="demo-account-badge ${account.badge}">${account.role}</span>
        </div>
        <div class="demo-account-credentials">
          <div class="demo-credential">
            <strong>Username:</strong> ${account.username}
          </div>
          <div class="demo-credential">
            <strong>Password:</strong> ${account.password}
          </div>
        </div>
        <div class="demo-account-description">
          ${account.description}
        </div>
      </div>
    `,
      )
      .join("")

    document.getElementById("demoAccountsList").innerHTML = accountsHtml

    // Add click handlers
    document.querySelectorAll(".demo-account").forEach((account) => {
      account.addEventListener("click", () => {
        const username = account.dataset.username
        const password = account.dataset.password

        document.getElementById("loginEmail").value = username
        document.getElementById("loginPassword").value = password

        this.closeModal("demoModal")
        this.switchToLogin()
      })
    })

    this.showModal("demoModal")
  }

  // Session Management
  startSessionTimer() {
    this.resetSessionTimer()
  }

  resetSessionTimer() {
    if (!this.currentUser) return

    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer)
    }

    this.sessionTimer = setTimeout(() => {
      this.handleSessionTimeout()
    }, this.sessionTimeout)
  }

  clearSessionTimer() {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer)
      this.sessionTimer = null
    }
  }

  handleSessionTimeout() {
    this.showAlert(
      "warning",
      "Phiên làm việc hết hạn",
      "Bạn sẽ được đăng xuất do không hoạt động trong thời gian dài.",
      5000,
    )

    setTimeout(() => {
      this.performLogout()
    }, 5000)
  }

  // Security Methods
  trackFailedLogin(identifier) {
    const attempts = this.loginAttempts.get(identifier) || { count: 0, lastAttempt: Date.now() }
    attempts.count++
    attempts.lastAttempt = Date.now()
    this.loginAttempts.set(identifier, attempts)

    if (attempts.count >= this.maxLoginAttempts) {
      setTimeout(() => {
        this.loginAttempts.delete(identifier)
      }, this.lockoutDuration)
    }
  }

  isAccountLocked(identifier) {
    const attempts = this.loginAttempts.get(identifier)
    if (!attempts || attempts.count < this.maxLoginAttempts) {
      return false
    }

    const timeSinceLastAttempt = Date.now() - attempts.lastAttempt
    return timeSinceLastAttempt < this.lockoutDuration
  }

  hashPassword(password) {
    // Simple hash for demo - use proper hashing in production
    let hash = 0
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return hash.toString()
  }

  verifyPassword(password, hash) {
    return this.hashPassword(password) === hash
  }

  generateToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  // Validation Methods
  validateRegistrationForm(data) {
    if (!data.firstName || !data.lastName || !data.email || !data.username || !data.password || !data.role) {
      this.showAlert("error", "Lỗi", "Vui lòng điền đầy đủ thông tin bắt buộc!")
      return false
    }

    if (!this.isValidEmail(data.email)) {
      this.showAlert("error", "Lỗi", "Địa chỉ email không hợp lệ!")
      return false
    }

    if (data.username.length < 3) {
      this.showAlert("error", "Lỗi", "Tên đăng nhập phải có ít nhất 3 ký tự!")
      return false
    }

    if (data.password.length < 6) {
      this.showAlert("error", "Lỗi", "Mật khẩu phải có ít nhất 6 ký tự!")
      return false
    }

    if (data.password !== data.confirmPassword) {
      this.showAlert("error", "Lỗi", "Mật khẩu xác nhận không khớp!")
      return false
    }

    if (!data.agreeTerms) {
      this.showAlert("error", "Lỗi", "Vui lòng đồng ý với điều khoản sử dụng!")
      return false
    }

    return true
  }

  validateEmail(email, validationElementId) {
    const validationEl = document.getElementById(validationElementId)
    if (!validationEl) return

    if (!email) {
      validationEl.innerHTML = ""
      return
    }

    if (this.isValidEmail(email)) {
      // Check if email exists
      const exists = this.users.some((u) => u.email === email)
      if (exists) {
        validationEl.innerHTML = '<i class="fas fa-times"></i> Email đã tồn tại'
        validationEl.className = "field-validation invalid"
      } else {
        validationEl.innerHTML = '<i class="fas fa-check"></i> Email hợp lệ'
        validationEl.className = "field-validation valid"
      }
    } else {
      validationEl.innerHTML = '<i class="fas fa-times"></i> Email không hợp lệ'
      validationEl.className = "field-validation invalid"
    }
  }

  validateUsername(username, validationElementId) {
    const validationEl = document.getElementById(validationElementId)
    if (!validationEl) return

    if (!username) {
      validationEl.innerHTML = ""
      return
    }

    if (username.length < 3) {
      validationEl.innerHTML = '<i class="fas fa-times"></i> Tên đăng nhập quá ngắn'
      validationEl.className = "field-validation invalid"
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      validationEl.innerHTML = '<i class="fas fa-times"></i> Chỉ được chứa chữ, số và dấu gạch dưới'
      validationEl.className = "field-validation invalid"
    } else {
      // Check if username exists
      const exists = this.users.some((u) => u.username === username)
      if (exists) {
        validationEl.innerHTML = '<i class="fas fa-times"></i> Tên đăng nhập đã tồn tại'
        validationEl.className = "field-validation invalid"
      } else {
        validationEl.innerHTML = '<i class="fas fa-check"></i> Tên đăng nhập hợp lệ'
        validationEl.className = "field-validation valid"
      }
    }
  }

  validatePasswordMatch(passwordId, confirmPasswordId, validationElementId) {
    const password = document.getElementById(passwordId).value
    const confirmPassword = document.getElementById(confirmPasswordId).value
    const validationEl = document.getElementById(validationElementId)

    if (!validationEl || !confirmPassword) return

    if (password === confirmPassword) {
      validationEl.innerHTML = '<i class="fas fa-check"></i> Mật khẩu khớp'
      validationEl.className = "field-validation valid"
    } else {
      validationEl.innerHTML = '<i class="fas fa-times"></i> Mật khẩu không khớp'
      validationEl.className = "field-validation invalid"
    }
  }

  checkPasswordStrength(password, strengthElementId) {
    const strengthEl = document.getElementById(strengthElementId)
    if (!strengthEl) return

    let strength = 0
    let strengthText = "Rất yếu"

    if (password.length >= 6) strength++
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++

    strengthEl.className = "password-strength"

    if (strength <= 2) {
      strengthEl.classList.add("weak")
      strengthText = "Yếu"
    } else if (strength <= 3) {
      strengthEl.classList.add("fair")
      strengthText = "Trung bình"
    } else if (strength <= 4) {
      strengthEl.classList.add("good")
      strengthText = "Tốt"
    } else {
      strengthEl.classList.add("strong")
      strengthText = "Rất mạnh"
    }

    strengthEl.querySelector(".strength-text").textContent = `Độ mạnh: ${strengthText}`
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // UI Helper Methods
  togglePasswordVisibility(button) {
    const targetId = button.dataset.target
    const input = document.getElementById(targetId)
    const icon = button.querySelector("i")

    if (input.type === "password") {
      input.type = "text"
      icon.className = "fas fa-eye-slash"
    } else {
      input.type = "password"
      icon.className = "fas fa-eye"
    }
  }

  setButtonLoading(button, loading) {
    const btnText = button.querySelector(".btn-text")
    const btnLoading = button.querySelector(".btn-loading")

    if (loading) {
      button.disabled = true
      button.classList.add("btn-loading")
      if (btnText) btnText.style.opacity = "0"
      if (btnLoading) btnLoading.style.display = "block"
    } else {
      button.disabled = false
      button.classList.remove("btn-loading")
      if (btnText) btnText.style.opacity = "1"
      if (btnLoading) btnLoading.style.display = "none"
    }
  }

  showModal(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.classList.remove("active")
      document.body.style.overflow = ""
    }
  }

  toggleUserDropdown() {
    const dropdown = document.getElementById("userDropdownMenu")
    dropdown.classList.toggle("active")
  }

  closeUserDropdown() {
    const dropdown = document.getElementById("userDropdownMenu")
    dropdown.classList.remove("active")
  }

  showAlert(type, title, text, timer = 4000) {
    const Swal = window.Swal // Declare Swal variable
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      timer: timer,
      showConfirmButton: timer > 4000,
      toast: timer <= 4000,
      position: timer <= 4000 ? "top-end" : "center",
      timerProgressBar: true,
    })
  }

  // App Integration Methods
  checkAuthStatus() {
    // Check for remembered user
    const rememberedUser = localStorage.getItem("findbot_remember_user")
    if (rememberedUser) {
      try {
        const userData = JSON.parse(rememberedUser)
        const user = this.users.find((u) => u.id === userData.id)
        if (user && user.isActive) {
          this.currentUser = user
          this.showAuthenticatedApp()
          return
        }
      } catch (error) {
        localStorage.removeItem("findbot_remember_user")
      }
    }

    // Show login form
    this.switchToLogin()
  }

  showAuthenticatedApp() {
    if (!this.currentUser) return

    // Hide auth container and show app
    document.getElementById("authContainer").style.display = "none"
    document.getElementById("appContainer").style.display = "flex"

    // Update user interface
    this.updateUserInterface()

    // Start session timer
    this.startSessionTimer()

    // Hiển thị giao diện chính đã sẵn sàng (các hệ thống con đã được khởi tạo khi tải trang)
  }

  updateUserInterface() {
    if (!this.currentUser) return

    const fullName = `${this.currentUser.firstName} ${this.currentUser.lastName}`
    const roleDisplay = this.getRoleDisplayName(this.currentUser.role)

    // Update header user info
    document.getElementById("userName").textContent = fullName
    document.getElementById("userRole").textContent = roleDisplay
    document.getElementById("userAvatar").src = this.currentUser.avatar

    // Update sidebar user info
    document.getElementById("sidebarUserName").textContent = fullName
    document.getElementById("sidebarUserRole").textContent = roleDisplay
    document.getElementById("sidebarUserAvatar").src = this.currentUser.avatar

    // Update welcome message
    const welcomeMessage = document.getElementById("welcomeMessage")
    if (welcomeMessage) {
      const hour = new Date().getHours()
      let greeting = "Chào mừng"
      if (hour < 12) greeting = "Chào buổi sáng"
      else if (hour < 18) greeting = "Chào buổi chiều"
      else greeting = "Chào buổi tối"

      welcomeMessage.textContent = `${greeting}, ${this.currentUser.firstName}!`
    }

    // Update role-based permissions
    this.updateRoleBasedUI()
  }

  updateRoleBasedUI() {
    const userRole = this.currentUser.role

    // Hide/show elements based on role
    const managerOnlyElements = document.querySelectorAll('[data-role="manager"]')
    const staffOnlyElements = document.querySelectorAll('[data-role="staff"]')

    managerOnlyElements.forEach((el) => {
      el.style.display = userRole === "manager" ? "" : "none"
    })

    staffOnlyElements.forEach((el) => {
      el.style.display = ["manager", "staff"].includes(userRole) ? "" : "none"
    })

    // Update navigation based on permissions
    const navItems = document.querySelectorAll(".nav-item")
    navItems.forEach((item) => {
      const requiredRole = item.dataset.requiredRole
      if (requiredRole && !this.hasPermission(requiredRole)) {
        item.style.display = "none"
      }
    })
  }

  hasPermission(requiredRole) {
    const roleHierarchy = {
      viewer: 1,
      staff: 2,
      manager: 3,
    }

    const userLevel = roleHierarchy[this.currentUser.role] || 0
    const requiredLevel = roleHierarchy[requiredRole] || 0

    return userLevel >= requiredLevel
  }

  getRoleDisplayName(role) {
    const roleNames = {
      manager: "Quản lý",
      staff: "Nhân viên",
      viewer: "Người xem",
    }
    return roleNames[role] || role
  }

  // Data Management
  loadUsers() {
    try {
      const users = localStorage.getItem("findbot_users")
      return users ? JSON.parse(users) : []
    } catch (error) {
      return []
    }
  }

  saveUsers() {
    try {
      localStorage.setItem("findbot_users", JSON.stringify(this.users))
    } catch (error) {
      console.error("Failed to save users:", error)
    }
  }

  // Public API
  getCurrentUser() {
    return this.currentUser
  }

  isAuthenticated() {
    return !!this.currentUser
  }

  requireAuth() {
    if (!this.isAuthenticated()) {
      this.showAlert("warning", "Yêu cầu đăng nhập", "Vui lòng đăng nhập để tiếp tục!")
      this.performLogout()
      return false
    }
    return true
  }
}

// Initialize authentication system when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.AuthSystem = new AuthenticationSystem()
})
