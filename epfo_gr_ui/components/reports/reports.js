import { LitElement, html, css } from "lit";
import { commonStyles } from "../commonStyles";
import "@lion/input-datepicker/define";
import "@lion/button/define";
import Fontawesome from "lit-fontawesome";
import { ReportsService } from "../../services/reports.service";
import "../search_result/search-result";
import { reportColumns, highestVisitorTableCols, highestPendingTableCols } from "../../configs/table.config";
import { formStyles } from "./reports.style";
import { renderCell } from "../utils";

export class Reports extends LitElement {
  static get properties() { 
    return {
      loading: {type: Boolean},
      reportData: {type: Object},
      topEntities: {type: Object},
      topPendingEntities: {type: Object}
    }
  }

  constructor() {
    super();
    this.reportData = null;
    this.topEntities = null;
    this.topPendingEntities = null;
    this.convertReportandDownload = this.convertReportandDownload.bind(this);
    this.setTopEntities = this.setTopEntities.bind(this);
    this.setTopPendingEntities = this.setTopPendingEntities.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadTopEntities();
    this.loadTopPending();
  }

  static styles = [Fontawesome, commonStyles, formStyles];

  update(changedProps) {
    super.update();
  }

  convertReportandDownload(jsonReport){
    this.loading = false;
    // Convert to Excel or Printable
    this.reportData = jsonReport;
  }

  setTopPendingEntities(entitiesData){
    this.topPendingEntities = entitiesData;
  }

  setTopEntities(entitiesData){
    this.topEntities = entitiesData;
  }

  loadTopPending(){
    ReportsService.getTopPendingEntities(this.setTopPendingEntities);
  }

  loadTopEntities(){
    ReportsService.getTopEntities(this.setTopEntities);
  }

  showDropdown(){
      if(this.shadowRoot.querySelector('input[name="type"]:checked').value === 'grievance_section'){
        this.shadowRoot.querySelector('.grvnc-section').style.display = 'block';
        this.shadowRoot.querySelector('.grvnc-category').style.display = 'none';
      } else {
        this.shadowRoot.querySelector('.grvnc-section').style.display = 'none';
        this.shadowRoot.querySelector('.grvnc-category').style.display = 'block';
      }

  }

  getReportType(){
      let selectEl;
    if(this.shadowRoot.querySelector('input[name="type"]:checked').value === 'grievance_section'){
        selectEl = this.shadowRoot.querySelector('select[name="section"]');
        return html `Section : ${selectEl.options[selectEl.selectedIndex].innerHTML}`
      } else {
        selectEl = this.shadowRoot.querySelector('select[name="category"]');
        return html `Category : ${selectEl.options[selectEl.selectedIndex].innerHTML}`
      }
  }

  printTopEntries(selector){
    this.printContent(selector);
  }

  printReport(){
    this.printContent(".printable");
    // a.print();
  }

  printContent(selector){
    var divContents = this.shadowRoot.querySelector(selector).innerHTML;
    var a = window.open('', '', 'height=768, width=1024');
    a.document.write('<html>');
    a.document.write('<link rel="stylesheet" href="/components/reports/report.print.css" type="text/css" />');
    a.document.write('<body >');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    setTimeout(function(){a.print();},1000);
  }

  downloadReport(){
      const fromDate = this.shadowRoot.querySelector('input[name="fromDate"]').value + ' ' + '00:00:00';
      const toDate = this.shadowRoot.querySelector('input[name="toDate"]').value + ' ' + '23:59:59';
      let type = this.shadowRoot.querySelector('input[name="type"]:checked').value;
      if(!fromDate || !toDate || !type){
          // Show error
          return;
      }
      if(type === "grievance_section"){
        type = "section"
      };
      this.loading = true;
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
                <h1>Generate Reports</h1>
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
                    <option value="all">All</option>
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
                    <option value="all">All</option>
                    <option value="Death_case">Death Case</option>
                    <option value="Withdraw_F19">Withdrawal Form 19 </option>
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
                ${this.loading ? 
                html `<div class="spinner-container"><loading-spinner></loading-spinner></div>` :
                html ``}
                ${ this.reportData ? html `
                    <div class="printable">
                        <div class="report-header"> Report Name : ${this.shadowRoot.querySelector('input[name="type"]:checked').value === 'grievance_section' ? 'Section Report' : 'Category report'} </div>
                        <div class="report-header">${this.getReportType()}</div>
                        <div class="report-header">Period of report : from ${this.shadowRoot.querySelector('input[name="fromDate"]').value} to ${this.shadowRoot.querySelector('input[name="toDate"]').value}</div>
                        <div class="report-header">Report generated On : ${ new Date().toLocaleDateString() + new Date().toLocaleTimeString() }</div>

                        <div class="table">
                            ${reportColumns.map((col) => col.header ? html`<div class="header">${col.header}</div>` : html `<div class="header"></div>` )}
                            ${this.reportData.map((row) => {
                                return reportColumns.map((col) => col.path ? html`<div>${renderCell(col, row)}</div>` : html `<div class="edit-cell" title="Edit user" @click=${() => this.editVisitor(row)}><i class="fas fa-user-edit edit-icon"></i></div>`);
                            })}
                        </div>

                        <!-- <search-result .mode=${`report`} .rows=${this.reportData}></search-result> -->
                    </div>
                    <div class="action-container"><lion-button @click=${this.printReport}>Print Report</lion-button></div>
                ` : html ``}
                <h2>Top Entities :</h2>
                <div class="left-section">
                  <h3>Top visitors</h3>
                    <div class="top-visitors">
                      ${this.topEntities ?
                      html `
                      <div class="top-visitors-table">
                        <div class="table top-entries-table">
                          ${highestVisitorTableCols.map((col) => col.header ? html`<div class="header">${col.header}</div>` : html `<div class="header"></div>` )}
                          ${this.topEntities.map((row) => {
                              return highestVisitorTableCols.map(col => html`<div>${renderCell(col, row)}</div>`);
                          })}
                      </div>
                      </div>
                      <div class="action-container"><lion-button @click=${() => this.printTopEntries('.left-section')}>Print</lion-button></div>
                      ` : 
                      html ``}
                  </div>
                </div>
                <div class="right-section">
                  <h3>Top Pending Grievances</h3>
                    <div class="top-grivances">
                    ${this.topPendingEntities ?
                        html `
                        <div class="top-grievances-table"></div>
                          <div class="table top-entries-table">
                            ${highestPendingTableCols.map((col) => col.header ? html`<div class="header">${col.header}</div>` : html `<div class="header"></div>` )}
                            ${this.topPendingEntities.map((row) => {
                                return highestPendingTableCols.map(col => html`<div>${renderCell(col, row)}</div>`);
                            })}
                        </div>
                        </div>
                        <div class="action-container"><lion-button @click=${() => this.printTopEntries('.right-section')}>Print</lion-button></div>
                        ` : 
                        html ``}
                    </div>
                  </div>
                </div>
            </div>
        </div>`;
  }
}

customElements.define("reports-view", Reports);
