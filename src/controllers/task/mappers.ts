import { Task, TaskSearchParams } from 'src/controllers/task/task.typings';
import { TaskEntity } from 'src/model/task.entity';

export function mapTaskToTaskEntity(task: Task): TaskEntity {
  delete task.reccurance;
  return { ...task } as TaskEntity;
}

export function setSearchParamsTuthyTypes(
  searchParams: TaskSearchParams,
): TaskSearchParams {
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === 'null' || value === 'undefined') {
      searchParams[key] = null;
    }
  });
  return searchParams;
}
