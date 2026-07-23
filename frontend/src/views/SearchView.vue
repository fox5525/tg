<script setup>
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Search & Filter Penguins</h1>
    
    <div class="bg-base-100 p-6 rounded-box shadow-lg mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select class="select select-bordered w-full">
          <option disabled selected>Species</option>
          <option>Emperor</option>
          <option>King</option>
          <option>Adélie</option>
        </select>
        <select class="select select-bordered w-full">
          <option disabled selected>Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <select class="select select-bordered w-full">
          <option disabled selected>Status</option>
          <option>Healthy</option>
          <option>Sick</option>
        </select>
        <button class="btn btn-primary w-full">Filter</button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Placeholder Card -->
      <div class="card bg-base-100 shadow-xl">
        <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Penguin" /></figure>
        <div class="card-body">
          <h2 class="card-title">Pingu (Emperor)</h2>
          <p>Status: Healthy</p>
          <div class="card-actions justify-end mt-4">
            <RouterLink to="/penguin/1" class="btn btn-sm btn-outline">View Details</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
