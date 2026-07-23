<script setup>
import { ref, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import FilterSidebar from './components/FilterSidebar.vue';
import PenguinCard from './components/PenguinCard.vue';
import PenguinTable from './components/PenguinTable.vue';
import { mockPenguins, filterOptions } from './data/mockPenguins.js';

// State
const viewMode = ref('card'); // 'card' or 'table'
const activeFilters = ref({
  gender: '',
  species: '',
  status: '',
  age: ''
});

// Computed Properties
const filteredPenguins = computed(() => {
  return mockPenguins.filter(penguin => {
    // Check gender
    if (activeFilters.value.gender && penguin.gender !== activeFilters.value.gender) return false;
    // Check species
    if (activeFilters.value.species && penguin.species !== activeFilters.value.species) return false;
    // Check status
    if (activeFilters.value.status && penguin.status !== activeFilters.value.status) return false;
    // Check age (since penguin.ages is an array, check if it includes the selected age)
    if (activeFilters.value.age && !penguin.ages.includes(activeFilters.value.age)) return false;
    
    return true;
  });
});

// Methods
const handleFilterChange = (newFilters) => {
  activeFilters.value = newFilters;
};
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content font-sans">
    <Navbar />

    <main class="container mx-auto px-4 py-8">
      <!-- Header Area -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-bold">Penguin Directory</h1>
          <p class="text-base-content/60 mt-1">Manage and monitor penguin data across all zones</p>
        </div>
        
        <!-- View Toggle & Actions -->
        <div class="flex items-center gap-3 w-full md:w-auto">
          <div class="join bg-base-200/50 p-1 rounded-xl shadow-inner border border-base-300">
            <button 
              class="join-item btn btn-sm border-none"
              :class="viewMode === 'card' ? 'bg-base-100 shadow-sm shadow-black/5 hover:bg-base-100' : 'btn-ghost'"
              @click="viewMode = 'card'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              Grid
            </button>
            <button 
              class="join-item btn btn-sm border-none"
              :class="viewMode === 'table' ? 'bg-base-100 shadow-sm shadow-black/5 hover:bg-base-100' : 'btn-ghost'"
              @click="viewMode = 'table'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              List
            </button>
          </div>
          <button class="btn btn-primary btn-sm rounded-lg shadow-primary/30 shadow-lg ml-auto md:ml-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" /></svg>
            Add New
          </button>
        </div>
      </div>

      <!-- Main Content Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <!-- Left Sidebar (Filters) -->
        <aside class="lg:col-span-1">
          <div class="sticky top-24">
            <FilterSidebar 
              :options="filterOptions" 
              @filter-change="handleFilterChange" 
            />
          </div>
        </aside>

        <!-- Right Content Area -->
        <div class="lg:col-span-3 min-h-[500px]">
          
          <div class="mb-4 text-sm font-medium text-base-content/60 flex items-center justify-between">
            <span>Showing {{ filteredPenguins.length }} penguins</span>
          </div>

          <!-- Card View -->
          <div v-if="viewMode === 'card'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <PenguinCard 
              v-for="penguin in filteredPenguins" 
              :key="penguin.id" 
              :penguin="penguin" 
            />
          </div>

          <!-- Empty State (Card View) -->
          <div v-if="viewMode === 'card' && filteredPenguins.length === 0" class="col-span-full py-16 flex flex-col items-center justify-center bg-base-200/30 rounded-2xl border border-base-200 border-dashed">
             <span class="text-5xl mb-4 opacity-50">🧊</span>
             <h3 class="text-xl font-bold">No penguins found</h3>
             <p class="text-base-content/60 mt-1 max-w-sm text-center">Try adjusting your filters to find what you're looking for.</p>
          </div>

          <!-- Table View -->
          <div v-if="viewMode === 'table'">
            <PenguinTable :penguins="filteredPenguins" />
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<style>
/* Add smooth scrolling to body */
body {
  scroll-behavior: smooth;
}
</style>