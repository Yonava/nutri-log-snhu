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
      <div class="center">
        <ion-button 
          @click="$router.push({ name: 'Scan' })"
          expand="block"
        >
          Back To Scan
        </ion-button>
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
</script>