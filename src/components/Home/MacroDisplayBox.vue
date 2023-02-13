<template>
  <div class="center box">
    <div class="center box-contain">
      <div 
        style="position: absolute; top: 0; width: 100%" 
        class="center"
      >
        {{ label }}
      </div>
      <div 
        style="font-weight: 600; font-size: 1.5rem; margin-top: 15px"
        class=""
      >
        <AnimateCount 
          :number="1000"
          :unit="unit"
          :displayRaw="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs } from "vue";
import AnimateCount from "@/base/AnimateCount.vue";

const props = defineProps({
  label: String,
  color: String,
  getter: String,
  unit: {
    type: String,
    default: "",
  }
});

const { label, color, getter, unit } = toRefs(props);
</script>

<style scoped>
.box {
  width: 20%; 
  height: 60px; 
  background: var(--ion-color-light); 
  margin: 7px; 
  border-radius: 8px;
  padding: 2px;
}

.box-contain {
  position: relative; 
  height: 100%; 
  width: 100%;
}
</style>