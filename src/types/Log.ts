interface GenericItem {
  _id: string;
  name: string;
  calories: number;
  macro: Macro;
}

export interface LoggedItem extends GenericItem {
  dateAdded: string;
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

// no id because it's pre database
export interface CustomItem {
  name: string,
  calories: number,
  macro: Macro,
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

export interface Macro {
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