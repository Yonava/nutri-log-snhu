import { Module } from 'vuex';
import { LogState } from '@/types/Vuex';
import { LoggedItem, UnloggedItem } from '@/types/Log';
import { getPropertyFromNestedObject } from '@/utils/GetNested';

import axios from 'axios';
import mongoose from 'mongoose';

const Log: Module<LogState, any> = {
  state: {
    log: [],
    customItems: [],
    selectedLogItem: null,
  },
  getters: {
    log: state => state.log,
    customItems: state => state.customItems,
    selectedLogItem: state => state.selectedLogItem,
    loggedToday: state => state.log.filter(item => {
      const date = new Date(item.dateAdded)
      const today = new Date()
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    }),
    // nutrient may be nested, e.g. 'macro.carbohydrates.total'
    // input: ['macro', 'carbohydrates', 'total']
    // output: percentages of how tall each hour's bar should be 
    nutrientByHour: 
      (state, getters, rootState, rootGetters) => 
      (nutrient: (keyof LoggedItem)[]) => {
      const data = new Array(24).fill(0);
      getters.loggedToday.forEach((item: LoggedItem) => {
        const hour = new Date(item.dateAdded).getHours();
        const value = getPropertyFromNestedObject(item, nutrient);
        if (typeof value !== 'number') {
          console.error('nutrientByHour: value is not a number', value, nutrient)
          return;
        }
        data[hour] += value;
      });
      // if user has consumed 20%+ of target in a given hour, make bar full height
      const nutrientTarget = rootGetters.dailyTarget(nutrient).value;
      const twentyPercent = nutrientTarget / 5;
      data.forEach((value, index) => {
        if (value > twentyPercent) data[index] = 100;
        else {
          data[index] = Math.round((value / twentyPercent) * 100);
        }
      });
      return data;
    },
    dailyTotal:
      (state, getters) => 
      (nutrientPath: (keyof LoggedItem)[]) => {
        return getters.loggedToday.reduce((total: number, item: LoggedItem) => {
        const value = getPropertyFromNestedObject(item, nutrientPath);
        if (typeof value !== 'number') {
          console.error('dailyTotal: value is not a number', value, nutrientPath);
          return;
        }
        return total + value;
      }, 0);
    },
    quickLog: state => state.log,
  },
  mutations: {
    setSelectedLogItem(state, item: LoggedItem) {
      state.selectedLogItem = item
    },
    addLogItem(state, loggedItem: LoggedItem) {
      const insertedIndex = state.log.findIndex(item => item.dateAdded < loggedItem.dateAdded)
      if (insertedIndex === -1) {
        state.log.push(loggedItem)
      } else {
        state.log.splice(insertedIndex, 0, loggedItem)
      }
    },
    appendLogItems(state, items: LoggedItem[]) {
      state.log.push(...items);
    },
    removeLogItem(state, itemId: string) {
      const index = state.log.findIndex(item => item._id === itemId);
      state.log.splice(index, 1);
    },
    updateLogItem(state, item: LoggedItem) {
      const index = state.log.findIndex(loggedItem => loggedItem._id === item._id)
      state.log[index] = item;
    },
    setLog(state, log: LoggedItem[]) {
      const sortedLogByISO = log.sort((a, b) => a.dateAdded > b.dateAdded ? -1 : 1)
      state.log = sortedLogByISO;
    },
    setCustomItems(state, customItems: UnloggedItem[]) {
      state.customItems = customItems;
    },
    setCustomItem(state, customItem: UnloggedItem) {
      const index = state.customItems.findIndex(item => item._id === customItem._id)
      state.customItems[index] = customItem;
    },
    addCustomItem(state, customItem: UnloggedItem) {
      state.customItems.unshift(customItem);
    },
    removeCustomItem(state, itemId: string) {
      const index = state.customItems.findIndex(item => item._id === itemId);
      state.customItems.splice(index, 1);
    },
  },
  actions: {
    fetchLoggedItems({ commit }) {
      // HTTP request to fetch logged items from database
      // commit('appendLogItems', items)
    },
    async postLoggedItem({ commit, getters }, item: UnloggedItem) {
      const {
        name,
        calories,
        macro,
        ...rest
      } = item;
      const loggedItem: LoggedItem = {
        _id: new mongoose.Types.ObjectId().toString(),
        name,
        calories,
        macro,
        dateAdded: new Date().toISOString(),
      }
      try {
        await axios.post(`/users/${getters.userId}/log`, loggedItem)
        commit('addLogItem', loggedItem)
        commit('presentToast', {
          message: `Added ${loggedItem.name} to log`,
          color: 'success',
        })
      } catch {
        commit('presentToast', {
          message: 'Error adding item to log',
          color: 'danger',
        })
      }
    },
    async deleteLoggedItem({ commit, getters }, loggedItem: LoggedItem) {
      try {
        await axios.delete(`/users/${getters.userId}/log/${loggedItem._id}`)
        commit('removeLogItem', loggedItem._id)
      } catch {
        console.error('Error deleting logged item from database')
      }
    },
    async updateLoggedItem({ commit, getters }, item: LoggedItem) {
      try {
        await axios.put(`/users/${getters.userId}/log/${item._id}`, item)
        commit('presentToast', { 
          message: `${item.name} updated.`,
          position: 'top',
        })
        commit('updateLogItem', item)
      } catch {
        console.error('Error updating logged item in database')
      }
    },
    async deleteCustomItem({ commit, getters }, item: UnloggedItem) {
      try {
        await axios.delete(`/users/${getters.userId}/customItems/${item._id}`)
        commit('presentToast', {
          message: `${item.name} deleted.`,
          color: 'danger',
        })
        commit('removeCustomItem', item._id)
      } catch {
        commit('presentToast', {
          message: 'Error deleting custom item',
          color: 'danger',
        })
      }
    },
    async postCustomItem({ commit, getters }, item: UnloggedItem) {
      try {
        await axios.post(`/users/${getters.userId}/customItems`, item)
        commit('presentToast', {
          message: `${item.name} added.`,
          color: 'success',
        })
        commit('addCustomItem', item)
      } catch {
        commit('presentToast', {
          message: 'Error adding custom item',
          color: 'danger',
        })
      }
    },
    async updateCustomItem({ commit, getters }, item: UnloggedItem) {
      console.log('updateCustomItem', item)
      try {
        await axios.put(`/users/${getters.userId}/customItems/${item._id}`, item)
        commit('setCustomItem', item)
        commit('presentToast', {
          message: `${item.name} updated.`,
          color: 'primary',
          position: 'top',
        })
      } catch {
        commit('presentToast', {
          message: 'Error updating custom item',
          color: 'danger',
        })
      }
    }
  },
};

export default Log;
