import { DisplayItem, LoggedItem } from './Log'
import { User, MacronutrientCalibrations } from './User'

export interface State {
  caloriesHidden: boolean,
  todaysNutrients: NutritionData,
  macronutrientCalibrations: MacronutrientCalibrations,
  catalog: DisplayItem[],
  selectedCatalogItem: DisplayItem | null,
}

export interface LogState {
  log: LoggedItem[]
}

export interface AuthState {
  user: User | null,
  token: string | null
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