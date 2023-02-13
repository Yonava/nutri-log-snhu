<template>
  <div>
    {{ numberOnScreen }}{{ unit }}
  </div>
</template>

<script setup>
import { 
  ref, 
  toRefs, 
  defineProps,
  watch,
  onMounted,
  computed
} from "vue";

const props = defineProps({
  number: Number,
  unit: String,
  displayRaw: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 500
  }
});

const { number, unit, duration, displayRaw } = toRefs(props);

const numberDisplay = ref(0);

onMounted(() => {
  runAnimation(number.value, 0);
});

watch(number, (newVal, oldVal) => {
  runAnimation(newVal, oldVal);
});

const numberOnScreen = computed(() => {
  if (displayRaw.value) {
    return numberDisplay.value;
  } else {
    return numberDisplay.value.toLocaleString();
  }
});

function getFrameDuration(change) {
  const absChange = Math.abs(change)
  if (absChange < 5) {
    return 200
  } else if (absChange < 50) {
    return 100
  } else if (absChange < 200) {
    return 50
  } else {
    return 25
  }
}

const runAnimation = (newValue, oldValue) => {
  const change = newValue - oldValue
  const frameDuration = getFrameDuration(change)
  let frameCount = 0
  const totalFrames = duration.value / frameDuration
  const increment = change / totalFrames
  const tick = setInterval(() => {
    frameCount++
    const tempValue = Math.round(increment + numberDisplay.value)
    if (change > 0 && tempValue < newValue) {
      numberDisplay.value = tempValue
    } else if (change < 0 && tempValue > newValue) {
      numberDisplay.value = tempValue
    }
    if (frameCount >= totalFrames) {
      numberDisplay.value = newValue
      clearInterval(tick)
    }
  }, frameDuration)
};
</script>
