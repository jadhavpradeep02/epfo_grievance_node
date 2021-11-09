import { LitElement, html } from "lit";
import { commonStyles } from "../commonStyles";
import "@lion/input-datepicker/define";
import "@lion/button/define";
import { Required } from "@lion/form-core";
import { VisitorService } from "../../services/visitor.service";
import { formStyles } from "./add-form.styles";
import { renderAddForm } from "./add-form.template";
import "./../search-modal/search-modal.js";
import Fontawesome from "lit-fontawesome";
import { searchUrl } from "../../configs/api.config";
import { AuthService } from "../../services/authentication.service";

export class AddForm extends LitElement {
  static get properties() { 
    return {
      noSearchString: {type: Boolean},
      mode: {type: String},
      error:{type: String},
      prefillData:{type: Object},
    }
  }

  constructor() {
    super();
    this.addSuccess = this.addSuccess.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.findby = this.findby.bind(this);
    this.trySubmit = this.trySubmit.bind(this);
    this.closeError = this.closeError.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
  }

  static styles = [Fontawesome, commonStyles, formStyles];

  addSuccess() {
    this.dispatchEvent(
      new CustomEvent("navigateTo", {
        bubbles: true,
        composed: true,
        detail: { name: "add" },
      })
    );
  }

  trySubmit() {
    const form = this.shadowRoot.querySelector("form");
    if (form.checkValidity()) {
      const rawFormData = new FormData(form);
      let formData = Object.fromEntries(rawFormData.entries());
      formData.pf_account_no = this.getPfAccontNo();
      if (this.mode === "edit") {
        let newData = {};
        // Append existing id to formData and update the data
        if (this.prefillData) {
          newData = { ...this.prefillData, ...formData };
        }
        VisitorService.updateVisitor(newData, this.addSuccess)
      } else {
        VisitorService.addNewVisitor(formData, this.addSuccess);
      }
    }
  }

  isEdit() {
    return this.mode === "edit";
  }

  getPfAccontNo() {
    const form = this.shadowRoot.querySelector("form");
    return (
      "PA/PUN/" +
      form.pf_account_no1.value +
      "/" +
      form.pf_account_no2.value +
      "/" +
      form.pf_account_no3.value
    );
  }

  /* setPFAccountNo(PFAccNo){
  } */

  preFillForm() {
    const form = this.shadowRoot.querySelector("form");
    this.prefillData = VisitorService.getEditData();
    let elem = null;
    if (this.prefillData && form) {
      console.log("Prefilling", this.prefillData);
      for (let key in this.prefillData) {
        if (this.prefillData.hasOwnProperty(key)) {
          elem = form.querySelector("[name=" + key + "]");
          if (elem && elem.value === "") {
            elem.value = this.prefillData[key];
          } else {
            if (key === "pf_account_no") {
              let pfAccNo = this.prefillData[key].split("/");
              form.pf_account_no1.value = pfAccNo[2];
              form.pf_account_no2.value = pfAccNo[3];
              form.pf_account_no3.value = pfAccNo[4];
            }
            console.log("Cannot fill : ", key, this.prefillData[key]);
          }
        }
      }
    }
  }

  resetForm() {
    console.log('RESET FORM');
  }

  update(changedProps) {
    super.update();
    if (this.mode && this.mode === "edit") {
      this.preFillForm();
    }
  }

  closeError() {
    this.error = "";
  }

  showSearchResultModal() {
    const modal = this.shadowRoot.querySelector("search-modal");
    modal.open = true;
    modal.title = "Search complete";
    modal.text = `No Match found!`;
    modal.clickAction = "Continue with new";
    modal.data = this.rows;
    modal.text = modal.data.length + " Entried found!";
  }

  async findby(type) {
    this.error = "";
    const form = this.shadowRoot.querySelector("form");
    let elementVal = form[type]?.value;
    if (!elementVal && type === "pf_account_no") {
      if (
        form.pf_account_no1.value ||
        form.pf_account_no2.value ||
        form.pf_account_no3.value
      ) {
        elementVal = `PAPUN${form.pf_account_no1.value}${form.pf_account_no2.value}${form.pf_account_no3.value}`;
      }
    }
    if (elementVal) {
      // this.renderRoot.querySelector('[name='+type+']').value
      await fetch(searchUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthService.addBearerAuth(),
        },
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
        body: JSON.stringify({ by: type, value: elementVal }),
      })
        .then((response) => response.json())
        .then((respJSON) => {
          this.rows = respJSON;
          this.showSearchResultModal();
        });
    } else {
      this.error = "Invalid search for type : " + type;

      // DEMO FUNCTION
      /* this.rows = await VisitorService.fetchVisitors();
      this.showSearchResultModal(); */
    }
  }

  render() {
    return html` ${renderAddForm({
      resetForm: this.resetForm,
      findby: this.findby,
      trySubmit: this.trySubmit,
      error: this.error,
      closeError: this.closeError,
      isEdit: this.isEdit()
    })}`;
  }
}

customElements.define("add-form", AddForm);
