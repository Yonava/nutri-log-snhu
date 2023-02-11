<template>
  <ion-page>
    <ion-content>
      <default-header title="Modify Item">
        <template #left>
          <ion-back-button default-href="/tabs/log"></ion-back-button>
        </template>
      </default-header>
      <div class="ion-padding">
        <ion-input
          v-model="item.name"
          @ionFocus="titleFocused = true"
          @ionBlur="titleFocused = false"
          type="text"
          enterkeyhint="done"
          :style="titleStyle"
          class="title"
          placeholder="Item Name"
        ></ion-input>
        <div class="nutrient-container center">
          <div class="nutrient-flex">
            <div 
              v-for="nutrient in nutrients"
              :key="nutrient"
              style="width: 27%; margin: 6px;"
            >
              <NutrientEditContainer
                @valueChange="nutrient.change($event)"
                :value="nutrient.value"
                :label="nutrient.label"
                :color="nutrient.color"
              />
            </div>
          </div>
        </div>
      </div>
      {{ item }}
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
import { computed, ref } from 'vue';
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
    const itemSelected = store.getters.selectedLogItem;

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
      };
    });

    const nutrients = [
      {
        label: 'calories',
        value: item.value.calories, 
        color: 'var(--ion-color-primary)',
        change: (newValue) => item.value.calories = newValue,
      },
      {
        label: 'protein',
        value: item.value.macro.protein,
        color: 'var(--ion-color-secondary)',
        change: (newValue) => item.value.macro.protein = newValue,
      },
      {
        label: 'carbs',
        value: item.value.macro.carbohydrates.total,
        color: 'var(--ion-color-tertiary)',
        change: (newValue) => item.value.macro.carbohydrates.total = newValue,
      },
      {
        label: 'sugar',
        value: item.value.macro.carbohydrates.sugars,
        color: 'red',
        change: (newValue) => item.value.macro.carbohydrates.sugars = newValue,
      },
      {
        label: 'fat',
        value: item.value.macro.fat.total,
        color: 'var(--ion-color-success)',
        change: (newValue) => item.value.macro.fat.total = newValue,
      },
      {
        label: 'saturated',
        value: item.value.macro.fat.saturated,
        color: 'var(--ion-color-warning)',
        change: (newValue) => item.value.macro.fat.saturated = newValue,
      },
      {
        label: 'fiber',
        value: item.value.macro.fiber,
        color: 'var(--ion-color-danger)',
        change: (newValue) => item.value.macro.fiber = newValue,
      }
    ]

    return {
      nutrients,
      titleStyle,
      titleFocused,
      item,
    };
  }
}
</script>

<style scoped>
.nutrient-container {
  margin-top: 10px;
}

.nutrient-flex {  
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

ion-input.title {
  font-size: 2rem;
  font-weight: 300;
  --padding-start: 8px;
  border-radius: 7px 7px 0 0;
  background-color: var(--ion-color-light);
}

ion-content {
  --overflow: hidden;
}
</style>