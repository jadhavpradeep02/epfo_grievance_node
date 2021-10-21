import {LitElement, html, css} from 'lit';
import '@lion/button/define';
import { commonStyles } from '../commonStyles';

export class SearchResult extends LitElement {

  static properties = {
    noSearchResult: true,
  };

  static styles = [
    commonStyles
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

  /* onSearch(event){
    this.noSearchString = false;
    if(this.renderRoot.querySelector('#search').value){

    } else {
        this.noSearchString = true;
    }
  } */

  render() {
    return html`
      <div class="launch-block">
      ${this.renderError()}
        <table>
        </table>
      </div>
      
    `;
  }
}

customElements.define('search-result', SearchResult);