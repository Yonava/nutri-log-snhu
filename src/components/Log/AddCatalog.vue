<template>
  <ion-page>
    <default-header title="Select Item">
      <template #left>
        <ion-back-button 
          text="Log Entries"
          default-href="/tabs/log"
        ></ion-back-button>
      </template>
    </default-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Select Item
          </ion-title>
          <ion-progress-bar 
            v-if="loading"
            type="indeterminate"
          ></ion-progress-bar>
        </ion-toolbar>
      </ion-header>
      <ion-list v-if="loading">
        <div 
          class="center" 
          v-for="i in 10" :key="i"
        >
          <ion-skeleton-text 
            :animated="true" 
            style="width: 80%; height: 50px; margin: 10px 0;"
          ></ion-skeleton-text>
        </div>
      </ion-list>
      <ion-list v-else>
        {{ mealPeriod }}
        <ion-item 
          v-for="item in items" 
          :key="item.id"
          button
          @click="goToDetail(item)"
        >
          <ion-icon 
            @click.stop="addItem(item)"
            :icon="justAddedItemId === item._id ? checkmarkCircleOutline : addCircleOutline" 
            color="success" 
            slot="start"
          ></ion-icon>
          <ion-label>
            {{ item.name }}
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
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
  IonIcon,
  IonSkeletonText,
  IonProgressBar,
} from '@ionic/vue';

import {
  addCircleOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';

import { 
  computed, 
  ref,
  onMounted,
} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { UnloggedItem } from '@/types/Log'

const store = useStore();
const router = useRouter();

const loading = ref(true);
const mealPeriod = getMealPeriod();

onMounted(async () => {
  if (store.getters.catalog.length > 0) {
    loading.value = false;
    return;
  }
  await store.dispatch('fetchCatalog');
  loading.value = false;
});

const justAddedItemId = ref<string | null>(null);

function addItem(item: UnloggedItem) {
  store.dispatch("postLoggedItem", item);
  justAddedItemId.value = item._id;
  setTimeout(() => {
    if (justAddedItemId.value === item._id) {
      justAddedItemId.value = null;
    }
  }, 3000);
}

function goToDetail(item: UnloggedItem) {
  store.commit('setSelectedCatalogItem', item);
  router.push('/tabs/log/addCatalog/detail');
}

function getMealPeriod() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return 'breakfast';
  } else if (hour >= 12 && hour < 17) {
    return 'lunch';
  } else if (hour >= 17 && hour < 22) {
    return 'dinner';
  } else {
    return 'late night';
  }
}

const items = computed(() => store.getters.catalog);
</script>