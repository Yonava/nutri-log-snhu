import { createStore } from 'vuex'
import { State } from '@/types/Vuex'
import { MacronutrientCalibrations } from '@/types/User'
import Log from './modules/Log'
import Auth from './modules/Auth'
import { Storage, Drivers } from "@ionic/storage";

export default createStore<State>({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    catalog: [],
    selectedCatalogItem: null,
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
    },
    clientStore: null
  },
  getters: {
    caloriesHidden: state => state.caloriesHidden,
    todaysNutrients: state => state.todaysNutrients,
    macronutrientCalibrations: state => state.macronutrientCalibrations,
    catalog: state => state.catalog,
    selectedCatalogItem: state => state.selectedCatalogItem,
    getClientStore: state => state.clientStore
  },
  mutations: {
    toggleCaloriesHidden(state) {
      state.caloriesHidden = !state.caloriesHidden
    },
    setMacronutrientCalibrations(state, calibrations: MacronutrientCalibrations) {
      state.macronutrientCalibrations = calibrations
    },
    setTodaysNutrients(state, nutrients) {
      state.todaysNutrients = nutrients
    },
    setCatalog(state, catalog) {
      state.catalog = catalog
    },
    setSelectedCatalogItem(state, item) {
      state.selectedCatalogItem = item
    },
    setClientStore(state, store) {
      state.clientStore = store
    }
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
    async configClientStore({ commit }) {
      const clientStore = new Storage({
        name: 'clientStore',
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
      })
      try {
        await clientStore.create()
        console.log('clientStore created')
      } catch (err) {
        console.log(err)
      }
      commit('setClientStore', clientStore)
    },
  },
  modules: {
    Log,
    Auth
  }
})