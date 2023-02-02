<template>
  <ion-page class="main">
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
              <ion-button @click="openMenu()">
                <ion-icon slot="icon-only" :icon="person"></ion-icon>
              </ion-button>
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
  IonTitle
} from '@ionic/vue';
import { 
  person, 
  notifications 
} from 'ionicons/icons';
import { menuController } from '@ionic/vue';

export default  defineComponent({
  components: {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonIcon,
    IonButtons,
    IonButton,
    IonTitle
},
methods:{
openMenu() {
  menuController.open("app-menu")
}
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
