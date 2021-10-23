import {LitElement, html, css} from 'lit';
import { commonStyles } from '../commonStyles';
import '@lion/input-datepicker/define';
import '@lion/button/define';
import { Required } from '@lion/form-core';
import { VisitorService } from '../../services/visitor.service';
import { formStyles } from './add-form.styles';

export class AddForm extends LitElement {

  static properties = {
    noSearchString: false,
    mode:''
  };

  constructor(){
    super();
    this.addSuccess = this.addSuccess.bind(this);
  }

  connectedCallback() {
    super.connectedCallback()
  }

  static styles = [
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

  update(){
    super.update();
    if(this.mode && this.mode ==='edit'){
      this.preFillForm();
    }
  }

  render() {
    return html`
       <div class="nav">
        <a class="link-button" href="#home"> Back </a>
      </div>
      <div class="launch-block form">
        <form name="add-user-form" class="add-enrty-form">
        <h2>Enter visitor details</h2>
          <label>Title</label><br>
          <input type="radio" id="mr" name="title" value="mr" checked/><label for="mr">Mrs</label>
          <input type="radio" id="mrs" name="title" value="mrs"/><label for="mrs">Mrs</label>
          <input type="radio" id="miss" name="title" value="miss"/><label for="miss">Miss</label>
          <p>
            <label>First name</label><br>
            <input type="text" name="visitor_name" required placeholder=" ">
          </p>
          <p>
            <label>Last name</label><br>
            <input type="text" name="last_name" required placeholder=" ">
          </p>
          <p>
            <label>Phone number</label><br>
            <input type="tel" name="visitor_mobile" required placeholder=" ">
          </p>
          <p>
            <label>Email</label><br>
            <input type="email" name="visitor_email" required placeholder=" ">
          </p>
          <p>
            <label>UAN</label><br>
            <input type="text" name="uan" required placeholder=" ">
          </p>
          <p>
            <label>PF Account Number</label><br>
            <input type="text" name="pf_account_no" required placeholder=" ">
          </p>
          <p>
            <label>Establishment Name</label><br>
            <input type="text" name="establishment_name" required placeholder=" ">
          </p>
          <p>
            <label>Grievance Category</label><br>
            <select name="grievance_category" required placeholder=" ">
              <option value="minor">Minor</option>
              <option value="medior">Medior</option>
              <option value="major">Major</option>
            </select>
          </p>
          <p>
            <label>Number of Visit</label><br>
            <input type="number" name="no_of_visit" required placeholder=" ">
          </p>
          <p>
            <label>Attendance at level</label><br>
            <select name="attended_at_level" required placeholder=" ">
              <option value="minor">Clerk</option>
              <option value="medior">Supervisor</option>
              <option value="major">Head Supervisor</option>
            </select>
          </p>
          <p>
            <label>Grievance Details</label><br>
            <textarea rows="10" cols="50" name="grievance_details"></textarea>
          </p>
          <p>
            <label>Status</label><br>
            <select name="status" required>
              <option value="minor">Not resolved</option>
              <option value="medior">In progress</option>
              <option value="major">Resolved</option>
            </select>
          </p>

          <!-- <p>
          <lion-input-datepicker
            name="datepicker"
            class="datepicker"
            .modelValue="${new Date('2020-12-12')}"
            .validators="${[new Required()]}"
            name="date_of_birth"
          ></lion-input-datepicker>
          </p> -->
          <p>
            <!-- <button type="submit">Add</button>
            <button type="reset">Reset form</button> -->
            <div class="options-container">
              <lion-button class="form-submit" @click=${this.trySubmit}>Submit</lion-button>
            </div>
            
          </p>
      </form>
    </div>
    `;
  }
}

customElements.define('add-form', AddForm);