import { createStore } from 'vuex'
import { Item } from '@/types/Log'
import { State } from '@/types/Vuex'

export default createStore<State>({
  state: {
    caloriesHidden: false,
    todaysNutrients: {
      calories: 0,
      carbs: 0,
      sugar: {
        total: 0,
        added: 0
      },
      fiber: 0,
      fat: {
        total: 0,
        saturated: 0,
        trans: 0
      },
      protein: 0,
      sodium: 0,
      cholesterol: 0,
      potassium: 0,
      calcium: 0,
      iron: 0
    },
    log: [],

  },
  getters: {
    caloriesHidden: state => state.caloriesHidden,
    todaysNutrients: state => state.todaysNutrients,
    log: state => state.log
  },
  mutations: {
    toggleCaloriesHidden(state) {
      state.caloriesHidden = !state.caloriesHidden
    },
    addLogItem(state, item: Item) {
      state.log.push(item)
    }
  },
  actions: {
  },
  modules: {
  }
})
