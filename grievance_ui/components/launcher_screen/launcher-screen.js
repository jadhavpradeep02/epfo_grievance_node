import { LitElement, html, css } from "lit";
import "@lion/button/define";
import { commonStyles } from "../commonStyles";
import { cols } from "../../mocks/dummyData.js";
import { fetchVisitors } from "../../services/visitor.service";

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

      .search-result {
        padding: 2em 1em;
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
        No Search string! Please enter something to search
      </div>`;
    } else {
      return "";
    }
  }

  onSearch(event) {
    this.noSearchString = false;
    if (this.renderRoot.querySelector("#search").value) {
    } else {
      this.noSearchString = true;
    }
  }

  addEntry() {
    window.location.href = "#add";
  }

  renderVisitorsTable() {
    if(this.rows.length){
      return html` <div class="table">
      ${cols.map((col) => html`<div class="header">${col.header}</div>`)}
      ${this.rows.map((row) => {
        return cols.map((col) => html`<div>${row[col.path]}</div>`);
      })}
    </div>`;
    }  else {
      html `<span>ille</span>`
    }
    
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
      <div class="launch-block">
        <!-- Search Result -->
        <div class="search-result">
          <h3>Recent Visitors:</h3>
          ${this.renderVisitorsTable()}
        </div>
      </div>
    `;
  }
}

customElements.define("launcher-screen", LauncherScreen);
