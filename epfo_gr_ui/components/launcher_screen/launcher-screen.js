import { LitElement, html, css } from "lit";
import "@lion/button/define";
import { commonStyles } from "../commonStyles";
import '../search_result/search-result.js';
import { VisitorService } from "../../services/visitor.service";
import { memberSearchUrl } from "../../configs/api.config";
import { AuthService } from "../../services/authentication.service";

export class LauncherScreen extends LitElement {
  static properties = {
    noSearchString: false,
    userData: [],
    rows: [],
    successMsg: ''
  };

  constructor(){
    super();
    this.rows = [];
    this.successMsg = '';
    // this.loadVisitors();
  }

  static styles = [
    commonStyles,
    css`
      form {
        text-align: center;
        padding: 2em;
      }
    `,
  ];

  async loadVisitors(){
    this.loading = true;
    this.rows = await VisitorService.fetchVisitors();
    // console.log(this.rows)
    this.loading = false;
    // this.rows = this.users;
  }

  renderError() {
    if (this.noSearchString) {
      return html`<div class="error-div">
        No Search string! Please enter something to search
      </div>`;
    } else {
      return "";
    }
  }
  renderSuccess() {
    if (this.successMsg) {
      return html`<div class="success-div">
        ${this.successMsg}
        <span @click=${this.clearSuccessMsg} class="error-close">X</span>
      </div>`;
    } else {
      return "";
    }
  }

  clearSuccessMsg(){
    this.successMsg = '';
  }

  async onSearch(event) {
    this.rows = [];
    this.noSearchString = false;
    this.successMsg = '';
    if (this.renderRoot.querySelector("#search").value) {
      await fetch(memberSearchUrl(), {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthService.addBearerAuth()
        },
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
        body: JSON.stringify({
          by: this.renderRoot.querySelector('[name="by"]:checked').attributes['data-name'].value, 
          value: this.renderRoot.querySelector("#search").value,
          pendingOnly: true 
        })
      }).then((response) => response.json())
      .then((respJSON) => {
        this.rows = respJSON;
      })
    } else {
      this.noSearchString = true;
      this.successMsg = '';
    }
  }

  closeSuccess(){
    this.successMsg = "Closed grievance successfully"
  }

  addEntry() {
    window.location.href = "#add";
  }

  render() {
    return html`
      <div class="launch-block">
        <form name="searchForm" action="javascript:void(0);" class="search-form">
          <input
            type="text"
            id="search"
            placeholder="Enter UAN, Phone number or email to search"
            name="search"
          /><br />

          <input type="radio" id="phone" name="by" value="phone" data-name="visitor_mobile" checked/><label for="phone">Phone</label>
          <input type="radio" id="email" name="by" value="email" data-name="visitor_email" /><label for="email">Email</label>
          <input type="radio" id="uan" name="by" value="uan" data-name="uan" /><label for="uan">UAN</label>
          <input type="radio" id="epfo" name="by" value="epfo" data-name="pf_account_no" /><label for="pf_account_no">PF Account No.</label>
          <input type="radio" id="ppo" name="by" value="ppo" data-name="ppo_number" /><label for="ppo">PPO No.</label>
          <div class="options-container">
            <lion-button @click=${this.onSearch}>Search</lion-button>
            <!-- <lion-button @click=${this.addEntry}>+ Add New</lion-button> -->
          </div>
        </form>
      </div>
      ${this.renderError()}
      ${this.renderSuccess()}
      <search-result @successClose=${this.closeSuccess} .rows=${this.rows} .loading=${this.loading} .mode=${`searchAndClose`}></search-result>
    `;
  }
}

customElements.define("launcher-screen", LauncherScreen);
