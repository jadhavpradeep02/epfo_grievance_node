import { LitElement, html, css } from "lit";
import { commonStyles } from "../commonStyles";
import "@lion/input-datepicker/define";
import "@lion/button/define";
import Fontawesome from "lit-fontawesome";

export class Dashboard extends LitElement {
  static get properties() { 
    return {
      loading: {type: Boolean},
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  static styles = [Fontawesome, commonStyles,
    css ` 
        .main { 
            margin: 25px; 
            padding : 25px;
            text-align: center;
            padding-bottom: 40px;
        }
        .statistic-section{
            padding: 20px;
            /* border: 1px solid var(--british-racing-green); */
            border-radius: 10px;
            text-align: center;
            min-width: 200px;
            margin: 15px;
            display: inline-block;
            -webkit-box-shadow: 0px 1px 10px 5px rgba(169,169,169,0.75);
            -moz-box-shadow: 0px 1px 10px 5px rgba(169,169,169,0.75);
            box-shadow: 0px 1px 10px 5px rgba(169,169,169,0.75);
        }

        .total h3{
            display: inline-block;
            min-width: 200px;
            margin-right: 30px;
        }

        .total .value{
            padding-left: 10px;
        }

        .total{
            min-width: 85%;
        }

        .total h3{
            font-size: 1.3em;
        }

        h1, h2{
            color: var(--british-racing-green);
        }

        h3{
            color: #999999;
            margin: 5px;
            font-size: 1em;
            font-weight: normal;
        }

        .value{
            font-size: 1.5em;
            padding-left: 25px;
        }
        
        .resolved {
            color: green;
        }

        .pending{
            color: red;
        }
        
        `];

  update(changedProps) {
    super.update();
  }

  render() {
    return html`<div class="launch-block form">
            <div  class="main">
                <h1>Dashboard</h1>
                <div class="statistic-section">
                    <h2>Today</h2>
                    <h3 class="resolved">Resolved: <span class="value resolved">23</span></h3>
                    <h3 class="pending">Pending: <span class="value pending">48</span></h3>
                    <h3>Received: <span class="value">123</span></h3>
                </div>
                <div class="statistic-section">
                    <h2>This Week</h2>
                    <h3 class="resolved">Resolved: <span class="value resolved">232</span></h3>
                    <h3 class="pending">Pending: <span class="value pending">480</span></h3>
                    <h3>Received: <span class="value">1235</span></h3>
                </div>
                <div class="statistic-section">
                    <h2>This Month</h2>
                    <h3 class="resolved">Resolved: <span class="value resolved">2345</span></h3>
                    <h3 class="pending">Pending: <span class="value pending">4855</span></h3>
                    <h3>Received: <span class="value">6598</span></h3>
                </div>
                <div class="statistic-section total">
                    <h2>Total</h2>
                    <h3>Resolved: <span class="value resolved">23450</span></h3>
                    <h3>Pending: <span class="value pending">48550</span></h3>
                    <h3>Received: <span class="value">65980</span></h3>
                </div>
            </div>
        </div>`;
  }
}

customElements.define("dash-board", Dashboard);
