import { LitElement, html, css } from "lit";
import "@lion/button/define";
import { commonStyles } from "../commonStyles";
import '../search_result/search-result.js';
import { VisitorService } from "../../services/visitor.service";
import { memberSearchUrl } from "../../configs/api.config";
import { AuthService } from "../../services/authentication.service";
import '../spinner.js'

export class SearchPerson extends LitElement {
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
  }

  static styles = [
    commonStyles,
    css`
      form {
        text-align: center;
        padding: 2em;
      }

      .spinner-container{
          text-align: center;
      }
    `,
  ];

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
    this.loading = true;
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
        body: JSON.stringify({by: this.renderRoot.querySelector('[name="by"]:checked').attributes['data-name'].value, value: this.renderRoot.querySelector("#search").value})
      }).then((response) => response.json())
      .then((respJSON) => {
        this.loading = false;
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
        <form name="searchForm" class="search-form">
          <input
            type="text"
            id="search"
            placeholder="Enter text to search"
            name="search"
          /><br />

          <input type="radio" id="phone" name="by" value="phone" data-name="member_mobile" checked/><label for="phone">Member Phone</label>
          <input type="radio" id="email" name="by" value="email" data-name="member_name" /><label for="email">Member Email</label>
          <input type="radio" id="uan" name="by" value="uan" data-name="uan" /><label for="uan">UAN</label>
          <input type="radio" id="epfo" name="by" value="epfo" data-name="pf_account_no" /><label for="pf_account_no">EPFO</label>
          <div class="options-container">
            <lion-button @click=${this.onSearch}>Search</lion-button>
            <!-- <lion-button @click=${this.addEntry}>+ Add New</lion-button> -->
          </div>
        </form>
      </div>
      ${this.renderError()}
      ${this.renderSuccess()}
      <search-result .rows=${this.rows} .loading=${this.loading} .mode=${`members`}></search-result>
    `;
  }
}

customElements.define("search-person", SearchPerson);
