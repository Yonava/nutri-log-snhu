<template>
  <div v-if="searchResults.length > 0">
    <TransitionGroup name="list">
      <AddItem 
        v-for="item in searchResults" 
        :key="item"
        :item="item" 
      />
    </TransitionGroup>
  </div>
  <div 
    v-else-if="searchQuery.length === 0"
    class="center"
  >
    <h2>
      Search for an item
    </h2>
    <ion-icon 
      :icon="search"
      style="font-size: 100px;"
    ></ion-icon>
  </div>
  <div 
    v-else
    class="center"
  >
    <h1 style="font-size: 2rem; font-weight: 200">
      No items found
    </h1>
  </div>
</template>

<script setup lang="ts">
import { IonIcon, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue';
import { search } from 'ionicons/icons';
import { defineProps, computed, ref, onMounted } from 'vue';
import { UnloggedItem } from '@/types/Log';
import AddItem from '@/components/Log/AddItem.vue';

const props = defineProps<{
  searchResults: UnloggedItem[];
  searchQuery: string;
}>();
</script>

<style scoped>
.bottom-div {
    height: 20px;
    position: absolute;
    bottom: -10px;
}

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