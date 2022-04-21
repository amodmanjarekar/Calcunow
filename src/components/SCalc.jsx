import React, { useState } from 'react';

export default function SCalc() {
  const [output, setOutput] = useState('');

  const operators = ['+', '-', '*', '/', '.', '%'];

  const updateOutput = value => {
    if(output === '') {
      setOutput(value);
    }

    if(output === '0' && value === '0') {
      return;
    }

    if(output.includes('.') && value === '.') {
      return;
    }

    if(
      (operators.includes(value) && output === ' ') ||
      (operators.includes(value) && operators.includes(output.slice(-1)))
    ) {
      return;
    }

    setOutput(output + value);
  }

  const evaluate = () => {
    if(output.includes('%')){
      return;
    }

    setOutput(eval(output).toString());
  }

  const clear = () => {
    setOutput('')
  }

  return (<>

    <div className="scalc">
      <div className="screen">{output || '0'}</div>
      <div className="button-layout">
        <button className="button" onClick={() => updateOutput('(')}>(</button>
        <button className="button" onClick={() => updateOutput(')')}>)</button>
        <button className="button" onClick={() => updateOutput('%')}>%</button>
        <button className="button" onClick={clear}>C</button>

        <button className="button digit" onClick={() => updateOutput('1')}>1</button>
        <button className="button digit" onClick={() => updateOutput('2')}>2</button>
        <button className="button digit" onClick={() => updateOutput('3')}>3</button>
        <button className="button" onClick={() => updateOutput('/')}>/</button>

        <button className="button digit" onClick={() => updateOutput('4')}>4</button>
        <button className="button digit" onClick={() => updateOutput('5')}>5</button>
        <button className="button digit" onClick={() => updateOutput('6')}>6</button>
        <button className="button" onClick={() => updateOutput('*')}>*</button>

        <button className="button digit" onClick={() => updateOutput('7')}>7</button>
        <button className="button digit" onClick={() => updateOutput('8')}>8</button>
        <button className="button digit" onClick={() => updateOutput('9')}>9</button>
        <button className="button" onClick={() => updateOutput('-')}>-</button>

        <button className="button digit" onClick={() => updateOutput('.')}>.</button>
        <button className="button digit" onClick={() => updateOutput('0')}>0</button>
        <button className="button submit" onClick={() => evaluate()}>=</button>
        <button className="button" onClick={() => updateOutput('+')}>+</button>
      </div>
    </div>

  </>);
}