<template>
  <ion-page>
    <default-header title="Log">
      <template #left>
        <div @click="removeItemsState = !removeItemsState">
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
        </div>
      </template>
      <template #right>
        <ion-button 
          v-if="!removeItemsState"
          @click="addPopOver"
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
      </template>
    </default-header>
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
          :style="itemStyle(i)"
        >
          <LogItem 
            v-if="i.name"
            :item="i"
            :remove-items-state="removeItemsState"
            @click="itemClicked(i)"
            @remove-item="removeItem(i)"
          />
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
import AddPopOver from '@/components/Log/AddPopOver.vue';
import LogItem from '@/components/Log/LogItem.vue';
import { 
  defineComponent, 
  ref
} from 'vue';
import { 
  IonPage,  
  IonContent, 
  IonButton, 
  IonIcon,
  IonToolbar,
  IonTitle,
  IonHeader,
  popoverController
} from '@ionic/vue';
import { 
  arrowForward,
  add,
  remove,
  arrowUndoOutline,
  checkmarkOutline
} from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { 
  Item, 
  UndoItem, 
  DateItem 
} from '@/components/Log/Types';

export default defineComponent({
  components: { 
    IonContent, 
    IonPage, 
    IonButton, 
    IonIcon,
    LogItem, 
    IonHeader,
    IonToolbar,
    IonTitle,
  },
  setup() {

    const router = useRouter();

    const removeItemsState = ref(false);
    const undoStack = ref<UndoItem[]>([]);

    function removeItem(item: Item) {
      const index = items.value.indexOf(item);
      undoStack.value.push({ 
        ...item,
        index 
      });
      items.value.splice(index, 1);
    }


    function undo() {
      const poppedItem = undoStack.value.pop();
      if (!poppedItem) return;
      const { index, ...item } = poppedItem;
      items.value.splice(index, 0, item);
    }

    function itemClicked(item: Item) {
      removeItemsState.value ? undefined :
      router.push({ 
        name: 'LogEditDetail', 
        params: { 
          item: item.name
        }
      })
    }

    async function addPopOver(e: Event) {
      const popover = await popoverController.create({
        component: AddPopOver,
        event: e,
        translucent: true,
        dismissOnSelect: true
      });
      return await popover.present();
    }

    function itemStyle(item: Item | DateItem) {
      if ('month' in item) {
        return { position: 'sticky', top: 0, zIndex: 2 };
      } else {
        return {};
      }
    }
    
    const items = ref([
      { name: 'pizza', calories: 324, _id: '1a' },
      { name: 'burger', calories: 324, _id: '2a' },
      { name: 'fries', calories: 324, _id: '3a' },
      { name: 'chicken', calories: 324, _id: '4a' },
      { name: 'salad', calories: 324, _id: '5a' },
      { name: 'sushi', calories: 324, _id: '6a' },
      { name: 'tacos', calories: 324, _id: '7a' },
      { name: 'burrito', calories: 324, _id: '8a' },
      { name: 'pasta', calories: 324, _id: '9a' },
      { name: 'sandwich', calories: 324, _id: '10a' },
      { name: 'steak', calories: 324, _id: '11a' },
      { name: 'chips', calories: 324, _id: '12a' },
      { name: 'ice cream', calories: 324, _id: '13a' },
      { name: 'cake', calories: 324, _id: '14a' },
      { name: 'cookies', calories: 324, _id: '15a' },
      { month: 'sep' },
      { name: 'donuts', calories: 324, _id: '16a' },
      { name: 'milkshake', calories: 324, _id: '17a' },
      { name: 'hot dog', calories: 324, _id: '18a' },
      { name: 'chocolate', calories: 324, _id: '19a' },
      { name: 'candy', calories: 324, _id: '20a' },
      { name: 'popcorn', calories: 324, _id: '21a' },
      { name: 'chips', calories: 324, _id: '22a' },
      { name: 'ice cream', calories: 324, _id: '23a' },
      { name: 'cake', calories: 324, _id: '24a' },
      { name: 'cookies', calories: 324, _id: '25a' },
      { month: 'oct' },
      { name: 'donuts', calories: 324, _id: '26a' },
      { name: 'milkshake', calories: 324, _id: '27a' },
      { name: 'hot dog', calories: 324, _id: '28a' },
      { name: 'chocolate', calories: 324, _id: '29a' },
      { name: 'candy', calories: 324, _id: '30a' },
      { name: 'popcorn', calories: 324, _id: '31a' },
      { name: 'chips', calories: 324, _id: '32a' },
      { name: 'ice cream', calories: 324, _id: '33a' },
      { name: 'cake', calories: 324, _id: '34a' },
      { name: 'cookies', calories: 324, _id: '35a' },
      { month: 'nov' },
      { name: 'donuts', calories: 324, _id: '36a' },
      { name: 'milkshake', calories: 324, _id: '37a' },
      { name: 'hot dog', calories: 324, _id: '38a' },
      { name: 'chocolate', calories: 324, _id: '39a' },
      { name: 'candy', calories: 324, _id: '40a' },
      { name: 'popcorn', calories: 324, _id: '41a' },
      { name: 'chips', calories: 324, _id: '42a' },
      { name: 'ice cream', calories: 324, _id: '43a' },
      { name: 'cake', calories: 324, _id: '44a' },
      { name: 'cookies', calories: 324, _id: '45a' },
      { month: 'dec' },
      { name: 'donuts', calories: 324, _id: '46a' },
      { name: 'milkshake', calories: 324, _id: '47a' },
      { name: 'hot dog', calories: 324, _id: '48a' },
      { name: 'chocolate', calories: 324, _id: '49a' },
    ]);
    return {
      arrowForward,
      arrowUndoOutline,
      add,
      remove,
      removeItemsState,
      items,
      checkmarkOutline,
      undoStack,
      itemStyle,
      removeItem,
      undo,
      itemClicked,
      addPopOver  
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

.date-item-parent {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  background: linear-gradient(var(--ion-color-primary), var(--ion-color-tertiary-shade));
  padding: 7px 0px;
}
</style>
