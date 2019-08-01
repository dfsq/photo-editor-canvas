import { IPhotoEditorStorage } from './index'
import {Project} from "../project";

export class LocalStorageStorage implements IPhotoEditorStorage {
  private storageKey = 'photoProjects'

  private get storage () {
    return window.localStorage
  }

  saveProject (project: Project) {
    const data = JSON.parse(this.storage.getItem(this.storageKey) || '[]')
    data.push(project.description)

    this.storage.setItem(this.storageKey, JSON.stringify(data))

    return Promise.resolve(project)
  }
  
  loadProjects () {
    const data = JSON.parse(this.storage.getItem(this.storageKey) || '[]')
    return Promise.resolve(data)
  }
}
