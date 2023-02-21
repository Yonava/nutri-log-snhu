<template>
  <ion-content content-id="home-tab-content">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title size="large">
          Todays Breakdown
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <div v-if="rerender">
      <div class="center macro-display-box-container">
        <MacroDisplayBox 
          v-for="(component, index) in macroComponents"
          @click="slideTo(index)"
          :key="component"
          :label="component.label"
          :color="component.color"
          :getter="component.getter"
          :unit="component.unit"
          :isActive="index === activeSlide"
        />
      </div>
      <div class="modify-button-container">
        <button 
          @click="$router.push({ name: 'ModifyMacroDisplay' })"
          class="modify-macros-button"
        >
          personalize
        </button>
      </div>
      <ion-slides
        :key="macroComponents"
        @ionSlideDidChange="slideChangeDetector = !slideChangeDetector"
        ref="slider"
        class="center"
      >
        <ion-slide
          v-for="(component, index) in macroComponents"
          :key="component"
          class="center"
          style="width: 100%; height: 350px;"
        >
          <component 
            :is="component.component" 
            :color="component.color"
            :getter="component.getter"
            :index="index"
            :isActive="index === activeSlide"
          />
        </ion-slide>
      </ion-slides>
      <div style="position: relative;" class="center ion-padding">
        <div style="width: 100%; display: flex; align-content: flex-start; margin-bottom: 4px; margin-left: 3px">
          <div class="center" style="flex-direction: row;">
            <ion-icon :icon="barChart"></ion-icon>
            <span style="margin-left: 6px; font-weight: 300">
              stats at a glance
            </span>
          </div>
        </div>
        <div 
          class="center ion-padding"
          style="flex-direction: row; justify-content: space-around; background-color: var(--ion-color-step-150); border-radius: 10px 10px 0 0; position: relative; width: 100%"
        >
          <div style="margin-bottom: 10px" class="center stat-box">
            <div style="font-size: 3rem; font-weight: 200">26%</div>
            <div style="font-size: 1.25rem; font-weight: 600">of target</div>
          </div>
          <div class="divider" style="height: 80px; width: 1px; background-color: gray"></div>
          <div style="margin-bottom: 10px" class="center stat-box">
            <div style="font-size: 3rem; font-weight: 200">2,000</div>
            <div style="font-size: 1.25rem; font-weight: 600">daily target</div>
          </div>
        </div>
        <div 
          class="center" 
          style="background-color: var(--ion-color-step-100); height: 100px; width: 100%; border-radius: 0 0 10px 10px;"
        > 
          <div style="color: rgba(255, 255, 255, 0.5); margin: 3px 0">
            12am
          </div>
          <div style="height: 80%; width: 100%" class="center">
            <div style="height: 100%; width: 92%; flex-direction: row; align-items: end;" class="bar-container center">
              <div v-for="i in 24" :key="i" :style="`width: 10%; background: var(--ion-color-primary); height: ${Math.random() * 100}%; margin: 0 2.5px`" class="bar"></div>
            </div>
          </div>
        </div>
      </div>
      <QuickLog />
    </div>
  </ion-content>
</template>

<script>
import { 
  defineComponent, 
  ref, 
  watch,
} from "vue";
import { useStore } from "vuex";
import { 
  IonButton,
  IonContent,
  IonSlide,
  IonSlides,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/vue";
import CalorieProgress from "./MacroCircle/CalorieProgress.vue";
import CarbProgress from "./MacroCircle/CarbProgress.vue";
import ProteinProgress from "./MacroCircle/ProteinProgress.vue";
import FatProgress from "./MacroCircle/FatProgress.vue";
import SugarProgress from "./MacroCircle/SugarProgress.vue";
import SodiumProgress from "./MacroCircle/SodiumProgress.vue";
import PotasProgress from "./MacroCircle/PotasProgress.vue";
import FiberProgress from "./MacroCircle/FiberProgress.vue";
import CholProgress from "./MacroCircle/CholProgress.vue";
import IronProgress from "./MacroCircle/IronProgress.vue";
import CalciumProgress from "./MacroCircle/CalciumProgress.vue";

import MacroDisplayBox from "./MacroDisplayBox.vue";
import QuickLog from "./QuickLog.vue";

import {
  barChart,
} from "ionicons/icons"

export default defineComponent({
  components: {
    IonButton,
    IonContent,
    IonSlide,
    IonSlides,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,

    CalciumProgress,
    IronProgress,
    CalorieProgress,
    CarbProgress,
    CholProgress,
    ProteinProgress,
    FatProgress,
    SugarProgress,
    SodiumProgress,
    PotasProgress,
    FiberProgress,

    MacroDisplayBox,
    QuickLog,
  },
  setup() {

    const slideChangeDetector = ref(false);
    const slider = ref(null);
    const activeSlide = ref(0);
    const store = useStore();
    const macroComponents = ref(store.getters.macroComponents.slice(0, 8));
    const rerender = ref(true);

    watch(store.getters.macroComponents, (newVal) => {
      macroComponents.value = newVal.slice(0, 8);
      rerender.value = false;
      setTimeout(() => {
        rerender.value = true;
      }, 100);
    });

    watch(slideChangeDetector, async () => {
      activeSlide.value = await slider.value.$el.getActiveIndex();
    });

    function slideTo(index) {
      activeSlide.value = index;
      slider.value.$el.slideTo(index);
    }

    return {
      slideTo,
      activeSlide,
      slider,
      slideChangeDetector,
      macroComponents,
      rerender,
      
      barChart,
    };
  },
});
</script>

<style scoped>
.macro-display-box-container {
  flex-wrap: wrap; 
  flex-direction: row; 
  position: relative; 
  width: 100%; 
}

.modify-macros-button {
  border-radius: 5px; 
  background-color: var(--ion-color-primary); 
  font-weight: 600; 
  position: absolute;  
  margin-top: 3px;
  right: 0; 
  padding: 3px 5px;
  color: white;
}

.modify-button-container {
  position: relative;
  width: calc(94% + 12px); 
  z-index: 2;
}

.add-box {
  border: 1px solid var(--ion-color-medium);
  width: 22%; 
  height: 60px; 
  background: var(--ion-color-step-100); 
  margin: 4px; 
  padding: 2px;
  border-radius: 8px;
}
</style>