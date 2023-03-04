<template>
  <ion-page ref="home-tab-content" id="home-tab-content">
    <HomeHeader />
    <HomeMain />
  </ion-page>
</template>

<script lang="ts">
import HomeHeader from "@/components/Home/HomeHeader.vue";
import HomeMain from "@/components/Home/HomeMain.vue";
import { defineComponent, ref } from "vue";
import {
  IonPage,
} from "@ionic/vue";
import { person, notifications } from "ionicons/icons";
export default defineComponent({
  components: {
    IonPage,
    HomeHeader,
    HomeMain,
  },
  setup() {
    const circleOpacity = ref(1);
    return {
      circleOpacity,
      person,
      notifications,
    };
  },
});
</script>