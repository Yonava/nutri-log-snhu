<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Scan Stuff</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Scan</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="ion-padding">
        <ion-button @click="takePicture">Take Picture</ion-button>
        <img 
          v-if="imageFrame" 
          :src="imageFrame" 
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButton,
} from '@ionic/vue';
import { ref } from 'vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const imageFrame = ref<string | undefined>(undefined);

const takePicture = async () => {
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100
  });
  imageFrame.value = capturedPhoto.webPath;
}
</script>
