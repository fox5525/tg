<script setup>
// 📦 นำเข้าเครื่องมือจาก Vue
// computed: จะถูกนำมาใช้คำนวณสถิติตัวเลขในแดชบอร์ดของ Admin ให้เปลี่ยนแปลงแบบ Real-time ด้วยครับ
import { ref, computed, onMounted } from 'vue'

// 🔗 CONFIGURATION: ที่อยู่ API ของหลังบ้าน
const API_URL = 'http://localhost:3000/api/penguins'

// ==========================================
// 1. ตัวเลือกข้อมูลสำหรับฟอร์ม (Options)
// ==========================================
const speciesOptions = ['Emperor', 'King', 'Adélie', 'Chinstrap', 'Gentoo', 'Magellanic', 'African', 'Fairy/Little Blue', 'Others']
const genderOptions = ['ตัวผู้', 'ตัวเมีย', 'ไม่ทราบ']
const colorOptions = ['ดำ-ขาว', 'มีแถบเหลือง/ส้ม', 'สีน้ำเงินเทา', 'อื่นๆ']
const ageOptions = ['ลูกนก (Chick)', 'วัยรุ่น (Juvenile)', 'ตัวเต็มวัย (Adult)']
const statusOptions = ['แข็งแรงปกติ', 'ป่วย/กำลังรักษา', 'อยู่ระหว่างอนุบาล', 'ส่งตัวไปที่อื่น', 'เสียชีวิตแล้ว', 'ปล่อยคืนสู่ธรรมชาติ']

// ==========================================
// 2. ตัวแปรเก็บข้อมูลและสถานะระบบ (Core State)
// ==========================================
const penguins = ref([])
const isLoading = ref(true)
const isError = ref(false)

// 🔒 [NEW] ตัวแปรควบคุมสิทธิ์การใช้งานจำลอง (เปลี่ยนค่าเพื่อทดสอบหน้าจอได้)
// ค่าเริ่มต้นกำหนดให้เป็น 'Admin'
const currentRole = ref('Admin') 

// ==========================================
// 3. ตัวแปรระบบค้นหา & จัดการหน้าจอ (UI State)
// ==========================================
const searchKeyword = ref('')
const filterSpecies = ref('')
const filterGender = ref('')
const filterStatus = ref('')
const viewMode = ref('card')
const isModalOpen = ref(false)
const isEditing = ref(false)
const selectedId = ref(null)

const form = ref({
  name: '',
  species: 'Emperor',
  gender: 'ไม่ทราบ',
  colors: [],
  ageGroup: 'ตัวเต็มวัย (Adult)',
  habitat: '',
  status: 'แข็งแรงปกติ',
  image: ''
})

// ==========================================
// 4. ลอจิกคำนวณสถิติสำหรับ Admin (Admin Stats)
// ==========================================
// คำนวณจำนวนแพนกวินทั้งหมดในระบบ
const totalCount = computed(() => penguins.value.length)
// คำนวณจำนวนนกที่แข็งแรงดี
const healthyCount = computed(() => penguins.value.filter(p => p.status === 'แข็งแรงปกติ').length)
// คำนวณจำนวนนกที่กำลังป่วย
const sickCount = computed(() => penguins.value.filter(p => p.status === 'ป่วย/กำลังรักษา').length)

// ลอจิกคัดกรองข้อมูลสำหรับค้นหา (Filter)
const filteredPenguins = computed(() => {
  return penguins.value.filter(p => {
    const matchKeyword = p.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) || 
                         (p.habitat && p.habitat.toLowerCase().includes(searchKeyword.value.toLowerCase()))
    const matchSpecies = !filterSpecies.value || p.species === filterSpecies.value
    const matchGender = !filterGender.value || p.gender === filterGender.value
    const matchStatus = !filterStatus.value || p.status === filterStatus.value
    return matchKeyword && matchSpecies && matchGender && matchStatus
  })
})

