export class MySearch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <label>Este es un label</label>
      <input type="text" />
      <button>
          Soy un botón
      </button>
    `;
    return template;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
}
