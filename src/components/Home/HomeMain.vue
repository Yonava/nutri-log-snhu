<template>
  <ion-content content-id="home-tab-content">
    <h1 style="text-align: center" @click="printGetter">
      {{ new Date().toDateString() }}
    </h1>
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
      <div 
        v-if="macroComponents.length < 8"
        @click="addComponent"
        class="add-box center"
      >
        <ion-icon 
          :icon="add"
          size="large" 
        ></ion-icon>
      </div>
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
          :color="component.color"
          :getter="component.getter"
          :index="index"
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
  IonIcon
} from "@ionic/vue";
import { add } from "ionicons/icons";
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
    IonIcon,
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

    const store = useStore();

    function printGetter() {
      console.log(store.getters.todaysFatData);
    }


    const macroComponents = ref([
      {
        component: "CalorieProgress",
        label: "cals",
        color: "var(--ion-color-primary)",
        getter: "todaysCalorieData",
      },
      {
        component: "FatProgress",
        label: "fats",
        color: "var(--ion-color-secondary)",
        getter: "todaysFatData",
        unit: "g"
      },
      {
        component: "ProteinProgress",
        label: "protein",
        color: "#40E0D0",
        getter: "todaysProteinData",
        unit: "g",
      },
      {
        component: "CarbProgress",
        label: "carbs",
        color: "#F97D38",
        getter: "todaysCarbData",
        unit: "g",
      },
      {
        component: "SugarProgress",
        label: "sugars",
        color: "var(--ion-color-warning)",
        getter: "todaysSugarData",
        unit: "g",
      },
      {
        component: "FiberProgress",
        label: "fiber",
        color: "var(--ion-color-danger)",
        getter: "todaysFiberData",
        unit: "g",
      },
      {
        component: "SodiumProgress",
        label: "sodium",
        color: "#EEA47FFF",
        getter: "todaysSodiumData",
        unit: "mg",
      },
      {
        component: "PotasProgress",
        label: "potas",
        color: "#8A2BE2",
        getter: "todaysPotassiumData",
        unit: "mg",
      },
    ]);

    watch(slideChangeDetector, async () => {
      activeSlide.value = await slider.value.$el.getActiveIndex();
    });

    function slideTo(index) {
      activeSlide.value = index;
      slider.value.$el.slideTo(index);
    }

    return {
      slideTo,
      printGetter,
      activeSlide,
      slider,
      slideChangeDetector,
      macroComponents,
      add,
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
  height: 120px; 
  margin: 5px 0px;
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