import { LitElement, html, css } from "lit-element";
import { classMap } from "lit/directives/class-map.js";
import Fontawesome from 'lit-fontawesome';

class AboutModal extends LitElement {
  static get styles() {
    return [ Fontawesome,
    css`
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
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
      }
      .dialog {
        background: #ffffff;
        border-radius: 13px;
        width: 500px;
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
      .close-btn{
        position: absolute;
        right: 10px;
        padding: 3px 6px;
        border-radius: 20px;
        background-color: var(--british-racing-green);
        cursor: pointer;
        color: white;
        display: inline;
        top: 10px;
        font-weight: bold;
      }
      .close-btn:hover{
        background-color: var(--oxford-blue);
      }
      .content {
        margin: auto;
        padding: 20px;
        color: var(--british-racing-green);
        text-align: center;
        padding: 2em;
        border: 1px solid var(--british-racing-green);
        border-radius: 0.5em;
        -moz-box-shadow: inset 0 0 5px #000000;
        -webkit-box-shadow: inset 0 0 5px #000000;
        box-shadow: inset 0 0 5px #000000;
      }
      .licence{
        font-size: 12px;
      }
      .dev{
        color: #16cc9f;
        font-weight: bold;
        padding: 5px;
      }
      a,
      a:visited{
        color: #196350;
        text-decoration: none;
      }
      .dev:visited{
        color: #16cc9f;
      }
      .dev-container{
        margin: 5px;
      }
    `]
  }

  static get properties() {
    return {
      open: { type: Boolean }
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
        <div class="dialog small">
          <h1 id="title">Grievance Portal v1.0</h1>
          <div class="close-btn" @click="${this.close}">X</div>
          <div class="content">
            Developers:<br>
            <div class="dev-container">
            <i class="fas fa-user-astronaut"></i>&nbsp;<a class="dev" target="_blank" href="https://www.linkedin.com/in/pradeep-jadhav-347ba325/">Pradeep Jadhav</a>
            </div>
            <div  class="dev-container">
            <i class="fas fa-user-astronaut"></i>&nbsp;<a class="dev" target="_blank" href="https://suhassanmukh.com/">Suhas Sanmukh</a>
            </div>
            
            
            <br/>
            Built using: <b><a href="https://nodejs.org/en/" target="_blank">NodeJS</a>, 
            <a href="https://lit.dev/" target="_blank">Lit</a>, 
            <a href="https://www.webcomponents.org/" target="_blank">Web Components </a>
          </b>& <b>
          <a href="https://www.mysql.com/" target="_blank">MySQL</a>
          </b>
            <br/><br/>
            <span class="licence"> Licenced under <a href="https://opensource.org/licenses/MIT">MIT</a></span>
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

customElements.define("about-modal", AboutModal);
