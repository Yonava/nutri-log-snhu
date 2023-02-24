<template>
  <div class="top-parent">
    <div 
      class="center" 
      style="flex-direction: row;"
    >
      <ion-icon :icon="statsChart"></ion-icon>
      <span class="top-text">
        stats at a glance
      </span>
    </div>
    <div 
      class="center" 
      :style="{
        color: targetInfo.percent > 100 ? 'var(--ion-color-danger)' : 'transparent',
        flexDirection: 'row',
      }"
    >
      <ion-icon :icon="warningOutline"></ion-icon>
      <span class="top-text">
        {{ targetInfo.percent - 100 }}% over daily target
      </span>
    </div>
  </div>
  <div class="target-display-parent center ion-padding">
    <div class="center stat-box">
      <div class="target-display">
        {{ targetInfo.percent }}%
      </div>
      <div class="target-label">
        of target
      </div>
    </div>
    <div class="divider"></div>
    <div class="center stat-box">
      <div class="target-display">
        {{ targetInfo.value.toLocaleString() }}{{ selectedComponent.unit }}
      </div>
      <div class="target-label">
        daily target
      </div>
    </div>
  </div>
  <div class="graph-parent center"> 
    <div class="time-label-container center">
      <div 
        v-for="i in 9" 
        :key="i" 
        style="color: rgba(255, 255, 255, 0.35);"
      >
        {{ (i - 1) * 3 }}
      </div>
    </div>
    <div class="chart-container center">
      <div class="bar-container center">
        <div 
          v-for="(i, index) in nutrientByHour" 
          :key="index"
          :style="{
            background: selectedComponent.color,
            height: `${i}%`,
          }"
          class="bar"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  statsChart,
  warningOutline,
} from "ionicons/icons"
import { IonIcon } from "@ionic/vue"
import { defineProps } from "vue"
import { MacroDisplayComponent } from "@/types/User"
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore();

const props = defineProps<{
  selectedComponent: MacroDisplayComponent;
}>()

const targetInfo = computed(() => {
  const comp = props.selectedComponent;
  return store.getters.dailyTarget(comp.getters.get(comp.target));
})

const nutrientByHour = computed(() => {
  const comp = props.selectedComponent;
  return store.getters.nutrientByHour(comp.getters.get(comp.target));
})
</script>

<style scoped>
.bar-container{
  height: 100%; 
  width: 92%; 
  flex-direction: row; 
  align-items: flex-end;
}

.chart-container {
  height: 75%; 
  width: 100%; 
}

.bar {
  width: 10%;
  margin: 0 2.5px;
  transition: 500ms ease-in-out;
}

.time-label-container {
  height: 25%; 
  flex-direction: row; 
  justify-content: space-around; 
  width: 98%;
}

.graph-parent {
  background-color: var(--ion-color-step-200); 
  height: 100px; 
  width: 100%; 
  border-radius: 0 0 10px 10px;
}

.target-label {
  font-size: 1.25rem; 
  font-weight: 600;
}

.target-display {
  font-size: 3rem; 
  font-weight: 200;
}

.divider {
  height: 80px; 
  width: 1px; 
  background-color: gray;
}

.stat-box {
  margin-bottom: 10px;
}

.target-display-parent {
  flex-direction: row; 
  justify-content: space-around; 
  background-color: var(--ion-color-step-150); 
  border-radius: 10px 10px 0 0; 
  position: relative; 
  width: 100%;
}

.top-text {
  margin-left: 6px;
  font-weight: 300;
}

.top-parent {
  width: 98.5%; 
  display: flex; 
  justify-content: space-between; 
  margin-bottom: 4px;
}
</style>