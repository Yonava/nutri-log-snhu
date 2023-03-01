<template>
  <ion-page>
    <ion-content>
      <div>
        <div id="cameraPreview"></div>
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
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraPreview } from '@capacitor-community/camera-preview';
import { useRoute } from 'vue-router';

const route = useRoute();

const imageFrame = ref<string | undefined>(undefined);

watchEffect(() => {
  if (route.path.includes('scan')) {
    startCameraPreview();
  } else {
    stopCameraPreview();
  }
});

async function startCameraPreview() {
  await CameraPreview.start({
    parent: 'cameraPreview',
    position: 'rear',
    toBack: true,
    width: window.innerWidth,
    height: window.innerHeight,
    className: 'cameraPreview',
  });
}

async function stopCameraPreview() {
  await CameraPreview.stop();
}
</script>
