import { Module } from 'vuex'
import { NutrientState } from '@/types/Vuex'
import { LoggedItem } from '@/types/Log'
import { getPropertyFromNestedObject } from '@/utils/GetNested'

const Nutrients: Module<NutrientState, any> = {
  state: {
    dailyTargets: {
      calories: 0,
      macro: {
        carbohydrates: {
          total: 0,
          added_sugars: 0,
          sugars: 0,
        },
        fat: {
          total: 0,
          saturated: 0,
          trans: 0,
        },
        protein: 0,
        fiber: 0,
        sodium: 0,
        cholesterol: 0,
        calcium: 0,
        potassium: 0,
        iron: 0
      }
    }
  },
  getters: {
    dailyTargets: state => state.dailyTargets,
  },
  mutations: {
    setDailyTargets(state, targets) {
      state.dailyTargets = targets
    },
  },
}

export default Nutrients
