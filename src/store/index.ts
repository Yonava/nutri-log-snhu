import { createStore } from 'vuex'
import { State } from '@/types/Vuex'
import { MacronutrientCalibrations } from '@/types/User'
import Log from './modules/Log'
import Auth from './modules/Auth'

export default createStore<State>({
  strict: process.env.NODE_ENV !== 'production',
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
  },
  mutations: {
    toggleCaloriesHidden(state) {
      state.caloriesHidden = !state.caloriesHidden
    },
  },
  actions: {
    toggleCaloriesHidden({ commit }) {
      // HTTP request to update user's caloriesHidden setting
      commit('toggleCaloriesHidden')
    },
    updateMacronutrientCalibrations({ commit }, calibrations: MacronutrientCalibrations) {
      // HTTP request to update user's macronutrient calibrations
      commit('updateMacronutrientCalibrations', calibrations)
    },
  },
  modules: {
    Log,
    Auth
  }
})