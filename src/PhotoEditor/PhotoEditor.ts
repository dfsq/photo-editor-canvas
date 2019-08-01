import { html, render } from 'lit-html'
import { until } from 'lit-html/directives/until'

import { Project } from './project'
import { IPhotoEditorStorage } from './storage'
import './PhotoInput'
import './PhotoCanvas'
import styles from './PhotoEditor.scss'
import {PhotoCanvas} from "./PhotoCanvas";

type PhotoEditorSettings = {
  storage?: IPhotoEditorStorage
}

export class PhotoEditor {
  project: Project

  template = () => html`
    <div class=${styles.root}>
      <div class=${styles.canvas}>
        <div style="height: 640px;">
          <photo-canvas 
            width="900"
            height="600"
            .project=${this.project}
           ></photo-canvas>
        </div>
        ${this.project ? html`<button @click=${this.saveProject}>SAVE PROJECT</button>` : ''}
      </div>
      <div class=${styles.sidebar}>
        <photo-input @change=${this.handleFileSelect}>
          Select image
        </photo-input>
        
        <div class=${styles.images}>
          saved projects below
          ${until(this.renderSavedProjects())}
        </div>
      </div>
    </div>
  `

  constructor (
    private container: HTMLDivElement,
    private settings: PhotoEditorSettings
  ) {}

  get photoCanvas () {
    return this.container.querySelector<PhotoCanvas>('photo-canvas')
  }

  handleFileSelect ({ detail: { file } }) {
    this.project = Project.createFromFile(file)
    this.render()
  }

  saveProject () {
    this.project.setDescription(this.photoCanvas.canvasDescription)
    this.settings.storage.saveProject(this.project)
      .then(() => this.render())

  }

  handleImportProject = (project) => () => {
    this.project = Project.createFromDescription(project)
    this.render()
  }

  render () {
    // @ts-ignore not sure why it complains here
    render(this.template(), this.container, { eventContext: this })
  }

  renderSavedProjects () {
    return this.settings.storage.loadProjects()
      .then((projects) => {
        return html`
          <ul>
            ${projects.map((project) => html`
              <li @click=${this.handleImportProject(project)}>
                ${project.name}
              </li>
            `)}
          </ul>
        `
      })
  }
}
