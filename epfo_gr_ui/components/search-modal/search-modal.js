import { LitElement, html, css } from "lit-element";
import { classMap } from "lit/directives/class-map.js";

class SearchModal extends LitElement {
  static get styles() {
    return css`
      :host {
        font-family: Arial, Helvetica, sans-serif;
      }
      .wrapper {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        transition: opacity 0.25s ease-in;
      }
      .wrapper:not(.open) {
        visibility: hidden;
      }
      .wrapper.open {
        align-items: center;
        display: flex;
        justify-content: center;
        width: 100vh;
        height: 100vw;
        opacity: 1;
        visibility: visible;
      }
      .overlay {
        background: rgba(0, 0, 0, 0.8);
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
      }
      .dialog {
        background: #ffffff;
        border-radius: 13px;
        width: 80%;
        padding: 1rem;
        position: absolute;
      }
      .dialog h1 {
        margin: 0 0 10px;
      }
      .dialog button{
        background-color: var(--british-racing-green);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
      }
      .action-section{
          width: 100%;
          text-align: center;
      }
      .content{
          margin: auto;
          padding: 20px;
      }
      /* .dialog button {
        background-color: #d81e5b;
        color: white;
        width: 100%;
        font-size: 16px;
        padding: 15px 32px;
        border: none;
        border-radius: 10px;
        text-decoration: none;
        display: inline-block;
        margin-top: 10px;
      } */
    `;
  }
  static get properties() {
    return {
      open: { type: Boolean },
      title: { type: String },
      text: { type: String },
      clickAction: { type: String },
    };
  }

  constructor() {
    super();
    this.open = false;
  }

  render() {
    return html`
      <div class="${classMap({ wrapper: true, open: this.open })}">
        <div class="overlay" @click="${this.close}"></div>
        <div class="dialog">
          <h1 id="title">${this.title}</h1>
          <div id="content" class="content">${this.text}</div>
          <div class="action-section">
             <button @click=${this.handleClick}>${this.clickAction}</button>
          </div>
        </div>
        
      </div>
    `;
  }

  close() {
    this.open = false;
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent("button-click"));
    this.close();
  }
}

customElements.define("search-modal", SearchModal);
