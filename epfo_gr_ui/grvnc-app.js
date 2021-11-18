import { html, css } from "lit";
import "./components/header-element.js";
import { commonStyles } from "./components/commonStyles.js";
import { RouterMixin } from "./router.js";
import { AuthService } from "./services/authentication.service.js";
import { getMode, toggleMode } from "./configs/api.config.js";


export class GrvncApp extends RouterMixin {
  static styles = [commonStyles,
  css `
  .env-selector{
    position: fixed;
    width: 100%;
    text-align: right;
    color: var(--charcoal);
    bottom: 0;
    margin: 0px 0px 8px -8px;
  }

  .env-selector,
  .env-selector label{
    cursor: pointer;
  }

  .env-selector select{
    background-color: var(--british-racing-green);
    color: white;
  }
  `];

  static properties = {
    mode:''
  };

  constructor(){
    super();
    this.addEventListener('navigateTo', (e) => {
      window.location.href = `#${e.detail.name}`;
    });
    this.mode = getMode();
  }

  fakeLogin(){
    AuthService.login({ username: '123', password: '234'}, () => {window.location.href = `#add`;}, this.loginFailed);
  }

  onChange(e){
    toggleMode();
    this.fakeLogin();
    this.mode = getMode();
  }

  render() {
    return html`
      <header-element .showUser=${AuthService.checkAuth()}></header-element>
      ${this.renderRoute()}
      <div class="env-selector">
        <label class="footer-label" @click="${this.onChange}">[ ${this.mode} ]</label>
      </div>
    `;
  }
}

customElements.define("grvnc-app", GrvncApp);
