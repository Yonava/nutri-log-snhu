export interface Item {
  name: string;
  calories: number;
  _id: string;
}

export interface DateItem {
  month: string;
}

export interface UndoItem extends Item {
  index: number;
}