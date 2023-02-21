<template>
  <div class="center ion-padding">
    <ion-button 
      id="open-quicklog-modal"
      shape="round"
      style="width: 100%; margin-bottom: 10px;  "
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
          <h1 style="margin-top: 0; font-weight: 700">
            Log Suggestions
          </h1>
          <div>
            <ion-chip 
              v-for="item in quickLog"
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
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const quickLog = computed(() => store.getters.quickLog);
</script>