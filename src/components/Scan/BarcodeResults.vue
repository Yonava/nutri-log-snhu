<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{ $route.query.barcodeContent }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="center ion-padding">
        <ion-button 
          @click="$router.push({ name: 'Scan' })"
          expand="block"
        >
          Back To Scan
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

import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const relevantData = ref<any>({});

watch(() => route.query.barcodeContent, () => {
  getBarcodeData();
}, { immediate: true })

async function getBarcodeData() {
  const content = route.query.barcodeContent;
  console.log(content);
  const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${content}.json`);
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