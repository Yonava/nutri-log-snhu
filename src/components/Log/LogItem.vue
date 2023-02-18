<template>
  <ion-item-sliding>
    <ion-item button>
      <div class="item-parent">
        <div class="chip-container">
          <div 
            v-for="chip in chips"
            :key="chip"
            class="top-chip"
            :style="{ backgroundColor: chip.color }"
          >
            {{ chip.value }}
            <span style="font-weight: 700"> 
              {{ chip.label }} 
            </span>
          </div>
        </div>
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
        Remove
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script setup lang="ts">
import { 
  IonIcon, 
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonChip
} from '@ionic/vue';
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['remove-item']);

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const removeItem = (i: any) => {
  emit('remove-item', i);
};

const toDateTimeString = (date: Date) => {
  const timeStamp = new Date(date);
  return timeStamp.toLocaleTimeString([], { timeStyle: 'short' });
};

const chips = [
  {
    label: '',
    value: toDateTimeString(props.item.dateAdded),
    color: 'rgb(50, 50, 50)',
  },
  {
    label: 'cals',
    value: props.item.calories,
    color: 'var(--ion-color-primary)',
  },
  {
    label: 'carbs',
    value: props.item.macro.carbohydrates.total + 'g',
    color: '#F96167',
  },
  {
    label: 'protein',
    value: props.item.macro.protein + 'g',
    color: '#4831D4',
  },
  {
    label: 'fat',
    value: props.item.macro.fat.total + 'g',
    color: '#990011FF',
  },
];

</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.chip-container::-webkit-scrollbar {
  display: none;
}

.chip-container {
  overflow: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  margin: 3px 0;
  white-space: nowrap;
}

.top-chip {
  border-radius: 15px;
  text-align: center;
  color: white;
  font-size: 12px;
  padding: 2px 5px;
  margin-right: 8px;
  display: inline-block;
}

.item-parent {
  display: flex;
  align-items: left;
  flex-direction: column;
}
</style>