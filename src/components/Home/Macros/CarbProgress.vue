<template>
  <div>
    <CircularProgress 
      :percent="currentData.percent"
      color="#F97D38"
    >
      <div style="transform: translateY(50%)">
        <div style="font-weight: 700; font-size: 1.3rem">
          {{ currentData.total }}g
        </div>
        <div style="font-weight: 200; font-size: 0.5rem">
          carbohydrates
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

const getter = "todaysCarbData";

useRedrawObserver(getter, currentData, isActive);
</script>