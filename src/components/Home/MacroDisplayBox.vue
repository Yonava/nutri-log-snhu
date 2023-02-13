<template>
  <div 
    :style="{ borderRadius }"
    class="center box" 
  >
    <div class="center box-contain">
      <div class="center label-holder">
        {{ label }}
      </div>
      <div 
        :style="{ fontSize: calculateFontSize }"
        class="number-text"
      >
        <AnimateCount 
          :number="displayValue"
          :unit="unit"
          :displayRaw="true"
        />
      </div>
      <div 
        v-if="isActive"
        :style="{ backgroundColor: color }"
        class="bottom-bar" 
      ></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, computed } from "vue";
import AnimateCount from "@/base/AnimateCount.vue";

const displayValue = 20398;

const props = defineProps({
  label: String,
  color: String,
  getter: String,
  isActive: Boolean,
  unit: {
    type: String,
    default: "",
  }
});

const { label, color, getter, unit } = toRefs(props);

const calculateFontSize = computed(() => {
  const totalLength = displayValue.toString().length + unit.value.length;
  if (totalLength < 6) {
    return "1.5rem";
  } else if (totalLength < 7) {
    return "1.2rem";
  } else {
    return "1rem";
  }
});

const borderRadius = computed(() => {
  if (props.isActive) {
    return "8px 8px 0px 0px";
  } else {
    return "8px";
  }
});
</script>

<style scoped>
.box {
  width: 22%; 
  height: 60px; 
  background: var(--ion-color-light); 
  margin: 4px; 
  padding: 2px;
}

.box-contain {
  position: relative; 
  height: 100%; 
  width: 100%;
}

.label-holder {
  position: absolute; 
  top: 0; 
  width: 100%;
}

.bottom-bar {
  width: 103%; 
  height: 5px; 
  position: absolute; 
  bottom: -2%;
}

.number-text {
  font-weight: 600; 
  margin-top: 12px;
}
</style>