<script setup>
</script>

<template>
  <div class="hero min-h-[60vh] bg-base-100 rounded-box shadow-lg mb-8">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Hello Penguins!</h1>
        <p class="py-6">Welcome to the Penguin Data System. Explore our comprehensive database of penguins, their habitats, and health statuses.</p>
        <button class="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Total Penguins</h2>
        <p class="text-4xl font-bold text-primary">0</p>
      </div>
    </div>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Species Tracked</h2>
        <p class="text-4xl font-bold text-secondary">0</p>
      </div>
    </div>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Active Habitats</h2>
        <p class="text-4xl font-bold text-accent">0</p>
      </div>
    </div>
  </div>
</template>
