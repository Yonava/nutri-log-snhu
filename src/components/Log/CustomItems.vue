<template>
  <ion-page>
    <default-header title="Custom Items">
      <template #left>
        <ion-back-button 
          text="Select Item"
          default-href="/"
        ></ion-back-button>
      </template>
      <template #right>
        <ion-button 
          @click="addItem"
          fill="clear"
        >
          Add Item
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-button>
      </template>
    </default-header>
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Custom Items
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list v-if="customItems.length > 0">
        <div 
          v-for="item in customItems"
          :key="item"
        >
          <LogItem 
            :item="item"
            @click="editItem(item)"
            @remove-item="removeItem(item)"
          />
        </div>
      </ion-list>
      <h2 
        v-else
        style="text-align: center;" 
      >
        No Custom Items
      </h2>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonToolbar, IonTitle, IonPage, IonButton, IonBackButton, IonList, IonIcon } from '@ionic/vue';
import { addOutline } from 'ionicons/icons';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { CustomItem, UnloggedItem } from '@/types/Log';
import LogItem from '@/components/Log/LogItem.vue';
 
const store = useStore();
const router = useRouter();
const customItems = computed(() => store.getters.customItems);

const editItem = (item: UnloggedItem) => {
  store.commit('setSelectedLogItem', item);
  router.push({ name: 'LogEditDetail', 
    query: { 
      dispatchTo: 'updateCustomItem' 
    } 
  });
}

const addItem = () => {
  store.commit('setSelectedLogItem', emptyItem);
  router.push({ name: 'LogEditDetail', 
    query: { 
      dispatchTo: 'postCustomItem' 
    } 
  });
}

const removeItem = (item: UnloggedItem) => {
  store.dispatch('deleteCustomItem', item);
}

const emptyItem: CustomItem = {
  name: '',
  calories: 0,
  macro: {
    carbohydrates: {
      total: 0,
      added_sugars: 0,
      sugars: 0,
    },
    fat: {
      total: 0,
      saturated: 0,
      trans: 0,
    },
    protein: 0,
    fiber: 0,
    sodium: 0,
    cholesterol: 0,
    calcium: 0,
    potassium: 0,
    iron: 0,
  }
}
</script>