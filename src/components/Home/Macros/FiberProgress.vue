<template>
  <div>
    <CircularProgress 
      :percent="fiberData.percent"
      color="#40E0D0"
    >
      <div style="transform: translateY(50%)">
        <div @click="animateCountUp" style="font-weight: 700; font-size: 1.3rem">
          {{ fiberData.total.toLocaleString() }}g
        </div>
        <div style="font-weight: 200; font-size: 0.5rem">
          fiber
        </div>
      </div>
    </CircularProgress>
  </div>
</template>

<script setup>
import CircularProgress from "../CircularProgress.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const fiberData = computed(() => {
  return store.getters.todaysFiberData;
});
</script>