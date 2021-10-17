import {LitElement, html, css} from 'lit';
import { commonStyles } from '../commonStyles';
import '@lion/core';
import '@lion/form';
import '@lion/overlays';
import '@lion/dialog/define';
import '@lion/fieldset';
import '@lion/input/define';
import '@lion/fieldset/define';
import '@lion/calendar/define';
import '@lion/input-date/define';
import '@lion/input-datepicker/define';
import '@lion/input-email/define';
import '@lion/listbox/define';
import { Required } from '@lion/form-core';
/* import '@lion/input/lion-input.js'; */
/* import '@lion/button/define'; */
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';

loadDefaultFeedbackMessages();
/* Required.getMessage = () => 'Please enter a value'; */

export class AddFormLit extends LitElement {

  static properties = {
    noSearchString: false,
  };

  static styles = [
      commonStyles,
      css`
      form{
        padding: 1em;
      }

      .nav{
        margin-top: -3em;
        text-align: left;
        padding: 2em;
      }

      .nav a{
        font-weight: bold;
        font-size: 1em;
        text-decoration: none;
      }
      `,
    ];

  render() {
    return html`
      <div class="launch-block">
      <div class="nav">
      <a href="#home"> &lt;Back </a>
      </div>
      <lion-form>
      <form>
        <lion-fieldset name="full_name">
          <lion-input
            name="first_name"
            label="First Name"
            .validators="${[new Required()]}"
          ></lion-input>
          <lion-input
            name="last_name"
            label="Last Name"
            .validators="${[new Required()]}"
          ></lion-input>
        </lion-fieldset>
        <lion-input-date
          name="date"
          label="Date of application"
          .modelValue="${new Date('2000-12-12')}"
          .validators="${[new Required()]}"
        ></lion-input-date>


        <lion-input-datepicker
          name="datepicker"
          label="Date to be picked"
          .modelValue="${new Date('2020-12-12')}"
          .validators="${[new Required()]}"
        ></lion-input-datepicker>

        
        <lion-textarea
          name="bio"
          label="Biography"
          .validators="${[new Required()]}"
          help-text="Please enter at least 10 characters"
        ></lion-textarea>
        <lion-input-amount name="money" label="Money"></lion-input-amount>
        <lion-input-iban name="iban" label="Iban"></lion-input-iban>
        <lion-input-email name="email" label="Email"></lion-input-email>
        <lion-checkbox-group
          label="What do you like?"
          name="checkers"
          .validators="${[new Required()]}"
        >
          <lion-checkbox .choiceValue=${'foo'} label="I like foo"></lion-checkbox>
          <lion-checkbox .choiceValue=${'bar'} label="I like bar"></lion-checkbox>
          <lion-checkbox .choiceValue=${'baz'} label="I like baz"></lion-checkbox>
        </lion-checkbox-group>
        <lion-radio-group
          name="dinosaurs"
          label="Favorite dinosaur"
          .validators="${[new Required()]}"
        >
          <lion-radio .choiceValue=${'allosaurus'} label="allosaurus"></lion-radio>
          <lion-radio .choiceValue=${'brontosaurus'} label="brontosaurus"></lion-radio>
          <lion-radio .choiceValue=${'diplodocus'} label="diplodocus"></lion-radio>
        </lion-radio-group>
        <lion-listbox name="favoriteFruit" label="Favorite fruit">
          <lion-option .choiceValue=${'Apple'}>Apple</lion-option>
          <lion-option checked .choiceValue=${'Banana'}>Banana</lion-option>
          <lion-option .choiceValue=${'Mango'}>Mango</lion-option>
        </lion-listbox>
        <lion-combobox
          .validators="${[new Required()]}"
          name="favoriteMovie"
          label="Favorite movie"
          autocomplete="both"
        >
          <lion-option checked .choiceValue=${'Rocky'}>Rocky</lion-option>
          <lion-option .choiceValue=${'Rocky II'}>Rocky II</lion-option>
          <lion-option .choiceValue=${'Rocky III'}>Rocky III</lion-option>
          <lion-option .choiceValue=${'Rocky IV'}>Rocky IV</lion-option>
          <lion-option .choiceValue=${'Rocky V'}>Rocky V</lion-option>
          <lion-option .choiceValue=${'Rocky Balboa'}>Rocky Balboa</lion-option>
        </lion-combobox>
        <lion-select-rich name="favoriteColor" label="Favorite color">
          <lion-option .choiceValue=${'red'}>Red</lion-option>
          <lion-option .choiceValue=${'hotpink'} checked>Hotpink</lion-option>
          <lion-option .choiceValue=${'teal'}>Teal</lion-option>
        </lion-select-rich>
        <lion-select label="Lyrics" name="lyrics" .validators="${[new Required()]}">
          <select slot="input">
            <option value="1">Fire up that loud</option>
            <option value="2">Another round of shots...</option>
            <option value="3">Drop down for what?</option>
          </select>
        </lion-select>
        <lion-input-range
          name="range"
          min="1"
          max="5"
          .modelValue="${2.3}"
          unit="%"
          step="0.1"
          label="Input range"
        ></lion-input-range>
        <lion-checkbox-group
          .multipleChoice="${false}"
          name="terms"
          .validators="${[new Required()]}"
        >
          <lion-checkbox label="I blindly accept all terms and conditions"></lion-checkbox>
        </lion-checkbox-group>
        <lion-switch name="notifications" label="Notifications"></lion-switch>
        <lion-input-stepper max="5" min="0" name="rsvp">
          <label slot="label">RSVP</label>
          <div slot="help-text">Max. 5 guests</div>
        </lion-input-stepper>
        <lion-textarea name="comments" label="Comments"></lion-textarea>
        <div class="buttons">
          <lion-button-submit>Submit</lion-button-submit>
          <lion-button-reset
            @click=${ev => ev.currentTarget.parentElement.parentElement.parentElement.resetGroup()}
            >Reset</lion-button-reset
          >
        </div>
      </form>
    </lion-form>
      </div>
    `;
  }
}

customElements.define('add-form-lit', AddFormLit);