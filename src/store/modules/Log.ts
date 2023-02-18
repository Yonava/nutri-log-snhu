import { Module } from 'vuex';
import { LogState } from '@/types/Vuex';
import { LoggedItem, DisplayItem } from '@/types/Log';

import axios from 'axios';

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
    todaysLog: state => state.log.filter(item => {
      const date = new Date(item.dateAdded)
      const today = new Date()
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    }),
  },
  mutations: {
    setSelectedLogItem(state, item: LoggedItem | null) {
      state.selectedLogItem = item
    },
    addLogItem(state, loggedItem: LoggedItem) {
      const insertIndex = state.log.findIndex(item => item.dateAdded > loggedItem.dateAdded);
      state.log.splice(insertIndex, 0, loggedItem);
    },
    appendLogItems(state, items: LoggedItem[]) {
      state.log.push(...items)
    },
    removeLogItem(state, dateAdded: Date) {
      const index = state.log.findIndex(item => item.dateAdded === dateAdded);
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
    setCustomItems(state, customItems: DisplayItem[]) {
      state.customItems = customItems;
    }
  },
  actions: {
    fetchLoggedItems({ commit }) {
      // HTTP request to fetch logged items from database
      // commit('appendLogItems', items)
    },
    async postLoggedItem({ commit, getters }, item) {
      const loggedItem = {
        ...item,
        dateAdded: new Date().toISOString(),
      }
      try {
        await axios.put(`/users/${getters.userId}/log`, loggedItem)
        commit('addLogItem', loggedItem)
        commit('presentToast', {
          message: `Added ${item.name} to log`,
          color: 'success',
        })
      } catch {
        console.error('Error posting logged item to database')
      }
    },
    async deleteLoggedItem({ commit, getters }, dateAdded: Date) {
      try {
        await axios.delete(`/users/${getters.userId}/log/${dateAdded}`)
        commit('removeLogItem', dateAdded)
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
    }
  },
};

export default Log;
