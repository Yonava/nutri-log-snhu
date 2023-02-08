<template>
  <ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-button expand="block">Adjust Daily Targets</ion-button>
      <ion-button expand="block">Hide Calories</ion-button>
      <ion-button expand="block">Terms of Use</ion-button>
      <ion-button expand="block">Delete Account</ion-button>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonTitle,
  IonMenu
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonToolbar,
    IonButton,
    IonTitle,
    IonMenu
  },
});
</script>