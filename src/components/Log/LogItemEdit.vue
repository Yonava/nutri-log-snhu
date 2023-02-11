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
              class="nutrient-box"
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
        label: 'total carbs',
        value: item.value.macro.carbohydrates.total,
        color: 'var(--ion-color-tertiary)',
        change: (newValue) => item.value.macro.carbohydrates.total = newValue,
      },
      {
        label: 'total sugar',
        value: item.value.macro.carbohydrates.sugars,
        color: 'red',
        change: (newValue) => item.value.macro.carbohydrates.sugars = newValue,
      },
      {
        label: 'total fat',
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
        label: 'trans',
        value: item.value.macro.fat.trans,
        color: 'var(--ion-color-danger)',
        change: (newValue) => item.value.macro.fat.trans = newValue,
      },
      {
        label: 'fiber',
        value: item.value.macro.fiber,
        color: '#008080',
        change: (newValue) => item.value.macro.fiber = newValue,
      },
      {
        label: 'sodium',
        value: item.value.macro.sodium,
        color: 'purple',
        change: (newValue) => item.value.macro.sodium = newValue,
      },
      {
        label: 'cholesterol',
        value: item.value.macro.cholesterol,
        color: '#FFA500',
        change: (newValue) => item.value.macro.cholesterol = newValue,
      },
      {
        label: 'potassium',
        value: item.value.macro.potassium,
        color: '#FF29D6',
        change: (newValue) => item.value.macro.potassium = newValue,
      },
      {
        label: 'calcium',
        value: item.value.macro.calcium,
        color: '#FFD700',
        change: (newValue) => item.value.macro.calcium = newValue,
      },
      {
        label: 'iron',
        value: item.value.macro.iron,
        color: '#9928A2',
        change: (newValue) => item.value.macro.iron = newValue,
      },
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

.nutrient-box {
  width: 27%; 
  margin: 6px;
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