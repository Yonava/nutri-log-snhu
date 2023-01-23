<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons 
          @click="items.unshift({ name: 'new item', calories: 0 })"
          slot="end"
        >
          <ion-button>
            add
            <ion-icon slot="end" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Log</ion-title>
        <ion-buttons 
          @click="removeItemsState = !removeItemsState"
          slot="start"
        >
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
      <TransitionGroup name="fade">
        <div
          v-for="i in items"
          :key="i"
          :style="i.month ? { position: 'sticky', top: 0, zIndex: 2 } : {}"
        >
          <ion-item
            v-if="i.name"
            :router-link="{ path: `/tabs/log/edit/${i.name}` }"
            :class="removeItemsState ? '' : 'push-item'"
            style="transition: all 0.2s ease-in-out; width: 113%"
            button
          >
            <ion-icon
              :icon="removeCircleOutline"
              @click.stop="removeItem(i)"
              slot="start"
              style="color: red"
            ></ion-icon>
            <div class="item-parent">
              <p style="margin: 0; font-size: 8pt">
                {{ timeStamp.toLocaleTimeString([], { timeStyle: 'short' }) }} |
                {{ i.calories }} cals |
                43g carbs |
                43g protein |
                43g fat
              </p>
              <h2 style="text-transform: capitalize; margin: 0">
                {{ i.name }}
              </h2>
            </div>
          </ion-item>
          <div 
            class="date-item-parent"
            v-else
          >
            <h5 style="margin: 0">
              {{ i.month }} 3, 2023
            </h5>
          </div>
        </div>
      </TransitionGroup>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { 
  defineComponent, 
  ref 
} from 'vue';
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
  remove,
  removeCircleOutline
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

    interface Item {
      name: string;
      calories: number;
    }

    const removeItemsState = ref(false);
    const timeStamp = new Date();

    function removeItem(item: Item) {
      items.value.splice(items.value.indexOf(item), 1);
    }
    
    const items = ref([
      { name: 'apple', calories: 100 },
      { name: 'banana', calories: 200 },
      { name: 'orange', calories: 300 },
      { name: 'grape', calories: 400 },
      { name: 'pear', calories: 500 },
      { month: 'may' },
      { name: 'pineapple', calories: 600 },
      { name: 'mango', calories: 700 },
      { name: 'watermelon', calories: 800 },
      { name: 'strawberry', calories: 900 },
      { name: 'blueberry', calories: 1000 },
      { name: 'raspberry', calories: 1100 },
      { name: 'blackberry', calories: 1200 },
      { name: 'kiwi', calories: 1300 },
      { name: 'lemon', calories: 1400 },
      { name: 'lime', calories: 1500 },
      { name: 'coconut', calories: 1600 },
      { name: 'avocado', calories: 1700 },
      { name: 'peach', calories: 1800 },
      { name: 'plum', calories: 1900 },
      { name: 'cherry', calories: 2000 },
      { name: 'apricot', calories: 2100 },
      { name: 'papaya', calories: 2200 },
      { name: 'nectarine', calories: 2300 },
      { name: 'persimmon', calories: 2400 },
      { name: 'pomegranate', calories: 2500 },
      { name: 'tangerine', calories: 2600 },
      { name: 'cantaloupe', calories: 2700 },
      { name: 'honeydew', calories: 2800 },
      { name: 'guava', calories: 2900 },
      { name: 'fig', calories: 3000 },
      { name: 'date', calories: 3100 },
      { name: 'durian', calories: 3200 },
      { name: 'jackfruit', calories: 3300 },
      { name: 'lychee', calories: 3400 },
      { name: 'mangosteen', calories: 3500 },
      { name: 'olive', calories: 3600 }
    ]);
    return {
      arrowForward,
      add,
      remove,
      removeCircleOutline,
      items,
      timeStamp,
      removeItemsState,
      removeItem
    }
  }
});
</script>

<style scoped>

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.01) translateX(-200px);
}

.fade-enter-to,
.fade-leave-active {
  position: absolute;
}

.item-parent {
  display: flex;
  align-items: left;
  flex-direction: column;
  padding: 5px 0px;
}

.push-item {
  transform: translateX(-12%);
}

.date-item-parent {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(var(--ion-color-primary), var(--ion-color-tertiary-shade));
  padding: 7px 0px;
}
</style>
