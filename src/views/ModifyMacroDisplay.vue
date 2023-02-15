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
      <div class="center" style="flex-wrap: wrap; width: 100%; position: relative; flex-direction: row;">
        <div
          v-for="item in macroComponents"
          :key="item.component"
          class="center display-box"
          :style="{ border: `3px solid ${item.color}` }"
        >
          {{ item.label }}
        </div>
      </div>
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
  IonBackButton 
} from "@ionic/vue";
import { ref } from "vue";
import { MacroDisplayComponent } from '@/types/User'
import { useStore } from "vuex";

const store = useStore();

const activeMacroComponents = ref(store.getters.activeMacroDisplayComponents);
const macroComponents = store.getters.macroDisplayComponents;

function isActive(component: string) {
  return activeMacroComponents.value.find((item: MacroDisplayComponent) => {
    return item.component === component;
  });
}
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
  border-radius: 8px; 
  margin: 4px; 
  font-size: 1.1rem;
  font-weight: 600;
}
</style>
