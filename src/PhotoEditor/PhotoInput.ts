import { LitElement, html, customElement } from 'lit-element'

@customElement('photo-input')
export class PhotoInput extends LitElement {
  template = () => html`
    <style>
      .wrapper {
        position: relative;
        background: #bfe1ff;
        height: 40px;
        width: 150px;
      }
      .wrapper input {
        height: 100%;
        width: 100%;
        opacity: 0;
        cursor: pointer;
      }
      .wrapper .label {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
      }
    </style>
    <div class="wrapper">
      <slot class="label"></slot>
      <input type="file" accept="image/*" @change=${this.handleChange}>
    </div>
  `

  handleChange ({ target }) {
    const [ file ] = target.files
    const event = new CustomEvent('change', {
      detail: {
        file,
      },
    })

    this.dispatchEvent(event)
  }

  render () {
    return this.template()
  }
}
