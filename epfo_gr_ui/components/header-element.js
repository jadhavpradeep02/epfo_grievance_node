import {LitElement, html, css} from 'lit';
import { AuthService } from '../services/authentication.service';
import Fontawesome from 'lit-fontawesome';

/* @customElement('first-element') */
export class HeaderElement extends LitElement {

  static properties = {
    showUser: false,
  };

  static get styles() {
    return [ Fontawesome,
      css`
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

      .logout{
        display: inline;
        position: absolute;
        top: 35px;
        right: 0px;
        font-size: 1.5em;
        color: white;
        margin: 5px 15px;
        cursor: pointer;
      }

      .logout:hover{
        color: #f05c5c;
      }
    `];
  }

  logout(){
    AuthService.logout();
  }

  render() {
    return html`
      <h1 class="container">Grievance Portal</h1>
      ${AuthService.checkAuth() ? html `<div class="logout" title="log out" @click=${this.logout}> <i class="fas fa-power-off"></i></div>` : html ``}
    `;
  }
}

customElements.define('header-element', HeaderElement);