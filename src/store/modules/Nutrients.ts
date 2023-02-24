import { Module } from 'vuex'
import { NutrientState } from '@/types/Vuex'
import { DailyTargets } from '@/types/User'
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
    allDailyTargets: state => state.dailyTargets,
    dailyTarget: 
      (state, getters, rootState, rootGetters) => 
      (targetPath: (keyof DailyTargets)[]) => {
      const value = getPropertyFromNestedObject(state.dailyTargets, targetPath);
      if (typeof value !== 'number') {
        throw new Error(`Target path ${targetPath.join('.')} expected number, got ${value}`);
      }
      // for divide by zero edge case
      const percent = value !== 0 ? Math.round(rootGetters.dailyTotal(targetPath) / value * 100) : 0;
      return {
        value,
        percent,
      }
    }
  },
  mutations: {
    setDailyTargets(state, targets) {
      state.dailyTargets = targets
    },
  },
}

export default Nutrients
