<template>
  <div style="width: 98.5%; display: flex; justify-content: space-between; margin-bottom: 4px;">
    <div 
      class="center" 
      style="flex-direction: row;"
    >
      <ion-icon :icon="statsChart"></ion-icon>
      <span style="margin-left: 6px; font-weight: 300">
        stats at a glance
      </span>
    </div>
    <div 
      class="center" 
      :style="`flex-direction: row; color: ${(Math.random() * 150) > 100 ? 'var(--ion-color-danger)' : 'transparent'};`"
    >
      <ion-icon :icon="warningOutline"></ion-icon>
      <span style="margin-left: 6px; font-weight: 300">
        {{ '12' }}% over daily target
      </span>
    </div>
  </div>
  <div 
    class="center ion-padding"
    style="flex-direction: row; justify-content: space-around; background-color: var(--ion-color-step-150); border-radius: 10px 10px 0 0; position: relative; width: 100%;"
  >
    <div 
      style="margin-bottom: 10px" 
      class="center stat-box"
    >
      <div style="font-size: 3rem; font-weight: 200">
        {{ Math.floor(Math.random() * 140) }}%
      </div>
      <div style="font-size: 1.25rem; font-weight: 600">
        of target
      </div>
    </div>
    <div 
      class="divider" 
      style="height: 80px; width: 1px; background-color: gray"
    ></div>
    <div 
      style="margin-bottom: 10px" 
      class="center stat-box"
    >
      <div style="font-size: 3rem; font-weight: 200">
        {{ '2,000' }}{{ selectedComponent.unit }}
      </div>
      <div style="font-size: 1.25rem; font-weight: 600">
        daily target
      </div>
    </div>
  </div>
  <div 
    class="center" 
    style="background-color: var(--ion-color-step-200); height: 100px; width: 100%; border-radius: 0 0 10px 10px;"
  > 
    <div 
      class="center" 
      style="height: 25%; flex-direction: row; justify-content: space-around; width: 98%"
    >
      <div 
        v-for="i in 9" 
        :key="i" 
        style="color: rgba(255, 255, 255, 0.35);"
      >
        {{ (i - 1) * 3 }}
      </div>
    </div>
    <div 
      style="height: 75%; width: 100%" 
      class="center"
    >
      <div 
        style="height: 100%; width: 92%; flex-direction: row; align-items: flex-end;" 
        class="bar-container center"
      >
        <div 
          v-for="i in $store.getters.nutrientByHour(['calories'])" 
          :key="i.id"
          :style="`width: 10%; background: ${selectedComponent.color}; height: ${i}%; margin: 0 2.5px; transition: 500ms`" 
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

const props = defineProps<{
  selectedComponent: MacroDisplayComponent
}>()

</script>