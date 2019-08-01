import { Project, Description } from './importPool'

export class FileProject extends Project {
  constructor (file: File) {
    super()
    this.file = file
    this.name = file.name
  }

  setDescription (canvas: Description['canvas']) {
    this.description = {
      name: this.name,
      canvas,
    }
  }
}
