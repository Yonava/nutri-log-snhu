<template>
  <ion-content content-id="home-tab-content">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title 
          @click="openDatePicker"
          size="large" 
        >
          <ion-icon 
            style="position: absolute; top: 2px;"
            :icon="calendarOutline" 
          />
          <span style="margin-left: 45px">
            {{ 
              $store.getters.selectedDate.toLocaleString([], {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })
            }}
          </span>
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
          @click="$router.push({ name: 'Personalize' })"
          class="personalize-button"
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
            :target="component.target"
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
import { Haptics, ImpactStyle } from "@capacitor/haptics";
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
  pickerController,
} from "@ionic/vue";
import { 
  calendarOutline,
} from "ionicons/icons";
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
    // rerender is a hack to force the slider to rerender when the macroComponents
    // array changes. It is temporary until SVG circular progress bars are
    // implemented. Normally, don't do this.
    const rerender = ref(true);

    watch(store.getters.macroComponents, (newVal) => {
      macroComponents.value = newVal.slice(0, 8);
      rerender.value = false;
      setTimeout(() => {
        rerender.value = true;
        activeSlide.value = 0;
      }, 100);
    });

    watch(slideChangeDetector, async () => {
      activeSlide.value = await slider.value.$el.getActiveIndex();
    });

    async function slideTo(index) {
      activeSlide.value = index;
      slider.value.$el.slideTo(index);
      await Haptics.impact({ style: ImpactStyle.Light });
    }

    async function openDatePicker() {
      const dates = []
      const daysShown = 60;
      for (let i = 0; i < daysShown; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push({
          text: date.toLocaleString([], {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }),
          value: date
        });
      }
      const selectedIndex = dates.findIndex(
        (date) => date.value.toDateString() === store.getters.selectedDate.toDateString()
      );
      const picker = await pickerController.create({
        columns: [
          {
            name: "date",
            options: dates,
            selectedIndex,
          }
        ],
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Confirm",
            handler: (value) => {
              store.commit("setSelectedDate", value.date.value);
            },
          },
        ]
      });
      await picker.present();
    }

    return {
      slideTo,
      activeSlide,
      slider,
      slideChangeDetector,
      macroComponents,
      rerender,
      openDatePicker,
      calendarOutline
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

.personalize-button {
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