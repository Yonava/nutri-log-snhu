<template>
  <div 
    :style="{ 
      height, 
      overflow: 'hidden' 
    }"
    class="item-container"
  >
    <ion-item-sliding 
      @touchend="checkRemove"
      @ionDrag="updateSlidingRatio"
      ref="removeButton"
    >
      <ion-item button>
        <div class="item-parent">
          <div class="chip-container">
            <div 
              v-for="chip in chips"
              :key="chip"
              :style="{ backgroundColor: chip.color }"
              class="top-chip"
            >
              <div>
                {{ chip.value }}
                <span style="font-weight: 700"> 
                  {{ chip.label }} 
                </span>
              </div>
            </div>
          </div>
          <h2 class="item-name">
            {{ item.name }}
          </h2>
        </div>
      </ion-item>
      <ion-item-options side="start">
        <ion-item-option 
          @click.stop="removeItem"
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
import { 
  defineProps, 
  defineEmits, 
  ref, 
  computed,
  onMounted,
} from 'vue';

const emit = defineEmits(['remove-item']);
const removeButton = ref();
const height = ref('59px');
const slidingRatio = ref(0);

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

function updateSlidingRatio() {
  setTimeout(async () => {
    slidingRatio.value = await removeButton.value.$el.getSlidingRatio();
  }, 100);
}

async function checkRemove() {
  if (slidingRatio.value < -1.8) {
    removeItem();
  }
}

function removeItem() {
  const transitionDuration = 250;
  height.value = '0px';
  setTimeout(() => {
    emit('remove-item', props.item);
  }, transitionDuration);
}

const toDateTimeString = (date) => {
  const timeStamp = new Date(date);
  return timeStamp.toLocaleTimeString([], { timeStyle: 'short' });
};

const chips = ref([]);
const potentialChips = [
  {
    label: '',
    value: toDateTimeString(props.item.dateAdded) || 'N/A',
    color: 'rgb(50, 50, 50)',
  },
  {
    label: 'cals',
    value: props.item.calories,
    color: 'var(--ion-color-primary)',
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
]

onMounted(() => {
  potentialChips.forEach((chip) => {
    if (!chip.value || chip.value === 'Invalid Date') return;
    chips.value.push(chip);
  });
});
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
  overflow: 'hidden';
}

.item-name {
  text-transform: capitalize; 
  margin: 2px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 85vw;
}
</style>