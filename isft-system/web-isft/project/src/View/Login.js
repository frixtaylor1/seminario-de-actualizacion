import { LoginForm } from './Forms/LoginForm.js';

window.onload = () => {
  let form = new LoginForm();
  document.body.appendChild(form);
  document.body.style = `background: #e8e8e8;`;
}
