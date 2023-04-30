import PopupReg from "../popupReg/popupReg";
import RequestService from "../../services/RequestService";
import Chat from "../chat/chat";
export default class ChatBoard {
  constructor(container) {
    this.container = container;
    this.registrationsCallback = this.registrationsCallback.bind(this);
    this.addMessageCallback = this.addMessageCallback.bind(this);
    this.currentName = null;
  }

  drawUI() {
    this.popupReg = new PopupReg(this.container);
    this.popupReg.registrationsCallback = this.registrationsCallback;
    this.popupReg.drawUI();
  }

  registrationsCallback(name) {
    RequestService.registrations(name).then((resolve) => {
      console.log(resolve.data.id);
      if (resolve.data) {
        this.personId = resolve.data.id;
        this.webSockets();
        this.popupReg.removePopup();
        this.chat = new Chat(this.container, this.personId);
        this.chat.addMessageCallback = this.addMessageCallback;
        this.chat.drawUI();
      }
    });
  }

  addMessageCallback(personId, text) {
    RequestService.addMessage(personId, text);
  }

  webSockets() {
    this.ws = new WebSocket("ws://localhost:7075/ws");

    this.ws.addEventListener("open", (e) => {
      //console.log(e);
      //console.log('ws open');
    });

    this.ws.addEventListener("message", (e) => {
      console.log(JSON.parse(e.data));
      const { persons, messages } = JSON.parse(e.data);

      if (persons) {
        this.chat.clearList();
        persons.forEach((person) => {
          this.chat.getPersonItemEl(person);
        });
      }

      if (messages) {
        this.chat.clearMessages();
        messages.forEach((message) => {
          this.chat.drawMessageEl(message);
        });
      }
    });

    this.ws.addEventListener("close", (e) => {
      console.log(e);
      console.log("ws close");
    });

    window.addEventListener("beforeunload", () => {
      this.ws.send(JSON.stringify({ personId: this.personId }));
    });
  }
}
