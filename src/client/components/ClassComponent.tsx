import {Component} from 'react';
import {container} from './ClassComponent.css';

class ClassComponent extends Component {
  render(): JSX.Element {
    return <div className={container}>This is class based component</div>;
  }
}

export default ClassComponent;
