import {LitElement, html, css} from 'lit';
/* import {customElement, property} from 'lit/decorators.js'; */

/* @customElement('first-element') */
export class HeaderElement extends LitElement {
  static styles = css`
    h1{
      background-color: var(--british-racing-green);
      color: white;
      text-align: center;
      padding: 12px;
      margin-bottom: 24px;

      -webkit-box-shadow: -1px 3px 5px 0px rgba(0,0,0,0.75);
      -moz-box-shadow: -1px 3px 5px 0px rgba(0,0,0,0.75);
      box-shadow: -1px 3px 5px 0px rgba(0,0,0,0.75);
    }
  `;

  render() {
    return html`
      <h1 class="container">Grievance Portal</h1>
    `;
  }
}

customElements.define('header-element', HeaderElement);