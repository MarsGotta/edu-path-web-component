export class MySearch extends HTMLElement {
  static get observedAttributes() {
    return ["button", "label", "input", "placeholder"];
  }

  constructor() {
    super();

    this.button = "";
    this.label = "";
    this.input = "";
    this.placeholder = "";
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    this.attachShadow({ mode: "open" });

    this.render();

    this.element = this.shadowRoot.querySelector("button");
    this.slotNode = this.element.querySelector("slot");

    this.element.addEventListener("click", this.handleClick.bind(this));
    this.slotNode.addEventListener("slotchange", this.handleSlot.bind(this));
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) {
      return;
    }

    this[name] = newVal;
  }

  disconnectedCallback() {
    this.element.removeEventListener("click", this.handleClick.bind(this));
    this.slotNode.removeEventListener("slotchange", this.handleSlot.bind(this));

    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
  }

  handleClick(e) {
    this.dispatchEvent(
      new CustomEvent("on-click", {
        bubbles: true,
        composed: true,
        detail: {
          button: this.button || this.innerHTML,
        },
      })
    );
  }

  handleSlot(e) {
    console.log('slotchange', e);
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      ${this.getStyles()}
      <label part="label"><slot name="label">${this.label}</slot></label>
      <input type="text" part="input" value="${this.input}" placeholder="${this.placeholder}" />
      <button part="button">
          <slot name="button">${this.button}</slot>
      </button>
    `;
    return template;
  }

  getStyles() {
    return `<style> @import "../src/MySearch.styles.css" </style>`;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
}
