<template>
  <ion-content>
    <ion-item
      v-for="item in fullMacroComponentList"
      :key="item.component"
      @click="$emit('item-added', item)"
    >
      {{ item.label }}
    </ion-item>
  </ion-content>
</template>

<script setup lang="ts">
import { IonContent, IonItem } from "@ionic/vue";
const fullMacroComponentList = [
  {
    component: "CalorieProgress",
    label: "cals",
    color: "var(--ion-color-primary)",
    getter: "todaysCalorieData",
  },
  {
    component: "FatProgress",
    label: "fats",
    color: "var(--ion-color-secondary)",
    getter: "todaysFatData",
    unit: "g"
  },
  {
    component: "ProteinProgress",
    label: "protein",
    color: "#40E0D0",
    getter: "todaysProteinData",
    unit: "g",
  },
  {
    component: "CarbProgress",
    label: "carbs",
    color: "#F97D38",
    getter: "todaysCarbData",
    unit: "g",
  },
  {
    component: "SugarProgress",
    label: "sugars",
    color: "var(--ion-color-warning)",
    getter: "todaysSugarData",
    unit: "g",
  },
  {
    component: "CalciumProgress",
    label: "calcium",
    color: "var(--ion-color-success)",
    getter: "todaysCalciumData",
    unit: "mg",
  },
  {
    component: "IronProgress",
    label: "iron",
    color: "var(--ion-color-danger)",
    getter: "todaysIronData",
    unit: "mg",
  },
  {
    component: "FiberProgress",
    label: "fiber",
    color: "var(--ion-color-danger)",
    getter: "todaysFiberData",
    unit: "g",
  },
  {
    component: "SodiumProgress",
    label: "sodium",
    color: "#EEA47FFF",
    getter: "todaysSodiumData",
    unit: "mg",
  },
  {
    component: "PotasProgress",
    label: "potas",
    color: "#8A2BE2",
    getter: "todaysPotassiumData",
    unit: "mg",
  },
  {
    component: "CholProgress",
    label: "chol",
    color: "pink",
    getter: "todaysCholesterolData",
    unit: "mg",
  }
]
</script>
