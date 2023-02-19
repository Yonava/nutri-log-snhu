<template>
  <ion-page>
    <default-header title="Log" />
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Log Entries
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
          :key="dateTag"
        >
          <ion-item-divider sticky="true">
            <ion-label>
              {{ dateTag.date }}
            </ion-label>
          </ion-item-divider>

          <TransitionGroup name="fade">
            <div 
              v-for="item in dateTag.items"
              :key="item._id"
            >
              <LogItem 
                :item="item"
                @click="itemClicked(item)"
                @remove-item="removeItem(item)"
              />
            </div>
          </TransitionGroup>
        </ion-item-group>
      </div>
      <!-- <div 
        v-if="items.length === 0" 
        class="center"
      >
        <h2>
          No items logged
        </h2>
      </div>
      <div>
        <TransitionGroup name="fade">
          <div
            v-for="i in items"
            :key="i"
          >
            <div v-if="i.name">
              <LogItem 
                :item="i"
                @click="itemClicked(i)"
                @remove-item="removeItem(i)"
              />
            </div>
          </div>
        </TransitionGroup>
      </div> -->
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
import { computed } from 'vue';

const router = useRouter();
const store = useStore();

function itemClicked(item: LoggedItem) {
  store.commit("setSelectedLogItem", item);
  router.push({ 
    name: 'LogEditDetail'
  });
}

function removeItem(item: LoggedItem) {
  store.dispatch("deleteLoggedItem", item);
}

type DateTag = {
  date: string;
  items: LoggedItem[];
}

const groupByDate = computed(() => {
  const dates: DateTag[] = [];
  const log = store.getters.log;
  console.log('recomputing')
  log.forEach((item: LoggedItem) => {
    const date = new Date(item.dateAdded);
    const dateString = date.toDateString();
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

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
