<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-back-button slot="start"></ion-back-button>
                <ion-title>Delete Account</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>...</ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle,
  IonPage,
  IonBackButton
} from '@ionic/vue';
import { menuController } from '@ionic/vue';

export default  defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
    IonBackButton
},
mounted() {
    menuController.close("app-menu")
}
});
</script>