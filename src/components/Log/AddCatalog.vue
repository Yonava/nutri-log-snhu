<template>
  <ion-page>
    <default-header title="Select Item">
      <template #left>
        <ion-back-button 
          text="Log"
          default-href="/tabs/log"
        ></ion-back-button>
      </template>
    </default-header>
    <ion-content 
      :fullscreen="true" 
      :scroll-events="true"
      @ionScroll="scroll($event)"
    >
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
            class="skeleton-loader"
          ></ion-skeleton-text>
        </div>
      </ion-list>
      <div 
        v-else-if="!searching"
      >
        <AddPopular />
        <AddCustom />
        <AddRecent />
      </div>
      <div v-else>
        <CatalogSearch 
          :searchQuery="searchQuery"
          :searchResults="searchResults.slice(0, displayNumber)"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonToolbar,
  IonTitle,
  IonProgressBar,
  IonSearchbar,
  IonList,
  IonSkeletonText,
  IonBackButton,
  IonContent,
  IonHeader,
  IonPage,
} from '@ionic/vue';
import { 
  computed, 
  ref,
  onMounted,
  watch,
} from 'vue'
import { useStore } from 'vuex'
import { UnloggedItem } from '@/types/Log'
import CatalogSearch from '@/components/Log/CatalogSearch.vue'
import AddPopular from '@/components/Log/AddPopular.vue'
import AddRecent from '@/components/Log/AddRecent.vue'
import AddCustom from '@/components/Log/AddCustom.vue'

const store = useStore();

const loading = ref(true);
const searching = ref(false);
const searchQuery = ref('');

const numResults = ref(18);

const displayNumber = computed(() => {
  if (searchResults.value.length > numResults.value) {
    return numResults.value;
  } else {
    return searchResults.value.length;
  }
});

watch(searchQuery, () => {
  numResults.value = 18;
  refreshY.value = 170;
});

const refreshY = ref(170);

function scroll(e: any) {
  if (refreshY.value < e.detail.currentY) {
    numResults.value += 5;
    refreshY.value = e.detail.currentY + 200;
  }
}

onMounted(() => {
  if (store.getters.catalog.length > 0) {
    loading.value = false;
    return;
  }
  // ensures transition doesn't stutter
  setTimeout(async () => {
    await store.dispatch('fetchCatalog');
    loading.value = false;
  }, 500);
});

const items = computed(() => store.getters.catalog);

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

<style scoped>
.skeleton-loader {
  width: 80%; 
  height: 50px; 
  margin: 10px 0;
}
</style>