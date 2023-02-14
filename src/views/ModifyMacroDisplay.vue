<template>
  <ion-page>
    <ion-content>
      <ion-back-button default-href="/" />
      <ion-item
        v-for="item in macroComponents"
        :key="item.component"
      >
        <div 
          v-if="isActive(item.component)"
          style="margin-right: 8px; font-weight: 700; color: lime"
        >
          active
        </div>
        {{ item.label }}
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonItem, IonPage, IonBackButton } from "@ionic/vue";
import { MacroDisplayComponent } from '@/types/User'
import { useStore } from "vuex";

const store = useStore();

const activeMacroComponents = store.getters.activeMacroDisplayComponents;
const macroComponents = store.getters.macroDisplayComponents;

function isActive(component: string) {
  return activeMacroComponents.find((item: MacroDisplayComponent) => {
    return item.component === component;
  });
}
</script>
