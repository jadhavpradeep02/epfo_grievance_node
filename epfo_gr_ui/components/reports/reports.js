import { LitElement, html, css } from "lit";
import { commonStyles } from "../commonStyles";
import "@lion/input-datepicker/define";
import "@lion/button/define";
import Fontawesome from "lit-fontawesome";
import { ReportsService } from "../../services/reports.service";

export class Reports extends LitElement {
  static get properties() { 
    return {
      loading: {type: Boolean},
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  static styles = [Fontawesome, commonStyles,
    css ` 
        .main { 
            padding : 40px;
        }
        h1{
            text-align: center;
        }
        .range-select{
            padding: 10px;
            text-align: center;
        }
        .range-select input{
            margin: 15px;
        }

        .form-element{
            text-align: center;
            margin: 10px;
        }

        .step-label{
            width: 100%;
            text-align: center;
            color: var(--british-racing-green);
            display: block;
            margin: 25px;
            font-size: 1.2em;
            font-weight: bold;
        }

        .action-container{
            width: 100%;
            text-align: center;
            margin: 25px;
        }
        .type-select{
            text-align: center;
        }
        
        `];

  update(changedProps) {
    super.update();
  }

  convertReportandDownload(jsonReport){
    // Convert to Excel or Printable
  }

  showDropdown(){
      debugger
      if(this.shadowRoot.querySelector('input[name="type"]:checked').value === 'grievance_section'){
        this.shadowRoot.querySelector('.grvnc-section').style.display = 'block';
        this.shadowRoot.querySelector('.grvnc-category').style.display = 'none';
      } else {
        this.shadowRoot.querySelector('.grvnc-section').style.display = 'none';
        this.shadowRoot.querySelector('.grvnc-category').style.display = 'block';
      }

  }

  downloadReport(){
      const fromDate = this.shadowRoot.querySelector('input[name="fromDate"]').value;
      const toDate = this.shadowRoot.querySelector('input[name="toDate"]').value;
      const type = this.shadowRoot.querySelector('input[name="type"]:checked').value;
      if(!fromDate || !toDate || !type){
          // Show error
          return;
      }
      ReportsService.getReports({
        "start_date": fromDate,
        "end_date": toDate,
        "type": type,
        "value": this.shadowRoot.querySelector('input[name="type"]:checked').value === 'grievance_section' ? this.shadowRoot.querySelector('select[name="section"]').value : this.shadowRoot.querySelector('select[name="category"]').value
      }, this.convertReportandDownload)
      console.log('Report generated');
  }

  render() {
    return html`
        <div class="launch-block form">
            <div class="main">
                <h1>Genrate Reports</h1>
                <label class="step-label">Step 1: Select time period</label>
                <div class="range-select">
                    From: <input name="fromDate" type="date"/>
                    To: <input name="toDate" type="date"/>
                </div>
                <label class="step-label">Step 2: Select report type</label>
                <div class="type-select">
                    <input type="radio" id="section" @click=${this.showDropdown} name="type" value="grievance_section">
                    <label for="section">Grievance Section</label>
                    <input type="radio" id="category" @click=${this.showDropdown} name="type" value="grievance_category">
                    <label for="category">Grievance Category</label>
                </div>
                <div class="form-element grvnc-section" style="display: none">
                    <label>Section</label><br>
                    <select name="section" required placeholder=" ">
                    <option value="account">Account</option>
                    <option value="pension">Pension </option>
                    <option value="compliance">Compliance</option>
                    <option value="cash">Cash</option>
                    <option value="exemption">Exemption</option>
                    <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-element grvnc-category" style="display: none">
                    <label>Grievance Category</label><br>
                    <select name="category" required placeholder=" ">
                    <option value="minor">Death Case</option>
                    <option value="withdraw_F19">Withdrawal Form 19 </option>
                    <option value="Transfer_F13">Transfer Form13</option>
                    <option value="Advance_F31">Advanced Form31</option>
                    <option value="Pension">Pension</option>
                    <option value="KYC_Update">Modify KYC</option>
                    <option value="Non_Enrollment">Non enrollment</option>
                    <option value="Other">Misc</option>
                    </select>
                </div>
                <label class="step-label">Step 2: Download Report</label>
                <div class="action-container"><lion-button @click=${this.downloadReport}>Download</lion-button></div>
                
            </div>
        </div>`;
  }
}

customElements.define("reports-view", Reports);
