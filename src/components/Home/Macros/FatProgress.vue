<template>
  <div>
    <CircularProgress 
      :percent="currentData.percent"
      color="var(--ion-color-danger)"
    >
      <div style="transform: translateY(15%)">
        <div style="font-weight: 200; font-size: 0.4rem">
          total
        </div>
        <div style="font-weight: 700; font-size: 0.9rem">
          {{ currentData.total }}g
        </div>
        <div class="center" style="flex-direction: row; margin-top: 2px">
          <div style="margin: 0px 3px" class="center">
            <div style="font-weight: 200; font-size: 0.4rem">
              saturated
            </div>
            <div style="font-weight: 700; font-size: 0.7rem">
              {{ currentData.totalSaturated }}g
            </div>
          </div>
          <div 
            style="margin: 0px 3px"
            class="center"
          >
            <div style="font-weight: 200; font-size: 0.4rem">
              trans
            </div>
            <div style="font-weight: 700; font-size: 0.7rem">
              {{ currentData.totalTrans }}g
            </div>
          </div>
        </div>
      </div>
    </CircularProgress>
  </div>
</template>

<script setup>
import CircularProgress from "../CircularProgress.vue";
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