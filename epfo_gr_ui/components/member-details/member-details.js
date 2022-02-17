import { LitElement, html, css } from "lit";
import "@lion/button/define";
import { commonStyles } from "../commonStyles";
import { VisitorService } from "../../services/visitor.service";
import { AuthService } from "../../services/authentication.service";
import { grievanceColumns } from "../../configs/table.config";
import { grievanceTableStyles } from "../../configs/table.styles";

export class MemberDetails extends LitElement {
  static properties = {
    rows: [],
    colDef: []
  };

  constructor(){
    super();
    this.loadMemberData();
    this.colDef = [...grievanceColumns];
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

  getUANFromURL(){
    var url_string = window.location.href.split('?')[1]; //window.location.href
    var url = new URLSearchParams(url_string);
    return url.get("uan");
  }

  render() {
    return html`
      <div class="member-details launch-block">
          <h2>Member Data</h2>
          <label>Get member data by UAN : ${this.getUANFromURL()}</label><br/><br/>

          Data Needed from API :<br>
          - List of all grievances of this Member<br>
      </div>
      ${this.rows.length ? 
        html `<div>
          <h2>${this.rows[0].member_name}</h2>
          <h3>Contact: ${this.rows[0].member_phone}</h3>
          <h3>UAN: ${this.rows[0].uan}</h3>
          <h3>PAF Account Number: ${this.rows[0].pf_account_no}</h3>
          <div>
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

customElements.define("member-details", MemberDetails);
