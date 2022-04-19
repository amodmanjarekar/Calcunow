import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

export default function Navbar() {
  return(<>

    <div className="navbar">
      Calcu<span className="title-alt">now</span>
      <div className="spacer"></div>
      <a 
        target="_blank" 
        href="https://github.com/amodmanjarekar/calcunow/"
      >
        <FontAwesomeIcon icon={faGithub} /> 
      </a>
    </div>

</>);
}