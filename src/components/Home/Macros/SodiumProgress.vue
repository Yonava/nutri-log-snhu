<template>
  <CircularProgress 
    :percent="currentData.percent"
    :color="color"
  />
  <div style="position: absolute">
    <div style="font-weight: 700; font-size: 3rem">
      <AnimateCount 
        :number="currentData.total" 
        unit="mg"
      />
    </div>
    <div style="font-weight: 200; font-size: 1.25rem">
      sodium
    </div>
  </div>
</template>

<script setup>
import CircularProgress from "../CircularProgress.vue";
import AnimateCount from "@/base/AnimateCount";
import { ref, toRefs } from "vue";
import { useRedrawObserver } from "@/composables/RedrawObserver";

const props = defineProps({
  isActive: Boolean,
  color: String,
});

const { isActive } = toRefs(props);

const currentData = ref({
  total: 0,
  percent: 0,
});

const getter = "todaysSodiumData";

useRedrawObserver(getter, currentData, isActive);
</script>