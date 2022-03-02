import { LitElement, html, css } from "lit";
import "@lion/button/define";
import { commonStyles } from "../commonStyles";
import { VisitorService } from "../../services/visitor.service";
import './../spinner.js';
import { renderCell } from '../utils';
import { usersColumns as colDef } from "../../configs/table.config";

export class AddUser extends LitElement {
  static properties = {
    invalidInput: false,
    loading: false,
    errorText: String,
    successText: String,
    usersList: Object
  };

  constructor() {
    super();
    this.invalidInput = false;
    this.errorText = '';
    this.successText = '';
    this.AddUserFailed = this.AddUserFailed.bind(this);
    this.AddUserSuccess = this.AddUserSuccess.bind(this);
    this.fetchUsers();
  }

  static styles = [
    commonStyles,
    css`
      input {
        width: 300px;
        margin-bottom: 1em;
      }

      .add-user-form,
      .users-list {
        margin: auto;
        text-align: center;
        padding: 2em;
        margin: 1em;
      }

      h3 {
        color: var(--british-racing-green);
      }

      .table{
        grid-template-columns: 33% 33% 33%;
      }

    `,
  ];

  renderMessages() {
      return html`
        ${ this.errorText ? 
        html `<div class="error-div">
        ${this.errorText}
        <span
          @click=${() => {
            this.errorText = '';
          }}
          class="error-close"
          >X</span
        >
      </div>` : html ``}
      ${this.successText ? html `<div class="success-div">
        ${this.successText}
        <span
          @click=${() => {
            this.successText = '';
          }}
          class="success-close"
          >X</span
        >
      </div>` : html ``}`
  }

  async fetchUsers(){
    this.usersList = await VisitorService.fetchUsersData();
  }

  AddUserFailed({username}, error){
    this.loading = false;
    this.errorText = 'Failed to create user: '+username+'  Error: '+error;
  }

  AddUserSuccess({username}) {
    this.loading = false;
    this.clearForm();
    this.successText = 'Created user: '+username;
    /* this.dispatchEvent(
      new CustomEvent("navigateTo", {
        bubbles: true,
        composed: true,
        detail: { name: "add" },
      })
    ); */
  }

  clearForm(){
    const form = this.shadowRoot.querySelector("form");
    form.username.value = "";
    form.email.value = "";
    form.password.value = "";
    form.repassword.value = "";
  }

  tryAddUSer(){
    const form = this.shadowRoot.querySelector("form");
    if (this.checkIfvalid(form)) {
      this.closeMessages();
      let formData = this.getSanitizedFormData(form); 
      this.loading = true;
      VisitorService.addNewUser(formData, this.AddUserSuccess, this.AddUserFailed);
    } else {
      if(!form.email.checkValidity()){
        this.errorText = "Please fill valid email id";
      }
    }
  }

  getSanitizedFormData(form){
    return {
        "username": form.username.value,
        "email": form.email.value,
        "password": form.password.value,
        "role": form.role.value
    }
  }

  closeMessages(){
    this.errorText = '';
    this.successText = '';
  }

  checkIfvalid(form){
    if(!form.checkValidity()){
        this.errorText = 'Please enter valid inputs.';
        return false;
    }
    if(form.password.value !== form.repassword.value){
        this.errorText = 'Passwords do not match.';
        return false;
    }
    return true;
  }

  render() {
    return html `<div class="launch-block">

          <form name="AddUser" class="add-user-form">
            <h3>Enter User details</h3>
            <input type="text" id="username" placeholder="Enter username" name="username" required/><br />
            <input type="email" id="email" placeholder="Enter email"
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
              name="email" required /><br />
            <input type="password" id="password" placeholder="Enter password" name="password" required
            /><br />
            <input type="password" id="repassword" placeholder="Confirm password" name="repassword" required
            /><br />
            <div class="form-element">
            Select User Role: 
            <select name="role" required placeholder=" ">
              <option value="admin">Admin</option>
              <option value="user">User </option>
            </select>
          </div>
            <div class="options-container">
            ${this.loading ? 
                html `<div class="spinner-container"><loading-spinner></loading-spinner></div>` :
                html `
              <lion-button @click=${this.tryAddUSer}>Add User</lion-button>
              `}
            </div>
          </form>
      </div>
      ${this.renderMessages()}

      <div class="launch-block">
      <div class="users-list">
      ${this.usersList?.length ? html `
          <div class="table">
            ${colDef.map((col) => col.header ? html`<div class="header">${col.header}</div>` : html `<div class="header"></div>` )}
            ${this.usersList.map((row) => {
                return colDef.map((col) => col.path ? html`<div>${renderCell(col, row)}</div>` : html ``);
            })}
        </div>` : html `<span>--No users--</span>`}
      </div></div>
    `;
  }
}

customElements.define("add-user", AddUser);
