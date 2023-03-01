<template>
  <div style="transform: translateY(-40px)" class="center">
    <ion-button 
      id="open-quicklog-modal"
      shape="round"
      style="margin: 20px; width: 92%"
    >
      <!-- <ion-icon slot="end" :icon="star"></ion-icon> -->
      Quick Log
    </ion-button>
    <ion-modal
      trigger="open-quicklog-modal"
      :initial-breakpoint="0.3"
      :breakpoints="[0, 0.3, 0.6, 0.9]"
    >
      <ion-content class="ion-padding">
        <div>
          <h1 style="margin-top: 0; font-weight: 700">
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
              {{ item.name }}
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
import { UnloggedItem } from "@/types/Log";

const store = useStore();
const quickLog = computed(() => store.getters.quickLog);
const addItem = (item: UnloggedItem) => {
  store.dispatch('postLoggedItem', item);
};
</script>