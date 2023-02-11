<template>
  <div>
    {{ numberDisplay.toLocaleString() }}{{ unit }}
  </div>
</template>

<script setup>
import { 
  ref, 
  toRefs, 
  defineProps,
  watch
} from "vue";

const props = defineProps({
  number: Number,
  unit: String,
  duration: {
    type: Number,
    default: 500
  }
});

const { number, unit, duration } = toRefs(props);

const numberDisplay = ref(0);

watch(number, (newVal, oldVal) => {
  const change = Math.abs(newVal - oldVal);
  if (newVal > oldVal) {
    countUp(change);
  } else if (newVal < oldVal) {
    countDown(change);
  }
});

const countUp = (adjustment) => {
  const frameDuration = 25
  let frameCount = 0
  const totalFrames = duration.value / frameDuration
  const increment = adjustment / totalFrames
  const tick = setInterval(() => {
    frameCount++
    numberDisplay.value += increment
    if (frameCount >= totalFrames) {
      clearInterval(tick)
    }
  }, frameDuration)
};

const countDown = (adjustment) => {
  const frameDuration = 25
  let frameCount = 0
  const totalFrames = duration.value / frameDuration
  const decrement = adjustment / totalFrames
  const tick = setInterval(() => {
    frameCount++
    numberDisplay.value -= decrement
    if (frameCount >= totalFrames) {
      clearInterval(tick)
    }
  }, frameDuration)
  
};
</script>
