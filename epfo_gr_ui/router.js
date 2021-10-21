import { LitElement, html } from "lit";
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
    // debugger;
    console.log('Window event >> ',window.location ,window.location.hash.slice(1)  );
    const url = window.location.hash.slice(1) || "/";
    this.navigateTo(url);
    // routeResolved();
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
    const route = this.routes.find((f) => f.key === key);
    if (route) {
      await route.import(); // Loads the ES Module asynchronously!
      this.activeRoute = route;
    } else {
      // window.location.href = ''
      await this.routes[0].import();
      this.activeRoute = this.routes[0];
    }
  }

  /**
   * Call in the render() function of the implementation
   * to render the currently activated route.
   */
  renderRoute() {
    if (this.activeRoute) {
      return this.activeRoute?.render();
    } else {
      window.location.href = "#home";
    }
  }
}
