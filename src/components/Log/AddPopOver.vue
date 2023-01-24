<template>
  <ion-content>
    <ion-item 
      @click="$router.push({ name: 'AddCatalog' })"
      button
    >
      <h5 class="title-tag">From Catalog</h5>
    </ion-item>
    <ion-item 
      @click="$router.push({ name: 'AddCustom' })"
      button
    >
      <h5 class="title-tag">Custom Item</h5>
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