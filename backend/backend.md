# ⚙️ Backend Development Plan (Penguin Data System)

เอกสารนี้สำหรับผู้รับผิดชอบฝั่ง Backend เพื่อใช้ในการพัฒนาระบบบันทึกข้อมูลแพนกวิน

## 🛠 Tech Stack
- **Framework:** Node.js + Express.js
- **Database:** PostgreSQL (หรือ MySQL)
- **Containerization:** Docker (สร้าง `Dockerfile` สำหรับ Backend)
- **API Design:** RESTful API

---

## 🗄️ Database Schema Design (Initial)

### 1. Table: `users`
เก็บข้อมูลผู้ใช้งานระบบ (Admin, Staff, User)
- `id` (PK, UUID/Int)
- `username` (Varchar, Unique)
- `password_hash` (Varchar)
- `role` (Enum: 'ADMIN', 'STAFF', 'USER')
- `created_at` (Timestamp)

### 2. Table: `penguins`
เก็บข้อมูลหลักของแพนกวิน
- `id` (PK, UUID/Int)
- `name` (Varchar) - *ถ้ามีชื่อ*
- `gender` (Enum: 'MALE', 'FEMALE', 'UNKNOWN')
- `species` (Varchar) - *สายพันธุ์ เช่น Emperor, King, etc.*
- `habitat_zone` (Varchar) - *ถิ่นที่อยู่ / โซนจัดแสดง*
- `status` (Enum: 'HEALTHY', 'SICK', 'UNDER_CARE', 'DECEASED', 'RELEASED', 'TRANSFERRED')
- `image_url` (Varchar) - *พาธเก็บรูปภาพ*
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### 3. Table: `penguin_colors` (Many-to-Many / Array)
เก็บข้อมูลสีของแพนกวิน (เนื่องจาก 1 ตัวมีได้หลายสี)
- `penguin_id` (FK)
- `color` (Varchar)

### 4. Table: `penguin_ages` (Many-to-Many / Array)
เก็บช่วงอายุของแพนกวิน (ลูกนก, วัยรุ่น, ตัวเต็มวัย)
- `penguin_id` (FK)
- `age_group` (Varchar)

---

## 🔌 RESTful API Endpoints (Draft)

### 🔐 Authentication
- `POST /api/auth/register` - สมัครสมาชิกใหม่ (User)
- `POST /api/auth/login` - ล็อกอิน และรับ Token (JWT)

### 🐧 Penguins (Data Management)
- `GET /api/penguins` - ดึงข้อมูลแพนกวินทั้งหมด (รองรับ Query Params สำหรับ Filter เช่น `?gender=MALE&species=Emperor`)
- `GET /api/penguins/:id` - ดึงข้อมูลแพนกวินรายตัว
- `POST /api/penguins` - เพิ่มข้อมูลแพนกวิน (Requires: Admin, Staff)
- `PUT /api/penguins/:id` - แก้ไขข้อมูลแพนกวิน (Requires: Admin, Staff)
- `DELETE /api/penguins/:id` - ลบข้อมูลแพนกวิน (Requires: Admin, Staff)
- `POST /api/penguins/:id/upload-image` - อัปโหลดรูปภาพ

### 👥 Users (User Management)
- `GET /api/users` - ดูรายชื่อผู้ใช้งานทั้งหมด (Requires: Admin)
- `PUT /api/users/:id/role` - เปลี่ยน Role ผู้ใช้งาน (Requires: Admin)

---

## 🐳 Dockerfile Requirement
- สร้าง `Dockerfile` โดยใช้ Base Image เป็น `node:18-alpine` (หรือเวอร์ชันล่าสุดที่เหมาะสม)
- ระบุการติดตั้ง dependencies (`npm install`)
- Expose port สำหรับ API (เช่น 3000)
- รันคำสั่งเริ่มเซิร์ฟเวอร์ (`npm run dev` หรือ `npm start`)
