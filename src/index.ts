import { PhotoEditor, storage } from './PhotoEditor'
import './global.scss'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector<HTMLDivElement>('#photo-editor')
  const photoEditor = new PhotoEditor(container, {
    storage: new storage.LocalStorageStorage()
  })

  photoEditor.render()
})
