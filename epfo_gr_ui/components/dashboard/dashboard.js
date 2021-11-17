import { LitElement, html } from "lit";
import { commonStyles } from "../commonStyles";
import "@lion/input-datepicker/define";
import "@lion/button/define";
import Fontawesome from "lit-fontawesome";

export class Dashboard extends LitElement {
  static get properties() { 
    return {
      loading: {type: Boolean},
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  static styles = [Fontawesome, commonStyles];

  update(changedProps) {
    super.update();
  }

  render() {
    return html`<div>This is dashboard</div>`;
  }
}

customElements.define("dash-board", Dashboard);
