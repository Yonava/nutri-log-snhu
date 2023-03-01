<template>
  <ion-page>
    <default-header title="Log Item">
      <template #left>
        <ion-back-button 
          default-href="/tabs/log"
          text="Save & Exit"
        ></ion-back-button>
      </template>
    </default-header>
    <ion-content>
      <div class="ion-padding">
        <ion-input
          v-model="item.name"
          @ionFocus="titleFocused = true"
          @ionBlur="titleFocused = false"
          :style="titleStyle"
          type="text"
          enterkeyhint="done"
          class="title"
          placeholder="Item Name"
        ></ion-input>
        <div style="margin-top: 20px">
          <div class="nutrient-row">
            <NutrientEditContainer
              @valueChange="item.calories = $event"
              :value="item.calories"
              label="calories"
              color="var(--ion-color-primary)"
            />
            <div class="nutrient-spacer"></div>
            <NutrientEditContainer
              @valueChange="item.macro.protein = $event"
              :value="item.macro.protein"
              label="protein"
              color="var(--ion-color-secondary)"
            />
          </div>
          <div class="nutrient-row">
            <NutrientEditContainer
              @valueChange="item.macro.carbohydrates.total = $event"
              :value="item.macro.carbohydrates.total"
              label="total carbs"
              color="var(--ion-color-tertiary)"
            />
            <div class="nutrient-spacer"></div>
            <NutrientEditContainer
              @valueChange="item.macro.carbohydrates.sugars = $event"
              :value="item.macro.carbohydrates.sugars"
              label="total sugar"
              color="red"
            />
            <div class="nutrient-spacer"></div>
            <NutrientEditContainer
              @valueChange="item.macro.carbohydrates.added_sugars = $event"
              :value="item.macro.carbohydrates.added_sugars"
              label="added sugar"
              color="blue"
            />
          </div>
          <div class="nutrient-row">
            <NutrientEditContainer
              @valueChange="item.macro.fat.total = $event"
              :value="item.macro.fat.total"
              label="total fat"
              color="var(--ion-color-success)"
            />
            <div class="nutrient-spacer"></div>
            <NutrientEditContainer
              @valueChange="item.macro.fat.saturated = $event"
              :value="item.macro.fat.saturated"
              label="saturated fat"
              color="green"
            />
            <div class="nutrient-spacer"></div>
            <NutrientEditContainer
              @valueChange="item.macro.fat.trans = $event"
              :value="item.macro.fat.trans"
              label="trans fat"
              color="var(--ion-color-danger)"
            />
          </div>
          <div class="nutrient-row">
            <NutrientEditContainer
              @valueChange="item.macro.fiber = $event"
              :value="item.macro.fiber"
              label="fiber"
              color="var(--ion-color-medium)"
            />
            <div class="nutrient-spacer"></div>
            <NutrientEditContainer
              @valueChange="item.macro.sodium = $event"
              :value="item.macro.sodium"
              label="sodium"
              color="orange"
            />
            <div class="nutrient-spacer"></div>
            <NutrientEditContainer
              @valueChange="item.macro.cholesterol = $event"
              :value="item.macro.cholesterol"
              label="cholesterol"
              color="var(--ion-color-tertiary)"
            />
          </div>
          <div class="nutrient-row">
            <NutrientEditContainer
              @valueChange="item.macro.calcium = $event"
              :value="item.macro.calcium"
              label="calcium"
              color="var(--ion-color-primary)"
            />
            <div class="nutrient-spacer"></div>
            <NutrientEditContainer
              @valueChange="item.macro.potassium = $event"
              :value="item.macro.potassium"
              label="potassium"
              color="var(--ion-color-secondary)"
            />
            <div class="nutrient-spacer"></div>
            <NutrientEditContainer
              @valueChange="item.macro.iron = $event"
              :value="item.macro.iron"
              label="iron"
              color="var(--ion-color-tertiary)"
            />
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonBackButton,
  IonContent,
  IonInput,
} from '@ionic/vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { 
  computed, 
  ref,
  onUnmounted,
} from 'vue';
import NutrientEditContainer from './NutrientEditContainer.vue';

export default {
  components: {
    IonPage,
    IonBackButton,
    IonContent,
    IonInput,
    NutrientEditContainer,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const itemSelected = store.getters.selectedLogItem;

    const dispatchTo = route.query.dispatchTo ?? 'updateLoggedItem';

    const item = ref(structuredClone(itemSelected));
    const titleFocused = ref(false);

    const titleStyle = computed(() => {
      if (titleFocused.value) {
        return {
          backgroundColor: 'var(--ion-color-step-150)',
          borderBottom: '1px solid gray'
        };
      }
      return {
        backgroundColor: 'var(--ion-color-step-100)',
        borderBottom: '1px solid transparent'
      };
    });

    onUnmounted(() => {
      if (JSON.stringify(item.value) === JSON.stringify(itemSelected)) return;
      store.dispatch(dispatchTo, item.value);
    });

    return {
      titleStyle,
      titleFocused,
      item,
    };
  }
}
</script>

<style scoped>
.nutrient-row {
  display: flex; 
  flex-direction: row; 
  margin: 20px 0px;
}

.nutrient-spacer {
  width: 25px;
}

ion-input.title {
  font-size: 2rem;
  font-weight: 300;
  --padding-start: 8px;
  border-radius: 7px 7px 0 0;
  background-color: var(--ion-color-light);
}
</style>