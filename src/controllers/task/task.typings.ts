import { User } from '../user/user.typings';

export interface Task {
  id: number;
  title: string;
  readonly creationDate: Date;
  description?: string;
  priority?: TaskPriority;
  startDate?: Date;
  endDate?: Date;
  reminder?: Date;
  reccurance?: TaskReccurance;
  user: User;
  status: TaskStatus;
}

export interface TaskSearchParams {
  title?: string;
  creationDate?: Date;
  description?: string;
  priority?: TaskPriority;
  startDate?: Date;
  endDate?: Date;
  status?: TaskStatus;
}

export type TaskStatus = 'ToDo' | 'InProgress' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface TaskReccurance {
  interval: number;
  type: TaskReccuranceType;
  daysOfWeek?: string[];
  daysOfMonth?: number[];
}

export type TaskReccuranceType = 'Daily' | 'Weekly' | 'Monthly';
