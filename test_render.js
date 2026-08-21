import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App.jsx';

try {
  const html = renderToString(createElement(App));
  console.log("Render successful!");
  // console.log(html);
} catch (e) {
  console.error("Render failed:");
  console.error(e);
}
