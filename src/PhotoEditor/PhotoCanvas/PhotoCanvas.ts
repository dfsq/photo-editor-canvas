import { LitElement, html, customElement, property, css } from 'lit-element'
import getCoverSize from '@agilie/canvas-image-cover-position'

import { Project } from '../project'

type CoverParams = {
  offsetLeft: number
  offsetTop: number
  width: number
  height: number
}

@customElement('photo-canvas')
export class PhotoCanvas extends LitElement {
  ctx: CanvasRenderingContext2D
  image: HTMLImageElement
  moveOffset: number = 50
  @property({ type: Number }) width: number
  @property({ type: Number }) height: number
  @property({ type: Object }) project: Project;
  @property({ type: Object }) coverParams: CoverParams

  render () {
    return html`
      <div class="root">
        ${!this.project ? html`<div class="placeholder">Upload new photo or select existing project</div>` : ''}
      
        <div class="canvas">
          <canvas width="${this.width}" height="${this.height}"></canvas>  
          <div class="buttons">
            <button @click=${this.move(-1)}>Move left</button>
            <button @click=${this.move(1)}>Move right</button>
          </div>
        </div>
      </div>
    `
  }

  firstUpdated() {
    this.ctx = this.shadowRoot.querySelector('canvas').getContext('2d')
  }

  updated() {
    if (this.project) {
      this.getImage((image: HTMLImageElement) => {
        this.drawImage(image)
      })
    }
  }

  getImage (callback) {
    const image = new Image()
    const url = this.project.file ? URL.createObjectURL(this.project.file) : this.project.description.canvas.photo.data

    image.onload = () => {
      this.image = image
      callback(image)
    }
    image.src = url
  }

  drawImage (image: HTMLImageElement) {
    this.coverParams = this.coverParams || getCoverSize(
      image.naturalWidth,
      image.naturalHeight,
      this.ctx.canvas.width,
      this.ctx.canvas.height,
    )

    this.ctx.clearRect(0, 0, this.coverParams.width, this.coverParams.height)
    this.ctx.drawImage(
      image,
      this.coverParams.offsetLeft,
      this.coverParams.offsetTop,
      this.coverParams.width,
      this.coverParams.height
    )
  }

  move (direction) {
    return () => {
      this.coverParams.offsetLeft += direction * this.moveOffset
      this.drawImage(this.image)
    }
  }

  get canvasDescription () {
    return {
      width: this.width,
      height: this.height,
      photo: {
        ...this.coverParams,
        data: this.ctx.canvas.toDataURL(),
      }
    }
  }

  static get styles () {
    return [
      css`
        .root {
          height: 600px;
          width: 900px;
          background: #EEE;
          display: flex;
          flex-direction: column;
          justify-content: start;
          align-items: center;
          position: relative;
        }
        .placeholder {
          font-size: 30px;
          color: #AAA;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        .placeholder + .canvas {
          display: none;
        }
      `
    ]
  }
}
