<script setup>
</script>

<template>
  <div class="flex justify-center items-center min-h-[60vh]">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title justify-center text-2xl mb-4">Login</h2>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input type="text" placeholder="username" class="input input-bordered" />
        </div>
        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" class="input input-bordered" />
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>
