import React from 'react';
import Navbar from '../components/Navbar';
import SCalc from '../components/SCalc';

export default function Home() {
  return(<>

    <Navbar />
    <div className="homepage">
      <div className="contentbox">
        <div className="contentleft">
          Welcome to Calcunow!<br /><br />
          What's new:
          <ul>
            <li>30/04/22 - Working (almost)Scientific Calculator</li>
            <li>21/04/22 - Working (un)Scientific Calculator</li>
            <li>19/04/22 - Simple new header!</li>
          </ul>
        </div>
      </div>
      <div className="scalculator">
        <h2>(almost)Scientific Calculator</h2>
        <SCalc />
      </div>
      <div className="footer">
        Made with <span className="heart">♥</span> by <a href="https://github.com/amodmanjarekar" target="_blank">Amod Manjarekar</a>
      </div>
    </div>

</>);
}