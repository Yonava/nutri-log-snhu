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
          :style="{ border: '2px solid ' + item.color }"
        >
          <div>
            {{ item.label }}
          </div>
          <ion-reorder slot="end"></ion-reorder>
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
import { useStore } from "vuex";

const store = useStore();

const macroComponents = store.getters.macroComponents;

const handleReorder = (event: CustomEvent) => {
  store.commit('swapMacroComponents', {
    from: event.detail.from,
    to: event.detail.to
  });
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
