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
        <ion-toolbar>
          <ion-searchbar 
            v-model="searchQuery"
            @ionFocus="searching = true"
            @ionCancel="searching = false"
            :show-cancel-button="searching ? 'always' : 'never'" 
            :show-clear-button="searchQuery.length > 0 ? 'focus' : 'never'"
          ></ion-searchbar>
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
      <div v-else-if="!searching">
        <h1 style="text-transform: capitalize; text-align: center">
          Popular For {{ mealPeriod }}
        </h1>
        <ion-item 
          v-for="item in popularItems" 
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
        <h1 style="text-transform: capitalize; text-align: center">
          Recently Added
        </h1>
        <ion-list v-if="recentItems.length > 0">
          <ion-item 
            v-for="item in recentItems" 
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
        <div v-else>
          <h4 class="center">
            No items recently added
          </h4>
        </div>
      </div>
      <div v-else>
        <CatalogSearch 
          :searchQuery="searchQuery"
          :searchResults="searchResults"
        />
      </div>
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
  IonSearchbar,
} from '@ionic/vue';

import {
  addCircleOutline,
  checkmarkCircleOutline,
  search
} from 'ionicons/icons';

import { 
  computed, 
  ref,
  onMounted,
} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { UnloggedItem, LoggedItem } from '@/types/Log'
import CatalogSearch from '@/components/Log/CatalogSearch.vue'

const store = useStore();
const router = useRouter();

const loading = ref(true);
const searching = ref(false);
const searchQuery = ref('');
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

const popularItems = computed(() => {
  const maxPopularItems = 5;
  const output: UnloggedItem[] = [];
  for (let i = 0; i < items.value.length; i++) {
    if (output.length === maxPopularItems) break;
    const item = items.value[i];
    if (item.time === mealPeriod) {
      output.push(item);
    }
  }
  
  return output;
});

const recentItems = computed(() => {
  const maxRecentItems = 5;
  const output: LoggedItem[] = [];
  const loggedItems = store.getters.log;
  for (let i = 0; i < loggedItems.length; i++) {
    if (output.length === maxRecentItems) break;
    if (output.find(item => item.name === loggedItems[i].name)) continue;
    output.push(loggedItems[i]);
  }
  
  return output;
});

const searchResults = computed(() => {
  if (searchQuery.value === '') return [];
  const output: UnloggedItem[] = [];
  for (let i = 0; i < items.value.length; i++) {
    const item = items.value[i];
    if (item.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      output.push(item);
    }
  }
  
  return output;
});
</script>