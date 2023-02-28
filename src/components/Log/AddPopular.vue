<template>
  <h1 class="title">
    <!-- patch job to get around snack + late night miscategorization -->
    Popular For {{ mealPeriod === 'snack' ? 'Late Night' : mealPeriod }}
  </h1>
  <div v-if="popularItems.length > 0">
  <AddItem 
    v-for="item in popularItems" 
    :key="item._id"
    :item="item"
  />
  </div>
  <div v-else>
    <h4 class="center">
      No popular items for {{ mealPeriod }}
    </h4>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { UnloggedItem } from '@/types/Log';
import AddItem from '@/components/Log/AddItem.vue';

const store = useStore();

const mealPeriod = getMealPeriod();
const items = computed(() => store.getters.catalog);

const popularItems = computed(() => {
  const maxPopularItems = 5;
  const output: UnloggedItem[] = [];
  for (let i = 0; i < items.value.length; i++) {
    if (output.length === maxPopularItems) break;
    const item = items.value[i];
    if (item.time === mealPeriod) {
      output.push(item);
    }
  }
  
  return output;
});

function getMealPeriod() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return 'breakfast';
  } else if (hour >= 12 && hour < 17) {
    return 'lunch';
  } else if (hour >= 17 && hour < 22) {
    return 'dinner';
  } else {
    return 'snack';
  }
}
</script>

<style scoped>
.title {
  text-transform: capitalize;
  font-weight: 700;
  font-size: 1.9rem;
}
</style>
