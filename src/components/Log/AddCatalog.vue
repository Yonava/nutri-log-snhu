<template>
  <ion-page>
    <default-header title="Add Catalog">
      <template #left>
        <ion-back-button default-href="/tabs/log"></ion-back-button>
      </template>
    </default-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Catalog Items</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item 
          v-for="item in items" 
          :key="item.id"
          button
          @click="goToDetail(item)"
        >
          <ion-icon 
            @click.stop="addItem(item)"
            :icon="addCircleOutline" 
            color="success" 
            slot="start"
          ></ion-icon>
          <ion-label>{{ item.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonBackButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon
} from '@ionic/vue';

import {
  addCircleOutline
} from 'ionicons/icons';

import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { DisplayItem } from '@/types/Log'

export default {
  components: {
    IonPage,
    IonBackButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon
  },
  setup() {
    const store = useStore();
    const router = useRouter();


    function addItem(item: DisplayItem) {
      store.dispatch("postLoggedItem", item)
    }

    function goToDetail(item: DisplayItem) {
      store.commit('setSelectedCatalogItem', item)
      router.push('/tabs/log/addCatalog/detail')
    }

    const items = computed(() => store.getters.catalog);
    return {
      addCircleOutline,
      items,
      addItem,
      goToDetail
    }
  }
}
</script>