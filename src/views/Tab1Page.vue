<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>NutriLog</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Hi, Yona</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="center" style="height: 70%; width: 100%; background: green">
      <!-- <div class="progress-circle center" style="flex-direction: column">
        <h1 style="font-size: 30pt">4,503</h1>
        <p style="margin: 0">Calories</p>
      </div> -->
    </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { toastController } from '@ionic/vue';
import { ref } from 'vue';

export default  defineComponent({
  name: 'Tab1Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  setup() {
    const toastText = ref('I am a piece of toast');
    return {
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
.progress-circle {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 20px solid var(--ion-color-primary);
  background-color: var(--ion-color-secondary);
  position: relative;
  margin: 0 auto;
}
</style>
