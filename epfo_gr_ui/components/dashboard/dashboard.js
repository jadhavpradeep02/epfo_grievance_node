import { LitElement, html, css } from "lit";
import { commonStyles } from "../commonStyles";
import "@lion/input-datepicker/define";
import "@lion/button/define";
import Fontawesome from "lit-fontawesome";
import { DashboardService } from "../../services/dashboard.service";

export class Dashboard extends LitElement {
  static get properties() { 
    return {
      loading: {type: Boolean},
      dashboradData: {type: Object}
    }
  }

  constructor() {
    super();
    this.loadedData = this.loadedData.bind(this);
    this.dashboradData = {
        "daily": {
          "resolved": 100,
          "unresolved": 200,
          "total": 300
        },
        "weekly": {
          "resolved": 100,
          "unresolved": 200,
          "total": 300
        },
        "monthly": {
          "resolved": 100,
          "unresolved": 200,
          "total": 300
        },
        "total": {
          "resolved": 100,
          "unresolved": 200,
          "total": 300
        }
    };
  }

  loadedData(respData){
    this.dashboradData = {...this.dashboradData,...respData};
    console.log('Loaded Dashboard Data : ', this.dashboradData);
  }

  connectedCallback() {
    super.connectedCallback();
    DashboardService.getDashboardData(this.loadedData);
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
    return html`
        ${this.dashboradData ? html `
            <div class="launch-block form">
                <div  class="main">
                    <h1>Dashboard</h1>
                    <div class="statistic-section">
                        <h2>Today</h2>
                        <h3>Received: <span class="value">${this.dashboradData.daily.total}</span></h3>
                        <h3 class="resolved">Resolved: <span class="value resolved">${this.dashboradData.daily.resolved}</span></h3>
                        <h3 class="pending">Pending: <span class="value pending">${this.dashboradData.daily.pending}</span></h3>
                    </div>
                    <div class="statistic-section">
                        <h2>This Week</h2>
                        <h3>Received: <span class="value">${this.dashboradData.weekly.total}</span></h3>
                        <h3 class="resolved">Resolved: <span class="value resolved">${this.dashboradData.weekly.resolved}</span></h3>
                        <h3 class="pending">Pending: <span class="value pending">${this.dashboradData.weekly.pending}</span></h3>
                        
                    </div>
                    <div class="statistic-section">
                        <h2>This Month</h2>
                        <h3>Received: <span class="value">${this.dashboradData.monthly.total}</span></h3>
                        <h3 class="resolved">Resolved: <span class="value resolved">${this.dashboradData.monthly.resolved}</span></h3>
                        <h3 class="pending">Pending: <span class="value pending">${this.dashboradData.monthly.pending}</span></h3>
                        
                    </div>
                    <div class="statistic-section total">
                        <h2>Total </h2>
                        <h3>Received: <span class="value">${this.dashboradData.total.total}</span></h3>
                        <h3>Resolved: <span class="value resolved">${this.dashboradData.total.resolved}</span></h3>
                        <h3>Pending: <span class="value pending">${this.dashboradData.total.pending}</span></h3>
                        
                    </div>
                </div>
            </div>` : html `` 
        }`
  }
}

customElements.define("dash-board", Dashboard);
