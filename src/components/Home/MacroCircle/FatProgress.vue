<template>
  <CircularProgress 
    :percent="percent"
    :color="color"
  />
  <div style="position: absolute; ">
    <div style="font-weight: 200; font-size: 1.5rem">
      total
    </div>
    <div style="font-weight: 700; font-size: 3.5rem">
      <AnimateCount 
        :number="currentData.total" 
        unit="g"
      />
    </div>
    <div 
      class="center" 
      style="flex-direction: row; margin-top: 3px; margin-bottom: 25px"
    >
      <div 
        style="margin: 0px 7px" 
        class="center"
      >
        <div style="font-weight: 200; font-size: 1.25rem">
          saturated
        </div>
        <div style="font-weight: 700; font-size: 2.5rem">
          <AnimateCount 
            :number="currentData.saturated" 
            unit="g"
          />
        </div>
      </div>
      <div 
        style="margin: 0px 7px"
        class="center"
      >
        <div style="font-weight: 200; font-size: 1.25rem">
          trans
        </div>
        <div style="font-weight: 700; font-size: 2.5rem">
          <AnimateCount 
            :number="currentData.trans" 
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
import { ref, toRefs, watch } from "vue";
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
  saturated: 0,
  trans: 0,
});

const { percent } = useRedrawObserver(props.getters, currentData, isActive, props.target);
</script>