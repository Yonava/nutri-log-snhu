<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>NutriLog Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Hi, Yona</ion-title>
        </ion-toolbar>
        <ion-button expand="block" @click="presentToast">Toast It!</ion-button>
        <input type="text" v-model="toastText">
      </ion-header>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { toastController } from '@ionic/vue';
import { ref } from 'vue';

export default  defineComponent({
  name: 'Tab1Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton },
  setup() {
    const toastText = ref('I am a piece of toast');
    return {
      toastText,
      async presentToast() {
        const toast = await toastController.create({
          message: toastText.value,
          duration: 3000,
          position: 'bottom',
        });
        toast.present();
      }
    }
  }
});
</script>
