import { LitElement, html, css } from "lit";
import "@lion/button/define";
import { commonStyles } from "../commonStyles";
import { AuthService } from "../../services/authentication.service";
import './../spinner.js';

export class LoginForm extends LitElement {
  static properties = {
    invalidInput: false,
    loading: false
  };

  constructor() {
    super();
    this.invalidInput = false;
    this.loginSuccess = this.loginSuccess.bind(this);
    this.loginFailed = this.loginFailed.bind(this);
  }

  static styles = [
    commonStyles,
    css`
      input {
        width: 300px;
        margin-bottom: 1em;
      }

      .login-form {
        margin: auto;
        text-align: center;
        padding: 2em;
        margin: 1em;
      }

      h3 {
        color: var(--british-racing-green);
      }
    `,
  ];

  async loadVisitors() {
    this.rows = await fetchVisitors();
    console.log(this.rows);
    // this.rows = this.users;
  }

  renderError() {
    if (this.invalidInput) {
      return html`<div class="error-div">
        Error : Invalid login details.
        <span
          @click=${() => {
            this.invalidInput = false;
          }}
          class="error-close"
          >X</span
        >
      </div>`;
    } else {
      return "";
    }
  }

  loginFailed() {
    this.loading = false;
    this.invalidInput = true;
  }

  loginSuccess(data) {
    this.loading = false;
    this.dispatchEvent(
      new CustomEvent("navigateTo", {
        bubbles: true,
        composed: true,
        detail: { name: "add" },
      })
    );
  }

  tryLogin() {
    this.loading = true;
    this.invalidInput = false;
    const form = this.shadowRoot.querySelector("form");
    if (form.checkValidity()) {
      const rawFormData = new FormData(form);
      const formData = Object.fromEntries(rawFormData.entries());
      AuthService.login(formData, this.loginSuccess, this.loginFailed);
    } else {
      this.invalidInput = true;
    }
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
              name="username"
              required
            /><br />
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              name="password"
              required
            /><br />
            <div class="options-container">
            ${this.loading ? 
                html `<div class="spinner-container"><loading-spinner></loading-spinner></div>` :
                html `
              <lion-button @click=${this.tryLogin}>Login</lion-button>
              `}
            </div>
          </form>
        
      </div>
      ${this.renderError()}
    `;
  }
}

customElements.define("login-form", LoginForm);
