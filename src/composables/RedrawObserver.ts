import { watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import type { Ref } from "vue";

export function useRedrawObserver(
  getters: Map<string, string[]>,
  currentData: Ref, 
  isActive: Ref<boolean>
) {
  const store = useStore();
  const route = useRoute();

  const homePath = "/tabs/home";

  function getNewData() {
    getters.forEach((value, key) => {
      currentData.value[key] = store.getters.dailyTotal(value);
    });
  }

  getters.forEach((value, key) => {
    watch(() => store.getters.dailyTotal(value), (newVal) => {
      if (route.path.includes(homePath) && isActive.value) {
        currentData.value[key] = newVal;
      }
    });
  });

  watch(() => route.path, (newPath) => {
    if (newPath.includes(homePath) && isActive.value) {
      setTimeout(() => {
        getNewData();
      }, 100);
    }
  });

  watch(isActive, (newVal) => {
    if (newVal) {
      setTimeout(() => {
        getNewData();
      }, 100);
    }
  });

  setTimeout(() => {
    if (route.path.includes(homePath) && isActive.value) {
      getNewData();
    }
  }, 100);
}