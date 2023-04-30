import "./popupReg.css";
export default class PopupReg {
  constructor(container, ws) {
    this.container = container;
    this.ws = ws;
    this.registrationsCallback = () => {};
  }

  drawUI() {
    this.popupEl = document.createElement("div");
    this.popupEl.classList.add("popup");

    const popupFormEl = document.createElement("form");
    popupFormEl.classList.add("popup-form");

    const popupTitleEl = document.createElement("h2");
    popupTitleEl.classList.add("popup-title");
    popupTitleEl.textContent = "Выберите псевдоним";

    popupFormEl.appendChild(popupTitleEl);
    popupFormEl.appendChild(this.getInputEl());
    popupFormEl.appendChild(this.getButtonEl());
    this.popupEl.appendChild(popupFormEl);

    popupFormEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this.container.appendChild(this.popupEl);
  }

  getInputEl() {
    const inputWraper = document.createElement("div");
    inputWraper.classList.add("input-wraper");
    this.inputEl = document.createElement("input");
    this.inputEl.classList.add("input");

    inputWraper.appendChild(this.inputEl);

    return inputWraper;
  }

  getButtonEl() {
    const buttonsWraper = document.createElement("div");
    buttonsWraper.classList.add("buttons-wraper");

    const entranceButton = document.createElement("button");
    entranceButton.classList.add("button", "entrance-button");
    entranceButton.textContent = "Продолжить";
    buttonsWraper.appendChild(entranceButton);

    entranceButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.inputEl.value.length >= 2) {
        const value = this.inputEl.value;
        this.inputEl.value = "";
        this.registrationsCallback(value);
      }
    });
    return buttonsWraper;
  }

  removePopup() {
    this.inputEl.value = "";
    this.popupEl.remove();
  }
}
