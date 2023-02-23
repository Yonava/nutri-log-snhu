<template>
  <ion-content content-id="home-tab-content">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title size="large">
          {{ 
            new Date().toLocaleString([], {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }) 
          }}
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
          :getters="component.getters"
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
            :getters="component.getters"
            :index="index"
            :isActive="index === activeSlide"
          />
        </ion-slide>
      </ion-slides>
      <div 
        style="position: relative; transform: translateY(-20px)" 
        class="center ion-padding"
      >
        <StatsPanel :selectedComponent="macroComponents[activeSlide]" />
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
import StatsPanel from "./StatsPanel.vue";

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
    StatsPanel,
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