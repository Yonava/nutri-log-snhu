<template>
  <ion-item
    :class="removeItemsState ? '' : 'push-item'"
    :style="{ transition: 'all 0.2s ease-in-out', width: '113%' }"
    button
  >
    <ion-icon
      :icon="removeCircleOutline"
      @click.stop="removeItem(i)"
      slot="start"
      style="color: red"
    ></ion-icon>
    <div class="item-parent">
      <p style="margin: 0; font-size: 8pt">
        {{ toDateTimeString(item.dateAdded) }} |
        {{ item.calories }} cals |
        {{ item.macro.carbohydrates.total }}g carbs |
        {{ item.macro.protein }}g protein |
        {{ item.macro.fat.total }}g fat
      </p>
      <h2 style="text-transform: capitalize; margin: 0">
        {{ item.name }}
      </h2>
    </div>
  </ion-item>
</template>

<script lang="ts">
import { IonIcon, IonItem } from '@ionic/vue';
import { defineComponent } from 'vue';
import { removeCircleOutline, time } from 'ionicons/icons';

export default defineComponent({
  name: 'LogItem',
  components: { 
    IonIcon,
    IonItem 
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    removeItemsState: {
      type: Boolean,
      required: true,
    },
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
.push-item {
  transform: translateX(-12%);
}

.item-parent {
  display: flex;
  align-items: left;
  flex-direction: column;
  padding: 5px 0px;
}
</style>