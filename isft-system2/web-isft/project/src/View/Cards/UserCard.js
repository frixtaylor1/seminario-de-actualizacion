import { Button } from "../Buttons/Button.js";

class UserCard extends HTMLElement {
  constructor(cssPath) {
    super();
    this.cssPath = cssPath;
    this.container = document.createElement('div');
    this.container.classList.add('card');

    this.cardBorderTop = document.createElement('div');
    this.cardBorderTop.classList.add('card-border-top');

    this.userImage = document.createElement('div');
    this.userImage.classList.add('user-img');

    this.userNameTitle = document.createElement('span');
    this.userNameTitle.classList.add('user-name-title');
    this.groupTitle = document.createElement('p');
    this.groupTitle.classList.add('group-title');

    this.changeInformationButton = document.createElement('button');
    this.changeInformationButton.classList.add('card-button');
  }

  getUserNameTitleReference() {
    return this.userImage;
  }

  getGroupTitleReference() {
    return this.groupTitle;
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
    this.container.appendChild(this.cardBorderTop);
    this.container.appendChild(this.userImage);
    this.container.appendChild(this.userNameTitle);
    this.container.appendChild(this.groupTitle);

    this.appendChild(this.container);

    let style = document.createElement('style');
    style.innerText = `@import '${this.cssPath}'`;
    this.appendChild(style);
  }
}

customElements.define('x-user-card', UserCard);

export { UserCard };