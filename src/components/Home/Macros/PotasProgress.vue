<template>
  <div>
    <CircularProgress 
      :percent="currentData.percent"
      color="#8A2BE2"
    >
      <div style="transform: translateY(100%)">
        <div 
          :style="`font-weight: 700; font-size: 0.8rem`"
        >
          {{ currentData.total.toLocaleString() }}mg
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
import { ref, toRefs } from "vue";
import { useRedrawObserver } from "@/composables/RedrawObserver";

const props = defineProps({
  isActive: Boolean,
});

const { isActive } = toRefs(props);

const currentData = ref({
  total: 0,
  percent: 0,
});

const getter = "todaysPotassiumData";

useRedrawObserver(getter, currentData, isActive);
</script>