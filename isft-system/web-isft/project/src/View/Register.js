import { UnlogedNavBar } from "./Menus/UnlogedNavBar.js";

window.onload = () => { 
  let navBar = new UnlogedNavBar();
  document.body.appendChild(navBar);
  document.body.style = `background: #e8e8e8;`;
}

/* 
function makeReq() {
  fetch("http://localhost:3036/greet")
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

class createUserForm extends HTMLElement {
  constructor() {
    super();

    this.usernicknameInput = document.createElement('input');
    this.usernicknameInput.type = 'text';
    this.usernicknameInput.value = '';
    this.usernicknameInput.placeholder = 'username';

    this.passwordInput = document.createElement('input');
    this.passwordInput.type = 'password';
    this.passwordInput.value = '';
    this.passwordInput.placeholder = 'password';

    this.nameInput = document.createElement('input');
    this.nameInput.type = 'text';
    this.nameInput.value = '';
    this.nameInput.placeholder = 'name';

    this.surnameInput = document.createElement('input');
    this.surnameInput.type = 'text';
    this.surnameInput.value = '';
    this.surnameInput.placeholder = 'surname';

    this.dniInput = document.createElement('input');
    this.dniInput.type = 'text';
    this.dniInput.value = '';
    this.dniInput.placeholder = 'dni';

    this.genderInput = document.createElement('input');
    this.genderInput.type = 'text';
    this.genderInput.value = '';
    this.genderInput.placeholder = 'gender';

    this.telephoneInput = document.createElement('input');
    this.telephoneInput.type = 'text';
    this.telephoneInput.value = '';
    this.telephoneInput.placeholder = 'telephone';

    this.submitButton = document.createElement('button');
    this.submitButton.innerText = 'createUser';

    this.appendChild(this.usernicknameInput);
    this.appendChild(this.passwordInput);
    this.appendChild(this.nameInput);
    this.appendChild(this.surnameInput);
    this.appendChild(this.dniInput);
    this.appendChild(this.genderInput);
    this.appendChild(this.telephoneInput);

    this.appendChild(this.submitButton);
  }

  connectedCallback() {
    this.submitButton.onclick = (e) => this.oncreatebuttonclick(e);
  }

  async oncreatebuttonclick(event) {
    let formDataObject =
    {
      'nickname':   this.usernicknameInput.value,
      'password':   this.passwordInput.value,
      'name':       this.nameInput.value,
      'surname':    this.surnameInput.value,
      'dni':        this.dniInput.value,
      'gender':     this.genderInput.value,
      'telephone':  this.telephoneInput.value,
    };

    let response = await fetch('http://localhost:3036/createUser',
      {
        method: 'POST',
        body: JSON.stringify(formDataObject)
      });

    response.json().then((r) => {
      console.log(r);
    });
  }
}

customElements.define('x-form', createUserForm);

window.onload = () => {
  makeReq(); 
  let form = new createUserForm();
  document.body.appendChild(form);
} */