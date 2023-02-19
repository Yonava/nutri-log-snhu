<template>
  <ion-content content-id="home-tab-content">
    <div class="center macro-display-box-container">
      <MacroDisplayBox 
        v-for="(component, index) in macroComponents"
        :key="component"
        @click="slideTo(index)"
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
    <div class="center">
      <div style="width: 90%; height: 100px; background: gray">
        more detailed stats from selected macro
      </div>
    </div>
  </ion-content>
</template>

<script>
import { 
  defineComponent, 
  ref, 
  watch,
  computed,
} from "vue";
import { useStore } from "vuex";
import { 
  IonButton,
  IonContent,
  IonSlide,
  IonSlides,
  IonIcon,
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

export default defineComponent({
  components: {
    IonButton,
    IonContent,
    IonSlide,
    IonSlides,
    IonIcon,

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
  },
  setup() {

    const slideChangeDetector = ref(false);
    const slider = ref(null);
    const activeSlide = ref(0);
    const store = useStore();

    const macroComponents = computed(() => {
      return store.getters.macroComponents.slice(0, 8);
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