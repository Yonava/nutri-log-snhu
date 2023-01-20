<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button>
            add
            <ion-icon slot="start" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Log</ion-title>
        <ion-buttons slot="start">
          <ion-button>
            remove
            <ion-icon slot="start" :icon="remove"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Log Entries</ion-title>
        </ion-toolbar>
      </ion-header>
        <ion-item
          v-for="i in 40" 
          :key="i"
          :router-link="{ path: `/tabs/log/edit/${i}` }"
        >
          item {{ i }}
        </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonButtons,
  IonItem,
  IonIcon,
} from '@ionic/vue';
import { 
  arrowForward,
  add,
  remove
} from 'ionicons/icons';

export default defineComponent({
  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonPage, 
    IonButton, 
    IonButtons,
    IonItem,
    IonIcon
  },
  setup() {
    return {
      arrowForward,
      add,
      remove
    }
  }
});
</script>
