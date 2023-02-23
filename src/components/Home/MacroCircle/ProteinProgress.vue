<template>
  <CircularProgress 
    :percent="percent"
    :color="color"
  />
  <div style="position: absolute">
    <div style="font-weight: 700; font-size: 4.75rem">
      <AnimateCount 
        :number="currentData.total" 
        unit="g"
      />
    </div>
    <div style="font-weight: 200; font-size: 1.75rem">
      protein
    </div>
  </div>
</template>

<script setup lang="ts">
import CircularProgress from "../CircularProgress.vue";
import AnimateCount from "@/base/AnimateCount";
import { ref, toRefs } from "vue";
import { useRedrawObserver } from "@/composables/RedrawObserver";

const props = defineProps({
  isActive: Boolean,
  color: String,
  target: {
    type: String,
    required: true,
  },
  getters: {
    type: Map<string, string[]>,
    required: true,
  },
});

const { isActive } = toRefs(props);

const currentData = ref({
  total: 0,
});

const { percent } = useRedrawObserver(props.getters, currentData, isActive, props.target);
</script>