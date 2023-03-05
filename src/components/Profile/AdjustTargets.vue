<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-back-button 
          slot="start" 
          default-href="/" 
        />
        <ion-title>
          Adjust Daily Targets
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Adjust Daily Targets
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="center">
        <div
          v-for="item in targets" 
          :key="item" 
          :style="`width: 93%; height: 100px; border-radius: 15px; margin-bottom: 10px; border: 2px solid ${item.color};`"
          class="center"
        >
          <div style="width: 90%; display: flex; flex-direction: row; justify-content: space-between">
            <h3 style="margin: 0; font-weight: 700;">
              {{ item.title }}
            </h3>
            <h3 
              :style="{
                transform: itemMoving === item.title ? 'scale(1.2)' : 'scale(1)',
              }"
              class="value-text"
            >
              {{ item.value }}{{ item.unit }} 
            </h3>
          </div>
          <div style="width: 90%">
            <ion-range 
              v-model="item.value"
              @ionChange="updateTempDailyTargets(item.path, item.value)"
              @touchstart="itemMoving = item.title"
              @touchend="itemMoving = ''"
              :step="getStep(item.range.min, item.range.max)"
              :min="item.range.min"
              :max="item.range.max"
              :style="{ 
                padding: 0,
              }"
            >
            </ion-range>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonContent, 
  IonHeader, 
  IonToolbar,
  IonTitle,
  IonPage,
  IonBackButton,
  IonRange
} from "@ionic/vue";
import { useStore } from "vuex";
import { ref, onUnmounted } from "vue";
import { MacroDisplayComponent } from "@/types/User";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

type Target = {
  title: string;
  value: number;
  unit: string;
  color: string;
  path: string[];
  range: {
    min: number;
    max: number;
  }
}

const store = useStore();
const itemMoving = ref("");
const tempDailyTargets = ref(structuredClone(store.getters.allDailyTargets));

const targets = ref<Target[]>(store.getters.macroComponents.map((component: MacroDisplayComponent) => {
  const path = component.getters.get(component.target)
  return {
    title: component.title,
    value: store.getters.dailyTarget(path).value,
    unit: component.unit,
    color: component.color,
    path,
    range: {
      min: store.getters.dailyTargetRange(path).min,
      max: store.getters.dailyTargetRange(path).max
    }
  }
}));

async function updateTempDailyTargets(path: string[], value: number) {
  let current = tempDailyTargets.value;
  for (let i = 0; i < path.length - 1; i++) {
    current = current[path[i]];
  }
  current[path[path.length - 1]] = value;
  await Haptics.impact({ style: ImpactStyle.Light });
}

onUnmounted(() => {
  if (JSON.stringify(tempDailyTargets.value) !== JSON.stringify(store.getters.allDailyTargets)) {
    store.dispatch("updateDailyTargets", tempDailyTargets.value);
  }
});

function getStep(min: number, max: number) {
  const range = max - min;
  if (range < 10) {
    return 0.1;
  } else if (range < 100) {
    return 1;
  } else if (range < 1000) {
    return 10;
  } else {
    return 50;
  }
}
</script>

<style scoped>
.value-text {
  margin: 0;
  transition: 200ms ease-in-out;
}

ion-range::part(pin)::before {
  content: none;
}

ion-range::part(knob) {
  transform: scale(0.6);
  background: #99ccfb;
}

ion-range::part(bar) {
  background: #2bc0f1;
}

ion-range::part(bar-active) {
  background: #0c63a9;
}
</style>