<template>
  <CircularProgress
    :percent="currentData.percent"
    :color="color"
  />
  <div style="position: absolute">
    <div style="font-weight: 200; font-size: 1.75rem">
      total
    </div>
    <div style="font-weight: 700; font-size: 4rem">
      <AnimateCount 
        :number="currentData.total" 
        unit="g"
      />
    </div>
    <div 
      class="center" 
      style="margin-top: 2px; margin-bottom: 8px"
    >
      <div class="center">
        <div style="font-weight: 200; font-size: 1.5rem">
          added
        </div>
        <div style="font-weight: 700; font-size: 3rem">
          <AnimateCount 
            :number="currentData.added" 
            unit="g"
          />
        </div>
      </div>
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
  index: {
    type: Number,
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
  added: 0,
  percent: 0,
});

useRedrawObserver(props.getters, currentData, isActive);
</script>