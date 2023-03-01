<template>
  <ion-page>
    <ion-content>
      <div>
        <ion-progress-bar
          v-if="loading"  
          type="indeterminate"
        ></ion-progress-bar>
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
  IonProgressBar,
} from '@ionic/vue';
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraPreview } from '@capacitor-community/camera-preview';
import { useRoute } from 'vue-router';

const route = useRoute();

const imageFrame = ref<string | undefined>(undefined);
const loading = ref(true);

watch(() => route.path, async (newVal: string, oldVal: string) => {
  if (newVal.includes('scan')) {
    loading.value = true;
    await startCameraPreview();
    loading.value = false;
  } else if (oldVal.includes('scan')) {
    await stopCameraPreview();
  }
});

onMounted(async () => {
  await startCameraPreview();
  loading.value = false;
});

async function startCameraPreview() {
  await CameraPreview.start({
    parent: 'cameraPreview',
    position: 'rear',
    width: innerWidth,
    height: innerHeight - 52,
    className: 'cameraPreview',
    enableHighResolution: true,
    disableAudio: true,
  });
}

async function stopCameraPreview() {
  await CameraPreview.stop();
}
</script>
