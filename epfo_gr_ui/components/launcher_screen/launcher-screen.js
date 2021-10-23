import { LitElement, html, css } from "lit";
import "@lion/button/define";
import { commonStyles } from "../commonStyles";
import '../search_result/search-result.js';
import { VisitorService } from "../../services/visitor.service";

export class LauncherScreen extends LitElement {
  static properties = {
    noSearchString: false,
    userData: [],
    rows: []
  };

  constructor(){
    super();
    this.rows = [];
    this.loadVisitors();
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
    console.log(this.rows)
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

  onSearch(event) {
    this.rows = [];
    this.noSearchString = false;
    if (this.renderRoot.querySelector("#search").value) {
    } else {
      this.noSearchString = true;
    }
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
            placeholder="Enter UAN, Phone number or email to search"
            name="search"
          /><br />
          <div class="options-container">
            <lion-button @click=${this.onSearch}>Search</lion-button>
            <lion-button @click=${this.addEntry}>+ Add New</lion-button>
          </div>
        </form>
      </div>
      ${this.renderError()}
      <search-result .rows=${this.rows} .loading=${this.loading}></search-result>
    `;
  }
}

customElements.define("launcher-screen", LauncherScreen);
