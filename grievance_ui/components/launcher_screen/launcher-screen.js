import { LitElement, html, css } from "lit";
import "@lion/button/define";
import { commonStyles } from "../commonStyles";
import { rows, cols } from "../../mocks/dummyData.js";

export class LauncherScreen extends LitElement {
  static properties = {
    noSearchString: false,
  };

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
    return html` <div class="table">
      ${cols.map((col) => html`<div class="header">${col.header}</div>`)}
      ${cols.map((col) => {
        return rows.map((row) => html`<div>${row[col.path]}</div>`);
      })}
    </div>`;
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
