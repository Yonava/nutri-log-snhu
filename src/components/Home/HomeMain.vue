<template>
  <ion-content content-id="home-tab-content">
    <div class="center">
    <div 
      @click="randomPercent" 
      class="center"
      style="width: 100%; height: 350px;"
    >
      <CircularProgress :percent="percent" />
    </div>
    </div>
    Calories: {{ $store.getters.todaysCalorieData }}
    Carbs: {{ $store.getters.todaysCarbData }}
    Protein: {{ $store.getters.todaysProteinData }}
    Fat: {{ $store.getters.todaysFatData }}
    Sugar: {{ $store.getters.todaysSugarData }}
    <ion-button class="center" router-link="/signin">{{
      $store.getters.isLoggedIn
        ? `Signed in as ${$store.getters.user.firstName} ${$store.getters.user.lastName}`
        : "Sign In"
    }}</ion-button>
  </ion-content>
</template>

<script>
import { defineComponent, ref } from "vue";
import { 
  IonButton,
  IonContent,
} from "@ionic/vue";
import CircularProgress from "@/components/Home/CircularProgress.vue";

export default defineComponent({
  components: {
    IonButton,
    IonContent,
    CircularProgress,
  },
  setup() {

    const percent = ref(0);
    
    function randomPercent() {
      return percent.value = Math.floor(Math.random() * 100);
    }

    return {
      randomPercent,
      percent,
    };
  },
});
</script>

<style scoped>
ion-content {
  --overflow: hidden;
}
</style>