// ==========================================
// 5. ฟังก์ชันเชื่อมต่อ API (CRUD Operations)
// ==========================================
const fetchPenguins = async () => {
  try {
    isLoading.value = true
    isError.value = false
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error()
    penguins.value = await res.json()
  } catch (error) {
    isError.value = true
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const handleSave = async () => {
  try {
    const dataToSend = { ...form.value }
    if (isEditing.value) {
      await fetch(`${API_URL}/${selectedId.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      })
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      })
    }
    isModalOpen.value = false
    await fetchPenguins()
  } catch (error) {
    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  }
}

const handleDelete = async (id) => {
  if (confirm('คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้ถาวร?')) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      await fetchPenguins()
    } catch (error) {
      alert('ไม่สามารถลบข้อมูลได้')
    }
  }
}

// ==========================================
// 6. ฟังก์ชันควบคุมการเปิดหน้าต่างฟอร์ม
// ==========================================
const openAddModal = () => {
  isEditing.value = false
  form.value = { name: '', species: 'Emperor', gender: 'ไม่ทราบ', colors: [], ageGroup: 'ตัวเต็มวัย (Adult)', habitat: '', status: 'แข็งแรงปกติ', image: '' }
  isModalOpen.value = true
}

const openEditModal = (penguin) => {
  isEditing.value = true
  selectedId.value = penguin.id
  form.value = { ...penguin, colors: penguin.colors ? [...penguin.colors] : [] }
  isModalOpen.value = true
}

onMounted(() => {
  fetchPenguins()
})
</script>

<template>
  <div class="space-y-6 text-base-content">
    
    <!-- ========================================== -->
    <!-- แถบจำลองการสลับสิทธิ์การใช้งาน (Role Switcher) -->
    <!-- ========================================== -->
    <div class="navbar bg-base-100 shadow-xl rounded-2xl p-4 flex flex-wrap justify-between gap-4 border border-base-200">
      <div>
        <h1 class="text-2xl font-bold text-primary flex items-center gap-2">
          🐧 ระบบบันทึกข้อมูลแพนกวิน
        </h1>
        <p class="text-xs text-neutral-400">Penguin Data Recording System (Final Version)</p>
      </div>
      
      <!-- ตัวเลือกสลับสิทธิ์การใช้งานจำลอง -->
      <div class="flex items-center gap-2 bg-base-200 p-2 rounded-xl">
        <span class="text-xs font-bold text-neutral-500">ทดสอบสิทธิ์:</span>
        <select v-model="currentRole" class="select select-bordered select-xs sm:select-sm font-bold select-primary">
          <option value="Admin">👑 Admin (ผู้ดูแลระบบ)</option>
          <option value="Staff">👨‍⚕️ Staff (เจ้าหน้าที่สวนสัตว์)</option>
          <option value="User">👤 User (ผู้เยี่ยมชมทั่วไป)</option>
        </select>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- [NEW] แดชบอร์ดสถิติภาพรวม (แสดงเฉพาะสิทธิ์ Admin เท่านั้น) -->
    <!-- ========================================== -->
    <!-- ใช้คำสั่ง v-if="currentRole === 'Admin'" บล็อกนี้จะไม่แสดงเลยถ้าเลือกสิทธิ์อื่น -->
    <div v-if="currentRole === 'Admin'" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="stat bg-base-100 shadow-xl rounded-2xl border-b-4 border-primary">
        <div class="stat-title text-sm font-bold">แพนกวินทั้งหมดในระบบ</div>
        <div class="stat-value text-primary text-2xl mt-1">{{ totalCount }} ตัว</div>
      </div>
      <div class="stat bg-base-100 shadow-xl rounded-2xl border-b-4 border-success">
        <div class="stat-title text-sm font-bold">สุขภาพแข็งแรงปกติ</div>
        <div class="stat-value text-success text-2xl mt-1">{{ healthyCount }} ตัว</div>
      </div>
      <div class="stat bg-base-100 shadow-xl rounded-2xl border-b-4 border-warning">
        <div class="stat-title text-sm font-bold">ป่วย / อยู่ระหว่างรักษา</div>
        <div class="stat-value text-warning text-2xl mt-1">{{ sickCount }} ตัว</div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- บล็อกระบบค้นหาและฟิลเตอร์ข้อมูล -->
    <!-- ========================================== -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body gap-4">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h2 class="card-title text-lg">🔍 ค้นหาและคัดกรองข้อมูล</h2>
          
          <div class="flex items-center gap-2">
            <div class="join border border-base-300">
              <button @click="viewMode = 'card'" class="btn btn-sm join-item" :class="viewMode === 'card' ? 'btn-primary text-white' : ''">📇 ดูแบบกล่อง</button>
              <button @click="viewMode = 'table'" class="btn btn-sm join-item" :class="viewMode === 'table' ? 'btn-primary text-white' : ''">📋 ดูแบบตาราง</button>
            </div>
            
            <!-- 🔒 เช็กสิทธิ์ความปลอดภัย: ซ่อนปุ่มลงทะเบียนถ้าวรรณะเป็น User ทั่วไป -->
            <!-- v-if="currentRole !== 'User'" หมายความว่า คนที่เป็น Admin และ Staff ถึงจะเห็นปุ่มนี้ -->
            <button v-if="currentRole !== 'User'" @click="openAddModal" class="btn btn-primary btn-sm text-white">
              ➕ ลงทะเบียนแพนกวิน
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <input v-model="searchKeyword" type="text" placeholder="พิมพ์ชื่อนก หรือ โซนที่อยู่..." class="input input-bordered w-full input-sm" />
          
          <select v-model="filterSpecies" class="select select-bordered select-sm w-full">
            <option value="">ทุกสายพันธุ์</option>
            <option v-for="sp in speciesOptions" :key="sp" :value="sp">{{ sp }}</option>
          </select>

          <select v-model="filterGender" class="select select-bordered select-sm w-full">
            <option value="">ทุกเพศ</option>
            <option v-for="g in genderOptions" :key="g" :value="g">{{ g }}</option>
          </select>

          <select v-model="filterStatus" class="select select-bordered select-sm w-full">
            <option value="">ทุกสถานะ</option>
            <option v-for="st in statusOptions" :key="st" :value="st">{{ st }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- แสดงสถานะการโหลด/ความผิดพลาด -->
    <div v-if="isLoading" class="text-center py-12 bg-base-100 shadow-xl rounded-2xl">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div v-else-if="isError" class="text-center py-12 bg-error/10 text-error shadow-xl rounded-2xl font-bold">
      ❌ ไม่สามารถเชื่อมต่อกับหลังบ้านได้
    </div>

    <div v-else-if="filteredPenguins.length === 0" class="text-center py-12 bg-base-100 shadow-xl rounded-2xl">
      <p class="text-xl text-neutral-400">❌ ไม่พบข้อมูลแพนกวินในระบบ</p>
    </div>

    <!-- ========================================== -->
    <!-- 3.1 พื้นที่แสดงผล: โหมด CARD -->
    <!-- ========================================== -->
    <div v-else-if="viewMode === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="p in filteredPenguins" :key="p.id" class="card bg-base-100 shadow-xl overflow-hidden border border-base-200">
        <figure class="h-48 bg-neutral">
          <img :src="p.image || 'https://placehold.co/600x400?text=Cute+Penguin'" alt="Penguin" class="w-full h-full object-cover" />
        </figure>
        <div class="card-body p-5 space-y-2">
          <div class="flex justify-between items-center">
            <h3 class="card-title text-xl font-bold">{{ p.name }}</h3>
            <span class="badge" :class="p.status === 'แข็งแรงปกติ' ? 'badge-success text-white' : 'badge-warning text-white'">{{ p.status }}</span>
          </div>
          <div class="text-sm space-y-1">
            <p><strong>สายพันธุ์:</strong> {{ p.species }}</p>
            <p><strong>เพศ:</strong> {{ p.gender }} | <strong>ช่วงอายุ:</strong> {{ p.ageGroup }}</p>
            <p><strong>สีตัว:</strong> <span v-for="c in p.colors" :key="c" class="badge badge-xs badge-ghost mr-1">{{ c }}</span></p>
            <p class="text-xs text-neutral-400 mt-2">📍 {{ p.habitat || 'ไม่มีระบุโซน' }}</p>
          </div>
          
          <!-- 🔒 เช็กสิทธิ์ความปลอดภัย: ซ่อนปุ่มแก้ไขและลบ สำหรับสิทธิ์ User ทั่วไป -->
          <div v-if="currentRole !== 'User'" class="card-actions justify-end pt-2 border-t border-base-200 gap-1">
            <button @click="openEditModal(p)" class="btn btn-warning btn-xs text-white px-3">แก้ไข</button>
            <button @click="handleDelete(p.id)" class="btn btn-error btn-xs text-white px-3">ลบ</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- 3.2 พื้นที่แสดงผล: โหมด TABLE -->
    <!-- ========================================== -->
    <div v-else class="card bg-base-100 shadow-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr class="bg-base-200">
              <th>รูป</th>
              <th>ชื่อ</th>
              <th>สายพันธุ์</th>
              <th>เพศ</th>
              <th>ช่วงอายุ</th>
              <th>โซนที่อยู่</th>
              <th>สถานะ</th>
              <!-- 🔒 ส่วนหัวของตารางจัดการข้อมูลจะซ่อนถ้าสิทธิ์เป็น User -->
              <th v-if="currentRole !== 'User'" class="text-center">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in filteredPenguins" :key="p.id" class="hover">
              <td>
                <div class="avatar"><div class="w-10 h-10 rounded-xl"><img :src="p.image || 'https://placehold.co/100'" /></div></div>
              </td>
              <td><span class="font-bold">{{ p.name }}</span></td>
              <td>{{ p.species }}</td>
              <td>{{ p.gender }}</td>
              <td>{{ p.ageGroup }}</td>
              <td>{{ p.habitat || '-' }}</td>
              <td>
                <span class="badge badge-sm" :class="p.status === 'แข็งแรงปกติ' ? 'badge-success text-white' : 'badge-warning text-white'">{{ p.status }}</span>
              </td>
              <!-- 🔒 ข้อมูลปุ่มจัดการในแถวตารางจะซ่อนอัตโนมัติถ้าสิทธิ์เป็น User -->
              <td v-if="currentRole !== 'User'" class="text-center">
                <div class="flex justify-center gap-1">
                  <button @click="openEditModal(p)" class="btn btn-warning btn-xs text-white">แก้ไข</button>
                  <button @click="handleDelete(p.id)" class="btn btn-error btn-xs text-white">ลบ</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- กล่อง Modal สำหรับกรอกข้อมูลแพนกวิน -->
    <!-- ========================================== -->
    <div class="modal" :class="isModalOpen ? 'modal-open' : ''">
      <div class="modal-box max-w-2xl bg-base-100">
        <h3 class="font-bold text-xl mb-4 text-primary">
          {{ isEditing ? '📝 แก้ไขข้อมูลแพนกวิน' : '➕ ลงทะเบียนน้องแพนกวินรายใหม่' }}
        </h3>
        
        <form @submit.prevent="handleSave" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">ชื่อเรียกแพนกวิน</span></label>
            <input v-model="form.name" type="text" placeholder="ระบุชื่อ..." class="input input-bordered w-full" required />
          </div>

          <div class="form-control">
            <label class="label"><span class="label-text font-bold">สายพันธุ์</span></label>
            <select v-model="form.species" class="select select-bordered w-full">
              <option v-for="sp in speciesOptions" :key="sp" :value="sp">{{ sp }}</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label"><span class="label-text font-bold">เพศ</span></label>
            <select v-model="form.gender" class="select select-bordered w-full">
              <option v-for="g in genderOptions" :key="g" :value="g">{{ g }}</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label"><span class="label-text font-bold">ช่วงอายุ (Age Group)</span></label>
            <select v-model="form.ageGroup" class="select select-bordered w-full">
              <option v-for="a in ageOptions" :key="a" :value="a">{{ a }}</option>
            </select>
          </div>

          <div class="form-control md:col-span-2">
            <label class="label"><span class="label-text font-bold">ถิ่นที่อยู่อาศัย / โซนจัดแสดง (ไม่บังคับ)</span></label>
            <input v-model="form.habitat" type="text" placeholder="เช่น กรงน้ำแข็ง..." class="input input-bordered w-full" />
          </div>

          <div class="form-control md:col-span-2">
            <label class="label"><span class="label-text font-bold">สถานะความเป็นอยู่ปัจจุบัน</span></label>
            <select v-model="form.status" class="select select-bordered w-full">
              <option v-for="st in statusOptions" :key="st" :value="st">{{ st }}</option>
            </select>
          </div>

          <div class="form-control md:col-span-2">
            <label class="label"><span class="label-text font-bold">สีของลำตัว (เลือกได้มากกว่า 1 ข้อ)</span></label>
            <div class="flex flex-wrap gap-4 px-2">
              <label v-for="c in colorOptions" :key="c" class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" :value="c" v-model="form.colors" class="checkbox checkbox-primary checkbox-sm" />
                <span class="text-sm">{{ c }}</span>
              </label>
            </div>
          </div>

          <div class="form-control md:col-span-2">
            <label class="label"><span class="label-text font-bold">ลิงก์รูปภาพแพนกวิน (Image URL)</span></label>
            <input v-model="form.image" type="url" placeholder="http://..." class="input input-bordered w-full" />
          </div>

          <div class="modal-action md:col-span-2 justify-end gap-2 mt-4">
            <button type="button" @click="isModalOpen = false" class="btn btn-ghost">ยกเลิก</button>
            <button type="submit" class="btn btn-primary text-white font-bold">💾 บันทึกข้อมูลไปยังฐานข้อมูล</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>