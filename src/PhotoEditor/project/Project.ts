import { FileProject, DescriptionProject, Description } from './importPool'

export class Project {
  file: File
  name: string
  description: Description

  static createFromFile (file: File) {
    return new FileProject(file)
  }

  static createFromDescription (description: Description) {
    return new DescriptionProject(description)
  }

  setDescription (coverParams: Description['canvas']): void {
    throw new Error('To be overloaded')
  }
}
