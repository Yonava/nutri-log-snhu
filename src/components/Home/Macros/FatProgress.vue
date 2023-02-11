<template>
  <CircularProgress 
    :percent="currentData.percent"
    color="var(--ion-color-danger)"
  />
  <div style="position: absolute; ">
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
      style="flex-direction: row; margin-top: 3px; margin-bottom: 28px"
    >
      <div 
        style="margin: 0px 7px" 
        class="center"
      >
        <div style="font-weight: 200; font-size: 1.5rem">
          saturated
        </div>
        <div style="font-weight: 700; font-size: 3rem">
          <AnimateCount 
            :number="currentData.totalSaturated" 
            unit="g"
          />
        </div>
      </div>
      <div 
        style="margin: 0px 7px"
        class="center"
      >
        <div style="font-weight: 200; font-size: 1.5rem">
          trans
        </div>
        <div style="font-weight: 700; font-size: 3rem">
          <AnimateCount 
            :number="currentData.totalTrans" 
            unit="g"
          />
        </div>
      </div>
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
});

const { isActive } = toRefs(props);

const currentData = ref({
  total: 0,
  totalSaturated: 0,
  totalTrans: 0,
  percent: 0,
});

const getter = "todaysFatData";

useRedrawObserver(getter, currentData, isActive);
</script>