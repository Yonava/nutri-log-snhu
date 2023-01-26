import { NutritionData, AllergenData } from "./Vuex";

export interface LoggedItem extends UnloggedItem {
  dateAdded: Date;
}

export interface UnloggedItem extends NutritionData {
  _id: string;
  name: string;
  meal: string | null;
  region: string | null;
}

export interface DisplayItem extends UnloggedItem, AllergenData {
  servingSize: number;
  servingUnit: string;
}

export interface DateTag {
  month: number;
  day: number;
  year: number;
}

export interface UndoItem extends LoggedItem {
  index: number;
}