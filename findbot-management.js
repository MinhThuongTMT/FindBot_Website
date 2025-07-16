// FindBot Management System
class FindBotManager {
    constructor() {
        this.bots = [];
        this.notifications = [];
        this.initializeBotManagement();
    }

    // Khởi tạo quản lý FindBot
    initializeBotManagement() {
        // Đăng ký các sự kiện và quản lý pin
        setInterval(() => this.checkBotBatteryStatus(), 5 * 60 * 1000); // Kiểm tra pin 5 phút/lần
        
        // Thêm phương thức debug
        window.debugFindBotManager = this;
    }

    // Phương thức thêm thông báo
    addNotification(type, message, botName) {
        const notification = {
            id: this.generateNotificationId(),
            type: type, // 'warning', 'error', 'info', 'success'
            message: message,
            botName: botName,
            timestamp: new Date(),
            read: false
        };

        // Thêm thông báo vào mảng
        this.notifications.unshift(notification);

        // Giới hạn số lượng thông báo
        if (this.notifications.length > 20) {
            this.notifications.pop();
        }

        // Cập nhật badge thông báo
        this.updateNotificationBadge();

        // Hiển thị thông báo trên giao diện
        this.renderNotifications();

        return notification;
    }

    // Cập nhật badge thông báo
    updateNotificationBadge() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const notificationBadge = document.getElementById('notificationBadge');
        if (notificationBadge) {
            notificationBadge.textContent = unreadCount;
            notificationBadge.style.display = unreadCount > 0 ? 'block' : 'none';
        }
    }

    // Render thông báo
    renderNotifications() {
        const notificationContainer = document.getElementById('notificationDropdown');
        if (!notificationContainer) {
            // Tạo container nếu chưa tồn tại
            const dropdown = document.createElement('div');
            dropdown.id = 'notificationDropdown';
            dropdown.className = 'notification-dropdown';
            document.body.appendChild(dropdown);
        }

        // Render danh sách thông báo
        const notificationList = this.notifications.slice(0, 10).map(notification => `
            <div class="notification-item ${notification.read ? 'read' : 'unread'} ${notification.type}">
                <div class="notification-icon">
                    ${this.getNotificationIcon(notification.type)}
                </div>
                <div class="notification-content">
                    <p class="notification-message">${notification.message}</p>
                    <small class="notification-time">${this.formatTimeAgo(notification.timestamp)}</small>
                </div>
            </div>
        `).join('');

        // Cập nhật container
        const container = document.getElementById('notificationDropdown');
        container.innerHTML = `
            <div class="notification-header">
                <h3>Thông Báo FindBot</h3>
                <button id="clearNotifications" class="clear-notifications-btn">Xóa tất cả</button>
            </div>
            <div class="notification-list">
                ${notificationList}
            </div>
        `;

        // Thêm sự kiện xóa thông báo
        const clearBtn = document.getElementById('clearNotifications');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearNotifications());
        }
    }

    // Lấy icon thông báo
    getNotificationIcon(type) {
        const icons = {
            'warning': '<i class="fas fa-exclamation-triangle"></i>',
            'error': '<i class="fas fa-times-circle"></i>',
            'info': '<i class="fas fa-info-circle"></i>',
            'success': '<i class="fas fa-check-circle"></i>'
        };
        return icons[type] || icons['info'];
    }

    // Định dạng thời gian
    formatTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);

        if (minutes < 1) return 'Vừa xong';
        if (minutes < 60) return `${minutes} phút trước`;
        if (hours < 24) return `${hours} giờ trước`;
        return date.toLocaleDateString();
    }

    // Xóa tất cả thông báo
    clearNotifications() {
        this.notifications = [];
        this.updateNotificationBadge();
        this.renderNotifications();
    }

    // Sinh ID thông báo
    generateNotificationId() {
        return `NOTIF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    // Tạo FindBot mới với các tính năng mở rộng
    createFindBot(botData) {
        const defaultBotConfig = {
            id: this.generateBotId(),
            name: botData.name,
            model: botData.model,
            location: botData.location || 'Chưa xác định',
            capabilities: botData.capabilities || [],
            status: 'inactive',
            battery: botData.battery || 100, // Cho phép set pin ban đầu
            lastCharged: new Date(),
            tasks: [],
            searchHistory: [],
            performanceMetrics: {
                totalSearches: 0,
                successfulSearches: 0,
                averageSearchTime: 0
            }
        };

        const newBot = { ...defaultBotConfig, ...botData };
        this.bots.push(newBot);
        this.updateBotStats();
        
        // Debug log
        console.log('FindBot Created:', newBot);
        
        return newBot;
    }

    // Kiểm tra trạng thái pin chi tiết
    checkBotBatteryStatus() {
        console.log('Checking Battery Status for Bots:', this.bots);
        
        this.bots.forEach(bot => {
            // Giảm pin theo thời gian và hoạt động
            const batteryDrain = bot.status === 'active' ? 2 : 0.5;
            bot.battery = Math.max(0, bot.battery - batteryDrain);

            // Debug log
            console.log(`Bot ${bot.name} Battery: ${bot.battery}%`);

            // Cảnh báo và xử lý pin
            if (bot.battery <= 0) {
                this.setOfflineStatus(bot);
            } else if (bot.battery <= 20) {
                this.triggerCriticalBatteryAlert(bot);
            } else if (bot.battery <= 50) {
                this.triggerLowBatteryWarning(bot);
            }
        });

        this.updateBotStats();
    }

    // Đặt trạng thái ngoại tuyến khi pin hết
    setOfflineStatus(bot) {
        console.log(`Setting Bot ${bot.name} to Offline`);

        // Thêm thông báo
        this.addNotification('error', 
            `FindBot ${bot.name} - Đã chuyển sang trạng thái ngoại tuyến do pin hoàn toàn hết.`, 
            bot.name
        );

        bot.status = 'offline';
        bot.battery = 0;

        Swal.fire({
            icon: 'error',
            title: `FindBot ${bot.name} - Ngoại Tuyến`,
            html: `
                <div class="offline-bot-alert">
                    <div class="battery-icon">
                        <i class="fas fa-battery-empty" style="color: #f44336; font-size: 3rem;"></i>
                    </div>
                    <p>Pin đã hoàn toàn hết. FindBot đã chuyển sang trạng thái ngoại tuyến.</p>
                    <p>Vui lòng sạc pin để tiếp tục sử dụng.</p>
                </div>
            `,
            confirmButtonText: 'Sạc Ngay',
            showCancelButton: true,
            cancelButtonText: 'Đóng'
        }).then((result) => {
            if (result.isConfirmed) {
                this.chargeFindBot(bot);
            }
        });

        this.updateBotStats();
    }

    // Cảnh báo pin khẩn cấp
    triggerCriticalBatteryAlert(bot) {
        console.log(`Critical Battery Alert for ${bot.name}`);
        
        // Kiểm tra xem đã từng hiển thị cảnh báo chưa
        if (bot._lowBatteryAlertShown) return;

        // Thêm thông báo
        this.addNotification('warning', 
            `FindBot ${bot.name} - Pin khẩn cấp! Chỉ còn ${Math.round(bot.battery)}%. Vui lòng sạc ngay.`, 
            bot.name
        );

        Swal.fire({
            icon: 'warning',
            title: `FindBot ${bot.name} - Pin Khẩn Cấp!`,
            html: `
                <div class="low-battery-alert">
                    <div class="battery-icon">
                        <i class="fas fa-battery-quarter" style="color: #ff9800; font-size: 3rem;"></i>
                    </div>
                    <p>Pin hiện tại chỉ còn ${Math.round(bot.battery)}%</p>
                    <p>Vui lòng sạc pin để tránh ngừng hoạt động.</p>
                </div>
            `,
            confirmButtonText: 'Sạc Ngay',
            showCancelButton: true,
            cancelButtonText: 'Để Sau'
        }).then((result) => {
            if (result.isConfirmed) {
                this.chargeFindBot(bot);
            }
            
            // Đánh dấu đã hiển thị cảnh báo
            bot._lowBatteryAlertShown = true;
        });
    }

    // Cảnh báo pin thấp
    triggerLowBatteryWarning(bot) {
        console.log(`Low Battery Warning for ${bot.name}`);
        
        // Kiểm tra xem đã từng hiển thị cảnh báo chưa
        if (bot._lowBatteryWarningShown) return;

        // Thêm thông báo
        this.addNotification('info', 
            `FindBot ${bot.name} - Pin thấp. Hiện tại còn ${Math.round(bot.battery)}%. Khuyến nghị sạc pin.`, 
            bot.name
        );

        Swal.fire({
            icon: 'info',
            title: `FindBot ${bot.name} - Pin Thấp`,
            html: `
                <div class="low-battery-alert">
                    <div class="battery-icon">
                        <i class="fas fa-battery-half" style="color: #2196f3; font-size: 3rem;"></i>
                    </div>
                    <p>Pin hiện tại còn ${Math.round(bot.battery)}%</p>
                    <p>Khuyến nghị sạc pin để duy trì hoạt động.</p>
                </div>
            `,
            confirmButtonText: 'Sạc Ngay',
            showCancelButton: true,
            cancelButtonText: 'Để Sau'
        }).then((result) => {
            if (result.isConfirmed) {
                this.chargeFindBot(bot);
            }
            
            // Đánh dấu đã hiển thị cảnh báo
            bot._lowBatteryWarningShown = true;
        });
    }

    // Kiểm tra và xử lý khi kích hoạt FindBot
    startFindBot(bot) {
        // Kiểm tra pin chi tiết
        if (bot.battery <= 0) {
            Swal.fire({
                icon: 'error',
                title: `FindBot ${bot.name} - Không Thể Kích Hoạt`,
                html: `
                    <div class="offline-bot-alert">
                        <div class="battery-icon">
                            <i class="fas fa-battery-empty" style="color: #f44336; font-size: 3rem;"></i>
                        </div>
                        <p>Pin đã hoàn toàn hết. Không thể kích hoạt FindBot.</p>
                        <p>Vui lòng sạc pin trước khi sử dụng.</p>
                    </div>
                `,
                confirmButtonText: 'Sạc Ngay',
                showCancelButton: true,
                cancelButtonText: 'Đóng'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.chargeFindBot(bot);
                }
            });
            return false;
        }

        // Kiểm tra pin thấp
        if (bot.battery <= 20) {
            Swal.fire({
                icon: 'warning',
                title: `FindBot ${bot.name} - Pin Rất Thấp`,
                html: `
                    <div class="low-battery-alert">
                        <div class="battery-icon">
                            <i class="fas fa-battery-quarter" style="color: #ff9800; font-size: 3rem;"></i>
                        </div>
                        <p>Pin hiện tại chỉ còn ${Math.round(bot.battery)}%</p>
                        <p>Bạn có muốn tiếp tục kích hoạt không?</p>
                    </div>
                `,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Tiếp Tục',
                cancelButtonText: 'Sạc Ngay',
                reverseButtons: true
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                    this.chargeFindBot(bot);
                    return false;
                }
            });
        }

        // Nếu pin đủ, thực hiện kích hoạt
        bot.status = 'active';
        
        // Thông báo kích hoạt thành công
        Swal.fire({
            icon: 'success',
            title: `FindBot ${bot.name}`,
            text: `Đã kích hoạt thành công. Pin hiện tại: ${Math.round(bot.battery)}%`,
            timer: 2000,
            showConfirmButton: false
        });

        // Cập nhật thống kê
        this.updateBotStats();
        return true;
    }

    // Dừng FindBot với kiểm tra pin
    stopFindBot(bot) {
        // Kiểm tra trạng thái pin
        if (bot.battery <= 0) {
            Swal.fire({
                icon: 'error',
                title: `FindBot ${bot.name} - Không Thể Dừng`,
                text: 'FindBot đã ngoại tuyến do pin hoàn toàn hết.',
                confirmButtonText: 'OK'
            });
            return false;
        }

        bot.status = 'inactive';
        
        // Thông báo dừng
        Swal.fire({
            icon: 'info',
            title: `FindBot ${bot.name}`,
            text: `Đã dừng hoạt động. Pin hiện tại: ${Math.round(bot.battery)}%`,
            timer: 2000,
            showConfirmButton: false
        });

        // Cập nhật thống kê
        this.updateBotStats();
        return true;
    }

    // Sạc FindBot
    chargeFindBot(bot) {
        console.log(`Charging FindBot: ${bot.name}`);
        
        const chargeDuration = bot.battery < 20 ? 60 : 30; // Phút
        bot.status = 'charging';
        
        Swal.fire({
            title: `Đang Sạc ${bot.name}`,
            html: `
                <div class="charging-progress">
                    <div class="charging-icon">🔋</div>
                    <div class="charging-text">Đang sạc: 0%</div>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="charging-details">
                        <p>Thời gian sạc dự kiến: ${chargeDuration} phút</p>
                        <p>Trạng thái: Đang sạc</p>
                    </div>
                </div>
            `,
            timer: chargeDuration * 1000,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {
                const progressBar = Swal.getPopup().querySelector('.progress-fill');
                const chargingText = Swal.getPopup().querySelector('.charging-text');
                const chargingDetails = Swal.getPopup().querySelector('.charging-details');
                
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 100 / (chargeDuration * 10);
                    bot.battery = Math.min(100, progress);
                    
                    progressBar.style.width = `${progress}%`;
                    chargingText.textContent = `Đang sạc: ${Math.round(progress)}%`;
                    
                    // Cập nhật chi tiết sạc
                    chargingDetails.innerHTML = `
                        <p>Thời gian sạc dự kiến: ${chargeDuration} phút</p>
                        <p>Trạng thái: ${progress < 100 ? 'Đang sạc' : 'Sạc hoàn tất'}</p>
                    `;
                    
                    if (progress >= 100) {
                        clearInterval(interval);
                        bot.status = 'inactive';
                        bot.lastCharged = new Date();
                        
                        // Đặt lại cờ cảnh báo
                        bot._lowBatteryAlertShown = false;
                        bot._lowBatteryWarningShown = false;
                    }
                }, 100);
            },
            willClose: () => {
                bot.status = 'inactive';
                this.updateBotStats();
                
                // Thông báo sạc pin hoàn tất
                Swal.fire({
                    icon: 'success',
                    title: `Sạc Pin ${bot.name} Hoàn Tất`,
                    text: `Pin đã được sạc đầy. Trạng thái: Sẵn sàng hoạt động`,
                    timer: 3000,
                    showConfirmButton: false
                });
            }
        });
    }

    // Tìm kiếm sản phẩm trong siêu thị
    async searchProductInStore(bot, searchTerm) {
        // Kiểm tra điều kiện pin và trạng thái
        if (bot.battery < 30) {
            Swal.fire({
                icon: 'warning',
                title: 'Không Thể Tìm Kiếm',
                text: 'Pin quá thấp. Vui lòng sạc FindBot trước khi sử dụng.'
            });
            return null;
        }

        // Mô phỏng quá trình tìm kiếm
        bot.status = 'searching';
        const startTime = Date.now();

        try {
            // Giả lập tìm kiếm sản phẩm
            const searchResults = await this.performProductSearch(searchTerm);
            
            // Cập nhật metrics
            bot.performanceMetrics.totalSearches++;
            bot.performanceMetrics.successfulSearches += searchResults.length > 0 ? 1 : 0;
            bot.performanceMetrics.averageSearchTime = 
                (bot.performanceMetrics.averageSearchTime + (Date.now() - startTime)) / 
                bot.performanceMetrics.totalSearches;

            // Lưu lịch sử tìm kiếm
            bot.searchHistory.push({
                term: searchTerm,
                timestamp: new Date(),
                results: searchResults.length
            });

            // Giảm pin sau khi tìm kiếm
            bot.battery = Math.max(0, bot.battery - 5);

            bot.status = 'inactive';
            return searchResults;
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi Tìm Kiếm',
                text: 'Không thể thực hiện tìm kiếm. Vui lòng thử lại.'
            });
            bot.status = 'inactive';
            return null;
        }
    }

    // Mô phỏng tìm kiếm sản phẩm
    async performProductSearch(searchTerm) {
        // Giả lập dữ liệu sản phẩm
        const mockProducts = [
            { id: 1, name: 'Sữa tươi', location: 'Kệ 3, Hàng A', price: 25000 },
            { id: 2, name: 'Bánh mì', location: 'Kệ 2, Hàng B', price: 15000 },
            { id: 3, name: 'Nước ngọt', location: 'Kệ 5, Hàng C', price: 10000 }
        ];

        // Tìm kiếm theo từ khóa
        return mockProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Tạo nhiệm vụ cho FindBot
    assignTask(bot, task) {
        bot.tasks.push({
            id: this.generateTaskId(),
            description: task,
            status: 'pending',
            assignedAt: new Date()
        });
    }

    // Cập nhật thống kê FindBot
    updateBotStats() {
        const totalBots = this.bots.length;
        const activeBots = this.bots.filter(bot => bot.status === 'active').length;
        const inactiveBots = this.bots.filter(bot => bot.status === 'inactive').length;
        const offlineBots = this.bots.filter(bot => bot.battery === 0).length;

        // Cập nhật UI
        document.getElementById('totalBotsCount').textContent = totalBots;
        document.getElementById('activeBotsCount').textContent = activeBots;
        document.getElementById('inactiveBotsCount').textContent = inactiveBots;
        document.getElementById('offlineBotsCount').textContent = offlineBots;
    }

    // Các phương thức hỗ trợ
    generateBotId() {
        return `FB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    generateTaskId() {
        return `TASK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }
}

// Khởi tạo quản lý FindBot
const findBotManager = new FindBotManager(); 