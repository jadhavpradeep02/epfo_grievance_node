import { LitElement, html, css } from "lit";
import "@lion/button/define";
import { commonStyles } from "../commonStyles";
import { VisitorService } from "../../services/visitor.service";
import { AuthService } from "../../services/authentication.service";
import { grievanceColumnsVisitor } from "../../configs/table.config";
import { renderCell } from "../utils";

export class VisitorDetails extends LitElement {
  static properties = {
    rows: [],
    colDef: []
  };

  constructor(){
    super();
    this.rows = [];
    this.colDef = [...grievanceColumnsVisitor];
    this.loadVisitorData();
  }

  static styles = [
    commonStyles,
    css`
    h3{
      text-align: left;
    }
    .table {
      grid-template-columns: 12% 12% 12% 12% 12% 12% 12% 12%; 
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

  printReport(){
    var divContents = this.shadowRoot.querySelector(".data-table").innerHTML;
    var a = window.open('', '', 'height=768, width=1024');
    a.document.write('<html>');
    a.document.write('<link rel="stylesheet" href="/components/reports/report.print.css" type="text/css" />');
    a.document.write('<body >');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    setTimeout(function(){a.print();},1000);
    // a.print();
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
          <div class="data-table">
          <div class="table grievance-table col-8">
            ${this.colDef.map((col) => col.header ? html`<div class="header">${col.header}</div>` : html `<div class="header"></div>` )}
            ${this.rows.map((row) => {
              return this.colDef.map((col) => col.path ? html`<div>${renderCell(col, row)}</div>` : html ``);
            })}
          </div>
          </div><br/><br/>
          <lion-button @click=${this.printReport}>Print Data</lion-button>
        </div>`
        : 
        html ``}
         </div>
      ${this.renderError()}
    `;
  }
}

customElements.define("visitor-details", VisitorDetails);
