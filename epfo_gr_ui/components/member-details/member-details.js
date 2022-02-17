import { LitElement, html, css } from "lit";
import "@lion/button/define";
import { commonStyles } from "../commonStyles";
import { VisitorService } from "../../services/visitor.service";
import { AuthService } from "../../services/authentication.service";

export class MemberDetails extends LitElement {
  static properties = {
  };

  constructor(){
    super();
    this.loadMemberData();
  }

  static styles = [
    commonStyles,
    css`
    .member-details{
        padding: 1em;
        text-align: center;
    }`,
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
      ${this.renderError()}
    `;
  }
}

customElements.define("member-details", MemberDetails);
