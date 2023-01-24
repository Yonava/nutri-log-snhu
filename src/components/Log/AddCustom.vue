<template>
  <ion-page>
    <ion-content>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/tabs/log"></ion-back-button>
          </ion-buttons>
          <ion-title>
            Add Custom
          </ion-title>
        </ion-toolbar>
      </ion-header>
      here are the items to add
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonBackButton,
  IonButtons,
  IonToolbar,
  IonContent,
  IonTitle,
  IonHeader
} from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonBackButton,
    IonButtons,
    IonContent,
    IonToolbar,
    IonTitle,
    IonHeader
  },
}
</script>