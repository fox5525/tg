<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <!-- Navbar -->
    <div class="navbar bg-base-100 shadow-md">
      <div class="flex-1">
        <RouterLink to="/" class="btn btn-ghost text-xl">🐧 Penguin Data System</RouterLink>
        <RouterLink to="/search" class="btn btn-ghost ml-2">Search Penguins</RouterLink>
      </div>
      <div class="flex-none gap-2">
        <div class="form-control">
          <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="User Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><RouterLink to="/login">Login</RouterLink></li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="container mx-auto p-4 md:p-8">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
</style>
