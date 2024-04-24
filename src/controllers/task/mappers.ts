import {
  TaskSearchParams,
  TaskWithSpaceIds,
} from 'src/controllers/task/task.typings';

export function setTaskSearchParamsTuthyTypes(
  searchParams: TaskSearchParams,
): TaskSearchParams {
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === 'null' || value === 'undefined') {
      searchParams[key] = null;
    }
  });
  if (searchParams.startDate) {
    searchParams.startDate = new Date(searchParams.startDate);
  }
  if (searchParams.endDate) {
    searchParams.endDate = new Date(searchParams.endDate);
  }
  return searchParams;
}

export function setTaskTuthyTypes(
  task: Partial<TaskWithSpaceIds>,
): TaskWithSpaceIds {
  Object.entries(task).forEach(([key, value]) => {
    if (value === 'null' || value === 'undefined') {
      task[key] = null;
    }
  });
  if (task.creationDate) {
    task.creationDate = new Date(task.creationDate);
  }
  if (task.startDate) {
    task.startDate = new Date(task.startDate);
  }
  if (task.endDate) {
    task.endDate = new Date(task.endDate);
  }
  if (!task.reccurance) {
    delete task?.reccurance;
  }
  return task as TaskWithSpaceIds;
}
