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
        {{ timeStamp.toLocaleTimeString([], { timeStyle: 'short' }) }} |
        {{ item.calories }} cals |
        43g carbs |
        43g protein |
        43g fat
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
import { removeCircleOutline } from 'ionicons/icons';
import { Item } from '@/components/Log/Types';

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
    const removeItem = (i: Item) => {
      emit('remove-item', i);
    };

    const timeStamp = new Date();

    return {
      timeStamp,
      removeCircleOutline,
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