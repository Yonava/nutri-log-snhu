<template>
  <div v-if="searchResults.length > 0">
    <div 
      v-bind="containerProps" 
      style="height: 100vh;"
    >
      <div v-bind="wrapperProps">
        <AddItem 
          v-for="{ data } in list" 
          :key="data._id"
          :item="data" 
        />
      </div> 
    </div>
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
      {{ list }}
    </h4>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { search } from 'ionicons/icons';
import { defineProps, toRef } from 'vue';
import { UnloggedItem } from '@/types/Log';
import { useVirtualList } from '@vueuse/core';
import AddItem from '@/components/Log/AddItem.vue';

const props = defineProps<{
  searchResults: UnloggedItem[];
  searchQuery: string;
}>();

const searchResults = toRef(props, 'searchResults');

const addItemHeightPX = 49;
const { list, containerProps, wrapperProps } = useVirtualList(searchResults, {
  itemHeight: addItemHeightPX,
});
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