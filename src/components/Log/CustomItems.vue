<template>
  <ion-page>
    <default-header title="Select Item">
      <template #left>
        <ion-back-button 
          text="Select Item"
          default-href="/"
        ></ion-back-button>
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
      <ion-list>
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
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonToolbar, IonTitle, IonPage, IonButton, IonBackButton, IonProgressBar, IonSearchbar, IonList, IonSkeletonText } from '@ionic/vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { LoggedItem } from '@/types/Log';
import LogItem from '@/components/Log/LogItem.vue';
 
const store = useStore();
const router = useRouter();
const customItems = computed(() => store.getters.customItems);

const editItem = (item: LoggedItem) => {
  store.commit('setSelectedLogItem', item);
  router.push({ name: 'LogEditDetail' });
}

</script>