# Hiring Page Frontend – Website Tuyển Dụng IT

## 📌 Tổng quan dự án

**Hiring Page Frontend** là phần giao diện người dùng (Client-side) của hệ thống website tuyển dụng IT, được xây dựng bằng **ReactJS + Vite** kết hợp với **Ant Design** và **SCSS**. Dự án cung cấp nền tảng cho nhà tuyển dụng đăng tin tuyển dụng và cho ứng viên tìm kiếm, ứng tuyển các vị trí IT một cách thuận tiện, trực quan.

Frontend giao tiếp với backend viết bằng **NestJS + MongoDB** thông qua RESTful API.

---

## 🎯 Mục tiêu hệ thống

* Xây dựng website tuyển dụng IT **hiện đại – dễ sử dụng – hiệu năng cao**
* Hỗ trợ nhiều vai trò người dùng: **Admin / Recruiter / Candidate**
* Tối ưu trải nghiệm người dùng với UI chuẩn Ant Design
* Tách biệt rõ UI – logic – API để dễ bảo trì và mở rộng
* Sẵn sàng deploy production

---

## 🚀 Công nghệ & Thư viện sử dụng

### Core

* **ReactJS 18** – Thư viện xây dựng UI
* **Vite** – Build tool tốc độ cao
* **TypeScript / JavaScript** *(tuỳ cấu hình project)*

### UI & Styling

* **Ant Design (antd)** – UI Component Library
* **SCSS** – Styling nâng cao
* **Responsive Design** – Tương thích nhiều thiết bị

### State & Data

* **Axios** – Gọi REST API
* **JWT** – Xác thực người dùng

### Routing & Utils

* **React Router DOM** – Routing SPA
* **Custom Hooks** – Tái sử dụng logic

### Dev Tools

* **ESLint** – Kiểm tra code
* **Prettier** – Format code
* **Environment Variables (.env)**

---

## 🧱 Kiến trúc Frontend

Dự án được xây dựng theo **Component-based Architecture**, tách rõ trách nhiệm từng phần:

```
Page  →  Layout  →  Component  →  Service(API)
                     ↓
                Hooks / Utils
```

### Nguyên tắc thiết kế

* Page: đại diện cho từng màn hình (route)
* Layout: khung giao diện chung (Header, Sidebar, Footer)
* Component: UI tái sử dụng
* Service: xử lý gọi API
* Hooks: xử lý logic dùng chung

---

## 📂 Cấu trúc thư mục chi tiết

```bash
hiring-page-FE/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images, icons
│   ├── components/             # Component tái sử dụng (Button, Modal, ...)
│   ├── layouts/                # Layout chính (MainLayout, AuthLayout)
│   ├── pages/                  # Các trang chính
│   │   ├── Home/               # Trang chủ
│   │   ├── Login/              # Đăng nhập
│   │   ├── Register/           # Đăng ký
│   │   ├── Jobs/               # Danh sách việc làm
│   │   ├── JobDetail/          # Chi tiết việc làm
│   │   ├── Profile/            # Hồ sơ ứng viên
│   │   ├── Admin/              # Trang quản trị
│   │   └── Recruiter/          # Trang nhà tuyển dụng
│   ├── services/               # API services (axios)
│   ├── hooks/                  # Custom hooks
│   ├── utils/                  # Helper functions
│   ├── constants/              # Hằng số, enum
│   ├── styles/                 # SCSS global & variables
│   ├── routes/                 # Định nghĩa route
│   ├── App.tsx                 # Root component
│   └── main.tsx                # Entry point
├── .env                        # Biến môi trường
├── vite.config.ts              # Cấu hình Vite
├── package.json
└── README.md
```

---

## 👥 Vai trò người dùng & Chức năng

### 👨‍💼 Admin

* Quản lý người dùng
* Quản lý tin tuyển dụng
* Quản lý hệ thống

### 🧑‍💼 Recruiter (Nhà tuyển dụng)

* Tạo & chỉnh sửa tin tuyển dụng
* Xem danh sách ứng viên
* Quản lý tin đã đăng

### 👨‍🎓 Candidate (Ứng viên)

* Đăng ký / đăng nhập
* Tìm kiếm việc làm IT
* Xem chi tiết công việc
* Ứng tuyển & quản lý hồ sơ

---

## 🔐 Authentication & Authorization

### Cơ chế xác thực

1. Người dùng đăng nhập
2. Backend trả về **JWT Access Token**
3. Token được lưu tại `localStorage` hoặc `cookie`
4. Axios tự động gắn token vào header mỗi request

