<template>
  <div>
    <CircularProgress 
      :percent="proteinData.percent"
      color="var(--ion-color-success)"
    >
      <div style="transform: translateY(50%)">
        <div style="font-weight: 700; font-size: 1.3rem">
          {{ proteinData.total }}g
        </div>
        <div style="font-weight: 200; font-size: 0.5rem">
          protein
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

const proteinData = computed(() => {
  return store.getters.todaysProteinData;
});
</script>