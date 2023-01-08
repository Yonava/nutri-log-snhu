<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <h1 class="logo">NutriLog SNHU</h1>
          <ion-icon :icon="person" />
          <ion-icon :icon="notifications" />
        </ion-toolbar>
      </ion-header>
      <div class="center">
        <div class="circle"></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonHeader, IonToolbar, IonIcon } from '@ionic/vue';
import { person, notifications } from 'ionicons/icons';
import { toastController } from '@ionic/vue';
import { ref } from 'vue';

export default  defineComponent({
  name: 'Tab1Page',
  components: { IonContent, IonPage, IonHeader, IonToolbar, IonIcon },
  setup() {
    const toastText = ref('I am a piece of toast');
    return {
      person,
      notifications,
      toastText,
      async presentToast() {
        const toast = await toastController.create({
          message: toastText.value,
          duration: 3000,
          position: 'top',
        });
        toast.present();
      }
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

ion-toolbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.logo {
  margin-left: 10px;
  font-size: 30px;
  font-weight: 900;
  color: #000;
}
</style>
