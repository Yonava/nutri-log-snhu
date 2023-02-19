import { Module } from 'vuex';
import { LogState } from '@/types/Vuex';
import { LoggedItem, UnloggedItem } from '@/types/Log';

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
    }
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
    }
  },
};

export default Log;
