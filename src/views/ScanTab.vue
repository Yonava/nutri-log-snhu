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
          <div 
            v-if="!relevantData.error"
            class="center"
          >
            <div style="display: flex; flex-direction: row;">
              <img 
                v-if="relevantData.image"
                :src="relevantData.image" 
                style="width: 100px; height: 100px; border-radius: 10px; object-fit: cover; margin-right: 10px;"
              />
              <h1 
                v-if="relevantData.name"
                style="margin: 0; font-weight: 700;"
              >
                {{ relevantData.name }}
              </h1>
              <h1
                v-else
                style="margin: 0; font-weight: 700;"
              >
                No name available for this product
              </h1>
            </div>
            <div style="width: 100%; background: rgba(255, 255, 255, 0.1); margin-top: 15px; border-radius: 5px; padding: 10px">
              <div style="font-weight: bold; font-size: 1.5rem">
                Nutrition Facts
              </div>
              <div 
                v-if="relevantData.nutrition['energy-kcal_serving']"
                style="margin-top: 5px;"
              >
                {{ relevantData.nutrition['energy-kcal_serving'] }} Calories -
                {{ Math.round(relevantData.nutrition.proteins_serving) }}g Protein -
                {{ Math.round(relevantData.nutrition.fat_serving) }}g Fat -
                 {{ Math.round(relevantData.nutrition['saturated-fat_serving']) }}g Saturated Fat - 
                {{ Math.round(relevantData.nutrition['trans-fat_serving']) }}g Trans Fat -
                {{ Math.round(relevantData.nutrition.carbohydrates_serving) }}g Carbs - 
                {{ Math.round(relevantData.nutrition.sugars_serving) }}g Sugars -
                {{ Math.round(relevantData.nutrition.fiber_serving) }}g Fiber -
                {{ Math.round(relevantData.nutrition.calcium_serving * 1000) }}mg Calcium - 
                {{ Math.round(relevantData.nutrition.iron_serving * 1000) }}mg Iron -
                {{ Math.round(relevantData.nutrition.sodium_serving * 1000) }}mg Sodium -
                {{ Math.round(relevantData.nutrition.cholesterol_serving * 1000) }}mg Cholesterol
              </div>
              <div v-else>
                No nutrition facts available
              </div>
            </div>
            <div style="width: 100%; max-height: 225px; overflow-y: auto; background: rgba(255, 255, 255, 0.175); margin-top: 15px; border-radius: 5px; padding: 10px">
              <div style="font-weight: bold; font-size: 1.5rem">
                Ingredients
              </div>
              <div 
                v-if="relevantData.ingredients"
                style="margin-top: 5px; font-size: 1rem"
              >
                {{ relevantData.ingredients }}
              </div>
              <div v-else>
                No ingredients available
              </div> 
            </div>
            <ion-button
              v-if="relevantData.name && relevantData.nutrition['energy-kcal_serving']"
              @click="addProductToLog"
              color="success"
              style="position: absolute; bottom: 50px; width: 92%;"
            >
              <ion-icon
                :icon="addOutline"
                style="margin-right: 5px;"
              ></ion-icon>
              Add to Log
            </ion-button>
          </div>
          <div v-else>
            <h1 style="font-weight: 700; text-align: center;">
              {{ relevantData.error }}
            </h1>
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
import { closeOutline, addOutline } from 'ionicons/icons';
import { onMounted, watch, ref } from 'vue';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraPreview } from '@capacitor-community/camera-preview';
import { useRoute, useRouter } from 'vue-router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { useStore } from 'vuex';
import { LoggedItem } from '@/types/Log';

const route = useRoute();
const router = useRouter();
const store = useStore();

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
    relevantData.value.error = 'We Apologize, But This Item Is Not In Our Database';
  } else {
    relevantData.value.nutrition = data.product.nutriments ?? null;
    relevantData.value.image = data.product.selected_images.front.display.en ?? null;
    relevantData.value.ingredients = data.product.ingredients_text_en ?? null; 
    relevantData.value.name = data.product.product_name_en ?? null;
  }
}

function addProductToLog() {
  store.dispatch('postLoggedItem', {
    name: relevantData.value.name,
    calories: relevantData.value.nutrition['energy-kcal_serving'],
    macro: {
      carbohydrates: {
        total: Math.round(relevantData.value.nutrition.carbohydrates_serving),
        added_sugars: 0,
        sugars: Math.round(relevantData.value.nutrition.sugars_serving),
      },
      fat: {
        total: Math.round(relevantData.value.nutrition.fat_serving),
        saturated: Math.round(relevantData.value.nutrition['saturated-fat_serving']),
        trans: Math.round(relevantData.value.nutrition['trans-fat_serving'])
      },
      protein: Math.round(relevantData.value.nutrition.proteins_serving),
      fiber: Math.round(relevantData.value.nutrition.fiber_serving),
      sodium: Math.round(relevantData.value.nutrition.sodium_serving * 1000),
      cholesterol: Math.round(relevantData.value.nutrition.cholesterol_serving * 1000),
      calcium: Math.round(relevantData.value.nutrition.calcium_serving * 1000),
      potassium: 0,
      iron: Math.round(relevantData.value.nutrition.iron_serving * 1000),
    }
  });
  closeModal();
}
</script>

<style scoped>
ion-content {
  --background: transparent;
}
</style>
