<template>
  <div>
    <CircularProgress :percent="currentData.percent">
      <div style="transform: translateY(50%)">
        <div style="font-weight: 700; font-size: 1.3rem">
          {{ currentData.total.toLocaleString() }}
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
import { ref, watch, defineProps, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const currentData = ref({
  total: 0,
  percent: 0,
});

const getter = "todaysCalorieData";
const store = useStore();
const route = useRoute();

const props = defineProps({
  isActive: Boolean,
});

const { isActive } = toRefs(props);

watch(() => route.path, (newVal) => {
  if (newVal === "/tabs/home" && isActive.value) {
    setTimeout(() => {
      currentData.value = store.getters[getter];
    }, 100);
  }
});

watch(isActive, (newVal) => {
  if (newVal) {
    currentData.value = store.getters[getter];
  }
});

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