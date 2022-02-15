import { LitElement, html } from "lit";
import { AuthService } from "./services/authentication.service.js";
export class RouterMixin extends LitElement {
  // Route definitions
  static properties = {
    routes: { type: Object },
    activeRoute: { type: Object },
  };

  constructor() {
    super();
    this.routes = [
      {
        key: 'login',
        name: 'login Screen',
        import: () => import("./components/login/login.js"),
        render: () => html`<login-form></login-form>`,
      },
      {
        key: "Search&close",
        name: "Search And Close",
        import: () => import("./components/launcher_screen/launcher-screen.js"),
        render: () => html`<launcher-screen></launcher-screen>`,
      },
      {
        key: "member",
        name: "Member Details",
        import: () => import("./components/member-details/member-details.js"),
        render: () => html`<member-details></member-details>`,
      },
      {
        key: "SearchPeople",
        name: "Search Entities",
        import: () => import("./components/search_person/search-person.js"),
        render: () => html`<search-person></search-person>`,
      },
      {
        key: "add",
        name: "Add Form",
        import: () => import("./components/add_form/add-form.js"),
        render: () => html`<add-form></add-form>`,
      },
      {
        key: "edit",
        name: "Edit Form",
        import: () => import("./components/add_form/add-form.js"),
        render: () => html`<add-form mode="edit"></add-form>`,
      },
      {
        key: "dashboard",
        name: "Add Form",
        import: () => import("./components/dashboard/dashboard.js"),
        render: () => html`<dash-board></dash-board>`,
      },
      {
        key: "reports",
        name: "Add Form",
        import: () => import("./components/reports/reports.js"),
        render: () => html`<reports-view></reports-view>`,
      }
    ];
    this.activeRoute = null;
    window.addEventListener("load", this.router);
    window.addEventListener("hashchange", this.router);
  }

  router = (evt) => {
    let url = window.location.hash.slice(1) || "/";
    if(url !== '/'){
      url = url.split('?')[0]
    }
    this.navigateTo(url);
  };

  /**
   * Call with a route key to navigate to that route, and lazy-load
   * the module if it hasn't been loaded yet.
   *
   * In a real scenario, this function should be extended to support
   * 404-redirection, URL-scheme matching & storing the activated
   * route in the URL (and history).
   */
  async navigateTo(key) {
    if(!AuthService.checkAuth() && key !== 'login') {
      //this.navigateTo('login');
      window.location.href = `#login`
    } else {
      const route = this.routes.find((f) => f.key === key);
      if (route) {
        await route.import(); // Loads the ES Module asynchronously!
        this.activeRoute = route;
      } else {
        // window.location.href = ''
        await this.routes[1].import();
        this.activeRoute = this.routes[1];
      }
    }
  }

  /**
   * Call in the render() function of the implementation
   * to render the currently activated route.
   */
  renderRoute() {
    if (this.activeRoute) {
      return this.activeRoute?.render();
    }  else {
      window.location.href = "#add";
    }
  }
}
