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
        key: "Home",
        name: "Hello World!",
        import: () => import("./components/launcher_screen/launcher-screen.js"),
        render: () => html`<launcher-screen></launcher-screen>`,
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
        key: "addlit",
        name: "Add Form",
        import: () => import("./components/add_form/add-form-lit.js"),
        render: () => html`<add-form-lit></add-form-lit>`,
      },
    ];
    this.activeRoute = null;
    window.addEventListener("load", this.router);
    window.addEventListener("hashchange", this.router);
  }

  router = (evt) => {
    const url = window.location.hash.slice(1) || "/";
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
      window.location.href = "#home";
    }
  }
}
