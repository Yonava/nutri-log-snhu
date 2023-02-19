<template>
  <ion-page>
    <default-header :title="item.name.length < 17 ? item.name : item.name.slice(0, 17) + '...'">
      <template #left>
        <ion-back-button
          default-href="/tabs/log"
          text="Select Item"
        ></ion-back-button>
      </template>
    </default-header>
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <div 
            class="ion-padding"
            style="font-size: 2.75rem; font-weight: 700"
          >
            {{ item.name }}
          </div>
        </ion-toolbar>
      </ion-header>
      <div class="ion-padding">
        <div class="information" v-if="item.measurement"> 
          Serving Size: {{ item.measurement.value }} {{ item.measurement.unit }}
        </div>
        <div class="information">
          Calories: {{ item.calories }}
        </div>
        <div class="information">
          Total Carbs: {{ item.macro.carbohydrates.total }}g
          <br>
          Fiber: {{ item.macro.fiber }}g
          <br>
          Sugar: {{ item.macro.carbohydrates.sugars }}g
          <br>
          Added Sugar: {{ item.macro.carbohydrates.added_sugars }}g
        </div>  
        <div class="information">
          Protein: {{ item.macro.protein }}g
        </div>
        <div class="information">
          Total Fat: {{ item.macro.fat.total }}g
          <br>
          Saturated Fat: {{ item.macro.fat.saturated }}g
          <br>
          Trans Fat: {{ item.macro.fat.trans }}g
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonBackButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/vue';

import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const item = computed(() => store.getters.selectedCatalogItem)
</script>

<style scoped>
.information {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 10px;
}
</style>