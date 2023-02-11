<template>
  <ion-content content-id="home-tab-content">
    <ion-slides 
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
          :is="component" 
          :isActive="index === activeSlide"
        />
      </ion-slide>
    </ion-slides>
    {{ activeSlide }}
    <ion-button class="center" router-link="/signin">{{
      $store.getters.isLoggedIn
        ? `Signed in as ${$store.getters.user.firstName} ${$store.getters.user.lastName}`
        : "Sign In"
    }}</ion-button>
  </ion-content>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { 
  IonButton,
  IonContent,
  IonSlide,
  IonSlides,
} from "@ionic/vue";
import CalorieProgress from "./Macros/CalorieProgress.vue";
import CarbProgress from "./Macros/CarbProgress.vue";
import ProteinProgress from "./Macros/ProteinProgress.vue";
import FatProgress from "./Macros/FatProgress.vue";
import SugarProgress from "./Macros/SugarProgress.vue";
import SodiumProgress from "./Macros/SodiumProgress.vue";
import PotasProgress from "./Macros/PotasProgress.vue";
import FiberProgress from "./Macros/FiberProgress.vue";

export default defineComponent({
  components: {
    IonButton,
    IonContent,
    IonSlide,
    IonSlides,
    CalorieProgress,
    CarbProgress,
    ProteinProgress,
    FatProgress,
    SugarProgress,
    SodiumProgress,
    PotasProgress,
    FiberProgress,
  },
  setup() {

    const slideChangeDetector = ref(false);
    const slider = ref(null);
    const activeSlide = ref(0);

    const macroComponents = [
      "CalorieProgress",
      "FatProgress",
      "ProteinProgress",
      "CarbProgress",
      "SugarProgress",
      "FiberProgress",
      "SodiumProgress",
      "PotasProgress",
    ];

    watch(slideChangeDetector, async () => {
      activeSlide.value = await slider.value.$el.getActiveIndex();
    });

    return {
      activeSlide,
      slider,
      slideChangeDetector,
      macroComponents,
    };
  },
});
</script>

<style scoped>
ion-content {
  --overflow: hidden;
}
</style>