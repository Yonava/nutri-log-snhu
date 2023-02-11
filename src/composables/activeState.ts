// const store = useStore();
// const route = useRoute();

// const props = defineProps({
//   isActive: Boolean,
// });

// const { isActive } = toRefs(props);

// watch(() => route.path, (newVal) => {
//   if (newVal === "/tabs/home" && isActive.value) {
//     setTimeout(() => {
//       currentData.value = store.getters[getter];
//     }, 100);
//   }
// });

// watch(isActive, (newVal) => {
//   if (newVal) {
//     currentData.value = store.getters[getter];
//   }
// });