<template>
    <ion-page>
        <ion-content
            :force-overscroll="false"
            :fullscreen="true"
        >
            <ion-header>
                <ion-toolbar>
                    <ion-title>NutriLog SNHU</ion-title>
                </ion-toolbar>
            </ion-header>

            <div class="center">
                <div class="sign-in-box">
                    <span id="sign-in-text">Sign In</span>
                    <ion-button color="danger" class="sign-in-btn">Sign In with Google</ion-button>
                    <ion-button color="primary" class="sign-in-btn">Sign In with Facebook</ion-button>
                    <ion-button color="dark" class="sign-in-btn">Sign In with Apple</ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import {
    IonPage,
    IonContent,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonButton
} from '@ionic/vue';

export default defineComponent({
    components: {
        IonPage,
        IonContent,
        IonToolbar,
        IonHeader,
        IonTitle,
        IonButton
    },
    setup() {
        return {
        }
    }
});

</script>

<style scoped>
  ion-toolbar {
    --opacity: 0.0;
  }

  .sign-in-box {
    background-color: #f0f0f0;
    border-radius: 10px;
    border-width: 4px;
    margin-top: 25vh;
    height: 240px;
    width: 300px;
  }

    #sign-in-text {
        font-size: 20px;
        color: #000000;
        font-weight: bold;
        margin-top: 100px;
        margin-left: 115px;
    }

    .sign-in-btn {
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        width: 260px;
    }
</style>