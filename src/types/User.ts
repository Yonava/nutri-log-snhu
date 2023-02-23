import { UnloggedItem, LoggedItem, Macro } from './Log';

export interface UserDetail extends User {
  dailyTargets: DailyTargets;
  customItems: UnloggedItem[];
  log: LoggedItem[];
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface MacroDisplayComponent {
  component: string;
  getters: Map<string, string[]>;
  label: string;
  color: string;
  target: string;
  unit?: string;
}

export interface DailyTargets {
  calories: number,
  macro: Macro
}
