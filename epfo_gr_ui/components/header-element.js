import {LitElement, html, css} from 'lit';
import { AuthService } from '../services/authentication.service';
import Fontawesome from 'lit-fontawesome';

/* @customElement('first-element') */
export class HeaderElement extends LitElement {

  static properties = {
    showUser: false,
    expandMenu: false,
  };

  static get styles() {
    return [ Fontawesome,
      css`
      h1{
        background-color: var(--british-racing-green);
        color: white;
        text-align: center;
        padding: 12px;
        margin-bottom: 24px;
        margin-top: 0px;
      }

      .home-button{
        position: absolute;
        top: 20px;
        left: 10px;
        font-weight: bold;
        color: white;
      }

      .home-button a,
      .home-button a:visited{
        text-decoration: none;
        color: white;
      }

      .elem-shadow{
        -webkit-box-shadow: -1px 3px 5px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: -1px 3px 5px 0px rgba(0,0,0,0.75);
        box-shadow: -1px 3px 5px 0px rgba(0,0,0,0.75);
      }

      .menu{
        display: inline;
        position: absolute;
        top: 11px;
        right: 0px;
        font-size: 1.5em;
        color: white;
        margin: 5px 45px;
        cursor: pointer;
      }

      .menu-items{
        position: absolute;
        top: 60px;
        right: 0px;
        font-size: 1.5em;
        color: white;
      }

      .menu-item{
        padding: 10px;
        cursor: pointer;
        background-color: var(--british-racing-green);
        font-size: 0.7em;
      }

      .menu-item:hover{
        background-color: var(--oxford-blue);
      }

      /* .logout{
        display: inline;
        position: absolute;
        top: 35px;
        right: 0px;
        font-size: 1.5em;
        color: white;
        margin: 5px 15px;
        cursor: pointer;
      } */

      .logout:hover{
        color: #f05c5c;
      }
    `];
  }

  logout(){
    this.toggleMenu();
    AuthService.logout();
  }

  toggleMenu(e){
    this.expandMenu = !this.expandMenu;
    //e.stopPropagation();
  }

  toPage(pageName){
    this.toggleMenu();
    window.location.href = "#"+pageName;
  }


  blurred(e){
    debugger;
    this.expandMenu = !this.expandMenu;
  }

  get isAdmin() {
    return AuthService.getUserRole() === 'admin';
  }

  get isHome() {
    return AuthService.checkAuth() && !window.location.href.includes('add');
  }

  render() {
    return html`
      <h1 class="container elem-shadow">Grievance Portal</h1>
      ${this.isHome ? html `<div class="home-button"><i class="fas fas fa-chevron-left"></i><a href="#add" >&nbsp;Home</a></div>` : html ``}
      
      ${AuthService.checkAuth() ? html `
        <div class="menu" @click=${this.toggleMenu}><i class="fas fa-bars"></i></div>
        ${ this.expandMenu ? html`<div class="menu-items elem-shadow">
          <a class="menu-item"  @click=${() => this.toPage('add')} @blur=${this.blurred} style="tabindex: 80;"><i class="fas fa-home"></i>&nbsp;&nbsp;Home</a>
          <div class="menu-item"  @click=${() => this.toPage('dashboard')}><i class="fas fa-tachometer-alt"></i>&nbsp;&nbsp;Dashboard</div>
          <div class="menu-item"  @click=${() => this.toPage('Search&close')}><i class="fas fas fa-search"></i>&nbsp;&nbsp;Search & Close</div>
          <div class="menu-item"  @click=${() => this.toPage('SearchPeople')}><i class="fas fas fa-search"></i>&nbsp;&nbsp;Search Entities</div>
          <div class="menu-item"  @click=${() => this.toPage('reports')}><i class="fas fa-file-alt"></i>&nbsp;&nbsp;Reports</div>
          ${this.isAdmin ? html `<div class="menu-item" @click=${() => this.toPage('addUser')}><i class="fas fa-user"></i>&nbsp;&nbsp;Users</div>` : html ``}
          <div class="menu-item" title="log out" @click=${this.logout}><i class="fas fa-power-off"></i>&nbsp;&nbsp;Logout</div>
        </div>` : ``}
        <!-- <div class="logout" title="log out" @click=${this.logout}> <i class="fas fa-power-off"></i></div> -->` 
      : 
      html ``}
    `; 
  }
}

customElements.define('header-element', HeaderElement);