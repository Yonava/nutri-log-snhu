<template>
  <ion-page>
    <video ref="video" autoplay="true" style="width: 100vw; height: 100vh" />
  </ion-page>
</template>

<script>
import { IonPage } from '@ionic/vue';

export default {
  data() {
    return {
      stream: null
    }
  },
  components: { IonPage },
  mounted() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.stream = stream;
      this.$refs.video.srcObject = stream;
    });
  },
  beforeUnmount() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }
}
</script>