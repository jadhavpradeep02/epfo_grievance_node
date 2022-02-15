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
    }`,
  ];

  async loadMemberData(){
    this.loading = true;
    this.rows = await VisitorService.fetchMemberData();
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

  render() {
    return html`
      <div class="member-details launch-block">
          Member Data
      </div>
      ${this.renderError()}
    `;
  }
}

customElements.define("member-details", MemberDetails);
