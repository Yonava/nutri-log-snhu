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
  runAnimation(newVal - oldVal);
});

const runAnimation = (change) => {
  const frameDuration = 25
  let frameCount = 0
  const totalFrames = duration.value / frameDuration
  const increment = change / totalFrames
  const tick = setInterval(() => {
    frameCount++
    numberDisplay.value += increment
    if (frameCount >= totalFrames) {
      clearInterval(tick)
    }
  }, frameDuration)
};
</script>
