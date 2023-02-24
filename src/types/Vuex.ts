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
    calories: {
      min: number,
      max: number,
    },
    macro: {
      carbohydrates: {
        total: {
          min: number,
          max: number,
        },
        added_sugars: {
          min: number,
          max: number,
        },
        sugars: {
          min: number,
          max: number,
        },
      },
      fat: {
        total: {
          min: number,
          max: number,
        },
        saturated: {
          min: number,
          max: number,
        },
        trans: {
          min: number,
          max: number,
        },
      },
      protein: {
        min: number,
        max: number,
      },
      fiber: {
        min: number,
        max: number,
      },
      sodium: {
        min: number,
        max: number,
      },
      cholesterol: {
        min: number,
        max: number,
      },
      calcium: {
        min: number,
        max: number,
      },
      potassium: {
        min: number,
        max: number,
      },
      iron: {
        min: number,
        max: number,
      }
    }
  }
}