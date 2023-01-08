<template>
  <ion-page>
    <ion-content :force-overscroll="false" :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <div class="toolbar-container">
            <h1 class="logo">NutriLog SNHU</h1>
            <div>
              <ion-icon 
                class="icon"
                :icon="notifications" 
              />
              <ion-icon 
                class="icon"
                :icon="person" 
              />
            </div>
          </div>
        </ion-toolbar>
      </ion-header>
      <div class="center">
        <div class="circle"></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonHeader, IonToolbar, IonIcon } from '@ionic/vue';
import { person, notifications } from 'ionicons/icons';
import { toastController } from '@ionic/vue';
import { ref } from 'vue';

export default  defineComponent({
  name: 'Tab1Page',
  components: { IonContent, IonPage, IonHeader, IonToolbar, IonIcon },
  setup() {
    const toastText = ref('I am a piece of toast');
    return {
      person,
      notifications,
      toastText,
      async presentToast() {
        const toast = await toastController.create({
          message: toastText.value,
          duration: 3000,
          position: 'top',
        });
        toast.present();
      }
    }
  }
});
</script>

<style scoped>
.circle {
  height: 300px;
  width: 300px;
  border: 35px solid #4CAF50;
  background-color: transparent;
  border-radius: 50%;
  display: inline-block;
}

.toolbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  text-align: center;
  flex-direction: row;
  margin: 0 10px;
}

.icon {
  font-size: 30px;
  margin: 0 15px;
}

.page {
  overflow: hidden;
}

.logo {
  font-size: 30px;
  font-weight: 800;
}
</style>
