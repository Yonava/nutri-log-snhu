<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons 
          slot="end"
        >
          <ion-button 
            v-if="!removeItemsState"
            @click="items.unshift({ name: 'new item', calories: 0 })"
          >
            add
            <ion-icon 
              :icon="add"
              slot="end" 
            ></ion-icon>
          </ion-button>
          <ion-button 
            v-else
            @click="undo"
            :disabled="undoStack.length === 0"
          >
            undo
            <ion-icon 
              slot="end" 
              :icon="arrowUndoOutline"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>
          Log
        </ion-title>
        <ion-buttons 
          @click="removeItemsState = !removeItemsState"
          slot="start"
        >
          <ion-button v-if="!removeItemsState">
            remove
            <ion-icon 
              slot="start" 
              :icon="remove"
            ></ion-icon>
          </ion-button>
          <ion-button v-else>
            done
            <ion-icon 
              slot="start" 
              :icon="checkmarkOutline"
            ></ion-icon>
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
            @click="itemClicked(i)"
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
  removeCircleOutline,
  arrowUndoOutline,
  checkmarkOutline
} from 'ionicons/icons';
import { useRouter } from 'vue-router';

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

    const router = useRouter();

    interface Item {
      name: string;
      calories: number;
    }

    interface UndoItems {
      name: string;
      calories: number;
      index: number;
    }

    const removeItemsState = ref(false);
    const timeStamp = new Date();

    function removeItem(item: Item) {
      const index = items.value.indexOf(item);
      undoStack.value.push({ 
        name: item.name, 
        calories: item.calories, 
        index 
      });
      items.value.splice(index, 1);
    }

    const undoStack = ref<UndoItems[]>([]);

    function undo() {
      const poppedItem = undoStack.value.pop();
      if (!poppedItem) return;
      items.value.splice(poppedItem.index, 0, { 
        name: poppedItem.name, 
        calories: poppedItem.calories 
      });
    }

    function itemClicked(item: Item) {
      removeItemsState.value ? undefined :
      router.push({ 
        name: 'LogEditDetail', 
        params: { 
          itemId: item.name  
        }
      })
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
      { name: 'persimmon', calories: 2400 }
    ]);
    return {
      arrowForward,
      add,
      remove,
      removeCircleOutline,
      items,
      timeStamp,
      removeItemsState,
      removeItem,
      arrowUndoOutline,
      checkmarkOutline,
      undoStack,
      undo,
      itemClicked
    }
  }
});
</script>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

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
