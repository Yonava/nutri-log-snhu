<template>
  <CircularProgress 
    :percent="currentData.percent"
    :color="color"
  />
  <div 
    :key="currentData.total"
    style="position: absolute"
  >
    <div style="font-weight: 700; font-size: 4.75rem">
      <AnimateCount
        :number="currentData.total" 
      />
    </div>
    <div style="font-weight: 200; font-size: 1.75rem">
      calories
    </div>
  </div>
</template>

<script setup lang="ts">
import CircularProgress from "../CircularProgress.vue";
import AnimateCount from "@/base/AnimateCount.vue";
import { ref, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { useRedrawObserver } from "@/composables/RedrawObserver";

const store = useStore();

const props = defineProps({
  isActive: Boolean,
  color: String,
  index: {
    type: Number,
    required: true,
  },
  getter: {
    type: String,
    required: true,
  },
});

const { isActive } = toRefs(props);

const currentData = ref({
  total: 0,
  percent: 0,
});

useRedrawObserver(props.getter, currentData, isActive, props.index);
</script>