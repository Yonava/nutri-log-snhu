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
        <div class="nutrient-container">
          <NutrientEditContainer
            @valueChange="item.calories = $event"
            :value="item.calories"
            label="calories"
            color="var(--ion-color-primary)"
          />
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
    const item = structuredClone(itemSelected);

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

    return {
      titleStyle,
      titleFocused,
      item,
    };
  }
}
</script>

<style scoped>
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