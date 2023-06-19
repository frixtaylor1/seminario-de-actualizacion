import { UnlogedNavBar } from './Menus/UnlogedNavBar.js';
import { LoginForm } from './Forms/LoginForm.js';

window.onload = () => {
  let navBar = new UnlogedNavBar();
  let form = new LoginForm();
  document.body.appendChild(navBar);
  document.body.appendChild(form);
  document.body.style = `background: #e8e8e8;`;
}
