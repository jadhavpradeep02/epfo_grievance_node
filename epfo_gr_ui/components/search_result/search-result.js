import {LitElement, html, css} from 'lit';
import '@lion/button/define';
import { commonStyles } from '../commonStyles';
import { columnDefinition } from '../../configs/table.config';
import { VisitorService } from '../../services/visitor.service';
import '../spinner.js';
import Fontawesome from 'lit-fontawesome';

export class SearchResult extends LitElement {

  static properties = {
    noSearchResult: true,
    rows: [],
    loading: true
  };

  static styles = [
    commonStyles,
    Fontawesome,
    css `
     .search-result {
        padding: 2em 2em;
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
        color: white;
        cursor: pointer;
        text-shadow: 4px 2px 2px rgba(150, 150, 150, 1);
      }
    `
  ];

  constructor(){
    super();
    this.noSearchResult = true;
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
  }

  renderVisitorsTable() {
    if(this.rows?.length){
      return html` <div class="table">
      ${columnDefinition.map((col) => col.header ? html`<div class="header">${col.header}</div>` : html `<div class="header"></div>` )}
      ${this.rows.map((row) => {
        return columnDefinition.map((col) => col.path ? html`<div>${row[col.path]}</div>` : html `<div class="edit-cell" title="Edit user" @click=${() => this.editVisitor(row)}><i class="fas fa-edit edit-icon"></i></div>`);
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
          <h3>Recent Visitors:</h3>
          ${this.loading ? html `<div class="spinner-container"><loading-spinner></loading-spinner></div>` : this.renderVisitorsTable() } 
        </div>
      <!-- </div> -->
      
    `;
  }
}

customElements.define('search-result', SearchResult);