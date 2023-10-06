import { createElement } from "../Utils/Utility.js";

class BaseScene extends HTMLElement {
  constructor() {
    super();

    if (this.constructor == BaseScene) {
      throw new Error('Cannot instanciate an Abstract Class << BaseScene >>');
    }

    this.asideContainer   = createElement('aside',    { class: 'scene-aside-container' });
    this.sectionContainer = createElement('section',  { class: 'scene-section-container' });
    this.articleContainer = createElement('article',  { class: 'scene-article-container' });
    this.headerContainer  = createElement('header',   { class: 'scene-header-container' });
    this.footerContainer  = createElement('footer',   { class: 'scene-footer-container' });
  }

  render() {
    throw new Error('Method render() is Sub-Class responsability to be implemented!');
  }

  connectedCallback() {
    throw new Error('Method connectedCallback() is Sub-Class responsability to be implemented!');
  }

  disconnectedCallback() {
    throw new Error('Method disconnectedCallback() is Sub-Class responsability to be implemented!');
  }
}

export { BaseScene };