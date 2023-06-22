class IsftLoader extends HTMLElement {
  constructor(path = null) {
    super();
    this.path = path;

    this.container = document.createElement('div');
    this.item1 = document.createElement('div');
    this.item2 = document.createElement('div');
    this.item3 = document.createElement('div');

    this.container.classList.add('loader');
  
    this.item1.classList.add('item1');
    this.item2.classList.add('item2');
    this.item3.classList.add('item3');
  }

  connectedCallback() {
    this.container.appendChild(this.item1);
    this.container.appendChild(this.item2);
    this.container.appendChild(this.item3);
    
    this.appendChild(this.container);

    let style = document.createElement('style');
    style.innerText = `@import './style/IsftLoader.css'`;
    this.appendChild(style);
    if(this.path !== null) {
      setTimeout(() => {
        this.handleItemClick();
      }, 2500);
    }
  }

  handleItemClick(event) {
    const path = this.path;
    window.location.href = path;

    // Retardo de 2 segundos antes de redirigir
  }
}

customElements.define('isft-loader', IsftLoader);

export { IsftLoader };
