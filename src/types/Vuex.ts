import { DisplayItem, LoggedItem } from './Log'
import { User, MacronutrientCalibrations, MacroDisplayComponent } from './User'

export interface State {
  caloriesHidden: boolean,
  catalog: DisplayItem[],
  selectedCatalogItem: DisplayItem | null,
  clientStore: Object | null
}

export interface UserState {
  activeMacroDisplayComponents: MacroDisplayComponent[],
  macroDisplayComponents: MacroDisplayComponent[],
}

export interface LogState {
  log: LoggedItem[],
  customItems: DisplayItem[],
  selectedLogItem: LoggedItem | null
}

export interface AuthState {
  user: User | null,
  token: string | null
}

export interface ToastState {

}

export interface NutrientState {
  macronutrientCalibrations: MacronutrientCalibrations
}