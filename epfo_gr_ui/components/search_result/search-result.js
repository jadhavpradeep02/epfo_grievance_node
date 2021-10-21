import {LitElement, html, css} from 'lit';
import '@lion/button/define';
import { commonStyles } from '../commonStyles';
import { cols } from "../../mocks/dummyData.js";
import { VisitorService } from '../../services/visitor.service';
import '../spinner.js';

export class SearchResult extends LitElement {

  static properties = {
    noSearchResult: true,
    rows: [],
    loading: true
  };

  static styles = [
    commonStyles,
    css `
     .search-result {
        padding: 2em 1em;
      }

      .spinner-container{
        text-align: center;
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

  edirVisitor(visitor_id){
    // Show edit page with this visitor
  }

  renderVisitorsTable() {
    if(this.rows.length){
      return html` <div class="table">
      ${cols.map((col) => col.header ? html`<div class="header">${col.header}</div>` : html `` )}
      ${this.rows.map((row) => {
        return cols.map((col) => col.path ? html`<div>${row[col.path]}</div>` : html `<ing-button @click=${() => this.edirVisitor(row.visitor_id)}></ing-button>`);
      })}
    </div>`;
    }  else {
      html `<span>ille</span>`
    }
  }

  render() {
    return html`
      <div class="launch-block">
        <div class="search-result">
          <h3>Recent Visitors:</h3>
          ${this.loading ? html `<div class="spinner-container"><loading-spinner></loading-spinner></div>` : this.renderVisitorsTable() } 
        </div>
      </div>
      
    `;
  }
}

customElements.define('search-result', SearchResult);