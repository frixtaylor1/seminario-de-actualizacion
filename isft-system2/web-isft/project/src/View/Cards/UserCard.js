import { Button } from "../Buttons/Button.js";
import { ClassicInput } from "../Inputs/ClassicInput.js";

class UserCard extends HTMLElement {
  constructor(cssPath) {
    super();
    this.cssPath = cssPath;
    this.container = document.createElement('div');
    this.container.classList.add('card');

    this.userImage = document.createElement('div');
    this.userImage.classList.add('user-img');

    this.nameTitle = new ClassicInput('Name', true, 'name', 'text');
    this.nameTitle.setReadonly(true);

    this.groupTitle = new ClassicInput('Group', true, 'group', 'text');
    this.groupTitle.setReadonly(true);

    this.changeInformationButton = new Button('Change info', 'bttn', './style/FormButton.css');
  }

  getnameTitleReference() {
    return this.nameTitle;
  }

  setNameTitle(value) {
    this.nameTitle.setInputValue(value);
  }

  getGroupTitleReference() {
    return this.groupTitle;
  }

  setGroupTitle(value) {
    this.groupTitle.setInputValue(value);
  }

  getChangeInformationButtonReference() {
    return this.changeInformationButton;
  }
  
  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.changeInformationButton.disconnectedCallback();
  }
  
  render() {
    this.container.appendChild(this.userImage);
    this.container.appendChild(this.nameTitle);
    this.container.appendChild(this.groupTitle);
    this.container.appendChild(this.changeInformationButton);

    this.appendChild(this.container);

    let style = document.createElement('style');
    style.innerText = `@import '${this.cssPath}'`;
    this.appendChild(style);
  }
}

customElements.define('x-user-card', UserCard);

export { UserCard };