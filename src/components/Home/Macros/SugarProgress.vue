<template>
  <div>
    <CircularProgress 
      :percent="percentage"
      color="var(--ion-color-tertiary)"
    >
      <div style="transform: translateY(15%)">
        <div style="font-weight: 200; font-size: 0.5rem">
          total
        </div>
        <div @click="animateCountUp" style="font-weight: 700; font-size: 1.1rem">
          {{ sugarData.total }}g
        </div>
        <div class="center" style="margin-top: 2px">
          <div class="center">
            <div style="font-weight: 200; font-size: 0.4rem">
              added
            </div>
            <div style="font-weight: 700; font-size: 0.7rem">
              {{ sugarData.totalAdded }}g
            </div>
          </div>
        </div>
      </div>
    </CircularProgress>
  </div>
</template>

<script setup>
import CircularProgress from "../CircularProgress.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const percentage = ref(0)

onMounted(() => {
  setTimeout(() => {
    percentage.value = sugarData.value.percent
  }, 250)
})

const sugarData = computed(() => {
  return store.getters.todaysSugarData;
});
</script>