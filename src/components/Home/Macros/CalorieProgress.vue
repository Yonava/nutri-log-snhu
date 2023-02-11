<template>
  <div>
    <CircularProgress :percent="currentData.percent">
      <div style="transform: translateY(50%)">
        <div style="font-weight: 700; font-size: 1.3rem">
          <AnimateCount 
            :number="currentData.total" 
          />
        </div>
        <div style="font-weight: 200; font-size: 0.5rem">
          calories
        </div>
      </div>
    </CircularProgress>
  </div>
</template>

<script setup lang="ts">
import CircularProgress from "../CircularProgress.vue";
import AnimateCount from "@/base/AnimateCount.vue";
import { onMounted, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { useRedrawObserver } from "@/composables/RedrawObserver";

const store = useStore();

const props = defineProps({
  isActive: Boolean,
});

const { isActive } = toRefs(props);

const currentData = ref({
  total: 0,
  percent: 0,
});

const getter = "todaysCalorieData";

useRedrawObserver(getter, currentData, isActive);

// allows data to fetch on initial load
onMounted(() => {
  const timeoutSeconds = 4;
  for (let i = 0; i < timeoutSeconds * 2; i++) {
    setTimeout(() => {
      if (currentData.value.total > 0) return;
      currentData.value = store.getters[getter];
    }, 500 * (i + 1));
  }
});
</script>