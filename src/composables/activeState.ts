// import { ref, defineProps, watch, toRefs } from 'vue'
// import { useRoute } from 'vue-router'

// export function useRedrawWatcher() {
//   // const redraw = ref(false)
//   const route = useRoute()

//   const props = defineProps({
//     isActive: Boolean
//   })

//   const { isActive } = toRefs(props)

//   watch(route, () => {
//     if (route.path === '/tabs/home') {
//       console.log('redraw', isActive)
//     }
//   })

//   watch(isActive, (value) => {
//     console.log(value, "redraw")
//   })
// }