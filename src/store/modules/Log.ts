import { Module } from 'vuex';
import { LogState } from '@/types/Vuex';
import { LoggedItem, UnloggedItem, DisplayItem } from '@/types/Log';

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
    addLogItem(state, item: LoggedItem) {
      state.log.push(item)
    },
    appendLogItems(state, items: LoggedItem[]) {
      state.log.push(...items)
    },
    removeLogItem(state, index: number) {
      state.log.splice(index, 1)
    },
    updateLogItem(state, { _id, item }: { _id: string, item: LoggedItem }) {
      const index = state.log.findIndex(item => item._id === _id)
      state.log.splice(index, 1, item)
    },
    setLog(state, log: LoggedItem[]) {
      state.log = log
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
    async postLoggedItem({ commit }, item: UnloggedItem) {
      const loggedItem = {
        ...item,
        dateAdded: new Date()
      }
      // HTTP request to post item to database
      commit('addLogItem', loggedItem)
    },
    deleteLoggedItem({ commit }, index: number) {
      // HTTP request to delete item from database
      commit('removeLogItem', index)
    },
    updateLoggedItem({ commit }, { _id, item }: { _id: string, item: LoggedItem }) {
      // HTTP request to update item in database
      commit('updateLogItem', { _id, item })
    }
  },
};

export default Log;
