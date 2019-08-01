import { LocalStorageStorage } from './LocalStorageStorage'
import {Project} from "../project";

export interface IPhotoEditorStorage {
  loadProjects: () => Promise<Project[]>
  saveProject: (project: Project) => Promise<Project>
}

export const storage = {
  LocalStorageStorage,
  // IndexedDBStorage,
  // MemoryStorage,
}
