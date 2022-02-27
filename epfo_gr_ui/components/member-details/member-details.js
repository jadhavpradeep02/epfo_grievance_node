import { LitElement, html, css } from "lit";
import "@lion/button/define";
import { commonStyles } from "../commonStyles";
import { VisitorService } from "../../services/visitor.service";
import { AuthService } from "../../services/authentication.service";
import { grievanceColumnsMember } from "../../configs/table.config";
import { grievanceTableStyles } from "../../configs/table.styles";
import { renderCell } from "../utils";

export class MemberDetails extends LitElement {
  static properties = {
    rows: [],
    colDef: []
  };

  constructor(){
    super();
    this.loadMemberData();
    this.colDef = [...grievanceColumnsMember];
    this.rows = [];
  }

  static styles = [
    commonStyles,
    grievanceTableStyles,
    css`
    .member-details{
        padding: 1em;
        text-align: center;
    }
    h2{
      text-align: center;
    }
    h3{
      text-align: left;
    }
    `,
  ];

  async loadMemberData(){
    this.loading = true;
    this.rows = await VisitorService.fetchMemberData(this.getUANFromURL());
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

  printReport(){
    var divContents = this.shadowRoot.querySelector(".data-table  ").innerHTML;
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

  getUANFromURL(){
    var url_string = window.location.href.split('?')[1]; //window.location.href
    var url = new URLSearchParams(url_string);
    return url.get("uan");
  }

  render() {
    return html`
      <div class="member-details launch-block">
          <h2>Member Data</h2>
          ${this.rows.length ? 
        html `
          <h2>${this.rows[0].member_name}</h2>
          <h3>Contact: ${this.rows[0].member_phone}</h3>
          <h3>UAN: ${this.rows[0].uan}</h3>
          <h3>PF Account Number: ${this.rows[0].pf_account_no}</h3>
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
        </div>
      ${this.renderError()}
    `;
  }
}

customElements.define("member-details", MemberDetails);
