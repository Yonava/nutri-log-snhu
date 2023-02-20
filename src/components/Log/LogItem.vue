<template>
  <div 
    :style="{ 
      height,
      overflow: 'hidden',
    }"
    class="item-container"
  >
    <ion-item-sliding 
      @touchend="checkRemove"
      @ionDrag="updateAmountOpen"
      ref="removeButton"
    >
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
          <h2 style="text-transform: capitalize; margin: 2px 0;">
            {{ item.name }}
          </h2>
        </div>
      </ion-item>
      <ion-item-options side="start">
        <ion-item-option 
          @click.stop="removeItem(i)"
          expandable
          color="danger" 
          
        >
          Remove
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </div>
</template>

<script setup>
import { 
  IonIcon, 
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from '@ionic/vue';
import { defineProps, defineEmits, ref } from 'vue';

const emit = defineEmits(['remove-item']);
const removeButton = ref();
const height = ref('59px');
const amountOpen = ref(0);

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

function updateAmountOpen() {
  setTimeout(async () => {
    amountOpen.value = await removeButton.value.$el.getSlidingRatio();
  }, 100);
}

async function checkRemove() {
  if (amountOpen.value < -2.5) {
    height.value = '0px';
    const transitionDuration = 1000;
    setTimeout(() => {
      emit('remove-item', props.item);
    }, transitionDuration);
  }
}

const removeItem = async (i) => {
  console.log(await removeButton.value.$el.closeOpened());
  // height.value = '0px';
  // const transitionDuration = 1000;
  // setTimeout(() => {
  //   emit('remove-item', i);
  // }, transitionDuration);
};

const toDateTimeString = (date) => {
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
  margin: 8px 0 0 0;
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

.item-container {
  transition: -webkit .3s;
  transition: -ms .3s;
  transition: .3s;
}
</style>