<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-back-button slot="start" default-href="/" />
        <ion-title>
          Personalize
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Personalize
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <div 
        class="center" 
        style="margin-bottom: 2px"
      >
        drag to reorder
      </div>
      <!-- <div class="center display-box-container">
        <draggable 
          v-model="macroComponents"
          item-key="component"
          :list="macroComponents"
        >
          <template #item="{ item }">
            <div
              class="center display-box"
              :style="{ 
                border: `2px solid ${item.color}`, 
                marginTop: isActive(item.component) ? '4px' : '20px',
              }"
            >
              {{ item.label }}
            </div>
          </template>
        </draggable>
      </div> -->
      <ion-reorder-group :disabled="false" @ionItemReorder="handleReorder($event)">
        <div style="width: 100px; height: 50px; background: red" v-for="i in funArray" :key="i">
          <ion-reorder>
            <ion-label>
              Item {{ i }}
            </ion-label>
            
         </ion-reorder>
        </div>
      </ion-reorder-group>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, 
  IonPage, 
  IonBackButton,
  IonReorderGroup,
  IonReorder,
  IonList,
  IonItem,
} from "@ionic/vue";
import { ref } from "vue";
import { MacroDisplayComponent } from '@/types/User';
import { useStore } from "vuex";

const funArray = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const store = useStore();

const activeMacroComponents = ref(store.getters.activeMacroDisplayComponents);
const macroComponents = store.getters.macroDisplayComponents;

// TODO: figure out which event type in ts to use
function startDrag(event: any, item: number) {
  event.transferData.dropEffect = 'move';
  event.transferData.effectAllowed = 'move';
  event.transferData.setData('itemID', item);
  console.log('start drag', item);
}

function isActive(component: string) {
  return activeMacroComponents.value.find((item: MacroDisplayComponent) => {
    return item.component === component;
  });
}

const handleReorder = (event: CustomEvent) => {
  // The `from` and `to` properties contain the index of the item
  // when the drag started and ended, respectively
  console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

  // Finish the reorder and position the item in the DOM based on
  // where the gesture ended. This method can also be called directly
  // by the reorder group
  event.detail.complete();
};
</script>

<style scoped>
.display-box-container {
  flex-wrap: wrap; 
  flex-direction: row; 
  position: relative; 
  width: 100%; 
}

.display-box {
  width: 22%; 
  height: 60px; 
  background-color: var(--ion-color-light); 
  border-radius: 12px; 
  margin: 4px; 
  font-size: 1.1rem;
  font-weight: 500;
}
</style>
