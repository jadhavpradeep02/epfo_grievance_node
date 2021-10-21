import { LitElement, html, css } from "lit";
import "@lion/button/define";
import { commonStyles } from "../commonStyles";
import { AuthService } from "../../services/authentication.service";

export class LoginForm extends LitElement {
  static properties = {
  };

  constructor(){
    super();
  }

  static styles = [
    commonStyles,
    css`
    input {
        width: 300px;
    }

    .login-form{
        margin: auto;
        text-align: center;
        padding: 2em;
        margin: 1em;
    }
    `,
  ];

  async loadVisitors(){
    this.rows = await fetchVisitors();
    console.log(this.rows)
    // this.rows = this.users;
  }

  renderError() {
    if (this.noSearchString) {
      return html`<div class="error-div">
        Invalid login details.
      </div>`;
    } else {
      return "";
    }
  }

  tryLogin(){
    AuthService.login();
    this.dispatchEvent( new CustomEvent('navigateTo',{ bubbles: true, composed: true, detail:{"name":"home"}}));
  }

  render() {
    return html`
      <div class="launch-block">
        <form name="loginForm" class="login-form">
            <h3>Enter login details</h3>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            name="search"
          /><br />
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            name="search"
          /><br />
          <div class="options-container">
            <lion-button @click=${this.tryLogin}>Login</lion-button>
          </div>
        </form>
      </div>
      ${this.renderError()}
    `;
  }
}

customElements.define("login-form", LoginForm);
