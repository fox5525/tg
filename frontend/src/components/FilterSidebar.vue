<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  options: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['filter-change']);

const filters = ref({
  gender: '',
  species: '',
  status: '',
  age: ''
});

const resetFilters = () => {
  filters.value = {
    gender: '',
    species: '',
    status: '',
    age: ''
  };
};

watch(filters, (newFilters) => {
  emit('filter-change', newFilters);
}, { deep: true });
</script>

<template>
  <div class="bg-base-200/50 p-6 rounded-2xl h-full border border-base-300">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-bold flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
      </h2>
      <button @click="resetFilters" class="btn btn-xs btn-ghost text-base-content/60 hover:text-primary">Reset</button>
    </div>

    <div class="space-y-5">
      <!-- Species Filter -->
      <div class="form-control">
        <label class="label pb-1">
          <span class="label-text font-medium text-base-content/80">Species</span>
        </label>
        <select v-model="filters.species" class="select select-bordered select-sm w-full bg-base-100">
          <option value="">All Species</option>
          <option v-for="species in props.options.species" :key="species" :value="species">
            {{ species }}
          </option>
        </select>
      </div>

      <!-- Gender Filter -->
      <div class="form-control">
        <label class="label pb-1">
          <span class="label-text font-medium text-base-content/80">Gender</span>
        </label>
        <select v-model="filters.gender" class="select select-bordered select-sm w-full bg-base-100">
          <option value="">All Genders</option>
          <option v-for="gender in props.options.genders" :key="gender" :value="gender">
            {{ gender === 'MALE' ? 'Male ♂' : gender === 'FEMALE' ? 'Female ♀' : 'Unknown' }}
          </option>
        </select>
      </div>

      <!-- Age Group Filter -->
      <div class="form-control">
        <label class="label pb-1">
          <span class="label-text font-medium text-base-content/80">Age Group</span>
        </label>
        <select v-model="filters.age" class="select select-bordered select-sm w-full bg-base-100">
          <option value="">All Ages</option>
          <option v-for="age in props.options.ages" :key="age" :value="age">
            {{ age }}
          </option>
        </select>
      </div>

      <!-- Status Filter -->
      <div class="form-control">
        <label class="label pb-1">
          <span class="label-text font-medium text-base-content/80">Status</span>
        </label>
        <select v-model="filters.status" class="select select-bordered select-sm w-full bg-base-100">
          <option value="">All Statuses</option>
          <option v-for="status in props.options.statuses" :key="status" :value="status">
            {{ status.replace('_', ' ') }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
