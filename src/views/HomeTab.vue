<template>
  <ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="home"></ion-back-button>
        </ion-buttons>
          <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
      <ion-content class="ion-padding">
        <ion-button expand="block">Adjust Daily Targets</ion-button>
        <ion-button expand="block">Hide Calories</ion-button>
        <ion-button expand="block">Terms of Use</ion-button>
        <ion-button expand="block">Delete Account</ion-button>
      </ion-content>
  </ion-menu>
  <ion-page id="main-content">
    <ion-content 
      :force-overscroll="false" 
      :fullscreen="true"
    >
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="secondary">
            <ion-button>
              <ion-icon slot="icon-only" :icon="notifications"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="primary">
            <ion-menu-toggle>
              <ion-button>
                <ion-icon slot="icon-only" :icon="person"></ion-icon>
              </ion-button>
            </ion-menu-toggle>
          </ion-buttons>
          <ion-title>NutriLog SNHU</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="center">
        <div class="circle"></div>
      </div>
      <ion-button class="center" router-link="/signin">Sign in</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
  IonPage, 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonIcon,
  IonButtons,
  IonButton,
  IonTitle,
  IonMenu,
  IonMenuToggle,
  IonBackButton
} from '@ionic/vue';
import { 
  person, 
  notifications 
} from 'ionicons/icons';

export default  defineComponent({
  components: {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonIcon,
    IonButtons,
    IonButton,
    IonTitle,
    IonMenu,
    IonMenuToggle,
    IonBackButton
},
  setup() {
    return {
      person,
      notifications,
    }
  }
});
</script>

<style scoped>
.circle {
  height: 300px;
  width: 300px;
  border: 35px solid #4CAF50;
  background-color: transparent;
  border-radius: 50%;
  display: inline-block;
}

.icon {
  font-size: 30px;
  margin: 0 15px;
}

.page {
  overflow: hidden;
}

.logo {
  font-size: 30px;
  font-weight: 800;
}
</style>
