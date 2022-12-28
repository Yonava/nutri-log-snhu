<template>
  <ion-page>
    <video 
      ref="video" 
      autoplay 
    />
    <ion-select 
      style="position: absolute; top: 0; left: 0; width: 100%;"
      v-model="selectedCamera"
      @ionChange="switchCamera"
    >
      <ion-select-option 
        v-for="camera in cameras" 
        :key="camera.deviceId" 
        :value="camera"
        >{{ camera.label }}</ion-select-option>
    </ion-select>
  </ion-page>
</template>

<script>
import { IonPage, IonSelect, IonSelectOption } from '@ionic/vue';

export default {
  data() {
    return {
      stream: null,
      cameras: [],
      selectedCamera: null
    }
  },
  components: { IonPage, IonSelect, IonSelectOption },
  mounted() {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      this.cameras = devices.filter(device => device.kind === 'videoinput');
      this.selectedCamera = this.cameras[0];
      this.startCamera();
    });
  },
  beforeUnmount() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  },
  methods: {
    startCamera() {
      navigator.mediaDevices.getUserMedia({ video: { deviceId: this.selectedCamera.deviceId } }).then(stream => {
        this.stream = stream;
        this.$refs.video.srcObject = stream;
      });
    },
    switchCamera() {
      this.stream.getTracks().forEach(track => track.stop());
      this.startCamera();
    }
  }
}
</script>