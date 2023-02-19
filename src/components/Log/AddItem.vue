<template>
  <ion-item 
    @click="goToDetail(item)"
    button
  >
    <ion-icon 
      @click.stop="addItem(item)"
      :icon="itemIcon" 
      color="success" 
      slot="start"
    ></ion-icon>
    <ion-label>
      {{ item.name }}
    </ion-label>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonIcon, IonLabel } from '@ionic/vue';
import { addCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { defineProps, ref, computed } from 'vue';
import { UnloggedItem } from '@/types/Log';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const itemAdded = ref(false);

defineProps<{
  item: UnloggedItem;
}>();

function addItem(item: UnloggedItem) {
  store.dispatch("postLoggedItem", item);
  itemAdded.value = true;
  setTimeout(() => {
    itemAdded.value = false;
  }, 3000);
}

function goToDetail(item: UnloggedItem) {
  store.commit('setSelectedCatalogItem', item);
  router.push('/tabs/log/addCatalog/detail');
}

const itemIcon = computed(() => {
  return itemAdded.value ? checkmarkCircleOutline : addCircleOutline;
});
</script>