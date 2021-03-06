import {hydrate, render} from 'react-dom';
import Router from './router';

const rootElement = document.getElementById('reboil-root');

/**
 * We check if pre-rendering is already happen
 * to prevent unnecessary rendering
 */
if (rootElement.hasChildNodes()) {
  hydrate(<Router />, rootElement);
} else {
  render(<Router />, rootElement);
}
