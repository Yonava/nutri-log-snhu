<template>
  <div 
    style="transform: translateY(-40px)" 
    class="center"
  >
    <ion-button 
      @click="open"
      id="open-quicklog-modal"
      shape="round"
      style="margin: 20px; width: 92%"
    >
      Quick Log
    </ion-button>
    <ion-modal
      trigger="open-quicklog-modal"
      :backdropDismiss="true"
      :initial-breakpoint="0.3"
      :breakpoints="[0, 0.3, 0.6]"
    >
      <ion-content class="ion-padding">
        <div>
          <div style="display: flex; flex-direction: row; margin-bottom: 10px">
            <ion-icon
              @click="close"
              style="font-size: 1.5rem; margin-top: 5px; margin-right: 5px" 
              :icon="closeOutline"
            ></ion-icon>
            <h1 style="margin: 0; font-weight: 700;">
              Log Suggestions
            </h1>
            <ion-icon 
              @click="showInfo"
              style="font-size: 1.5rem; margin-top: 5px; margin-left: 10px" 
              color="primary" 
              :icon="informationCircleOutline"
            ></ion-icon>
          </div>
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
import { IonButton, IonModal, IonContent, IonChip, IonIcon } from "@ionic/vue";
import { informationCircleOutline, closeOutline } from "ionicons/icons";
import { ref } from "vue";
import { useStore } from "vuex";
import { LoggedItem } from "@/types/Log";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

const store = useStore();
const quickLog = ref<LoggedItem[]>([]);

const addItem = (item: LoggedItem) => {
  store.dispatch('postLoggedItem', item);
};

const showInfo = () => {
  store.commit('presentToast', {
    message: `Suggestions are personalized and based on a variety of factors, 
    including your most recent logs, 
    your most common logs, and time of day.`,
    duration: 7_500,
    position: 'bottom',
    icon: informationCircleOutline,
  })
};

const open = async () => {
  quickLog.value = store.getters.quickLog;
  await Haptics.impact({ style: ImpactStyle.Light });
};

const close = () => {
  const modal = document.querySelector('ion-modal');
  modal?.dismiss();
};
</script>