function createElement(name, attributes = {}) {
  let element = undefined;

  if (name != null || name != undefined) {
    element = document.createElement(name);
  }

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  return element;
}

const APPLICATION_BACKGROUND_COLOR = ` 
  background: #E8CBC0;  /* fallback for old browsers */
  background: linear-gradient(to right, #636FA4, #E8CBC0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  width: 100%;
  height: 100%;  
`;

export { 
  createElement, 
  APPLICATION_BACKGROUND_COLOR 
};