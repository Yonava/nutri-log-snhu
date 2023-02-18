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
            :style="itemStyle(i)"
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
} from '@ionic/vue';
import { 
  arrowForward,
  add,
  remove,
  checkmarkOutline
} from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { 
  LoggedItem, 
  DateTag 
} from '@/types/Log';

const router = useRouter();
const store = useStore();

const items = store.getters.log;

function itemClicked(item: LoggedItem) {
  store.commit("setSelectedLogItem", item);
  router.push({ 
    name: 'LogEditDetail'
  });
}

function removeItem(item: LoggedItem) {
  store.dispatch("deleteLoggedItem", item);
}

function itemStyle(item: LoggedItem | DateTag) {
  if ('month' in item) {
    return { position: 'sticky', top: 0, zIndex: 2 };
  } else {
    return {};
  }
}
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

.date-item-parent {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  background: linear-gradient(var(--ion-color-primary), var(--ion-color-tertiary-shade));
  padding: 7px 0px;
}
</style>
