import { createStore } from 'vuex'
import { State } from '@/types/Vuex'
import { Storage, Drivers } from "@ionic/storage"
import { MacronutrientCalibrations } from '@/types/User'
import Log from './modules/Log'
import Auth from './modules/Auth'
import Toast from './modules/Toast'
import Nutrients from './modules/Nutrients'
import User from './modules/User'
import axios from 'axios'

export default createStore<State>({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    catalog: [],
    selectedCatalogItem: null,
    caloriesHidden: false,

    clientStore: null
  },
  getters: {
    caloriesHidden: state => state.caloriesHidden,
    catalog: state => state.catalog,
    selectedCatalogItem: state => state.selectedCatalogItem,
    getClientStore: state => state.clientStore
  },
  mutations: {
    toggleCaloriesHidden(state) {
      state.caloriesHidden = !state.caloriesHidden
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
    async fetchCatalog({ commit }) {
      try {
        const response = await axios.get('/items');
        const contentType = response.headers['content-type'];
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Didn't receive JSON");
        }
        commit("setCatalog", response.data);
      } catch (err) {
        commit('presentToast', {
          message: 'Error fetching catalog',
          color: 'danger'
        });
        console.log(err);
      }
    },
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
      } catch (err) {
        console.log(err)
      }
      commit('setClientStore', clientStore)
    },
  },
  modules: {
    Log,
    Auth,
    Toast,
    Nutrients,
    User
  }
})