import { NutritionData } from "./Vuex";

export interface LoggedItem extends UnloggedItem {
  dateAdded: Date;
}

export interface UnloggedItem extends NutritionData {
  _id: string;
  name: string;
  meal: string | null;
  region: string | null;
}

export interface DisplayItem {
  _id: string,
  name: string,
  type: string,
  time: "breakfast" | "lunch" | "dinner" | "snack" | null,
  calories: number;
  measurement: {
    value: number;
    unit: string;
  },
  macro: Macronutrients;
  allergens: Allergens;
}

export interface Allergens {
  gluten: boolean;
  peanuts: boolean;
  shellfish: boolean;
  tree_nuts: boolean;
  wheat: boolean;
  soy: boolean;
  milk: boolean;
  eggs: boolean;
  fish: boolean;
}

export interface Macronutrients {
  carbohydrates: {
    total: number;
    added_sugars: number;
    sugars: number;
  },
  fat: {
    total: number;
    saturated: number;
    trans: number;
  },
  protein: number;
  fiber: number;
  sodium: number;
  cholesterol: number;
  calcium: number;
  potassium: number;
  iron: number;
}

export interface DateTag {
  month: number;
  day: number;
  year: number;
}

export interface UndoItem extends LoggedItem {
  index: number;
}