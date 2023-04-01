import { Module } from 'vuex'
import { UserState } from '@/types/Vuex'

const User: Module<UserState, any> = {
  state: {
    macroDisplayComponents: [
      {
        title: "Calories",
        component: "CalorieProgress",
        label: "cals",
        color: "var(--ion-color-primary)",
        getters: new Map([
          ["total", ["calories"]],
        ]),
        target: "total",
      },
      {
        title: "Fat",
        component: "FatProgress",
        label: "fats",
        color: "var(--ion-color-secondary)",
        getters: new Map([
          ["total", ["macro", "fat", "total"]],
          ["trans", ["macro", "fat", "trans"]],
          ["saturated", ["macro", "fat", "saturated"]],
        ]),
        target: "total",
        unit: "g"
      },
      {
        title: "Protein",
        component: "ProteinProgress",
        label: "protein",
        color: "#40E0D0",
        getters: new Map([
          ["total", ["macro", "protein"]],
        ]),
        target: "total",
        unit: "g",
      },
      {
        title: "Carbohydrates",
        component: "CarbProgress",
        label: "carbs",
        color: "#F97D38",
        getters: new Map([
          ["total", ["macro", "carbohydrates", "total"]],
        ]),
        target: "total",
        unit: "g",
      },
      {
        title: "Sugars",
        component: "SugarProgress",
        label: "sugars",
        color: "var(--ion-color-warning)",
        getters: new Map([
          ["total", ["macro", "carbohydrates", "sugars"]],
          ["added", ["macro", "carbohydrates", "added_sugars"]],
        ]),
        target: "total",
        unit: "g",
      },
      {
        title: "Calcium",
        component: "CalciumProgress",
        label: "calcium",
        color: "var(--ion-color-success)",
        getters: new Map([
          ["total", ["macro", "calcium"]],
        ]),
        target: "total",
        unit: "mg",
      },
      {
        title: "Iron",
        component: "IronProgress",
        label: "iron",
        color: "var(--ion-color-danger)",
        getters: new Map([
          ["total", ["macro", "iron"]],
        ]),
        target: "total",
        unit: "mg",
      },
      {
        title: "Fiber",
        component: "FiberProgress",
        label: "fiber",
        color: "#317773",
        getters: new Map([
          ["total", ["macro", "fiber"]],
        ]),
        target: "total",
        unit: "g",
      },
      {
        title: "Sodium",
        component: "SodiumProgress",
        label: "sodium",
        color: "#EEA47FFF",
        getters: new Map([
          ["total", ["macro", "sodium"]],
        ]),
        target: "total",
        unit: "mg",
      },
      {
        title: "Potassium",
        component: "PotasProgress",
        label: "potas",
        color: "#8A2BE2",
        getters: new Map([
          ["total", ["macro", "potassium"]],
        ]),
        target: "total",
        unit: "mg",
      },
      {
        title: "Cholesterol",
        component: "CholProgress",
        label: "chol",
        color: "pink",
        getters: new Map([
          ["total", ["macro", "cholesterol"]],
        ]),
        target: "total",
        unit: "mg",
      }
    ]
  },
  mutations: {
    swapMacroComponents: (state, payload: { from: number, to: number }) => {
      const { from, to } = payload;
      const temp = state.macroDisplayComponents[from];
      state.macroDisplayComponents[from] = state.macroDisplayComponents[to];
      state.macroDisplayComponents[to] = temp;
    }
  },
  actions: {
    swapMacroComponents: ({ commit }, payload: { from: number, to: number }) => {
      commit("swapMacroComponents", payload);
    }
  },
  getters: {
    macroComponents: (state) => {
      return state.macroDisplayComponents;
    }
  }
}

export default User
