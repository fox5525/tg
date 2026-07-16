# 🎨 Frontend Development Plan (Penguin Data System)

เอกสารนี้สำหรับผู้รับผิดชอบฝั่ง Frontend เพื่อใช้ในการพัฒนาระบบบันทึกข้อมูลแพนกวิน

## 🛠 Tech Stack
- **Framework:** Vue.js
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **UI Components:** DaisyUI
- **Containerization:** Docker (สร้าง `Dockerfile` สำหรับ Frontend)

---

## 📱 โครงสร้างหน้า UI (Pages & Routing)

### 1. หน้า Public / User ทั่วไป
- **หน้าแรก (Home / Dashboard):** 
  - แสดงจำนวนสถิติแพนกวินคร่าวๆ
  - แสดงผลรายชื่อแพนกวินแบบ **Card** หรือ **Table** (มีปุ่ม Toggle สลับมุมมอง)
- **หน้าค้นหาและกรองข้อมูล (Search & Filter):**
  - ฟอร์มสำหรับกรองข้อมูล (Dropdown/Checkbox): เพศ, สี, ช่วงอายุ, สายพันธุ์, โซนจัดแสดง, สถานะ
- **หน้ารายละเอียดแพนกวิน (Penguin Detail):**
  - แสดงข้อมูลแบบเจาะลึกของแพนกวิน 1 ตัว พร้อมรูปภาพ
- **หน้าเข้าสู่ระบบ (Login) / สมัครสมาชิก (Register)**

### 2. หน้า Management (เฉพาะ Staff / Admin)
- **หน้าจัดการข้อมูลแพนกวิน (Manage Penguins):**
  - ตารางแสดงข้อมูลพร้อมปุ่ม Edit, Delete
  - ฟอร์มสำหรับเพิ่มแพนกวินตัวใหม่ (Add New) พร้อมช่องอัปโหลดรูป
- **หน้าจัดการผู้ใช้งาน (Manage Users) - *เฉพาะ Admin*:**
  - ตารางรายชื่อ User และระบบปรับเปลี่ยน Role (สิทธิ์)

---

## 🎨 UI/UX Guidelines
- **Theme:** แนะนำให้ใช้โทนสีที่ดูเป็นธรรมชาติเข้ากับแพนกวิน (เช่น ขาว, ดำ, ฟ้าอมเทา, น้ำเงิน) 
- **DaisyUI Theme:** สามารถเลือกใช้ Theme สำเร็จรูปจาก DaisyUI เพื่อความรวดเร็ว
- **Responsive:** ต้องรองรับการแสดงผลทั้งบน Desktop และ Mobile

---

## 🔌 การเชื่อมต่อ API
- ตั้งค่า Axios (หรือ Fetch API) สำหรับการยิง Request ไปยัง Backend
- จัดการ State ของ Token เมื่อผู้ใช้ Login สำเร็จ
- รองรับการทำ Error Handling เมื่อ API ตอบกลับมาว่าไม่สำเร็จ

---

## 🐳 Dockerfile Requirement
- สร้าง `Dockerfile` โดยใช้ Base Image เช่น `node:18-alpine` สำหรับขั้นตอน Build และใช้ Nginx สำหรับเสิร์ฟไฟล์ Static
- Expose port 80 (หรือพอร์ตที่กำหนด)
