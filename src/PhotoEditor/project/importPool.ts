// Purpose of this file is to avoid circular dependency between project files
export * from './Project'
export * from './FileProject'
export * from './DescriptionProject'

export type Description = {
  name: string
  canvas: {
    width: number
    height: number
    photo: {
      width: number
      height: number
      offsetLeft: number,
      offsetTop: number
      data: string
    }
  }
}
