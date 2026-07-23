<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- กำหนดพื้นหลังหลักของเว็บให้เป็นสีเทาอ่อนสไตล์โมเดิร์น (bg-base-200) -->
  <div class="min-h-screen bg-base-200 text-base-content antialiased">
    
    <!-- แถบเมนูด้านบนสุด (Navbar) ดีไซน์ใหม่แบบมินิมอล -->
    <header class="navbar bg-base-100 shadow-sm border-b border-base-300 px-6">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl font-bold gap-2">
          🐧 ZOO Penguin Portal
        </a>
      </div>
      <div class="flex-none gap-2">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar border border-base-300">
            <div class="w-10 rounded-full bg-neutral text-neutral-content flex items-center justify-center font-bold">
              <span>AD</span>
            </div>
          </div>
          <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200">
            <li><a>⚙️ ตั้งค่าระบบ</a></li>
            <li><a class="text-error">🔒 ออกจากระบบ</a></li>
          </ul>
        </div>
      </div>
    </header>

    <!-- ส่วนเนื้อหาหลักที่จะดึงข้อมูลจาก HomeView.vue มาแสดง -->
    <main class="container mx-auto p-4 md:p-6 max-w-7xl">
      <RouterView />
    </main>

  </div>
</template>

<style>
/* ตั้งค่า Font ให้ดูละมุนและอ่านง่ายขึ้น */
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&display=swap');
body {
  font-family: 'Sarabun', sans-serif;
}
</style>