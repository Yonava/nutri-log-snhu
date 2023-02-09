<template>
  <div>
    <CircularProgress 
      :percent="carbData.percent"
      color="#F97D38"
    >
      <div style="transform: translateY(50%)">
        <div @click="animateCountUp" style="font-weight: 700; font-size: 1.3rem">
          {{ carbData.total }}g
        </div>
        <div style="font-weight: 200; font-size: 0.5rem">
          total carbs
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

const carbData = computed(() => {
  return store.getters.todaysCarbData;
});
</script>