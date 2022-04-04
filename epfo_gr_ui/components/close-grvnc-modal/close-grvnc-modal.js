import { LitElement, html, css } from "lit-element";
import { classMap } from "lit/directives/class-map.js";
import "./../spinner.js";
import { renderDate } from "../utils.js";

class CloseGrvncModal extends LitElement {
  static get styles() {
    return css`
      :host {
        font-family: Arial, Helvetica, sans-serif;
      }
      .wrapper {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        transition: opacity 0.25s ease-in;
      }
      .wrapper:not(.open) {
        visibility: hidden;
      }
      .wrapper.open {
        align-items: center;
        display: flex;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        opacity: 1;
        visibility: visible;
      }
      .overlay {
        background: rgba(0, 0, 0, 0.8);
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
      }
      .dialog {
        background: #ffffff;
        border-radius: 13px;
        width: 80%;
        padding: 1rem;
        position: absolute;
      }
      .dialog h1 {
        margin: 0 0 10px;
        text-align: center;
        margin-top: 15px;
        margin-bottom: 20px;
        color: var(--british-racing-green);
      }
      .dialog button {
        background-color: var(--british-racing-green);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        border-width: 0px;
      }
      .action-section {
        width: 100%;
        text-align: center;
        margin-bottom: 25px;
      }
      .spinner-container{
        text-align: center;
      }
      .content {
        margin: auto;
        padding: 20px;
        color: var(--british-racing-green);
      }
      .details{
        margin-bottom: 10px;
        font-size: 1rem;
        min-width: 200px;
        display: inline-block;
      }
      .detail-value{
        display: inline-block;
      }
      .closing-feedback-label{
        margin-bottom: 10px;
        font-size: 1rem;
      }
      .gr_details{
        text-align: left;
      }
      .close-btn{
        position: absolute;
        right: 20px;
        top: 20px;
        padding: 4px 7px;
        border-radius: 25px;
        background-color: var(--british-racing-green);
        cursor: pointer;
        color: white;
        display: inline;
        font-weight: bold;
      }
      .close-btn:hover{
          background-color: var(--oxford-blue);
      }
    `;
  }
  static get properties() {
    return {
      open: { type: Boolean },
      title: { type: String },
      textData: { type: Object },
      clickAction: { type: String },
      data: { type: Object },
      loading: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.open = false;
  }

  render() {
    return html`
      <div class="${classMap({ wrapper: true, open: this.open })}">
        <div class="overlay" @click="${this.close}"></div>
        <div class="dialog">
          <h1 id="title">${this.title}</h1>
          <div class="close-btn" @click="${this.close}">X</div>
          <hr/>
          ${this.loading
            ? html`<div class="spinner-container">
                <loading-spinner></loading-spinner>
              </div>`
            : html`
                <div id="content" class="content">
                  <div class="gr_details">
                    <div><div class="details"><b>Visitor</b>: </div><div class="detail-value">${this.textData?.visitor_name} </div></div>
                    <div><div class="details"><b>UAN</b>: </div><div class="detail-value">${this.textData?.uan} </div></div>
                    <div><div class="details"><b>Details</b>: </div><div class="detail-value">${this.textData?.grievance_details} </div></div>
                    <div><div class="details"><b>Created on</b>: </div><div class="detail-value">${renderDate(this.textData?.created_at)} </div></div>
                    <div><div class="details"><b>Member name</b>: </div><div class="detail-value">${this.textData?.member_name} </div></div>
                    <div><div class="details"><b>Section</b>: </div><div class="detail-value">${this.textData?.section} </div></div>
                    <div><div class="details"><b>Category</b>: </div><div class="detail-value">${this.textData?.grievance_category} </div></div>
                    <div><div class="details"><b>PF Account number</b>:</div><div class="detail-value"> ${this.textData?.pf_account_no} </div></div>
                    <div><div class="details"><b>PPO </b>:</div><div class="detail-value">${this.textData?.ppo_number} </div></div>
                    <div><div class="details"><b>Task ID </b>:</div><div class="detail-value">${this.textData?.estb_account_task_id} </div></div>
                  </div>
                  <div class="closing-feedback-label">Provide info on closing grievance: </div>
                  <textarea cols="80" name="closing_text" rows="10" class="clsing-details-text"></textarea>  
                </div>
                <div class="action-section">
                  <button @click=${this.close}>Back</button>    
                  <button @click=${this.handleClick}>${this.clickAction}</button>
                </div>
              `}
        </div>
      </div>
    `;
  }

  close() {
    this.open = false;
  }

  handleClick() {
    if(this.submitFn){
      const feedback  = this.shadowRoot.querySelector('[name="closing_text"]').value;
      this.submitFn(feedback);
    }
    this.dispatchEvent(new CustomEvent("button-click"));
    this.close();
  }
}

customElements.define("close-grvnc-modal", CloseGrvncModal);
