import {LitElement, html, css} from 'lit';

export const renderError = (errorText) => {
  if (errorText) {
    return html`<div class="error-div">
      ${errorText}
    </div>`;
  } else {
    return "";
  }
}

export const renderAddForm = ({resetForm, findby, trySubmit, error}) => {
    return html `
    <search-modal @button-click=${resetForm}></search-modal>
       <div class="nav">
        <a class="link-button" href="#home"> Back </a>
      </div>
      ${renderError(error)}
      <div class="launch-block form">
        <form name="add-user-form" class="add-enrty-form">
        <h2>Enter visitor details</h2>
          <p>
            <label>UAN</label><br>
            <input type="text" name="uan" required placeholder=" ">
            <a class="btn" @click=${() => findby('uan')}><i class="fas fa-search"></i></a>
          </p>
          <p>
            <label>PF Account Number</label><br>
            <input type="text" maxlength="7" name="pf_account_no" required placeholder=" ">
            <a class="btn" @click=${() =>  findby('pf_account_no')}><i class="fas fa-search"></i></a>
            <br/><br/>
            <!-- <span class="input-prefix">PA</span> 
            / <span class="input-prefix">PUN</span> 
            / <input type="text" maxlength="7" class="size_7" name="pf_account_no1" required placeholder=" ">
            / <input type="text" class="size_3" maxlength="3" name="pf_account_no2" required placeholder=" ">
            /<input type="text" class="size_7" maxlength="7" name="pf_account_no3" required placeholder=" "> -->
            
          </p>
          <p>
            <label>Phone number</label><br>
            <input type="tel" name="visitor_mobile" required placeholder=" ">
            <a class="btn" @click=${() => findby('visitor_mobile')}><i class="fas fa-search"></i></a>
          </p>
          <p>
            <label>Visitor name</label><br>
            <input type="text" name="visitor_name" required placeholder=" ">
          </p>
          <p>
            <label>Email</label><br>
            <input type="email" name="visitor_email" required placeholder=" ">
          </p>
          
          <p>
            <label>Establishment Name</label><br>
            <input type="text" name="establishment_name" required placeholder=" ">
          </p>
          <p>
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
          </p>
          <p>
            <label>Number of Visit</label><br>
            <input type="number" name="no_of_visit" required placeholder=" ">
          </p>
          <p>
            <label>Attendance at level</label><br>
            <select name="attended_at_level" required placeholder=" ">
              <option value="DA">Dealing Assistant</option>
              <option value="SSAO">Session Supervisor Account Officer</option>
              <option value="APC">Assistant PF Commissioner</option>
              <option value="RPC1">Regional PF Commissioner 1</option>
              <option value="RPC2">Regional PF Commissioner 2</option>
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
          <div class="options-container">
            <lion-button class="form-submit" @click=${trySubmit}>Submit</lion-button>
          </div>
      </form>
    </div>`;
}