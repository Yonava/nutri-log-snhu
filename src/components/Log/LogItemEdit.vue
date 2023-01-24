<template>
  <ion-page>
    <ion-content>
      <default-header :title="item">
        <template #left>
          <ion-back-button default-href="/tabs/log"></ion-back-button>
        </template>
      </default-header>
      Detail view for {{ item }}
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonBackButton,
  IonContent,
} from '@ionic/vue';

import { useRoute } from 'vue-router';

export default {
  components: {
    IonPage,
    IonBackButton,
    IonContent,
  },
  setup() {
    const route = useRoute();
    const { item } = route.params;

    return {
      item
    };
  }
}
</script>