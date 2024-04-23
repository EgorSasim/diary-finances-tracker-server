import { NoteSearchParams } from './note.typings';

export function getNoteSearchParamsTruthyTypes(
  searchParams: NoteSearchParams,
): NoteSearchParams {
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === 'null' || value === 'undefined') {
      searchParams[key] = null;
    }
  });
  return searchParams;
}
