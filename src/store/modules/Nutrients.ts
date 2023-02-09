import { Module } from 'vuex'
import { NutrientState } from '@/types/Vuex'
import { MacronutrientCalibrations } from '@/types/User'
import { LoggedItem } from '@/types/Log'

const Nutrients: Module<NutrientState, any> = {
  state: {
    macronutrientCalibrations: {
      targetCalories: 5000,
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
    todaysCalorieData: (state, getters, rootState, rootGetters) => {
      const totalCalories = rootGetters.todaysLog.reduce((total: number, item: LoggedItem) => {
        return total + item.calories
      }, 0)

      return {
        total: totalCalories,
        percent: Math.round(totalCalories / state.macronutrientCalibrations.targetCalories * 100)
      }
    },
    todaysCarbData: (state, getters, rootState, rootGetters) => {
      const totalCarbs = rootGetters.todaysLog.reduce((total: number, item: LoggedItem) => {
        return total + item.macro.carbohydrates.total
      }, 0)

      return {
        total: totalCarbs,
        percent: Math.round(totalCarbs / state.macronutrientCalibrations.targetCarbs * 100)
      }
    },
    todaysSugarData: (state, getters, rootState, rootGetters) => {
      const totalSugar = rootGetters.todaysLog.reduce((total: number, item: LoggedItem) => {
        return total + item.macro.carbohydrates.sugars
      }, 0)

      const totalAddedSugar = rootGetters.todaysLog.reduce((total: number, item: LoggedItem) => {
        return total + item.macro.carbohydrates.added_sugars
      }, 0)

      return {
        total: totalSugar,
        totalAdded: totalAddedSugar,
        percent: Math.round(totalSugar / state.macronutrientCalibrations.targetSugar * 100)
      }
    },
    todaysFiberData: (state, getters, rootState, rootGetters) => {
      const totalFiber = rootGetters.todaysLog.reduce((total: number, item: LoggedItem) => {
        return total + item.macro.fiber
      }, 0)

      return {
        total: totalFiber,
        percent: Math.round(totalFiber / state.macronutrientCalibrations.targetFiber * 100)
      }
    },
    todaysFatData: (state, getters, rootState, rootGetters) => {
      const totalFat = rootGetters.todaysLog.reduce((total: number, item: LoggedItem) => {
        return total + item.macro.fat.total
      }, 0)

      const totalSaturatedFat = rootGetters.todaysLog.reduce((total: number, item: LoggedItem) => {
        return total + item.macro.fat.saturated
      }, 0)

      const totalTransFat = rootGetters.todaysLog.reduce((total: number, item: LoggedItem) => {
        return total + item.macro.fat.trans
      }, 0)

      return {
        total: totalFat,
        totalSaturated: totalSaturatedFat,
        totalTrans: totalTransFat,
        percent: Math.round(totalFat / state.macronutrientCalibrations.targetFat * 100)
      }
    },
    todaysProteinData: (state, getters, rootState, rootGetters) => {
      const totalProtein = rootGetters.todaysLog.reduce((total: number, item: LoggedItem) => {
        return total + item.macro.protein
      }, 0)

      return {
        total: totalProtein,
        percent: Math.round(totalProtein / state.macronutrientCalibrations.targetProtein * 100)
      }
    }
  },
  mutations: {
    setMacronutrientCalibrations(state, calibrations: MacronutrientCalibrations) {
      state.macronutrientCalibrations = calibrations
    },
  },
}

export default Nutrients
