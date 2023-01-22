<template>
  <ion-page>
    <ion-content>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/tabs/log"></ion-back-button>
          </ion-buttons>
          <ion-title>{{ id }}</ion-title>
        </ion-toolbar>
      </ion-header>
      this is the detail view for {{ id }}
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

import { useRoute } from 'vue-router';

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
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const { query } = route.query;
    return { id, query };
  }
}
</script>