<template>
  <ion-page id="scan-tab-content">
    <ion-content class="scan-content">
      <ion-modal
        trigger="open-modal"
        id="product-display-modal"
        :presenting-element="presentingElement"
      >
        <ion-content>
          <div class="center">
            <ion-button
              @click="closeModal"
              id="close-modal"
              shape="round"
              color="danger"
              style="margin: 20px; width: 92%"
            >
              Close
            </ion-button>
            <img :src="relevantData.image" />
            <code style="width: 90%">
              {{ relevantData.nutrition }}
              ______________________________________
              {{ relevantData.ingredients }}
              ______________________________________
              {{ relevantData.name }}
            </code>
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage,
  IonContent,
  IonButton,
  IonModal
} from '@ionic/vue';
import { onMounted, watch, ref } from 'vue';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraPreview } from '@capacitor-community/camera-preview';
import { useRoute, useRouter } from 'vue-router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const route = useRoute();
const router = useRouter();
const barcodeContent = ref<string>('');
const relevantData = ref<any>({});
const presentingElement = ref<HTMLElement>();
const productModal = ref<HTMLElement>();

async function startCameraPreview() {
  console.log('starting camera preview')
  await CameraPreview.start({
    parent: 'scan-tab-content',
    position: 'rear',
    toBack: true,
    width: window.innerWidth,
    height: window.innerHeight - 52,
    disableAudio: true,
  });
}

watch(() => route.path, async (newVal: string, oldVal: string) => {
  if (newVal === '/tabs/scan') {
    await startCameraPreview();
    startScan();
  } else if (oldVal === '/tabs/scan') {
    await BarcodeScanner.stopScan();
    await CameraPreview.stop();
  }
});

onMounted(() => {
  document.body.style.background = 'transparent';
  presentingElement.value = document.getElementById('scan-tab-content') as HTMLElement;
  startScan();
});

async function startScan() {
  const result = await BarcodeScanner.startScan();
  if (!result.content) return;
  barcodeContent.value = result.content;
  await getBarcodeData();
  await BarcodeScanner.stopScan();
  // open product modal
  productModal.value = document.getElementById('product-display-modal')!;
  // ts-expect-error for now we just want to get the modal to open
  productModal.value.present();
}

async function closeModal() {
  productModal.value = document.getElementById('product-display-modal')!;
  // ts-expect-error for now we just want to get the modal to open
  productModal.value.dismiss();
  setTimeout(() => {
    startScan();
  }, 2000);
}

async function getBarcodeData() {
  const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcodeContent.value}.json`);
  const data = await res.json();
  relevantData.value = {};
  if (data.status === 0) {
    relevantData.value.error = 'No food product found';
  } else {
    relevantData.value.nutrition = data.product.nutriments ?? null;
    relevantData.value.image = data.product.selected_images.front.display.en ?? null;
    relevantData.value.ingredients = data.product.ingredients_text_en ?? null; 
    relevantData.value.name = data.product.product_name_en ?? null;
  }
}
</script>

<style scoped>
ion-content.scan-content {
  --background: transparent;
}
</style>
