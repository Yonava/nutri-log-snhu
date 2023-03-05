<template>
  <ion-page>
    <ion-content class="scan-content"></ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage,
  IonContent,
  IonButton,
} from '@ionic/vue';
import { onMounted, watch } from 'vue';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
// import { CameraPreview } from '@capacitor-community/camera-preview';
import { useRoute, useRouter } from 'vue-router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const route = useRoute();
const router = useRouter();

watch(() => route.path, async (newVal: string, oldVal: string) => {
  if (newVal === '/tabs/scan') {
    startScan();
  } else if (oldVal === '/tabs/scan') {
    await BarcodeScanner.stopScan();
  }
});

onMounted(async () => {
  document.body.style.background = 'transparent';
  startScan();
});

async function startScan() {
  const result = await BarcodeScanner.startScan();
  router.push({
    name: 'BarcodeResults',
    query: {
      barcodeContent: result.content,
    },
  });
}
</script>

<style scoped>
ion-content.scan-content {
  --background: transparent;
}
</style>
