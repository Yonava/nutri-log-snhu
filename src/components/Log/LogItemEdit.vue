<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/log"></ion-back-button>
        </ion-buttons>
        <ion-title>Edit Log Entry</ion-title>
      </ion-toolbar>
    </ion-header>
    this is the detail view for item {{ item }}
  </div>
</template>

<script>
import {
  IonBackButton,
  IonButtons,
  IonToolbar,
  IonTitle,
  IonHeader
} from '@ionic/vue'


export default {
  components: {
    IonBackButton,
    IonButtons,
    IonToolbar,
    IonTitle,
    IonHeader
  },
  computed: {
    item() {
      return this.$route.params.id
    }
  }
}
</script>