<template>
  <h1 class="title">
    {{ title }}
  </h1>
  <div>
    <AddItem 
      v-for="item in items" 
      :key="item._id"
      :item="item"
    />
  </div>
</template>

<script setup lang="ts">
import AddItem from '@/components/Log/AddItem.vue';
import { UnloggedItem } from '@/types/Log';

defineProps<{
  title: string;
  items: UnloggedItem[];
}>()
</script>

<style scoped>
.title {
  text-transform: capitalize;
  font-weight: 700;
  font-size: 1.9rem;
}
</style>