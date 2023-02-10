import { Module } from 'vuex';
import { LogState } from '@/types/Vuex';
import { LoggedItem, DisplayItem, UndoItem } from '@/types/Log';

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
  },
  mutations: {
    setSelectedLogItem(state, item: LoggedItem | null) {
      state.selectedLogItem = item
    },
    addLogItem(state, { loggedItem, insertIndex }: { loggedItem: LoggedItem, insertIndex: number }) {
      state.log.splice(insertIndex, 0, loggedItem)
    },
    appendLogItems(state, items: LoggedItem[]) {
      state.log.push(...items)
    },
    removeLogItem(state, dateAdded: Date) {
      const index = state.log.findIndex(item => item.dateAdded === dateAdded)
      state.log.splice(index, 1)
    },
    updateLogItem(state, { _id, item }: { _id: string, item: LoggedItem }) {
      const index = state.log.findIndex(item => item._id === _id)
      state.log.splice(index, 1, item)
    },
    setLog(state, log: LoggedItem[]) {
      const sortedLogByISO = log.sort((a, b) => a.dateAdded > b.dateAdded ? -1 : 1)
      state.log = sortedLogByISO
    },
    setCustomItems(state, customItems: DisplayItem[]) {
      state.customItems = customItems
    }
  },
  actions: {
    fetchLoggedItems({ commit }) {
      // HTTP request to fetch logged items from database
      // commit('appendLogItems', items)
    },
    async reAddLoggedItem({ commit, getters }, item: UndoItem) {
      const { index, ...loggedItem } = item;
      try {
        await axios.put(`/users/${getters.userId}/log`, loggedItem)
      } catch {
        console.error('Error posting logged item to database')
      }
      commit('addLogItem', { loggedItem, insertIndex: index })
    },
    async postLoggedItem({ commit, getters }, item) {
      const loggedItem = {
        ...item,
        dateAdded: new Date().toISOString(),
      }
      try {
        await axios.put(`/users/${getters.userId}/log`, loggedItem)
      } catch {
        console.error('Error posting logged item to database')
      }
      commit('addLogItem', { loggedItem, insertIndex: 0 })
    },
    async deleteLoggedItem({ commit, getters }, dateAdded: Date) {
      try {
        await axios.put(`/users/${getters.userId}/log/${dateAdded}`)
      } catch {
        console.error('Error deleting logged item from database')
      }
      commit('removeLogItem', dateAdded)
    },
    updateLoggedItem({ commit }, { _id, item }: { _id: string, item: LoggedItem }) {
      // HTTP request to update item in database
      commit('updateLogItem', { _id, item })
    }
  },
};

export default Log;
