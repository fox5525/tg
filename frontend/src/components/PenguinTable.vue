<script setup>
const props = defineProps({
  penguins: {
    type: Array,
    required: true
  }
});

const getStatusColor = (status) => {
  switch (status) {
    case 'HEALTHY': return 'badge-success';
    case 'SICK': return 'badge-error';
    case 'UNDER_CARE': return 'badge-warning';
    case 'RELEASED': return 'badge-info';
    case 'TRANSFERRED': return 'badge-ghost';
    case 'DECEASED': return 'badge-neutral';
    default: return 'badge-ghost';
  }
};
</script>

<template>
  <div class="overflow-x-auto bg-base-100 rounded-xl shadow-sm border border-base-200">
    <table class="table table-zebra w-full">
      <thead>
        <tr class="bg-base-200/50 text-base-content/80 text-sm">
          <th>Penguin</th>
          <th>Gender</th>
          <th>Species</th>
          <th>Habitat Zone</th>
          <th>Age Group</th>
          <th>Status</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="penguin in penguins" :key="penguin.id" class="hover:bg-base-200/30 transition-colors">
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img :src="penguin.image_url" :alt="penguin.name" class="object-cover" />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ penguin.name }}</div>
                <div class="text-xs opacity-50">{{ penguin.colors.join(', ') }}</div>
              </div>
            </div>
          </td>
          <td>
            <span v-if="penguin.gender === 'MALE'" class="text-blue-500 font-bold" title="Male">M ♂</span>
            <span v-else-if="penguin.gender === 'FEMALE'" class="text-pink-500 font-bold" title="Female">F ♀</span>
            <span v-else class="text-gray-400" title="Unknown">-</span>
          </td>
          <td>{{ penguin.species }}</td>
          <td>
            <span class="truncate max-w-[150px] inline-block" :title="penguin.habitat_zone">
              {{ penguin.habitat_zone || '-' }}
            </span>
          </td>
          <td>
            <div class="flex gap-1 flex-wrap">
              <span v-for="age in penguin.ages" :key="age" class="badge badge-ghost badge-sm text-xs">
                {{ age }}
              </span>
            </div>
          </td>
          <td>
            <div class="badge badge-sm border-none shadow-sm" :class="getStatusColor(penguin.status)">
              {{ penguin.status.replace('_', ' ') }}
            </div>
          </td>
          <th class="text-right">
            <button class="btn btn-ghost btn-xs text-primary">Edit</button>
          </th>
        </tr>
        
        <tr v-if="penguins.length === 0">
          <td colspan="7" class="text-center py-12 text-base-content/60">
            <div class="flex flex-col items-center justify-center gap-3">
              <span class="text-4xl">🔍</span>
              <p>No penguins found matching your filters.</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
