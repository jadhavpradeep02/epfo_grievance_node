import { LitElement, html, css } from "lit";
import "@lion/button/define";
import { commonStyles } from "../commonStyles";
import { VisitorService } from "../../services/visitor.service";
import { AuthService } from "../../services/authentication.service";

export class VisitorDetails extends LitElement {
  static properties = {
  };

  constructor(){
    super();
    this.loadVisitorData();
  }

  static styles = [
    commonStyles,
    css`
    .visitor-details{
        padding: 1em;
        text-align: center;
    }`,
  ];

  async loadVisitorData(){
    this.loading = true;
    this.rows = await VisitorService.fetchVisitorData();
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
    return html`
      <div class="visitor-details launch-block">
      <h2>Visitor Data:</h2>
          Fetch visitor data from Id: ${this.getIdFromURL()}<br/><br/>
          Data Needed from API :<br>
          - List of all grievances of this visitor<br>
          - Total number of Visits of this visitor<br>
      </div>
      ${this.renderError()}
    `;
  }
}

customElements.define("visitor-details", VisitorDetails);
