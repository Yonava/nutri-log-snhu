<template>
  <ion-page>
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
            <ion-button>
              <ion-icon slot="icon-only" :icon="person"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>NutriLog SNHU</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="center">
        <div class="circle" :style="{ opacity: circleOpacity }"></div>
      </div>
      {{ circleOpacity }}
      <ion-button @click="circleOpacity = circleOpacity ? 0 : 1">toggle circle</ion-button>
      <ion-button class="center" router-link="/signin">Sign in</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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
  setup() {
    const circleOpacity = ref(1);
    return {
      circleOpacity,
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
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
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
