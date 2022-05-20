import { EPriority } from "./EPriority";

export interface ITodo {
  id: number;
  text: string;
  priority: EPriority;
  deadline: Date;
  isDeleted: boolean;
}
