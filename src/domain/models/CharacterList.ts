import type { CharacterSummary } from './Character';
import type { PageInfo } from './PageInfo';

export interface CharacterList {
  info: PageInfo;
  results: CharacterSummary[];
}
