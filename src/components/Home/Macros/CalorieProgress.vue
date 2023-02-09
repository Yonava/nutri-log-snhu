<template>
  <div>
    <CircularProgress 
      :percent="percent" 
    />
  </div>
</template>

<script setup>
import CircularProgress from "../CircularProgress.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const percent = computed(() => {
  return store.getters.todaysCalorieData.percent;
});
</script>