import { SpaceEntity } from 'src/model/space.entity';
import { Space } from './space.typings';

export function mapSpaceEntityToSpace(entity: SpaceEntity): Space {
  return {
    id: entity.id,
    name: entity.name,
    noteIds: entity?.notes ? entity.notes.map((note) => note.id) : [],
    taskIds: entity.tasks ? entity.tasks.map((task) => task.id) : [],
  };
}
