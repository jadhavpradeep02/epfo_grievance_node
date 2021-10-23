import { html, css } from "lit";
import "./components/header-element.js";
import { commonStyles } from "./components/commonStyles.js";
import { RouterMixin } from "./router.js";
import { AuthService } from "./services/authentication.service.js";


export class GrvncApp extends RouterMixin {
  static styles = [commonStyles,
  css `
  .env-selector{
    position: absolute;
    bottom: 0px;
  }

  .env-selector select{
    background-color: var(--british-racing-green);
    color: white;
  }
  `];

  constructor(){
    super();
    this.addEventListener('navigateTo', (e) => {
      console.log(e);
      window.location.href = `#${e.detail.name}`;
      /* if(e.detail.name){
        this.navigateTo(e.detail.name);
      } */
    });
  }

  render() {
    return html`
      <header-element .showUser=${AuthService.checkAuth()}></header-element>
      ${this.renderRoute()}
      <div class="env-selector">
      <select name="env" id="env">
        <option value="local" @click=${this.selectLocal}>local</option>
        <option value="online" @click=${this.selectOnline}>online</option>
      </select>
      </div>
    `;
  }
}

customElements.define("grvnc-app", GrvncApp);
