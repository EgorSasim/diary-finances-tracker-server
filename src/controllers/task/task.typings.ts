import { Space } from '../space/space.typings';

export interface Task {
  id: number;
  title: string;
  creationDate: Date;
  description?: string;
  priority?: TaskPriority;
  startDate?: Date;
  endDate?: Date;
  reminder?: Date;
  reccurance?: TaskReccurance;
  status: TaskStatus;
  color?: string;
}

export interface TaskWithSpaceIds extends Task {
  spaceIds: Space['id'][];
}

export interface TaskWithSpaces extends Task {
  spaces: Pick<Space, 'id' | 'name'>[];
}

export interface TaskSearchParams {
  title?: string;
  creationDate?: Date;
  description?: string;
  priority?: TaskPriority;
  startDate?: Date;
  endDate?: Date;
  status?: TaskStatus;
  color?: string;
}

export type TaskStatus = 'NoStatus' | 'ToDo' | 'InProgress' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface TaskReccurance {
  interval: number;
  type: TaskReccuranceType;
  daysOfWeek?: string[];
  daysOfMonth?: number[];
}

export type TaskReccuranceType = 'Daily' | 'Weekly' | 'Monthly';
