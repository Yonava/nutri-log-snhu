<template>
  <ion-page>
    <ion-content class="camera-preview-content">
      <div>
        <ion-progress-bar
          v-if="loading"  
          type="indeterminate"
        ></ion-progress-bar>
        <img 
          :src="imageFrame" 
          style="width: 100px; height: 150px; position: fixed; z-index: 99; top: 0; right: 0; border: 1px solid red; object-fit: cover;"
        />
        <div style="z-index: 1" id="camera-feedback"></div>
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
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraPreview } from '@capacitor-community/camera-preview';
import { useRoute } from 'vue-router';

const route = useRoute();

const imageFrame = ref<string | undefined>(undefined);
const stillFrame = ref<string | undefined>(undefined);
const loading = ref(true);
const capture = ref<any>(undefined);

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
    parent: "camera-feedback",
    position: "rear",
    width: innerWidth,
    height: innerHeight - 52,
    disableAudio: true,
    toBack: true,
  });
  capture.value = setInterval(async () => {
    const image = await CameraPreview.capture({ 
      quality: 2,
    });
    imageFrame.value = 'data:image/jpeg;base64,' + image.value;
  }, 1000);
}

async function stopCameraPreview() {
  clearInterval(capture.value);
  await CameraPreview.stop();
}
</script>

<style>
body {
  background: transparent !important;
}
ion-content {
  --background: transparent !important;
}
</style>
