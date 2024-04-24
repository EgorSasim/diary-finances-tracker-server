import { SpaceEntity } from 'src/model/space.entity';
import { Space, SpaceSearchParams } from './space.typings';

export function mapSpaceEntityToSpace(entity: SpaceEntity): Space {
  return {
    id: entity.id,
    name: entity.name,
    noteIds: entity?.notes ? entity.notes.map((note) => note.id) : [],
    taskIds: entity.tasks ? entity.tasks.map((task) => task.id) : [],
  };
}

export function getSpaceSearchParamsTruthyTypes(
  searchParams: SpaceSearchParams,
): SpaceSearchParams {
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === 'null' || value === 'undefined') {
      searchParams[key] = null;
    }
  });
  return searchParams;
}
