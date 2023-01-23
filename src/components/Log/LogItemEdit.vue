<template>
  <ion-page>
    <ion-content>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/tabs/log"></ion-back-button>
          </ion-buttons>
          <ion-title>{{ itemId }}</ion-title>
        </ion-toolbar>
      </ion-header>
      Detail Page for {{ itemId }}
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
    const { itemId } = route.params;

    return {
      itemId
    };
  }
}
</script>

<style scoped>

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>