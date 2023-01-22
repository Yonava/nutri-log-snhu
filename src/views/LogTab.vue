<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button>
            add
            <ion-icon slot="start" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Log</ion-title>
        <ion-buttons slot="start">
          <ion-button>
            remove
            <ion-icon slot="start" :icon="remove"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Log Entries</ion-title>
        </ion-toolbar>
      </ion-header>
        <div
          v-for="i in items" 
          :key="i.name"
          class="parent-container"
        >
          <ion-item
            v-if="i.name"
            :router-link="{ path: `/tabs/log/edit/${i.name}` }"
            button
          >
            <div class="item-parent">
              <p style="margin: 0; font-size: 9pt">
                {{ timeStamp.toLocaleTimeString([], { timeStyle: 'short' }) }} |
                {{ i.calories }} cals |
                {{ Math.floor(Math.random() * 50) }}g carbs |
                {{ Math.floor(Math.random() * 50) }}g protein |
                {{ Math.floor(Math.random() * 50) }}g fat
              </p>
              <h2 style="text-transform: capitalize; margin: 0">{{ i.name }}</h2>
            </div>
          </ion-item>
          <div 
            class="date-item-parent"
            v-else
          >
            <h5 style="margin: 0">{{ i.day }} {{ Math.floor(Math.random() * 30) + 1 }}, 2023</h5>
          </div>
        </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonButtons,
  IonItem,
  IonIcon,
} from '@ionic/vue';
import { 
  arrowForward,
  add,
  remove
} from 'ionicons/icons';

export default defineComponent({
  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonPage, 
    IonButton, 
    IonButtons,
    IonItem,
    IonIcon
  },
  setup() {
    const timeStamp = new Date();
    const items = ref([
      { name: 'apple', calories: 100 },
      { name: 'banana', calories: 200 },
      { name: 'orange', calories: 300 },
      { name: 'grape', calories: 400 },
      { name: 'pear', calories: 500 },
      { day: 'wed' },
      { name: 'pineapple', calories: 600 },
      { name: 'mango', calories: 700 },
      { name: 'watermelon', calories: 800 },
      { name: 'strawberry', calories: 900 },
      { name: 'blueberry', calories: 1000 },
      { name: 'raspberry', calories: 1100 },
      { name: 'blackberry', calories: 1200 },
      { name: 'kiwi', calories: 1300 },
      { name: 'lemon', calories: 1400 },
      { day: 'tues' },
      { name: 'lime', calories: 1500 },
      { name: 'cherry', calories: 1600 },
      { name: 'peach', calories: 1700 },
      { name: 'plum', calories: 1800 },
      { name: 'apricot', calories: 1900 },
      { name: 'nectarine', calories: 2000 },
      { name: 'pomegranate', calories: 2100 },
      { name: 'coconut', calories: 2200 },
      { name: 'avocado', calories: 2300 },
      { name: 'tomato', calories: 2400 },
      { name: 'potato', calories: 2500 },
      { name: 'carrot', calories: 2600 },
      { name: 'broccoli', calories: 2700 },
      { name: 'cauliflower', calories: 2800 },
      { name: 'celery', calories: 2900 },
      { day: 'thurs' },
      { name: 'spinach', calories: 3000 },
      { name: 'lettuce', calories: 3100 },
      { name: 'cucumber', calories: 3200 },
      { name: 'onion', calories: 3300 },
      { name: 'garlic', calories: 3400 },
      { name: 'ginger', calories: 3500 },
      { name: 'pepper', calories: 3600 },
      { name: 'cabbage', calories: 3700 },
      { name: 'squash', calories: 3800 },
      { name: 'zucchini', calories: 3900 },
      { name: 'asparagus', calories: 4000 },
      { name: 'mushroom', calories: 4100 },
      { name: 'eggplant', calories: 4200 },
      { name: 'artichoke', calories: 4300 },
      { name: 'sweet potato', calories: 4400 },
      { name: 'yam', calories: 4500 },
      { name: 'corn', calories: 4600 },
      { name: 'beet', calories: 4700 },
      { name: 'radish', calories: 4800 },
      { name: 'turnip', calories: 4900 },
      { name: 'rutabaga', calories: 5000 },
      { name: 'cantaloupe', calories: 5100 },
      { name: 'honeydew', calories: 5200 },
      { name: 'grapefruit', calories: 5300 },
      { name: 'papaya', calories: 5400 },
      { name: 'durian', calories: 5500 },
      { name: 'jackfruit', calories: 5600 },
      { name: 'pomelo', calories: 5700 },
      { name: 'starfruit', calories: 5800 },
      { day: 'fri' },
      { name: 'tangerine', calories: 5900 },
      { name: 'persimmon', calories: 6000 },
      { name: 'guava', calories: 6100 },
      { name: 'lychee', calories: 6200 }
    ]);
    return {
      arrowForward,
      add,
      remove,
      items,
      timeStamp
    }
  }
});
</script>

<style scoped>
.parent-container {
  position: relative;
}

.item-parent {
  display: flex;
  align-items: left;
  flex-direction: column;
  padding: 5px 0px;
}

.date-item-parent {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: var(--ion-color-step-100);
  padding: 7px 0px;
  position: sticky;
  top: 0;
}
</style>
