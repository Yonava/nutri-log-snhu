<template>
  <ion-page>
    <ion-content class="scan-content">
      <!-- <div>
        <img 
          :src="imageFrame" 
          style="width: 100px; height: 150px; position: fixed; z-index: 99; top: 0; right: 0; border: 1px solid red; object-fit: cover;"
        />
        <div id="camera-feedback"></div>
      </div> -->
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
// import { CameraPreview } from '@capacitor-community/camera-preview';
import { useRoute, useRouter } from 'vue-router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { star } from 'ionicons/icons';

const route = useRoute();
const router = useRouter();

// const imageFrame = ref<string | undefined>(undefined);
// const stillFrame = ref<string | undefined>(undefined);
// const capture = ref<any>(undefined);

watch(() => route.path, async (newVal: string, oldVal: string) => {
  if (newVal.includes('scan')) {
    document.body.style.background = 'transparent';
    setTimeout(() => {
      startScan();
    }, 1000);
  } else if (oldVal.includes('scan')) {
    document.body.style.background = '';
    stopScan();
  }
});

onMounted(async () => {
  document.body.style.background = 'transparent';
  startScan();
});

// async function startCameraPreview() {
//   console.log('startCameraPreview')
//   await CameraPreview.start({
//     parent: "camera-feedback",
//     position: "rear",
//     width: innerWidth,
//     height: innerHeight - 52,
//     disableAudio: true,
//     toBack: true,
//   });
//   capture.value = setInterval(async () => {
//     const image = await CameraPreview.capture({ 
//       quality: 2,
//     });
//     imageFrame.value = 'data:image/jpeg;base64,' + image.value;
//   }, 3000);
// }

// async function stopCameraPreview() {
//   clearInterval(capture.value);
//   await CameraPreview.stop();
// }

async function startScan() {
  const result = await BarcodeScanner.startScan();
  console.log('Barcode data', result);
  router.push({
    name: 'BarcodeResults',
    query: {
      barcodeContent: result.content,
    },
  });
  stopScan();
}

async function stopScan() {
  await BarcodeScanner.stopScan();
}
</script>

<style scoped>
ion-content.scan-content {
  --background: transparent;
}
</style>
