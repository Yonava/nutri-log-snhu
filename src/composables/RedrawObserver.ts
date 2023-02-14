import { watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import type { Ref } from "vue";

export function useRedrawObserver(
  getter: string, 
  currentData: Ref, 
  isActive: Ref<boolean>,
  index: number
) {
  const store = useStore();
  const route = useRoute();

  const homePath = "/tabs/home";

  watch(() => route.path, (newPath) => {
    if (newPath.includes(homePath) && isActive.value) {
      setTimeout(() => {
        currentData.value = store.getters[getter];
      }, 100);
    }
  });

  watch(isActive, (newVal) => {
    if (newVal) {
      currentData.value = store.getters[getter];
    }
  });

  if (index === 0) {
    const watchForInit = watch(() => store.getters[getter].total, () => {
      watchForInit();
      if (!route.path.includes(homePath)) return;
      currentData.value = store.getters[getter];
    });
  }
}