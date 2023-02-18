<template>
  <ion-item-sliding>
    <ion-item button>
      <div class="item-parent">
        <p style="margin: 0; font-size: 8pt">
          {{ toDateTimeString(item.dateAdded) }} |
          {{ item.calories }} cals |
          {{ item.macro.carbohydrates.total }}g carbs |
          {{ item.macro.protein }}g protein |
          {{ item.macro.fat.total }}g fat
        </p>
        <h2 style="text-transform: capitalize; margin: 0; width: 95%">
          {{ item.name }}
        </h2>
      </div>
    </ion-item>
    <ion-item-options side="start">
      <ion-item-option 
        color="danger" 
        @click.stop="removeItem(i)"
      >
        <ion-icon :icon="removeCircleOutline"></ion-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script lang="ts">
import { 
  IonIcon, 
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { removeCircleOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'LogItem',
  components: { 
    IonIcon,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
  },
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  emits: [
    'remove-item', 
    'item-clicked'
  ],
  setup(props, { emit }) {
    const removeItem = (i: any) => {
      emit('remove-item', i);
    };

    const toDateTimeString = (date: Date) => {
      const timeStamp = new Date(date);
      return timeStamp.toLocaleTimeString([], { timeStyle: 'short' });
    };
    
    return {
      removeCircleOutline,
      toDateTimeString,
      removeItem,
    };
  },
});
</script>

<style scoped>
.item-parent {
  display: flex;
  align-items: left;
  flex-direction: column;
  padding: 5px 0px;
}
</style>