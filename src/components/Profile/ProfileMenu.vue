<template>
  <ion-menu 
    content-id="home-tab-content" 
    menu-id="profile-menu"
  >
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="main-container">
        <div>
          <div 
            v-for="button in buttons"
            :key="button.text"
            class="center"
          >
            <ion-button class="nav-button">
              {{ button.text }}
            </ion-button>
          </div>
        </div>
        <div class="center">
          <ion-button 
            color="danger" 
            style="width: 90%"
          >Logout</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonTitle,
  IonMenu
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonToolbar,
    IonButton,
    IonTitle,
    IonMenu
  },
  setup() {
    const buttons = [
      { text: "Adjust Daily Targets" },
      { text: "Hide Calories" },
      { text: "Terms of Use" }
    ];

    return {
      buttons
    };
  }
});
</script>

<style scoped>
.nav-button {
  width: 90%;
  margin: 5px 0px 5px 0px;
}
.main-container {
  display: flex; 
  justify-content: space-between; 
  flex-direction: column;
  height: 100%;
  padding: 10px 0px 10px 0px;
}
</style>