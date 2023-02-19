<template>
  <div v-if="searchResults.length > 0">
    <TransitionGroup name="list">
      <AddItem 
        v-for="item in searchResults" 
        :key="item._id"
        :item="item" 
      />
    </TransitionGroup>
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
import { IonIcon } from '@ionic/vue';
import { search } from 'ionicons/icons';
import { defineProps } from 'vue';
import AddItem from '@/components/Log/AddItem.vue';

defineProps<{
  searchResults: any[];
  searchQuery: string;
}>();
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-enter-to,
.list-leave-from {
  opacity: 1;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>