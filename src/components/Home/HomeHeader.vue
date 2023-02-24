<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="secondary">
        <ion-button @click="openMenu">
          <ion-icon 
            slot="icon-only" 
            size="large" 
            :icon="reorderThreeOutline"
          ></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="primary">
        <ion-button @click="openNotifs">
          <ion-icon 
            slot="icon-only" 
            :icon="notifications"
          ></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>
        NutriLog SNHU
      </ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonIcon, 
  IonTitle, 
} from "@ionic/vue";
import { 
  reorderThreeOutline, 
  notifications 
} from "ionicons/icons";
import { menuController } from "@ionic/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const openMenu = async () => {
  await menuController.open("profile-menu");
};

const openNotifs = () => {
  router.push({ name: "NotifPanel" })
}
</script>
