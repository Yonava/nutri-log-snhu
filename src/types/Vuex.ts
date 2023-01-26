import { LoggedItem } from './Log'
import { MacronutrientCalibrations } from './User'

export interface State {
  caloriesHidden: boolean,
  todaysNutrients: NutritionData,
  log: LoggedItem[],
  macronutrientCalibrations: MacronutrientCalibrations
}

export interface NutritionData {
  calories: number,
  carbs: number,
  sugar: {
    total: number,
    added: number
  },
  fiber: number,
  fat: {
    total: number,
    saturated: number,
    trans: number
  },
  protein: number,
  sodium: number,
  cholesterol: number,
  potassium: number,
  calcium: number,
  iron: number
}