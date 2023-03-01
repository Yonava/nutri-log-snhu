<template>
  <ion-page>
    <ion-content>
      <div>
        <ion-progress-bar
          v-if="loading"  
          type="indeterminate"
        ></ion-progress-bar>
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
  IonProgressBar,
} from '@ionic/vue';
import { ref, onMounted, onUnmounted, watch } from 'vue';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraPreview } from '@capacitor-community/camera-preview';
import { useRoute } from 'vue-router';

const route = useRoute();

const imageFrame = ref<string | undefined>(undefined);
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
    parent: 'app',
    position: 'rear',
    width: window.innerWidth,
    height: window.innerHeight - 52,
    disableAudio: true,
  });
  capture.value = setInterval(async () => {
    const image = await CameraPreview.capture({ 
      quality: 2,
    });
    console.log('Picture taken');
    imageFrame.value = 'data:image/jpeg;base64,' + image.value;
  }, 50);
}

async function stopCameraPreview() {
  clearInterval(capture.value);
  await CameraPreview.stop();
}
</script>
