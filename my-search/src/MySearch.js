export class MySearch extends HTMLElement {
  static get observedAttributes() {
    return ["button"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.render();

    this.elementBtn = this.shadowRoot.querySelector("button");
    this.slotNode = this.elementBtn.querySelector("slot");

    this.slotNode.addEventListener("slotchange", this.handleSlot.bind(this));
  }

  get button() {
    return this.getAttribute("button");
  }

  set button(data) {
    this.setAttribute("button", data);
  }

  handleSlot(e) {
    console.log('slotchange', e);
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <label><slot name="label"></slot></label>
      <input type="text" />
      <button>
          <slot>${this.button}</slot>
      </button>
    `;
    return template;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
}