```http
Authorization: Bearer <access_token>
```

### Bảo vệ route

* Kiểm tra đăng nhập trước khi vào trang riêng tư
* Phân quyền theo role (Admin / Recruiter / Candidate)
* Redirect khi không đủ quyền

---

## 🔎 Luồng tuyển dụng

### Luồng ứng viên

1. Truy cập trang chủ
2. Tìm kiếm việc làm IT
3. Xem chi tiết công việc
4. Đăng nhập / đăng ký
5. Ứng tuyển
6. Theo dõi trạng thái

### Luồng nhà tuyển dụng

1. Đăng nhập recruiter
2. Tạo tin tuyển dụng
3. Quản lý danh sách tin
4. Xem ứng viên ứng tuyển

---

## 🔌 Kết nối Backend

Backend NestJS repository:
👉 [https://github.com/nam-Space/hiring-page-BE](https://github.com/nam-Space/hiring-page-BE)

### Axios config mẫu

```ts
axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
```

---

## ⚙️ Cài đặt & Chạy project

### 1️⃣ Clone repository

```bash
git clone https://github.com/nam-Space/hiring-page-FE.git
cd hiring-page-FE
```

---

### 2️⃣ Cài đặt dependencies

```bash
npm install
```

---

### 3️⃣ Cấu hình môi trường (.env)

```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=HIRING_PAGE
```

---

### 4️⃣ Chạy development

```bash
npm run dev
```

Truy cập:
👉 [http://localhost:5173](http://localhost:5173)

---

## 🧪 Scripts

```bash
npm run dev        # Chạy dev
npm run build      # Build production
npm run preview    # Preview production
npm run lint       # Kiểm tra code
```

---

## 🚀 Build & Deploy

### Build

```bash
npm run build
```

### Deploy

* **Vercel / Netlify**
* **VPS (Nginx)**
* **cPanel Static Hosting**

---

## Một số giao diện chính

### Giao diện trang chủ
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/389ebfab-17a5-4a10-b38a-de75a2d98623" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/472e4df3-47c9-4ccd-abde-44700dfb47d9" />


### Giao diện công ty
<img width="1914" height="1067" alt="image" src="https://github.com/user-attachments/assets/ab746ca0-114d-4715-a8fb-3fcb5d1cd3c5" />

### Giao diện job
<img width="1919" height="1076" alt="image" src="https://github.com/user-attachments/assets/ec3e76ec-3ad8-49ca-b03e-93027eb5f3e2" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/99acc826-366a-414f-99f2-ee394cbf5423" />

### Giao diện admin dashboard
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/aa29729e-7116-43d6-afe3-c0ea8a65cf97" />

### Giao diện admin công ty
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/4558f2d1-9f92-4b37-bacf-c87749fea740" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/a9ff491c-916b-44d5-9d3b-f8a3f858d132" />

### Giao diện admin người dùng
<img width="1919" height="1074" alt="image" src="https://github.com/user-attachments/assets/997f6e14-1c7e-4ea3-9298-0fbb005019e3" />

### Giao diện admin job
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/cf0c35d6-1273-44d7-8acf-52e7e19172c5" />
<img width="1914" height="1072" alt="image" src="https://github.com/user-attachments/assets/22d333a1-35ca-436a-8d4a-f1b3cb02dca6" />

### Giao diện admin CV
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/dd27a172-e1a5-4c26-aca4-0926490cb34a" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/748e5db5-0311-4130-a7df-0cb799da7707" />

### Giao diện admin quyền hạn
<img width="1915" height="1072" alt="image" src="https://github.com/user-attachments/assets/c539a209-6357-4f2d-ada0-b201db8b61be" />

### Giao diện admin phân quyền
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/4bd9cb48-f1c3-4a5e-b434-f19bd716146b" />


---

## 🎨 UI & UX

* Sử dụng Ant Design cho giao diện đồng bộ
* Responsive trên Desktop / Tablet / Mobile
* SCSS giúp quản lý style rõ ràng, dễ mở rộng

---

## 🔮 Hướng phát triển tương lai

* Advanced job filtering
* CV upload & parsing
* Realtime notification
* Bookmark việc làm
* Dashboard thống kê

---

## 👨‍💻 Tác giả

* **Nam Nguyen**
* GitHub: [https://github.com/nam-Space](https://github.com/nam-Space)

---

## 📄 License

Dự án phục vụ mục đích **học tập, nghiên cứu và xây dựng hệ thống tuyển dụng IT thực tế**.
