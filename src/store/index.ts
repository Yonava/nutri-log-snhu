import { createStore } from 'vuex'
import { UnloggedItem } from '@/types/Log'
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
    macronutrientCalibrations: {
      targetCalories: 0,
      targetCarbs: 0,
      targetSugar: 0,
      targetAddedSugar: 0,
      targetFiber: 0,
      targetFat: 0,
      targetSaturatedFat: 0,
      targetTransFat: 0,
      targetProtein: 0,
      targetSodium: 0,
      targetCholesterol: 0,
      targetPotassium: 0,
      targetCalcium: 0,
      targetIron: 0
    }
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
    addLogItem(state, item: UnloggedItem) {
      const addItem = { 
        ...item, 
        dateAdded: new Date() 
      }
      state.log.push(addItem)
    }
  },
  actions: {
  },
  modules: {
  }
})
