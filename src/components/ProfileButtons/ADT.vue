<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Adjust Daily Targets</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>Here you will adjust your calories,carbs,etc...</ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle
} from '@ionic/vue';

export default  defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle
},
});
</script>