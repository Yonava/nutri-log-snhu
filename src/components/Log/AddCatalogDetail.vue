<template>
  <ion-page>
    <ion-content>
      <default-header :title="item.name">
        <template #left>
          <ion-back-button default-href="/tabs/log"></ion-back-button>
        </template>
      </default-header>
      {{ item }}
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonBackButton,
  IonContent,
} from '@ionic/vue';

import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  components: {
    IonPage,
    IonBackButton,
    IonContent,
  },
  setup() {
    const store = useStore()
    const item = computed(() => store.getters.selectedCatalogItem)
    return {
      item
    }
  }
}
</script>