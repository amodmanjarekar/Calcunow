import React from 'react';
import Navbar from '../components/Navbar';

export default function Home() {
  return(<>

    <Navbar />
    <div className="homepage">
      <div className="contentbox">
        <div className="contentleft">
          Welcome to Calcunow!<br /><br />
          What's new:
          <ul>
            <li>Fancy new header!</li>
          </ul>
        </div>
      </div>
    </div>

</>);
}