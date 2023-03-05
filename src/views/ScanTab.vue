<template>
  <ion-page id="scan-tab-content">
    <ion-content class="scan-content">
      <ion-modal
        @didDismiss="startScan"
        trigger="open-modal"
        id="product-display-modal"
        :initial-breakpoint="0.95"
        :breakpoints="[0, 0.95]"
      >
        <ion-content class="ion-padding">
          <div class="center">
            <div style="display: flex; flex-direction: row;">
              <img 
                :src="relevantData.image" 
                style="width: 100px; height: 100px; border-radius: 10px; object-fit: cover; margin-right: 10px;"
              />
              <h1 style="margin: 0; font-weight: 700;">
                {{ relevantData.name }}
              </h1>
            </div>
            <div style="width: 100%; background: rgba(255, 255, 255, 0.1); margin-top: 15px; border-radius: 5px; padding: 10px">
              <div style="font-weight: bold; font-size: 2rem">
                Nutrition Facts
              </div>
              <div style="margin-top: 5px;">
                {{ relevantData.nutrition.fat_serving }}g Fat
                {{ relevantData.nutrition.carbs_serving }}g Carbs
                {{ relevantData.nutrition.protein_serving }}g Protein
                {{ relevantData.nutrition.calcium_serving }}g Calcium
                {{ relevantData.nutrition.iron_serving * 1000 }}mg Iron
              </div>
            </div>
            <code style="width: 90%">
              {{ relevantData.nutrition }}
              <!-- ______________________________________
              {{ relevantData.ingredients }}
              ______________________________________
              {{ relevantData.name }} -->
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
  IonModal,
  alertController,
  IonIcon
} from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';
import { onMounted, watch, ref } from 'vue';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraPreview } from '@capacitor-community/camera-preview';
import { useRoute, useRouter } from 'vue-router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const route = useRoute();
const router = useRouter();
const barcodeContent = ref<string>('');
const relevantData = ref<any>({});
const productModal = ref<any>();

async function startPreview() {
  await CameraPreview.start({
    parent: 'camera-preview',
    position: 'rear',
    toBack: true,
    disableAudio: true,
    width: window.innerWidth,
    height: window.innerHeight - 52,
  });
}

async function stopPreview() {
  await CameraPreview.stop();
}

watch(() => route.path, async (newVal: string, oldVal: string) => {
  if (newVal === '/tabs/scan') {
    document.body.style.background = 'transparent';
    startScan();
  } else if (oldVal === '/tabs/scan') {
    await BarcodeScanner.stopScan();
    document.body.style.background = '';
  }
});

onMounted(async () => {
  document.body.style.background = 'transparent';
  productModal.value = document.getElementById('product-display-modal')!;
  startScan();
});

async function startScan() {
  const result = await BarcodeScanner.startScan();
  if (!result.content) return; 
  barcodeContent.value = result.content;
  startScan();
  // ts-expect-error for now we just want to get the modal to open
  await getBarcodeData();
  productModal.value.present();
}

async function closeModal() {
  productModal.value.dismiss();
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
ion-content {
  --background: transparent;
}
</style>
