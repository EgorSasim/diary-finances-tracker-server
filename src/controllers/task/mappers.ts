// export function removeExtraProperties<T extends object, U extends object>(
//   obj: T,
//   interfaceType: U,
// ): T {
//   for (const key in obj) {
//     if (!(key in interfaceType)) {
//       delete (obj as { [key: string]: any })[key];
//     }
//   }
//   console.log('object: ', obj);
//   return obj;
// }

import { Task } from 'src/controllers/task/task.typings';
import { TaskEntity } from 'src/model/task.entity';

export function mapTaskToTaskEntity(task: Task): TaskEntity {
  delete task.reccurance;
  return { ...task } as TaskEntity;
}
