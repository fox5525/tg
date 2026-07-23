<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const penguinId = route.params.id
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="card lg:card-side bg-base-100 shadow-xl mb-8">
      <figure class="lg:w-1/2">
        <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Penguin" class="object-cover h-full w-full"/>
      </figure>
      <div class="card-body">
        <h2 class="card-title text-3xl">Pingu <div class="badge badge-primary">Emperor</div></h2>
        <div class="divider"></div>
        <p><strong>ID:</strong> {{ penguinId }}</p>
        <p><strong>Gender:</strong> Male</p>
        <p><strong>Status:</strong> <span class="badge badge-success">Healthy</span></p>
        <p><strong>Habitat Zone:</strong> Ice Cap A</p>
        <div class="card-actions justify-end mt-6">
          <RouterLink to="/search" class="btn btn-outline">Back to Search</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
