<template>
  <div>
    <CircularProgress 
      :percent="percentage"
      color="var(--ion-color-danger)"
    >
      <div style="transform: translateY(15%)">
        <div style="font-weight: 200; font-size: 0.4rem">
          total
        </div>
        <div @click="animateCountUp" style="font-weight: 700; font-size: 0.9rem">
          {{ fatData.total }}g
        </div>
        <div class="center" style="flex-direction: row; margin-top: 2px">
          <div style="margin: 0px 3px" class="center">
            <div style="font-weight: 200; font-size: 0.4rem">
              saturated
            </div>
            <div style="font-weight: 700; font-size: 0.7rem">
              {{ fatData.totalSaturated }}g
            </div>
          </div>
          <div style="margin: 0px 3px" class="center">
            <div style="font-weight: 200; font-size: 0.4rem">
              trans
            </div>
            <div style="font-weight: 700; font-size: 0.7rem">
              {{ fatData.totalTrans }}g
            </div>
          </div>
        </div>
      </div>
    </CircularProgress>
  </div>
</template>

<script setup>
import CircularProgress from "../CircularProgress.vue";
import { 
  computed, 
  ref, 
  defineProps, 
  toRefs, 
  watch
} from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const percentage = ref(0);
const route = useRoute();

const props = defineProps({
  isActive: Boolean
})

const { isActive } = toRefs(props)

watch(() => route.path, (newVal) => {
  if (newVal === "/tabs/home" && isActive.value) {
    setTimeout(() => {
      percentage.value = fatData.value.percent;
    }, 100);
  }
});

watch(isActive, (newVal) => {
  if (newVal) {
    percentage.value = fatData.value.percent;
  }
});

const fatData = computed(() => {
  return store.getters.todaysFatData;
});
</script>