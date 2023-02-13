<template>
  <ion-content content-id="home-tab-content">
    <h1 style="text-align: center">
      {{ new Date().toDateString() }}
    </h1>
    <div 
      class="center" 
      style="flex-wrap: wrap; flex-direction: row; position: relative; width: 100%; height: 120px; margin: 5px 0px"
    >
      <MacroDisplayBox 
        v-for="component in macroComponents"
        :key="component"
        :label="component.label"
        :color="component.color"
        :getter="component.getter"
        :unit="component.unit"
      />
    </div>
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
          :is="component.component" 
          :isActive="index === activeSlide"
        />
      </ion-slide>
    </ion-slides>
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
import MacroDisplayBox from "./MacroDisplayBox.vue";

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
    MacroDisplayBox,
  },
  setup() {

    const slideChangeDetector = ref(false);
    const slider = ref(null);
    const activeSlide = ref(0);

    const macroComponents = [
      {
        component: "CalorieProgress",
        label: "cals",
        color: "--ion-color-primary",
        getter: "todaysCalorieData",
      },
      {
        component: "FatProgress",
        label: "fats",
        color: "--ion-color-secondary",
        getter: "todaysFatData",
        unit: "g"
      },
      {
        component: "ProteinProgress",
        label: "protein",
        color: "--ion-color-tertiary",
        getter: "todaysProteinData",
        unit: "g",
      },
      {
        component: "CarbProgress",
        label: "carbs",
        color: "--ion-color-success",
        getter: "todaysCarbData",
        unit: "g",
      },
      {
        component: "SugarProgress",
        label: "sugars",
        color: "--ion-color-warning",
        getter: "todaysSugarData",
        unit: "g",
      },
      {
        component: "FiberProgress",
        label: "fiber",
        color: "--ion-color-danger",
        getter: "todaysFiberData",
        unit: "g",
      },
      {
        component: "SodiumProgress",
        label: "sodium",
        color: "red",
        getter: "todaysSodiumData",
        unit: "mg",
      },
      {
        component: "PotasProgress",
        label: "potassium",
        color: "blue",
        getter: "todaysPotasData",
        unit: "mg",
      },
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