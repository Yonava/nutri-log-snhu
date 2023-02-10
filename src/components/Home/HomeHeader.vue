<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="secondary">
        <ion-button>
          <ion-icon slot="icon-only" :icon="notifications"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="primary">
        <ion-button @click="openMenu">
          <ion-icon slot="icon-only" :icon="person"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>NutriLog SNHU</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonIcon, 
  IonTitle, 
} from "@ionic/vue";
import { 
  person, 
  notifications 
} from "ionicons/icons";
import { menuController } from "@ionic/vue";

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
  },
  setup() {
    const openMenu = async () => {
      await menuController.open("profile-menu");
    };
    return {
      openMenu,
      person,
      notifications,
    };
  },
});
</script>
