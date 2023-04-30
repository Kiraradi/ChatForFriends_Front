import "./chat.css";
export default class Chat {
  constructor(contaiter, personId) {
    this.contaiter = contaiter;
    this.personId = personId;
    this.personsOnline = [];
    this.messages = [];
    this.addMessageCallback = () => {};
  }

  drawUI() {
    const chatWraperEl = document.createElement("div");
    chatWraperEl.classList.add("chat-wraper");
    chatWraperEl.appendChild(this.getPersonListEl());
    chatWraperEl.appendChild(this.getChatWindow());
    this.contaiter.appendChild(chatWraperEl);
  }

  getPersonListEl() {
    const personListWraperEl = document.createElement("div");
    personListWraperEl.classList.add("person-list-wraper");

    this.personList = document.createElement("ul");
    this.personList.classList.add("person-list");
    personListWraperEl.appendChild(this.personList);

    return personListWraperEl;
  }

  getPersonItemEl(person) {
    const personItemWraperEl = document.createElement("li");
    personItemWraperEl.classList.add("person-item-wraper");

    const personIcon = document.createElement("div");
    personIcon.classList.add("person-icon");
    personItemWraperEl.appendChild(personIcon);

    const personName = document.createElement("div");
    personName.classList.add("person-name");

    if (person.id === this.personId) {
      personName.textContent = "You";
    } else {
      personName.textContent = person.name;
    }
    personItemWraperEl.appendChild(personName);

    this.personList.appendChild(personItemWraperEl);
  }

  clearList() {
    console.log(this.personList.children.length);
    if (this.personList.children.length > 0) {
      //this.personList.removeChild();
      this.personList.innerHTML = "";
    }
  }

  getChatWindow() {
    const chatWindowWraper = document.createElement("div");
    chatWindowWraper.classList.add("chat-window-wraper");

    this.chatWindow = document.createElement("div");
    this.chatWindow.classList.add("chat-window");
    chatWindowWraper.appendChild(this.chatWindow);

    const chatForm = document.createElement("form");
    chatForm.classList.add("chat-form");

    const chatInput = document.createElement("input");
    chatInput.classList.add("chat-input");
    chatForm.appendChild(chatInput);
    chatWindowWraper.appendChild(chatForm);

    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (chatInput.value.trim().length > 0) {
        this.addMessageCallback(this.personId, chatInput.value);
        chatInput.value = "";
      }
    });

    return chatWindowWraper;
  }

  clearMessages() {
    if (this.chatWindow.children.length > 0) {
      this.chatWindow.innerHTML = "";
    }
  }

  drawMessageEl(message) {
    console.log(message);
    const messageWraperEl = document.createElement("div");
    messageWraperEl.classList.add("message-wraper");

    const messageDescription = document.createElement("div");
    messageDescription.classList.add("message-description");
    if (message.personId === this.personId) {
      messageDescription.textContent = `You, ${message.creationTime}`;
      messageDescription.classList.add("message-description__red");
      messageWraperEl.classList.add("message-wraper__right");
    } else {
      messageDescription.textContent = `${message.personName}, ${message.creationTime}`;
    }
    messageWraperEl.appendChild(messageDescription);

    const messageEl = document.createElement("div");
    messageEl.classList.add("message");
    messageEl.textContent = message.text;

    messageWraperEl.appendChild(messageEl);

    this.chatWindow.appendChild(messageWraperEl);
  }
}
