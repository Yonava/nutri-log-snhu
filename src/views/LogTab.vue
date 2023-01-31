<template>
  <ion-page>
    <default-header title="Log">
      <template #left>
        <div @click="removeItemsState = !removeItemsState">
          <ion-button 
            v-if="!removeItemsState"
            :disabled="items.length === 0"
          >
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
          v-if="items.length === 0" 
          class="center"
        >
          <h2>
            No items logged yet
          </h2>
          <ion-button 
            @click="addPopOver"
          >
            add
            <ion-icon 
              :icon="add"
              slot="end" 
            ></ion-icon>
          </ion-button>
        </div>
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
import { useStore } from 'vuex';
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
  LoggedItem, 
  UndoItem, 
  DateTag 
} from '@/types/Log';

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
    const store = useStore();

    const items = store.getters.log;

    const removeItemsState = ref(false);
    const undoStack = ref<UndoItem[]>([]);

    // function removeItem(item: LoggedItem) {
    //   const index = items.value.indexOf(item);
    //   undoStack.value.push({ 
    //     ...item,
    //     index 
    //   });
    //   items.value.splice(index, 1);
    // }


    // function undo() {
    //   const poppedItem = undoStack.value.pop();
    //   if (!poppedItem) return;
    //   const { index, ...item } = poppedItem;
    //   items.value.splice(index, 0, item);
    // }

    function itemClicked(item: LoggedItem) {
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

    function itemStyle(item: LoggedItem | DateTag) {
      if ('month' in item) {
        return { position: 'sticky', top: 0, zIndex: 2 };
      } else {
        return {};
      }
    }

    return {
      items,
      arrowForward,
      arrowUndoOutline,
      add,
      remove,
      removeItemsState,
      checkmarkOutline,
      undoStack,
      itemStyle,
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
