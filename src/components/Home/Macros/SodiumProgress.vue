<template>
  <div>
    <CircularProgress 
      :percent="sodiumData.percent"
      color="#EEA47FFF"
    >
      <div style="transform: translateY(90%)">
        <div style="font-weight: 700; font-size: 0.9rem">
          {{ sodiumData.total.toLocaleString() }}mg
        </div>
        <div style="font-weight: 200; font-size: 0.5rem">
          sodium
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

const sodiumData = computed(() => {
  return store.getters.todaysSodiumData;
});
</script>