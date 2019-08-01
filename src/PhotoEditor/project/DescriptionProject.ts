import { Description, Project } from './importPool'

export class DescriptionProject extends Project {
  constructor (description: Description) {
    super()
    this.description = description
  }
}
