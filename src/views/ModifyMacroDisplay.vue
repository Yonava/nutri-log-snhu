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
      <ion-reorder-group 
        :disabled="false"
        @ionItemReorder="handleReorder($event)"
        class="center"
      >
        <ion-item 
          v-for="item in macroComponents"
          :key="item.component"
          class="add-box center"
          :color="item.color"
        >
          <div>
            {{ item.label }}
          </div>
          <ion-reorder slot="end"></ion-reorder>
          <!-- <ion-icon slot="end" :icon="reorderThreeOutline"></ion-icon> -->
        </ion-item>
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
  IonItem
} from "@ionic/vue";
import { reorderThreeOutline } from "ionicons/icons";
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

.add-box {
  width: 85%; 
  height: 40px;
  margin: 3px; 
  border-radius: 8px;
}

.display-box {
  width: 22%; 
  /* height: 10%;  */
  border-radius: 12px; 
  margin: 4px; 
  font-size: 1.1rem;
  font-weight: 500;
}
</style>
