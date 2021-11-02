import {LitElement, html} from 'lit';
import { commonStyles } from '../commonStyles';
import '@lion/input-datepicker/define';
import '@lion/button/define';
import { Required } from '@lion/form-core';
import { VisitorService } from '../../services/visitor.service';
import { formStyles } from './add-form.styles';
import { renderAddForm } from './add-form.template';
import './../search-modal/search-modal.js';
import Fontawesome from 'lit-fontawesome';
import { searchUrl } from '../../configs/api.config';
import { AuthService } from '../../services/authentication.service';

export class AddForm extends LitElement {

  static properties = {
    noSearchString: false,
    mode:'',
    error: ''
  };

  constructor(){
    super();
    this.addSuccess = this.addSuccess.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.findby = this.findby.bind(this);
    this.trySubmit = this.trySubmit.bind(this);
  }

  connectedCallback() {
    super.connectedCallback()
  }

  static styles = [
    Fontawesome,
    commonStyles,
    formStyles
  ];

  addSuccess(){
    this.dispatchEvent( new CustomEvent('navigateTo',{ bubbles: true, composed: true, detail:{"name":"home"}}));
  }

  trySubmit(){
    const form = this.shadowRoot.querySelector('form');
    if(form.checkValidity()){
      const rawFormData = new FormData(form);
      const formData = Object.fromEntries(rawFormData.entries());
      VisitorService.addNewVisitor(formData, this.addSuccess);
    }
  }

  isEdit(){
    return this.mode ==='edit';
  }

  preFillForm(){
    const form = this.shadowRoot.querySelector('form');
    let prefillData = VisitorService.getEditData();
    let elem = null;
    if(prefillData && form){
      console.log('Prefilling', prefillData);
      for(let key in prefillData)
      {
        if(prefillData.hasOwnProperty(key)){
          elem = form.querySelector('[name='+key+']');
          if(elem && elem.value === ""){
            elem.value = (prefillData[key]);
          } else {
            console.log('Cannot fill : ', key, prefillData[key])
          }
        }
      }
    }
  }

  resetForm(){

  }

  update(){
    super.update();
    if(this.mode && this.mode ==='edit'){
      this.preFillForm();
    }
  }

  showSearchResultModal(){
    debugger;
    const modal = this.shadowRoot.querySelector('search-modal');
    modal.open = true;
    modal.title = 'Search complete';
    modal.text = `No Match found!`;
    modal.clickAction = 'Continue with new'
    modal.data = this.rows;
    modal.text = modal.data.length + ' Entried found!'
  }

  async findby(type){
    this.error = '';
    const form = this.shadowRoot.querySelector('form');
    if (form[type]?.value) { // this.renderRoot.querySelector('[name='+type+']').value
      await fetch(searchUrl(), {
        method: 'POST',
        headers: {
          Authorization: AuthService.addBearerAuth()
        },
        body: JSON.stringify({by: type, value: form[type]?.value})
      }).then((response) => response.json())
      .then((respJSON) => {
        this.rows = respJSON;
        this.showSearchResultModal();
      })
    } else {
      this.error = 'Invalid search for type : ' + type;

      // DEMO FUNCTION 
      /* this.rows = await VisitorService.fetchVisitors();
      this.showSearchResultModal(); */
    }
  }

  render() {
    return html `
    ${renderAddForm({
      resetForm: this.resetForm,
      findby: this.findby,
      trySubmit: this.trySubmit,
      error: this.error
    })}`
  }
}

customElements.define('add-form', AddForm);