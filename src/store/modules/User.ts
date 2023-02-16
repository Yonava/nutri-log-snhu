import { Module } from 'vuex'
import { UserState } from '@/types/Vuex'
import { MacroDisplayComponent } from '@/types/User'

const User: Module<UserState, any> = {
  state: {
    activeMacroDisplayComponents: [
      {
        component: "CalorieProgress",
        label: "cals",
        color: "var(--ion-color-primary)",
        getter: "todaysCalorieData",
      },
      {
        component: "FatProgress",
        label: "fats",
        color: "var(--ion-color-secondary)",
        getter: "todaysFatData",
        unit: "g"
      },
      {
        component: "ProteinProgress",
        label: "protein",
        color: "#40E0D0",
        getter: "todaysProteinData",
        unit: "g",
      },
      {
        component: "CarbProgress",
        label: "carbs",
        color: "#F97D38",
        getter: "todaysCarbData",
        unit: "g",
      },
      {
        component: "SugarProgress",
        label: "sugars",
        color: "var(--ion-color-warning)",
        getter: "todaysSugarData",
        unit: "g",
      },
      {
        component: "CalciumProgress",
        label: "calcium",
        color: "var(--ion-color-success)",
        getter: "todaysCalciumData",
        unit: "mg",
      },
      {
        component: "IronProgress",
        label: "iron",
        color: "var(--ion-color-danger)",
        getter: "todaysIronData",
        unit: "mg",
      },
      {
        component: "FiberProgress",
        label: "fiber",
        color: "var(--ion-color-danger)",
        getter: "todaysFiberData",
        unit: "g",
      },
    ],
    macroDisplayComponents: [
      {
        component: "CalorieProgress",
        label: "cals",
        color: "var(--ion-color-primary)",
        getter: "todaysCalorieData",
      },
      {
        component: "FatProgress",
        label: "fats",
        color: "var(--ion-color-secondary)",
        getter: "todaysFatData",
        unit: "g"
      },
      {
        component: "ProteinProgress",
        label: "protein",
        color: "#40E0D0",
        getter: "todaysProteinData",
        unit: "g",
      },
      {
        component: "CarbProgress",
        label: "carbs",
        color: "#F97D38",
        getter: "todaysCarbData",
        unit: "g",
      },
      {
        component: "SugarProgress",
        label: "sugars",
        color: "var(--ion-color-warning)",
        getter: "todaysSugarData",
        unit: "g",
      },
      {
        component: "CalciumProgress",
        label: "calcium",
        color: "var(--ion-color-success)",
        getter: "todaysCalciumData",
        unit: "mg",
      },
      {
        component: "IronProgress",
        label: "iron",
        color: "var(--ion-color-danger)",
        getter: "todaysIronData",
        unit: "mg",
      },
      {
        component: "FiberProgress",
        label: "fiber",
        color: "#317773",
        getter: "todaysFiberData",
        unit: "g",
      },
      {
        component: "SodiumProgress",
        label: "sodium",
        color: "#EEA47FFF",
        getter: "todaysSodiumData",
        unit: "mg",
      },
      {
        component: "PotasProgress",
        label: "potas",
        color: "#8A2BE2",
        getter: "todaysPotassiumData",
        unit: "mg",
      },
      {
        component: "CholProgress",
        label: "chol",
        color: "pink",
        getter: "todaysCholesterolData",
        unit: "mg",
      }
    ]
  },
  getters: {
    activeMacroDisplayComponents: state => state.activeMacroDisplayComponents,
    macroDisplayComponents: state => state.macroDisplayComponents
  },
  mutations: {
    setActiveMacroDisplayComponents(state, components: MacroDisplayComponent[]) {
      state.activeMacroDisplayComponents = components
    }
  },
  actions: {
    setActiveMacroDisplayComponents({ commit }, components: MacroDisplayComponent[]) {
      commit('setActiveMacroDisplayComponents', components)
    }
  }
}

export default User
