<template>
  <div 
    style="transform: translateY(-40px)" 
    class="center"
  >
    <ion-button 
      id="open-quicklog-modal"
      shape="round"
      style="margin: 20px; width: 92%"
    >
      Quick Log
    </ion-button>
    <ion-modal
      trigger="open-quicklog-modal"
      :initial-breakpoint="0.3"
      :breakpoints="[0, 0.3, 0.6]"
    >
      <ion-content class="ion-padding">
        <div>
          <h1 style="margin-top: 0; font-weight: 700;">
            Log Suggestions
          </h1>
          <div>
            <ion-chip 
              v-for="item in quickLog"
              @click="addItem(item)"
              :key="item"
              :outline="true"
              style="margin-left: 0; margin-right: 5px; margin-bottom: 5px;"
            >
              {{ item }}
            </ion-chip>
          </div>
        </div>
      </ion-content>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { IonButton, IonModal, IonContent, IonChip } from "@ionic/vue";
import { star } from "ionicons/icons";
import { computed } from "vue";
import { useStore } from "vuex";
import { LoggedItem } from "@/types/Log";

const store = useStore();
const quickLog = computed(() => store.getters.quickLog);
const addItem = (item: string) => {
  const fullItem = store.getters.log.find(
    (i: LoggedItem) => i.name === item
  );
  if (!fullItem) {
    return store.commit('presentToast', {
      message: 'Item not found',
      color: 'danger'
    })
  }
  store.dispatch('postLoggedItem', fullItem);
};
</script>