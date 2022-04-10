import {LitElement, html, css} from 'lit';
import '@lion/button/define';
import { commonStyles } from '../commonStyles';
import { columnDefinition, reportColumns, establishmentColumns, membersColumns, visitorColumns } from '../../configs/table.config';
import { VisitorService } from '../../services/visitor.service';
import '../spinner.js';
import '../close-grvnc-modal/close-grvnc-modal.js';
import Fontawesome from 'lit-fontawesome';
import { renderCell } from '../utils';

export class SearchResult extends LitElement {

  static properties = {
    noSearchResult: true,
    rows: [],
    loading: true,
    colDef: {},
    mode: ''
  };

  static styles = [
    commonStyles,
    Fontawesome,
    css `
     .search-result {
        padding: 1em;
      }

      .spinner-container{
        text-align: center;
      }

      .edit-cell{
        text-align: center;
        font-size: 1.5em;
        color: var(--british-racing-green);
      }

      .edit-icon:hover{
        color: var(--oxford-blue);
        cursor: pointer;
        text-shadow: 4px 2px 2px rgba(150, 150, 150, 1);
      }

      /* Results table */

      .table {
        grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%; 
      }

      .table.est-table {
        grid-template-columns: 25% 25% 25% 25%; 
      }

      .table.member-table {
        grid-template-columns: 25% 25% 25% 25%; 
      }

      .table.visitors-table{
        grid-template-columns: 25% 25% 25% 25%; 
      }
    `
  ];

  constructor(){
    super();
    this.noSearchResult = true;
    this.closeGrievanceSuccess = this.closeGrievanceSuccess.bind(this);
  }

  connectedCallback(){
    super.connectedCallback();
    this.defineColumns();
  }

  defineColumns(){
    if(this.mode === "report"){
      this.colDef = [ ...reportColumns ];
    } 
    else if(this.mode === "members"){
      this.colDef = [...membersColumns];
    }
    else if(this.mode === 'establishment'){
      this.colDef = [...establishmentColumns]
    } else if( this.mode === 'visitors') {
      this.colDef = [...visitorColumns]
    }
    else {
      this.colDef = [...columnDefinition ];
    }
  }

  renderError(){
      if(this.noSearchResult){
          return html `<div class="error-div">Nothing Found! Please refine your search</div>`;
      } else {
          return '';
      }
  }

  editVisitor(visitor){
    // Show edit page with this visitor
    VisitorService.setForEdit(visitor);
    this.dispatchEvent( new CustomEvent('navigateTo',{ bubbles: true, composed: true, detail:{"name":"edit"}}));
    this.dispatchEvent( new CustomEvent('rowselected',{ bubbles: true, composed: true }));
  }

  closeGrievanceSuccess(){
    // Show successful message
    this.dispatchEvent( new CustomEvent('successClose',{ bubbles: true, composed: true }));
  }

  closeGrvnce(rowData){
    const modal = this.shadowRoot.querySelector("close-grvnc-modal");
    modal.open = true;
    modal.title = "Close Grievance";
    modal.textData = rowData;
    modal.loading = this.searchLoading;
    modal.clickAction = "Close Grievance";
    modal.data = this.rows;
    modal.submitFn = (feedback) => {
      VisitorService.closeGriavance({
        "grievance_id": rowData.grievance_id,
        "status": "resolved",
        "attended_at_level": rowData.attended_at_level,
        "no_of_visit": rowData.no_of_visit,
        "grievance_details": feedback
      }, this.closeGrievanceSuccess)
    };
  }

  selectEst(estData){
    VisitorService.setEstBlishment(estData);
    this.dispatchEvent( new CustomEvent('estselected',{ bubbles: true, composed: true }));
  }

  renderTable(){
    this.defineColumns();
    if(this.mode === "report"){
      return this.renderVisitorsTable();
    } 
    else if(this.mode === 'establishment'){
      return this.renderEstTable();
    } else if(this.mode === 'members'){
      return this.renderMembersTable();
    }else if(this.mode === 'visitors'){
      return this.renderVisitorsSearchResultTable();
    } else if(this.mode === "searchAndClose"){
      return this.renderSearchAndCloseTable();
    }
    else {
      return this.renderVisitorsTable();
    }
  }

  renderMembersTable(){
    if(this.rows?.length){
      return html` <div class="table member-table">
      ${this.colDef.map((col) => col.header ? html`<div class="header">${col.header}</div>` : html `<div class="header"></div>` )}
      ${this.rows.map((row) => {
        return this.colDef.map(col => html`<div>${renderCell(col, row)}</div>`);
      })}
    </div>`;
    }  else {
      html `<span>ille</span>`
    }
  }

  renderVisitorsSearchResultTable(){
    if(this.rows?.length){
      return html` <div class="table visitors-table">
      ${this.colDef.map((col) => col.header ? html`<div class="header">${col.header}</div>` : html `<div class="header"></div>` )}
      ${this.rows.map((row) => {
        return this.colDef.map(col => html`<div>${renderCell(col, row)}</div>`);
      })}
    </div>`;
    }  else {
      html `<span>ille</span>`
    }
  }

  renderEstTable(){
    if(this.rows?.length){
      return html` <div class="table est-table">
      ${this.colDef.map((col) => col.header ? html`<div class="header">${col.header}</div>` : html `<div class="header"></div>` )}
      ${this.rows.map((row) => {
        return this.colDef.map((col) => col.path ? html`<div>${renderCell(col, row)}</div>` : html `<div class="edit-cell" title="Select" @click=${() => this.selectEst(row)}><i class="fas fa-user-edit edit-icon"></i></div>`);
      })}
    </div>`;
    }  else {
      html `<span>ille</span>`
    }
  }

  renderVisitorsTable() {
    if(this.rows?.length){
      return html` <div class="table">
      ${this.colDef.map((col) => col.header ? html`<div class="header">${col.header}</div>` : html `<div class="header"></div>` )}
      ${this.rows.map((row) => {
        return this.colDef.map((col) => col.path ? html`<div>${renderCell(col, row)}</div>` : html `<div class="edit-cell" title="Edit user" @click=${() => this.editVisitor(row)}><i class="fas fa-user-edit edit-icon"></i></div>`);
      })}
    </div>`;
    }  else {
      html `<span>ille</span>`
    }
  }

  renderSearchAndCloseTable() {
    if(this.rows?.length){
      return html` 
      <close-grvnc-modal></close-grvnc-modal>
      <div class="table">
      ${this.colDef.map((col) => col.header ? html`<div class="header">${col.header}</div>` : html `<div class="header"></div>` )}
      ${this.rows.map((row) => {
        return this.colDef.map((col) => col.path ? html`<div>${renderCell(col, row)}</div>` : html `<div class="edit-cell" title="Mark done" @click=${() => this.closeGrvnce(row)}><i class="fas fa-clipboard-check edit-icon"></i></div>`);
      })}
    </div>`;
    }  else {
      html `<span>ille</span>`
    }
  }

  render() {
    return html`
      <!-- <div class="launch-block"> -->
        <div class="search-result">
          ${this.loading ? html `<div class="spinner-container"><loading-spinner></loading-spinner></div>` : this.renderTable() } 
        </div>
      <!-- </div> -->
      
    `;
  }
}

customElements.define('search-result', SearchResult);