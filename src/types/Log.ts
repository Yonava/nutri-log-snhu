interface GenericItem {
  _id: string;
  name: string;
  calories: number;
  macro: Macronutrients;
}

export interface LoggedItem extends GenericItem {
  dateAdded: Date;
}

export interface UnloggedItem extends GenericItem {
  type: string,
  time: "breakfast" | "lunch" | "dinner" | "snack" | null,
  allergens: Allergens;
  measurement: {
    value: number;
    unit: string;
  },
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