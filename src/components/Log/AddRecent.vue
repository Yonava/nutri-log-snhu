<template>
  <h1 class="title">
    Recently Added
  </h1>
  <div v-if="recentItems.length > 0">
    <AddItem 
      v-for="item in recentItems" 
      :key="item._id"
      :item="item"
    />
  </div>
  <div v-else>
    <h4 class="center">
      No items recently added
    </h4>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';
import { LoggedItem } from '@/types/Log';
import AddItem from '@/components/Log/AddItem.vue';

const store = useStore();

const recentItems = computed(() => {
  const maxRecentItems = 5;
  const output: LoggedItem[] = [];
  const loggedItems = store.getters.log;
  for (let i = 0; i < loggedItems.length; i++) {
    if (output.length === maxRecentItems) break;
    if (output.find(item => item.name === loggedItems[i].name)) continue;
    output.push(loggedItems[i]);
  }
  
  return output;
});
</script>

<style scoped>
.title {
  text-transform: capitalize;
  text-align: center;
  font-weight: 700;
  font-size: 1.9rem;
}
</style>