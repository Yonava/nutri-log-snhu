import { watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import type { Ref } from "vue";

export function useRedrawObserver(
  getter: string, 
  currentData: Ref, 
  isActive: Ref<boolean>
) {
  const store = useStore();
  const route = useRoute();

  const homePath = "/tabs/home";

  watch(() => route.path, (newPath) => {
    if (newPath === homePath && isActive.value) {
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
}