<template>
  <div>
    <CircularProgress 
      :percent="currentData.percent"
      color="var(--ion-color-tertiary)"
    >
      <div style="transform: translateY(15%)">
        <div style="font-weight: 200; font-size: 0.5rem">
          total
        </div>
        <div style="font-weight: 700; font-size: 1.1rem">
          <AnimateCount 
            :number="currentData.total" 
            unit="g"
          />
        </div>
        <div 
          class="center" 
          style="margin-top: 2px"
        >
          <div class="center">
            <div style="font-weight: 200; font-size: 0.4rem">
              added
            </div>
            <div style="font-weight: 700; font-size: 0.7rem">
              <AnimateCount 
                :number="currentData.totalAdded" 
                unit="g"
              />
            </div>
          </div>
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
  totalAdded: 0,
  percent: 0,
});

const getter = "todaysSugarData";

useRedrawObserver(getter, currentData, isActive);
</script>