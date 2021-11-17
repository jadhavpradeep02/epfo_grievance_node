import { LitElement, html, css } from "lit";
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

  static styles = [Fontawesome, commonStyles,
css ` .title { margin: 25px; padding : 25px }`];

  update(changedProps) {
    super.update();
  }

  render() {
    return html`<div class="launch-block form">
            <div  class="title">This is dashboard</div>
        </div>`;
  }
}

customElements.define("dash-board", Dashboard);
