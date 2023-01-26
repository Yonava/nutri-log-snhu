import { Item } from './Log';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  credentials: string;
  macronutrientCalibrations: MacronutrientCalibrations;
  customItems: Item[];
  log: Item[];
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
