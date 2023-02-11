<template>
  <div>
    <CircularProgress 
      :percent="currentData.percent"
      color="#40E0D0"
    >
      <div style="transform: translateY(50%)">
        <div style="font-weight: 700; font-size: 1.3rem">
          <AnimateCount 
            :number="currentData.total" 
            unit="g"
          />
        </div>
        <div style="font-weight: 200; font-size: 0.5rem">
          fiber
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

const getter = "todaysFiberData";

useRedrawObserver(getter, currentData, isActive);
</script>