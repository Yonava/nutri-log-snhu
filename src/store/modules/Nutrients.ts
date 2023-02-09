import { Module } from 'vuex'
import { NutrientState } from '@/types/Vuex'
import { MacronutrientCalibrations } from '@/types/User'

const Nutrients: Module<NutrientState, any> = {
  state: {
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
    macronutrientCalibrations: state => state.macronutrientCalibrations,
  },
  mutations: {
    setMacronutrientCalibrations(state, calibrations: MacronutrientCalibrations) {
      state.macronutrientCalibrations = calibrations
    },
  },
  actions: {
    
  }
}

export default Nutrients
