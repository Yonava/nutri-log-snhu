<template>
  <div>
    <ion-item 
      @click="goToDetail(item)"
      button
    >
      <div class="item-parent">
        <div 
          v-if="chips.length > 0"
          class="chip-content"
        >
          <div 
            v-for="chip in chips"
            :key="chip"
            class="top-chip"
            :style="{ backgroundColor: chip.color }"
          >
            {{ chip.value }}
          </div>
        </div>
        <h4 class="item-name">
          {{ item.name || '(No title)' }}
        </h4>
      </div>
      <ion-icon 
        @click.stop="addItem(item)"
        :icon="itemIcon" 
        color="success" 
        slot="start"
      ></ion-icon>
    </ion-item>
  </div>
</template>

<script setup lang="ts">
import { IonItem, IonIcon } from '@ionic/vue';
import { addCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { defineProps, ref, computed, onMounted } from 'vue';
import { UnloggedItem } from '@/types/Log';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

type Chip = {
  value: string | number | null;
  color: string;
};

const store = useStore();
const router = useRouter();

const itemAdded = ref(false);
const chips = ref<Chip[]>([]);

onMounted(() => {
  const possibleChips = [
    {
      value: props.item.calories + ' cals',
      color: 'var(--ion-color-primary)',
    },
    {
      value: props.item.type,
      color: 'var(--ion-color-danger)',
    },
    {
      value: props.item.time,
      color: 'var(--ion-color-tertiary)',
    }
  ];
  chips.value = possibleChips.filter(chip => {
    if (store.getters.caloriesHidden) {
      return chip.value !== props.item.calories + ' cals';
    }
    return chip.value;
  });
});

const props = defineProps<{
  item: UnloggedItem;
}>();

function addItem(item: UnloggedItem) {
  itemAdded.value = true;
  setTimeout(() => {
    itemAdded.value = false;
  }, 2000);
  store.dispatch('postLoggedItem', item);
}

function goToDetail(item: UnloggedItem) {
  store.commit('setSelectedCatalogItem', item);
  router.push('/tabs/log/addCatalog/detail');
}

const itemIcon = computed(() => {
  return itemAdded.value ? checkmarkCircleOutline : addCircleOutline;
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
  margin: 3px 0;
  white-space: nowrap;
}

.top-chip {
  border-radius: 15px;
  text-align: center;
  color: white;
  font-size: 12px;
  padding: 1px 4px;
  margin-right: 5px;
  display: inline-block;
}

.item-parent {
  display: flex;
  align-items: left;
  flex-direction: column;
}

.item-name {
  width: 75vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  margin: 2px 0;
}
</style>