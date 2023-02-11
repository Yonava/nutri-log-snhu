<template>
  <div>
    <CircularProgress 
      :percent="currentData.percent"
      color="#EEA47FFF"
    >
      <div style="transform: translateY(90%)">
        <div style="font-weight: 700; font-size: 0.9rem">
          <AnimateCount 
            :number="currentData.total" 
            unit="mg"
          />
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
import AnimateCount from "@/base/AnimateCount";
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

const getter = "todaysSodiumData";

useRedrawObserver(getter, currentData, isActive);
</script>