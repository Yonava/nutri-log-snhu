import { UnloggedItem, LoggedItem } from './Log'
import { User, MacroDisplayComponent, DailyTargets } from './User'

export interface State {
  caloriesHidden: boolean,
  catalog: UnloggedItem[],
  selectedCatalogItem: UnloggedItem | null,
  clientStore: Object | null
}

export interface UserState {
  macroDisplayComponents: MacroDisplayComponent[],
}

export interface LogState {
  log: LoggedItem[],
  customItems: UnloggedItem[],
  selectedLogItem: LoggedItem | null
}

export interface AuthState {
  user: User | null,
  token: string | null
}

export interface ToastState {}

export interface NutrientState {
  dailyTargets: DailyTargets,
  dailyTargetsRange: {
    calories: MinMax,
    macro: {
      carbohydrates: {
        total: MinMax,
        added_sugars: MinMax,
        sugars: MinMax,
      },
      fat: {
        total: MinMax,
        saturated: MinMax,
        trans: MinMax,
      },
      protein: MinMax,
      fiber: MinMax,
      sodium: MinMax,
      cholesterol: MinMax,
      calcium: MinMax,
      potassium: MinMax,
      iron: MinMax
    }
  }
}

type MinMax = {
  min: number,
  max: number
}