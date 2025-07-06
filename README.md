# FindBot Website – AI Challenge 2025

**FindBot Website** là giao diện web một trang (SPA) dùng để trình diễn khả năng quản lý siêu thị thông minh cùng đội robot "FindBot" trong khuôn khổ cuộc thi **AI Challenge 2025**. Ứng dụng được xây dựng hoàn toàn bằng HTML, CSS, JavaScript thuần (ES6+) kết hợp một số thư viện front-end phổ biến, không yêu cầu cài đặt framework nặng nề.

---

## 🌟 Tính năng chính

| Nhóm chức năng | Mô tả ngắn |
| -------------- | ---------- |
| Đăng nhập / Đăng ký | Hệ thống xác thực với màn hình loading 10 s, lưu phiên (Remember Me), giới hạn số lần đăng nhập, xác thực mật khẩu mạnh. |
| Phân quyền | 3 vai trò sẵn có: **manager**, **staff**, **viewer** – giao diện & tính năng ẩn/hiện tương ứng. |
| Dashboard | Thống kê doanh thu, top danh mục, hoạt động gần đây, biểu đồ biểu diễn bằng **Chart.js**. |
| Quản lý sản phẩm | CRUD sản phẩm, bảng & dạng thẻ, lọc nâng cao (giá, danh mục, sắp xếp…), tìm kiếm nhanh bằng **Fuse.js**. |
| Bản đồ siêu thị | Lưới 2D mô phỏng vị trí kệ, tô màu danh mục, bật/tắt ô lưới, click để xem thông tin kệ. |
| Tìm kiếm nâng cao | Bộ lọc động, gợi ý tự động, tìm kiếm giọng nói (Web Speech API), slider giá bằng **noUiSlider**, select đẹp bằng **Choices.js**. |
| Dark mode & Tuỳ chỉnh | Chuyển giao diện sáng/tối, lưu cài đặt người dùng vào _localStorage_. |
| FindBot Management | Xem danh sách robot, tình trạng pin, trạng thái hoạt động; kích hoạt/tạm dừng từng robot hoặc toàn bộ, xem chi tiết. |
| Thông báo đẹp | Sử dụng **SweetAlert2** cho toast, modal & hộp thoại xác nhận. |

> Ứng dụng hoạt động hoàn toàn offline (mock data) nhưng sẵn sàng kết nối REST API khi có backend.

---

## 🛠️ Công nghệ & thư viện

- **HTML5**, **CSS3** (Flexbox, Grid)  
- **JavaScript** thuần (ES6 Modules, Classes, Async/Await)  
- [Chart.js](https://www.chartjs.org/) – v4.x  
- [Fuse.js](https://fusejs.io/) – tìm kiếm fuzzy  
- [SweetAlert2](https://sweetalert2.github.io/) – thông báo & dialog  
- [Choices.js](https://github.com/Choices-js/Choices) – select tuỳ biến  
- [noUiSlider](https://refreshless.com/nouislider/) – slider giá  
- [Font Awesome 6](https://fontawesome.com/) – icon  

Không phụ thuộc vào NodeJS/webpack/babel – chỉ cần trình duyệt hiện đại.

---

## 📂 Cấu trúc dự án

```
FindBot_Website/
├── index.html            # Trang HTML chính
├── styles.css            # Style chung
├── auth-styles.css       # Style riêng cho trang xác thực
├── script.js             # Logic chính của ứng dụng
├── auth.js               # Hệ thống xác thực & phân quyền
├── README.md             # (bạn đang đọc)
└── assets/               # Logo, hình ảnh, biểu tượng (tuỳ chọn)
```

---

## 🚀 Khởi chạy nhanh

Vì đây là ứng dụng tĩnh, bạn chỉ cần một HTTP server đơn giản (tránh lỗi CORS / chặn file):

```bash
# 1) Clone dự án
git clone https://github.com/your-username/FindBot_Website.git
cd FindBot_Website

# 2) Cài http-server (một lần duy nhất)
npm i -g http-server

# 3) Chạy server tại cổng 8080 (tuỳ chọn)
http-server -p 8080

# 4) Mở trình duyệt
http://localhost:8080
```

Hoặc sử dụng Python:

```bash
python -m http.server 8080
```

Trên VS Code bạn có thể cài _Live Server_ để tự động reload khi chỉnh sửa.

### Tuỳ chỉnh API backend

Trong `script.js`, **FindBotSystem** dùng biến `this.apiBase` (mặc định `http://localhost:5000`).  
Sửa giá trị này để trỏ đến REST API thật của bạn:

```js
// script.js (≈ dòng 2220)
class FindBotSystem {
  constructor() {
    this.apiBase = "https://api.myserver.com";
  }
  ...
}
```

Nếu API không khả dụng, hệ thống sẽ tự động chuyển sang dữ liệu _mock_ lưu trong `localStorage`.

---

## 🧑‍💻 Đóng góp

1. Fork dự án & tạo nhánh mới: `git checkout -b feature/ten-tinh-nang`
2. Commit thay đổi có ý nghĩa: `git commit -m "Thêm tính năng X"`
3. Push lên nhánh của bạn: `git push origin feature/ten-tinh-nang`
4. Mở Pull Request – mô tả rõ vấn đề & giải pháp.

> Vui lòng giữ code **JavaScript thuần**, hạn chế phụ thuộc mới trừ khi thực sự cần.

---

## 📄 Giấy phép

Dự án được phát hành theo giấy phép **MIT**. Bạn có thể tự do sử dụng, chỉnh sửa và phân phối – chỉ cần giữ nguyên thông tin bản quyền tác giả.

---

## 🙏 Cám ơn

- Cuộc thi **AI Challenge 2025** đã truyền cảm hứng cho ý tưởng FindBot.
- Các thư viện mã nguồn mở giúp dự án hoàn thiện nhanh chóng.

Chúc bạn có trải nghiệm thú vị cùng **FindBot Website**! ✨ 