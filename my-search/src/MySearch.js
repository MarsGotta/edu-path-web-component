export class MySearch extends HTMLElement {
  static get observedAttributes() {
    return ["button"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.render();
  }

  get button() {
    return this.getAttribute("button");
  }

  set button(data) {
    this.setAttribute("button", data);
  }

  getTemplate() {
    // this.button = "By World";
    const template = document.createElement("template");
    template.innerHTML = `
      <label>Este es un label</label>
      <input type="text" />
      <button>
          ${this.button}
      </button>
    `;
    return template;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
}
