import { LitElement, html, css } from "lit";
import "@lion/button/define";
import { commonStyles } from "../commonStyles";
import '../search_result/search-result.js';
import { VisitorService } from "../../services/visitor.service";
import { memberSearchUrl, searchUrl } from "../../configs/api.config";
import { AuthService } from "../../services/authentication.service";
import '../spinner.js'

export class SearchPerson extends LitElement {
  static properties = {
    noSearchString: false,
    userData: [],
    rows: [],
    successMsg: {
        type: String,
        default: ''
    },
    mode: {
        type: String,
        default: 'visitor'
    },
  };

  constructor(){
    super();
    this.rows = [];
    this.successMsg = '';
    this.mode = 'visitor';
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

      h3{
          text-align: center;
          padding-top: 25px;;
      }

      .mode-choice{
          text-align: center;
      }

      .visitor-area,
      .member-area{
        margin: 20px;
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
    this.noSearchString = false;
    this.successMsg = '';
    let endpoint, jsonBody;
    if(this.mode === "visitor"){
        endpoint = searchUrl();
        jsonBody = JSON.stringify({by: this.renderRoot.querySelector('.visitor-area [name="by"]:checked').attributes['data-name'].value, value: this.renderRoot.querySelector("#search").value, search: "visitor"})
    } else {
        endpoint = memberSearchUrl();
        jsonBody = JSON.stringify({by: this.renderRoot.querySelector('.member-area [name="by"]:checked').attributes['data-name'].value, value: this.renderRoot.querySelector("#search").value, search: "member"})
    }
    if (this.renderRoot.querySelector("#search").value) {
      this.loading = true;
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthService.addBearerAuth()
        },
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
        body: jsonBody
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

  setMode(modeNew){
    if(this.mode !== modeNew ){
        this.mode = modeNew;
        this.rows = null;
    }
  }

  addEntry() {
    window.location.href = "#add";
  }

  render() {
    return html`
      <div class="launch-block">
          <h3>Search for:</h3>
          <div class="mode-choice">
            <input type="radio" id="member" @click=${() => this.setMode('member')} name="mode" value="member" /><label for="member">Member</label>
            <input type="radio" id="visitor" @click=${() => this.setMode('visitor')} name="mode" value="visitor" checked/><label for="visitor">Visitor</label>
          </div>
          
        <form name="searchForm" class="search-form">
          <input
            type="text"
            id="search"
            placeholder="Enter text to search"
            name="search"
          /><br />
        ${this.mode === "visitor" ? html `<div class="visitor-area"><input type="radio" id="phone" name="by" value="phone" data-name="visitor_mobile" checked/><label for="phone">Visitor Phone</label>
          <input type="radio" id="name" name="by" value="name" data-name="visitor_name" /><label for="name">Visitor Name</label>
          <input type="radio" id="email" name="by" value="email" data-name="visitor_email" /><label for="email">Visitor Email</label>
          <input type="radio" id="uan" name="by" value="uan" data-name="uan" /><label for="uan">UAN</label>
          <input type="radio" id="epfo" name="by" value="epfo" data-name="pf_account_no" /><label for="pf_account_no">EPFO</label></div>`
        :
        html `<div class="member-area"><input type="radio" id="phone" name="by" value="phone" data-name="member_mobile" checked/><label for="phone">Member Phone</label>
          <input type="radio" id="name" name="by" value="name" data-name="member_name" /><label for="name">Member Name</label>
          <input type="radio" id="uan" name="by" value="uan" data-name="uan" /><label for="uan">UAN</label>
          <input type="radio" id="epfo" name="by" value="epfo" data-name="pf_account_no" /><label for="pf_account_no">EPFO</label></div>`}
          
          <div class="options-container">
            <lion-button @click=${this.onSearch}>Search</lion-button>
            <!-- <lion-button @click=${this.addEntry}>+ Add New</lion-button> -->
          </div>
        </form>
      </div>
      ${this.renderError()}
      ${this.renderSuccess()}
      <search-result .rows=${this.rows} .loading=${this.loading} .mode=${this.mode === 'visitor' ? 'visitors' : 'members'}></search-result>
    `;
  }
}

customElements.define("search-person", SearchPerson);
