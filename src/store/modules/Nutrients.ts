import { Module } from 'vuex'
import { NutrientState } from '@/types/Vuex'
import { DailyTargets } from '@/types/User'
import { getPropertyFromNestedObject } from '@/utils/GetNested'
import axios from 'axios'

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
    },
    dailyTargetsRange: {
      calories: {
        min: 1000,
        max: 5000,
      },
      macro: {
        carbohydrates: {
          total: {
            min: 0,
            max: 500,
          },
          added_sugars: {
            min: 0,
            max: 500,
          },
          sugars: {
            min: 0,
            max: 500,
          },  
        },  
        fat: {
          total: {
            min: 0,
            max: 500,
          },
          saturated: {
            min: 0,
            max: 500,
          }, 
          trans: {
            min: 0,
            max: 500,
          },
        },
        protein: {
          min: 0,
          max: 500,
        },
        fiber: {
          min: 0,
          max: 500,
        },
        sodium: {
          min: 0,
          max: 500,
        },  
        cholesterol: {
          min: 0,
          max: 500,
        },
        calcium: {
          min: 0,
          max: 500,
        },
        potassium: {
          min: 0,
          max: 500,
        },
        iron: {
          min: 0,
          max: 500,
        },
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
    },
    allDailyTargetRanges: state => state.dailyTargetsRange,
    dailyTargetRange:
      (state, getters, rootState, rootGetters) =>
      (targetPath: (keyof DailyTargets)[]) => {
      const { min, max } = getPropertyFromNestedObject(state.dailyTargetsRange, targetPath) as { min: number, max: number };
      if (typeof min !== 'number' || typeof max !== 'number') {
        throw new Error(`Target path ${targetPath.join('.')} expected number`);
      }
      return {
        min,
        max,
      };
    }
  },
  mutations: {
    setDailyTargets(state, targets) {
      state.dailyTargets = targets
    },
  },
  actions: {
    async updateDailyTargets({ commit, getters }, targets) {
      try {
        await axios.put(`/users/${getters.userId}/targets`, targets)
        commit('setDailyTargets', targets)
      } catch (err) {
        console.error(err)
        commit('presentToast', {
          message: 'Error updating daily targets',
          color: 'error',
        })
      }
    }
  }
}

export default Nutrients
