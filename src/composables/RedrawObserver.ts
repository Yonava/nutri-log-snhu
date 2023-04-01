import { watch, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import type { Ref } from "vue";

export function useRedrawObserver(
  getters: Map<string, string[]>,
  currentData: Ref, 
  isActive: Ref<boolean>,
  target: string
) {
  const store = useStore();
  const route = useRoute();
  const percent = ref(0);

  const homePath = "/tabs/home";

  function getNewData() {
    getters.forEach((value, key) => {
      percent.value = store.getters.dailyTarget(getters.get(target)).percent;
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

  watch(() => store.getters.dailyTarget(getters.get(target)).percent, (newVal) => {
    if (route.path.includes(homePath) && isActive.value) {
      percent.value = newVal;
    }
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

  watch(() => store.getters.caloriesHidden, () => {
    setTimeout(() => {
      getNewData();
    }, 100);
  })

  setTimeout(() => {
    if (route.path.includes(homePath) && isActive.value) {
      getNewData();
    }
  }, 100);

  return { percent };
}