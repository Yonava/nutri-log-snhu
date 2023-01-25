<template>
  <ion-page>
    <ion-content>
      <default-header title="Add Catalog">
        <template #left>
          <ion-back-button default-href="/tabs/log"></ion-back-button>
        </template>
      </default-header>
      here are the items to add
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonBackButton,
  IonContent,
} from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonBackButton,
    IonContent,
  },
}
</script>