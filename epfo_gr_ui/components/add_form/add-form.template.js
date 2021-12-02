import {LitElement, html, css} from 'lit';

export const renderError = (errorText, closeError) => {
  if (errorText) {
    return html`<div class="error-div">
      ${errorText}
      <span @click=${closeError} class="error-close">X</span>
    </div>`;
  } else {
    return "";
  }
}

const renderSuccess = (successMsg, closeError) => {
  if(successMsg){
    return html`<div class="success-div">
      ${successMsg}
      <span @click=${closeError} class="error-close">X</span>
    </div>`;
  };

}

export const renderAddForm = ({resetForm, findby, findEstablishmentBy, trySubmit, error, closeError, isEdit, successMsg, reloadUser}) => {
    return html `
    <search-modal @rowselected=${reloadUser} @button-click=${resetForm}></search-modal>
       <!-- <div class="nav">
        <a class="link-button" href="#home"> Back </a>
      </div> -->
      ${renderError(error, closeError)}
      ${renderSuccess(successMsg, closeError)}
      <div class="launch-block form">
        <form name="add-user-form" class="add-enrty-form">
          ${
            isEdit? 
            html `<h2>Update visitor details</h2>` :
            html `<h2>Enter visitor details</h2><div class="sub-text-title">Fields marked with * are mandatory</div>`
          }
          <div class='left-section'>
            <div class="form-element">
              <label>UAN</label>
              <div class="input-and-search">
                <input type="text" name="uan" placeholder=" ">
                <a class="btn" @click=${() => findby('uan')}><i class="fas fa-search"></i></a>
              </div>
            </div>
            <div class="form-element">
              <label>PF Account Number</label><br>
              <!-- <div class="input-and-search">
                <input type="text" maxlength="7" name="pf_account_no" required placeholder=" ">
                <a class="btn" @click=${() =>  findby('pf_account_no')}><i class="fas fa-search"></i></a>
              </div> -->
              <div class="input-and-search prefix">
                <span class="input-prefix">PA&nbsp;/&nbsp;</span> 
                <span class="input-prefix">PUN&nbsp;/&nbsp;</span> 
                <input type="text" maxlength="7" class="size_7" name="pf_account_no1" placeholder=" ">
                <span class="input-prefix">&nbsp;/&nbsp;</span>
                <input type="text" class="size_3" maxlength="3" name="pf_account_no2" placeholder=" ">
                <span class="input-prefix">&nbsp;/&nbsp;</span> 
                <input type="text" class="size_7" maxlength="7" name="pf_account_no3" placeholder=" ">
                <a class="btn" @click=${() =>  findby('pf_account_no')}><i class="fas fa-search"></i></a>
              </div>
            </div>
            <div class="form-element">
              <label>Visitor phone number<span class="mandatory">*</span></label><br>
              <div class="input-and-search">
                <input type="tel" name="visitor_mobile" required placeholder=" ">
                <a class="btn" @click=${() => findby('visitor_mobile')}><i class="fas fa-search"></i></a>
              </div>
            </div>
            <div class="form-element">
              <label>Visitor name<span class="mandatory">*</span></label><br>
              <input type="text" name="visitor_name" required placeholder=" ">
            </div>
            <div class="form-element">
              <label>Email</label><br>
              <input type="email" name="visitor_email" placeholder=" ">
            </div>

            <div class="form-element">
              <label>Establishment Name</label><br>
              <div class="input-and-search">
                <input type="text" name="establishment_name" placeholder=" ">
                <a class="btn" @click=${() => findEstablishmentBy('establishment_name')}><i class="fas fa-search"></i></a>
              </div>
            </div>
            <div class="form-element">
              <label>Establishment Id</label><br>
              <div class="input-and-search">
                <input type="text" name="establishment_id" placeholder=" ">
                <a class="btn" @click=${() => findEstablishmentBy('establishment_id')}><i class="fas fa-search"></i></a>
              </div>
            </div>
            <div class="form-element">
              <label>Task Id</label><br>
              <div class="input-and-search">
                <input type="text" name="task_id" placeholder=" ">
                <a class="btn" @click=${() => findEstablishmentBy('task_id')}><i class="fas fa-search"></i></a>
              </div>
            </div>


            
            

          </div>
          <div class='right-section'>

          <div class="form-element">
              <label>Member Name</label><br>
              <input type="text" name="member_name" placeholder=" ">
            </div>
            <div class="form-element">
              <label>Member Mobile number</label><br>
              <input type="text" name="member_phone" placeholder=" ">
            </div>
            <div class="form-element">
              <label>PPO Number</label><br>
              <input type="text" name="ppo_number" placeholder=" ">
            </div>

          <div class="form-element">
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
          <div class="form-element">
            <label>Grievance Category</label><br>
            <select name="grievance_category" required placeholder=" ">
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
          <div class="form-element">
            <label>Number of Visit</label><br>
            <input type="number" name="no_of_visit" value="1" disabled placeholder=" ">
          </div>
          <div class="form-element">
            <label>Attendance at level</label><br>
            <select name="attended_at_level" required placeholder=" " disabled>
              <option value="DA">Dealing Assistant</option>
              <option value="SSAO">Session Supervisor Account Officer</option>
              <option value="APC">Assistant PF Commissioner</option>
              <option value="RPC2">Regional PF Commissioner 2</option>
              <option value="RPC1">Regional PF Commissioner 1</option>
            </select>
          </div>
          <div class="form-element">
            <label>Grievance Details</label><br>
            <textarea rows="10" cols="50" name="grievance_details"></textarea>
          </div>
          <div class="form-element">
            <label>Status</label><br>
            <select name="status" disabled>
              <option value="in_progress">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          </div>
          <div class="options-container">
            <lion-button class="form-submit" @click=${resetForm}>Reset</lion-button>
            ${isEdit ? 
              html `<lion-button class="form-submit" @click=${trySubmit}>Add new Visit</lion-button>` :
              html `<lion-button class="form-submit" @click=${trySubmit}>Add</lion-button>` 
            }
          </div>
      </form>
    </div>`;
}