<template>
  <div>
    <CircularProgress 
      :percent="potasData.percent"
      color="#8A2BE2"
    >
      <div style="transform: translateY(100%)">
        <div 
          @click="animateCountUp" 
          :style="`font-weight: 700; font-size: 0.8rem`"
        >
          {{ potasData.total.toLocaleString() }}mg
        </div>
        <div style="font-weight: 200; font-size: 0.5rem">
          potassium
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

const potasData = computed(() => {
  return store.getters.todaysPotassiumData;
});
</script>