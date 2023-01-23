<template>
  <ion-content class="ion-padding">
    <ion-item 
      @click="$router.push({ name: 'AddCatalog' })"
      button
    >
      <h5 class="title-tag">from catalog</h5>
    </ion-item>
    <ion-item 
      @click="$router.push({ name: 'AddCustom' })"
      button
    >
      <h5 class="title-tag">custom item</h5>
    </ion-item>
  </ion-content>
</template>

<script lang="ts">
import { 
  IonContent, 
  IonItem
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddPopOver',
  components: { 
    IonContent, 
    IonItem
  },
});
</script>

<style scoped>
.title-tag {
  margin: 0;
}
</style>