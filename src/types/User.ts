import { UnloggedItem, LoggedItem } from './Log';

export interface UserDetail extends User {
  macronutrientCalibrations: MacronutrientCalibrations;
  customItems: UnloggedItem[];
  log: LoggedItem[];
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface MacronutrientCalibrations {
  targetCalories: number;
  targetCarbs: number;
  targetSugar: number;
  targetAddedSugar: number;
  targetFiber: number;
  targetFat: number;
  targetSaturatedFat: number;
  targetTransFat: number;
  targetProtein: number;
  targetSodium: number;
  targetCholesterol: number;
  targetPotassium: number;
  targetCalcium: number;
  targetIron: number;
}
