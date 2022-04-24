import React, { useState } from 'react';

export default function SCalc() {
  const [output, setOutput] = useState('');
  const [RD, setRD] = useState("Rad");
  var trigObjOG = {one: "sin", two: "ln", three: "cos", four: "log", five: "tan", six: "√", seven: "Ans", eight: "x^y"};
  var trigObjIN = {one: "csc", two: "e^x", three: "tan", four: "10^", five: "cot", six: "x^2", seven: "Rnd", eight: "y√x"};
  const [inv, setInv] = useState(trigObjOG);

  const operators = ['+', '-', '*', '/', '.', '%'];

  const switchRD = () => {
    if(RD === "Rad"){
      setRD("Deg");
    } else if(RD === "Deg"){
      setRD("Rad");
    }
  }

  const evalFactorial = () => {
    if(output.includes('+'||'-'||'*'||'/'||'.'||'%')) {
      return;
    }
    if(output === '0') {
      setOutput('1');
      return;
    }
    
    let fact = 1;
    for (var i = 1; i <= output; i++) {
        fact *= i;
    }
    setOutput(fact.toString());
  }

  const invert = () => {
    if(inv.one === "sin") {
      setInv(trigObjIN);
    } else if(inv.one === "csc") {
      setInv(trigObjOG);
    }
  }

  const strToRad = initStr => {
    const [pre, post] = initStr.split('π');
    var finalAngle = 0;
    if(pre === '') {
      finalAngle = Math.PI + post;
    } else {
      finalAngle = pre + "*" + Math.PI + post;
    }
    return finalAngle;
  }

  const RadToDeg = initAngle => {
    return initAngle * Math.PI / 180;
  }

  const evalSinCsc = () => {
    var solution = 0;
    if(inv.one === "sin") {
      if(RD === "Rad") {
        const angleRad = eval(strToRad(output));
        solution = Math.sin(angleRad);
      } else if(RD === "Deg") {
        const angleDeg = output * Math.PI / 180;
        solution = Math.sin(angleDeg);
      }
      if(Math.abs(solution) < Number.EPSILON){
        solution = 0;
      }
    } else if(inv.one === "csc") {
      
    }
    setOutput(solution.toString());
  }

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
      const [per, perOf] = output.split('%');
      setOutput((per * perOf / 100).toString());
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
        <button className="button span2" onClick={switchRD}>{RD}</button>
        <button className="button" onClick={evalFactorial}>x!</button>
        <button className="button" onClick={() => updateOutput('(')}>(</button>
        <button className="button" onClick={() => updateOutput(')')}>)</button>
        <button className="button" onClick={() => updateOutput('%')}>%</button>
        <button className="button" onClick={clear}>C</button>

        <button className="button" onClick={() => invert()}>Inv</button>
        <button className="button" onClick={evalSinCsc}>{inv.one}</button>
        <button className="button" onClick={() => updateOutput('(')}>{inv.two}</button>
        <button className="button digit" onClick={() => updateOutput('1')}>1</button>
        <button className="button digit" onClick={() => updateOutput('2')}>2</button>
        <button className="button digit" onClick={() => updateOutput('3')}>3</button>
        <button className="button" onClick={() => updateOutput('/')}>/</button>

        <button className="button" onClick={() => updateOutput('π')}>π</button>
        <button className="button" onClick={() => updateOutput('(')}>{inv.three}</button>
        <button className="button" onClick={() => updateOutput('(')}>{inv.four}</button>
        <button className="button digit" onClick={() => updateOutput('4')}>4</button>
        <button className="button digit" onClick={() => updateOutput('5')}>5</button>
        <button className="button digit" onClick={() => updateOutput('6')}>6</button>
        <button className="button" onClick={() => updateOutput('*')}>*</button>

        <button className="button" onClick={() => updateOutput('(')}>e</button>
        <button className="button" onClick={() => updateOutput('(')}>{inv.five}</button>
        <button className="button" onClick={() => updateOutput('(')}>{inv.six}</button>
        <button className="button digit" onClick={() => updateOutput('7')}>7</button>
        <button className="button digit" onClick={() => updateOutput('8')}>8</button>
        <button className="button digit" onClick={() => updateOutput('9')}>9</button>
        <button className="button" onClick={() => updateOutput('-')}>-</button>

        <button className="button" onClick={() => updateOutput('(')}>{inv.seven}</button>
        <button className="button" onClick={() => updateOutput('(')}>EXP</button>
        <button className="button" onClick={() => updateOutput('(')}>{inv.eight}</button>
        <button className="button digit" onClick={() => updateOutput('.')}>.</button>
        <button className="button digit" onClick={() => updateOutput('0')}>0</button>
        <button className="button submit" onClick={() => evaluate()}>=</button>
        <button className="button" onClick={() => updateOutput('+')}>+</button>
      </div>
    </div>

  </>);
}