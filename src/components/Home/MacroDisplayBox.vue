<template>
  <div 
    :key="rerenderKey"
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
        <span v-if="store.getters.caloriesHidden && label === 'cals'">
          -
        </span>
        <AnimateCount 
          v-else
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

<script setup lang="ts">
import { 
  defineProps, 
  computed,
  watch,
  ref,
  onMounted,
} from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import AnimateCount from "@/base/AnimateCount.vue";

const props = defineProps({
  label: String,
  color: String,
  getters: {
    type: Map<string, string[]>,
    required: true,
  },
  isActive: Boolean,
  unit: {
    type: String,
    default: "",
  }
});

const store = useStore();
const route = useRoute();

const homePath = "/tabs/home";

const getter = () => store.getters.dailyTotal(props.getters.get('total'));

const displayValue = ref(getter());
const rerenderKey = ref(true);

onMounted(() => {
  rerenderKey.value = !rerenderKey.value;
});

const watchForInit = watch(() => getter(), (newValue) => {
  watchForInit();
  rerenderKey.value = !rerenderKey.value;
  if (!route.path.includes(homePath)) return;
  displayValue.value = newValue;
});

watch(() => route.path, (newPath) => {
  if (newPath.includes(homePath)) {
    displayValue.value = getter();
  }
});

watch(() => getter(), (newValue) => {
  if (!route.path.includes(homePath)) return;
  displayValue.value = newValue;
});

const calculateFontSize = computed(() => {
  const totalLength = displayValue.value.toString().length + props.unit.length;
  if (totalLength < 4) {
    return "1.7rem";
  } else if (totalLength < 5) {
    return "1.6rem";
  } else if (totalLength < 6) {
    return "1.4rem";
  } else if (totalLength < 7) {
    return "1.1rem";
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
  background: #192841; 
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
  color: rgb(230, 230, 230);
}
</style>