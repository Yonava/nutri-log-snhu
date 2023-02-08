<template>
  <div class="center">
    <div 
      :style="{ opacity: circleOpacity }"
      class="circle" 
    ></div>
  </div>
  {{ circleOpacity }}
  <ion-button @click="circleOpacity = circleOpacity ? 0 : 1"
    >toggle circle</ion-button
  >
  <ion-button class="center" router-link="/signin">{{
    $store.getters.isLoggedIn
      ? `Signed in as ${$store.getters.user.firstName} ${$store.getters.user.lastName}`
      : "Sign In"
  }}</ion-button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IonButton } from "@ionic/vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    IonButton,
  },
  setup() {
    const circleOpacity = ref(1);
    const store = useStore();
    return {
      circleOpacity,
      store,
    };
  },
});
</script>

<style scoped>
.circle {
  height: 300px;
  width: 300px;
  border: 35px solid #4caf50;
  background-color: transparent;
  border-radius: 50%;
  display: inline-block;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>