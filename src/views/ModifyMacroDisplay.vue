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
      <div></div>
      <draggable 
        v-if="!loading"
        v-model="funArray" 
        group="people" 
        item-key="id"
      >
        <template #item="{element}">
          <div>{{ element }}</div>
        </template>
      </draggable>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, 
  IonPage, 
  IonBackButton 
} from "@ionic/vue";
import { ref } from "vue";
import { MacroDisplayComponent } from '@/types/User'
import { useStore } from "vuex";
import draggable from "vuedraggable";

export default {
  name: "ModifyMacroDisplay",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonBackButton,
    draggable,
  },
  setup() {
    const funArray = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const loading = ref(true);

    setTimeout(() => {
      loading.value = false;
    }, 3000);

    const store = useStore();

    const activeMacroComponents = ref(store.getters.activeMacroDisplayComponents);
    const macroComponents = store.getters.macroDisplayComponents;

    function isActive(component: string) {
      return activeMacroComponents.value.find((item: MacroDisplayComponent) => {
        return item.component === component;
      });
    }

    return {
      loading,
      funArray,
      isActive,
      macroComponents,
    }
  }
};

// const funArray = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// const store = useStore();

// const activeMacroComponents = ref(store.getters.activeMacroDisplayComponents);
// const macroComponents = store.getters.macroDisplayComponents;

// function isActive(component: string) {
//   return activeMacroComponents.value.find((item: MacroDisplayComponent) => {
//     return item.component === component;
//   });
// }
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
