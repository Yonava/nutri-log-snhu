<template>
  <div v-if="searchResults.length > 0">
    <AddItem 
      v-for="item in searchResults" 
      :key="item.id"
      :item="item"
    />
  </div>
  <div 
    v-else-if="searchQuery.length === 0"
    class="center"
  >
    <h2 class="center">
      Search for an item
    </h2>
    <ion-icon 
      :icon="search"
      style="font-size: 100px;"
    ></ion-icon>
  </div>
  <div v-else>
    <h4 class="center">
      No items found
    </h4>
  </div>
</template>

<script setup lang="ts">
import { search } from 'ionicons/icons';
import { defineProps } from 'vue';
import AddItem from '@/components/Log/AddItem.vue';

defineProps<{
  searchResults: any[];
  searchQuery: string;
}>();
</script>