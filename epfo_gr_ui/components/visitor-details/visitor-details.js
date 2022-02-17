import { LitElement, html, css } from "lit";
import "@lion/button/define";
import { commonStyles } from "../commonStyles";
import { VisitorService } from "../../services/visitor.service";
import { AuthService } from "../../services/authentication.service";
import { grievanceColumns } from "../../configs/table.config";
import { grievanceTableStyles } from "../../configs/table.styles";

export class VisitorDetails extends LitElement {
  static properties = {
    rows: [],
    colDef: []
  };

  constructor(){
    super();
    this.rows = [];
    this.colDef = [...grievanceColumns];
    this.loadVisitorData();
  }

  static styles = [
    commonStyles,
    grievanceTableStyles,
    css`
    h3{
      text-align: left;
    }
    .visitor-details{
        padding: 1em;
        text-align: center;
    }`,
  ];

  async loadVisitorData(){
    this.loading = true;
    this.rows = await VisitorService.fetchVisitorData(this.getIdFromURL());
    this.loading = false;
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

  getIdFromURL(){
    var url_string = window.location.href.split('?')[1];
    var url = new URLSearchParams(url_string);
    return url.get("id");
  }

  render() {
    console.log('Rendering ....', this.rows);
    return html`
      <div class="visitor-details launch-block">
      <h2>Visitor Data:</h2>
     
      ${this.rows.length ? 
        html `<div>
          <h2>${this.rows[0].visitor_name}</h2>
          <h3>Contact: ${this.rows[0].visitor_mobile}</h3>
          <h3>Email: ${this.rows[0].visitor_email}</h3>
          <div class="table grievance-table">
            ${this.colDef.map((col) => col.header ? html`<div class="header">${col.header}</div>` : html `<div class="header"></div>` )}
            ${this.rows.map((row) => {
              return this.colDef.map((col) => col.path ? html`<div>
                ${
                  (col.type && col.type === "datetime") ? 
                  html `${new Date(row[col.path]).toLocaleDateString()}`:
                  html `${row[col.path]}`
                }
              </div>` : html ``);
            })}
          </div>
        </div>`
        : 
        html ``}
         </div>
      ${this.renderError()}
    `;
  }
}

customElements.define("visitor-details", VisitorDetails);
