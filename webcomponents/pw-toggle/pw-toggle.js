class PasswordToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // creates a shadow root, which is an isolated DOM tree attached to the component

    this.shadowRoot.innerHTML = `
    <style>
    // special CSS selector that targets the custom element itself
     :host {
      display: block;
      font-family: sans-serif;
     }
     .wrapper {
      position: relative;
      display: flex;
      align-items: center;
     }
     input {
      padding: 10px;
      padding-right: 40px;
      width: 100%;
      font-size: 1rem;
    }
    button {
     position: absolute;
     right: 5px;
     background: none;
     border: none;
     cursor: pointer;
     font-size: 0.9rem;
   }
    </style>
    <div class="wrapper">
     <input type="password" />
     <button>Show</button>
    </div>
  `;
  }
  connectedCallback() { // called when the element is added to the DOM - great place to add event listeners or do setup work.
    const input = this.shadowRoot.querySelector("input");
    const button = this.shadowRoot.querySelector("button");

    button.addEventListener("click", () => {
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      button.textContent = isHidden ? "Hide" : "Show";
    });
  }
}
// registers the custom element with the browser
customElements.define("password-toggle", PasswordToggle);
