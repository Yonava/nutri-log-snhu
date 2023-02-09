<template>
  <div>
    <CircularProgress :percent="calorieData.percent">
      <div style="transform: translateY(50%)">
        <div @click="animateCountUp" style="font-weight: 700; font-size: 1.3rem">
          {{ calorieData.total }}
        </div>
        <div style="font-weight: 200; font-size: 0.5rem">
          calories
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

const calorieData = computed(() => {
  return store.getters.todaysCalorieData;
});
</script>