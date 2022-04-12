import { LitElement, html, css } from "lit-element";
import { classMap } from "lit/directives/class-map.js";
import "../search_result/search-result.js";
import "./../spinner.js";

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
        /* visibility: hidden; */
        display: none;
      }
      .wrapper.open {
        align-items: center;
        display: flex;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        opacity: 1;
        visibility: visible;
      }
      .overlay {
        background: rgba(0, 0, 0, 0.8);
        height: 100%;
        width: 100%;
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
        text-align: center;
        margin-top: 15px;
        margin-bottom: 20px;
        color: var(--british-racing-green);
      }
      .dialog button {
        background-color: var(--british-racing-green);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        border-width: 0px;
      }
      .action-section {
        width: 100%;
        text-align: center;
        min-height: 400px;
        margin-bottom: 25px;
      }
      .spinner-container{
        text-align: center;
      }
      .content {
        margin: auto;
        padding: 20px;
        color: var(--british-racing-green);
      }
      .close-btn{
          position: absolute;
          right: 20px;
          top: 20px;
          padding: 4px 7px;
          border-radius: 25px;
          background-color: var(--british-racing-green);
          cursor: pointer;
          color: white;
          display: inline;
          font-weight: bold;
      }
      .close-btn:hover{
          background-color: var(--oxford-blue);
      }
    `;
  }
  static get properties() {
    return {
      open: { type: Boolean },
      title: { type: String },
      text: { type: String },
      clickAction: { type: String },
      data: { type: Object },
      loading: { type: Boolean },
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
          <div class="close-btn" @click="${this.close}">X</div>
          ${this.loading
            ? html`<div class="spinner-container">
                <loading-spinner></loading-spinner>
              </div>`
            : html`
                <div id="content" class="content">${this.text}</div>
                <div class="action-section">
                  ${this.mode === 'establishment' ? html `<search-result @estselected=${this.close} .rows=${this.data} .mode=${`establishment`}></search-result> <button @click=${this.close}>${this.clickAction}</button>` : html ``}
                  ${this.mode === 'visitor' ? html `<search-result @rowselected=${this.close} .rows=${this.data}></search-result> <button @click=${this.handleClick}>${this.clickAction}</button>` : html ``}
                  
                </div>
              `}
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
