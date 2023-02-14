<template>
  <ion-page>
    <ion-content>
      <ion-back-button default-href="/" />
      <ion-item
        v-for="item in fullMacroComponentList"
        :key="item.component"
      >
        {{ item.label }}
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonItem, IonPage, IonBackButton } from "@ionic/vue";
</script>
