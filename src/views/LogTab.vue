<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button>add</ion-button>
        </ion-buttons>
        <ion-title>Log</ion-title>
        <ion-buttons slot="end">
          <ion-button>remove</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Log Entries</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item v-for="i in 40" :key="i">{{ i }} - item</ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';

export default defineComponent({
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton }
});
</script>
