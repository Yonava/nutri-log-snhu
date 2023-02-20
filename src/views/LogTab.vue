<template>
  <ion-page>
    <default-header title="Log" />
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Log
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <div 
        v-if="groupByDate.length === 0" 
        class="center"
      >
        <h2>
          No items logged
        </h2>
      </div>
      <div v-else>
        <ion-item-group 
          v-for="dateTag in groupByDate" 
          :key="dateTag.items"
        >
          <ion-item-divider 
            sticky="true"
            class="center"
          >
            <ion-label style="margin-top: 5px">
              {{ dateTag.date }}
            </ion-label>
          </ion-item-divider>

          <div 
            v-for="item in dateTag.items"
            :key="item"
          >
            <LogItem 
              :item="item"
              @click="itemClicked(item)"
              @remove-item="removeItem(item)"
            />
          </div>
        </ion-item-group>
      </div>
      <ion-fab 
        class="ion-padding" 
        vertical="bottom" 
        horizontal="end" 
        slot="fixed"
      >
        <ion-fab-button @click="$router.push({ name: 'AddCatalog' })">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import LogItem from '@/components/Log/LogItem.vue';
import { useStore } from 'vuex';
import { 
  IonPage,  
  IonContent, 
  IonButton, 
  IonIcon,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonFab,
  IonFabButton,
  IonList,
  IonItem,
  IonLabel,
  IonItemGroup,
  IonItemDivider
} from '@ionic/vue';
import { 
  arrowForward,
  add,
  remove,
  checkmarkOutline
} from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { LoggedItem } from '@/types/Log';
import { computed, ref } from 'vue';

const router = useRouter();
const store = useStore();

const deletedItemId = ref('');

function itemClicked(item: LoggedItem) {
  store.commit("setSelectedLogItem", item);
  router.push({ 
    name: 'LogEditDetail'
  });
}

async function removeItem(item: LoggedItem) {
  deletedItemId.value = item._id;
  await store.dispatch("deleteLoggedItem", item);
}

type DateTag = {
  date: string;
  items: LoggedItem[];
}

const groupByDate = computed(() => {
  const dates: DateTag[] = [];
  const log = store.getters.log;
  log.forEach((item: LoggedItem) => {
    const date = new Date(item.dateAdded);
    const todaysDate = new Date();
    let dateString = '';
    if (date.getDate() === todaysDate.getDate() &&
        date.getMonth() === todaysDate.getMonth() &&
        date.getFullYear() === todaysDate.getFullYear()) {
      dateString = 'Today';
    } else {
      dateString = date.toLocaleString([], {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }
    const dateIndex = dates.findIndex((d) => d.date === dateString);
    if (dateIndex === -1) {
      dates.push({
        date: dateString,
        items: [item]
      });
    } else {
      dates[dateIndex].items.push(item);
    }
  });
  return dates;
})
</script>
