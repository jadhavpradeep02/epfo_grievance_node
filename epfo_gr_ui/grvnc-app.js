import { html } from "lit";
import "./components/header-element.js";
import { commonStyles } from "./components/commonStyles.js";
import { RouterMixin } from "./router.js";

export class GrvncApp extends RouterMixin {
  static styles = [commonStyles];
  render() {
    return html`
      <header-element></header-element>
      ${this.renderRoute()}
    `;
  }
}

customElements.define("grvnc-app", GrvncApp);
