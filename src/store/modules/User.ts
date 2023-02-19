import { Module } from 'vuex'
import { UserState } from '@/types/Vuex'
// import { MacroDisplayComponent } from '@/types/User'

const User: Module<UserState, any> = {
  state: {
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
  mutations: {
    swapMacroComponents(state, payload: { from: number, to: number }) {
      const { from, to } = payload
      const temp = state.macroDisplayComponents[from]
      state.macroDisplayComponents[from] = state.macroDisplayComponents[to]
      state.macroDisplayComponents[to] = temp
    }
  },
  getters: {
    macroComponents: state => state.macroDisplayComponents
  },
}

export default User
