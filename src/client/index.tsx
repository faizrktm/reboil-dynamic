import {hydrate, render} from 'react-dom';
import Router from './router';
import './styles/normalize.css';

const rootElement: HTMLElement | null = document.getElementById('reboil-root');

/**
 * We check if pre-rendering is already happen
 * to prevent unnecessary rendering
 */
if (rootElement?.hasChildNodes()) {
  hydrate(<Router />, rootElement);
} else {
  render(<Router />, rootElement);
}
