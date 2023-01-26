export interface LoggedItem extends UnloggedItem {
  dateAdded: Date;
}

export interface UnloggedItem {
  name: string;
  calories: number;
  _id: string;
}

export interface DateItem {
  month: string;
}

export interface UndoItem extends LoggedItem {
  index: number;
}