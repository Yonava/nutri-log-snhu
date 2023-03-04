<template>
  <ion-page>
    <default-header title="Select Item">
      <template #left>
        <ion-back-button 
          text="Log"
          default-href="/tabs/log"
        ></ion-back-button>
      </template>
      <template #right>
        <ion-button 
          fill="clear" 
          @click="$router.push({ name: 'CustomItems' })"
        >
          Custom Items
        </ion-button>
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
        style="margin-bottom: 50px"
      >
        <div 
          v-for="item in quickAddCategories"
          :key="item"
        >
          <div>
            <QuickAdd 
              v-if="item.items().length > 0"
              :title="item.title"
              :items="item.items()"
            />
          </div>
        </div>
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
  IonButton,
} from '@ionic/vue';
import { 
  computed, 
  ref,
  onMounted,
  watch,
} from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { LoggedItem, UnloggedItem } from '@/types/Log'
import CatalogSearch from '@/components/Log/CatalogSearch.vue'
import QuickAdd from '@/components/Log/QuickAdd.vue'
import { getMealPeriod } from '@/utils/GetMeal';

const store = useStore();
const route = useRoute();

const loading = ref(true);
const searching = ref(false);
const searchQuery = ref('');
const recentItems = ref<LoggedItem[]>([]);
let suggestedItems: LoggedItem[] = [];

type QuickAddCategory = {
  title: string;
  items: () => UnloggedItem[] | LoggedItem[];
}

const quickAddCategories = ref<QuickAddCategory[]>([
  {
    title: 'Suggested For You',
    items: () => suggestedItems
  },
  {
    title: 'Recently Added',
    items: () => recentItems.value,
  },
  {
    title: 'Your Custom Items',
    items: () => {
      const output: LoggedItem[] = [];
      const customItems = store.getters.customItems;
      customItems.forEach((item: LoggedItem) => {
        output.push(item);
      });
      
      return output;
    }
  },
  {
    // temp patch job to get around snack + late night miscategorization
    title: `Popular For ${getMealPeriod() === 'snack' ? 'Late Night' : getMealPeriod()}`,
    items: () => {
      const items = store.getters.catalog;
      const maxPopularItems = 5;
      const output: UnloggedItem[] = [];
      items.forEach((item: UnloggedItem) => {
        if (output.length === maxPopularItems) return;
        if (item.time === getMealPeriod()) {
          output.push(item);
        }
      });

      return output;
    }
  }
]);

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

  refreshRecentItems();
  
  if (store.getters.quickLog.length > 5) {
    suggestedItems = store.getters.quickLog.slice(0, 5);
  } else {
    suggestedItems = store.getters.quickLog;
  }
});

const searchableItems = computed(() => {
  return store.getters.catalog.concat(store.getters.customItems);
});

const searchResults = computed(() => {
  if (searchQuery.value === '') return [];
  const output: UnloggedItem[] = [];
  for (let i = 0; i < searchableItems.value.length; i++) {
    const item = searchableItems.value[i];
    if (item.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      output.push(item);
    }
  }
  
  return output;
});

function refreshRecentItems() {
  const maxRefreshItems = 5;
  for (const item in store.getters.log) {
    if (recentItems.value.length === maxRefreshItems) break;
    if (recentItems.value.findIndex(
      (i: LoggedItem) => i.name === store.getters.log[item].name) !== -1
    ) continue;
    recentItems.value.push(store.getters.log[item]);
  }
}

watch(() => route.path, async (newVal: string) => {
  if (newVal.includes('addCatalog')) {
    refreshRecentItems();
  }
}, { immediate: true });
</script>

<style scoped>
.skeleton-loader {
  width: 80%; 
  height: 50px; 
  margin: 10px 0;
}
</style>