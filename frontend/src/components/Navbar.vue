<script setup>
// Navbar component
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm px-6 sticky top-0 z-50">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl font-bold flex items-center gap-2">
        <span class="text-3xl">🐧</span>
        <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">PenguinData</span>
      </a>
    </div>
    <div class="flex-none gap-2">
      <div class="form-control">
        <input type="text" placeholder="Search..." class="input input-bordered w-24 md:w-auto rounded-full" />
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            U
          </div>
        </div>
        <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <a class="justify-between">
              Profile
              <span class="badge badge-primary">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a class="text-error">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
