<script setup>
import { computed } from 'vue';

const props = defineProps({
  penguin: {
    type: Object,
    required: true
  }
});

const statusColor = computed(() => {
  switch (props.penguin.status) {
    case 'HEALTHY': return 'badge-success';
    case 'SICK': return 'badge-error';
    case 'UNDER_CARE': return 'badge-warning';
    case 'RELEASED': return 'badge-info';
    case 'TRANSFERRED': return 'badge-ghost';
    case 'DECEASED': return 'badge-neutral';
    default: return 'badge-ghost';
  }
});
</script>

<template>
  <div class="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 border border-base-200 overflow-hidden group">
    <figure class="h-48 relative overflow-hidden bg-base-200">
      <img 
        :src="penguin.image_url" 
        :alt="penguin.name" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div class="absolute top-3 right-3 flex gap-2">
        <div class="badge font-medium shadow-sm backdrop-blur-md bg-base-100/80 border-none" :class="statusColor">
          {{ penguin.status.replace('_', ' ') }}
        </div>
      </div>
    </figure>
    
    <div class="card-body p-5">
      <div class="flex justify-between items-start mb-2">
        <h2 class="card-title text-xl font-bold">
          {{ penguin.name }}
          <span v-if="penguin.gender === 'MALE'" class="text-blue-500 text-lg" title="Male">♂</span>
          <span v-else-if="penguin.gender === 'FEMALE'" class="text-pink-500 text-lg" title="Female">♀</span>
          <span v-else class="text-gray-400 text-sm" title="Unknown">❓</span>
        </h2>
      </div>
      
      <div class="space-y-2 mt-2 text-sm">
        <div class="flex items-center gap-2 text-base-content/80">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
          <span class="font-medium">Species:</span> {{ penguin.species }}
        </div>
        
        <div class="flex items-center gap-2 text-base-content/80">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span class="font-medium">Zone:</span> <span class="truncate">{{ penguin.habitat_zone || 'Unknown' }}</span>
        </div>
      </div>
      
      <div class="mt-4 flex flex-wrap gap-1">
        <span v-for="age in penguin.ages" :key="age" class="badge badge-outline badge-sm text-xs">
          {{ age }}
        </span>
      </div>
      
      <div class="card-actions justify-end mt-4 pt-4 border-t border-base-200">
        <button class="btn btn-sm btn-primary">View Details</button>
      </div>
    </div>
  </div>
</template>
