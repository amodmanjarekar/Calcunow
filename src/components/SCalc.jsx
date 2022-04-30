import React, { useState } from 'react';

export default function SCalc() {
  const [output, setOutput] = useState('');
  const [RD, setRD] = useState("Rad");
  var trigObjOG = {one: "sin", two: "ln", three: "cos", four: "log", five: "tan", six: "√", seven: "Ans", eight: "x^y"};
  var trigObjIN = {one: "sin^-1", two: "e^x", three: "cos^-1", four: "10^", five: "tan^-1", six: "x^2", seven: "Rnd", eight: "y√x"};
  const [inv, setInv] = useState(trigObjOG);
  const [prevANS, setPrevANS]  = useState(0);

  const operators = ['+', '-', '*', '/', '.', '%', '^', '√'];

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
    setPrevANS(fact.toString());
  }

  const invert = () => {
    if(inv.one === "sin") {
      setInv(trigObjIN);
    } else if(inv.one === "sin^-1") {
      setInv(trigObjOG);
    }
  }

  const strToRad = initStr => {
    if(!initStr.includes('π')) {
      return eval(initStr);
    }
    const [pre, post] = initStr.split('π');
    var finalAngle = 0;
    if(pre === '') {
      finalAngle = Math.PI + post;
    } else {
      finalAngle = pre + "*" + Math.PI + post;
    }
    return eval(finalAngle);
  }

  const evalSin = () => {
    var solution = 0;
    if(inv.one === "sin") {
      if(RD === "Rad") {
        const angleRad = strToRad(output);
        solution = Math.sin(angleRad);
      } else if(RD === "Deg") {
        const angleDeg = output * Math.PI / 180;
        solution = Math.sin(angleDeg);
      }
      if(Math.abs(solution) < Number.EPSILON){
        solution = 0;
      }
    } else if(inv.one === "sin^-1") {
      solution = Math.asin(output);
    }
    setOutput(solution.toString());
    setPrevANS(solution.toString());
  }

  const evalLn = () => {
    if(inv.two === "ln"){
      setOutput(Math.log(output));
      setPrevANS(Math.log(output));
    } else if(inv.two === "e^x"){
      setOutput(Math.exp(output));
      setPrevANS(Math.exp(output));
    }
  }

  const evalCos = () => {
    var solution = 0;
    if(inv.three === "cos") {
      if(RD === "Rad") {
        const angleRad = strToRad(output);
        solution = Math.cos(angleRad);
      } else if(RD === "Deg") {
        const angleDeg = output * Math.PI / 180;
        solution = Math.cos(angleDeg);
      }
      if(Math.abs(solution) < Number.EPSILON){
        solution = 0;
      }
    } else if(inv.three === "cos^-1") {
      solution = Math.acos(output);
    }
    setOutput(solution.toString());
    setPrevANS(solution.toString());
  }

  const evalLog = () => {
    if(inv.four === "log"){
      setOutput(Math.log10(output));
      setPrevANS(Math.log10(output));
    } else if(inv.four === "10^"){
      setOutput(Math.pow(10, output));
      setPrevANS(Math.pow(10, output));
    }
  }

  const evalTan = () => {
    var solution = 0;
    if(inv.five === "tan") {
      if(RD === "Rad") {
        const angleRad = strToRad(output);
        solution = Math.tan(angleRad);
      } else if(RD === "Deg") {
        const angleDeg = output * Math.PI / 180;
        solution = Math.tan(angleDeg);
      }
      if(Math.abs(solution) < Number.EPSILON){
        solution = 0;
      }
    } else if(inv.five === "tan^-1") {
      solution = Math.atan(output);
    }
    setOutput(solution.toString());
    setPrevANS(solution.toString());
  }

  const evalSq = () => {
    if(inv.six === '√') {
      setOutput((Math.sqrt(output)).toString());
      setPrevANS((Math.sqrt(output)).toString());
    } else if(inv.six === "x^2") {
      setOutput((Math.pow(output, 2)).toString());
      setPrevANS((Math.pow(output, 2)).toString());
    }
  }

  const evalANS = () => {
    if(inv.seven === "Ans") {
      const skips = ['+', '-', '*', '/', '%', '^', '√', ''];
      if(!skips.includes(output.slice(-1))){
        setOutput(output + '*' + prevANS);
        return;
      }
      if(output.slice(-1) === '.') {
        return;
      }
      setOutput(output + prevANS);
    } else if(inv.seven === "Rnd") {
      if(output.includes('.')){
        setOutput((Math.round(output)).toString());
        setPrevANS((Math.round(output)).toString());
      }
      return;
    }
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

    if((value === 'π') || (value === 'e')) {
      const skips = ['+', '-', '*', '/', '%', '^', '√', ''];
      if(!skips.includes(output.slice(-1))){
        setOutput(output + '*' + value);
        return;
      }
      if(output.slice(-1) === '.') {
        return;
      }
    }

    setOutput(output + value);
  }

  const updatePow = () => {
    if(operators.includes(output.slice(-1)) || output.includes('^') || output.includes('√')) {
      return;
    }
    if(inv.eight === "x^y") {
      setOutput(output + '^');
    } else if(inv.eight === "y√x") {
      setOutput(output + '√');
    }
  }

  const evaluate = () => {
    if(output.includes('%')){
      const [per, perOf] = output.split('%');
      setOutput((per * perOf / 100).toString());
      setPrevANS((per * perOf / 100).toString());
      return;
    }

    if(output.includes('π') || output.includes('e')){
      var pieoutput = output.toString();
      pieoutput = pieoutput.replace(/π/g, (Math.PI).toString());
      pieoutput = pieoutput.replace(/e/g, (Math.E).toString());
      setOutput(eval(pieoutput).toString());
      setPrevANS(eval(pieoutput).toString());
      return;
    }

    if(output.includes('^')) {
      const [base, power] = output.split('^');
      setOutput((Math.pow(base, power)).toString());
      setPrevANS((Math.pow(base, power)).toString());
      return;
    }

    if(output.includes('√')) {
      const [root, base] = output.split('√');
      setOutput((Math.pow(base, 1 / root)).toString());
      setPrevANS((Math.pow(base, 1 / root)).toString());
      return;
    }

    setOutput(eval(output).toString());
    setPrevANS(eval(output).toString());
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
        <button className="button" onClick={evalSin}>{inv.one}</button>
        <button className="button" onClick={evalLn}>{inv.two}</button>
        <button className="button digit" onClick={() => updateOutput('1')}>1</button>
        <button className="button digit" onClick={() => updateOutput('2')}>2</button>
        <button className="button digit" onClick={() => updateOutput('3')}>3</button>
        <button className="button" onClick={() => updateOutput('/')}>/</button>

        <button className="button" onClick={() => updateOutput('π')}>π</button>
        <button className="button" onClick={evalCos}>{inv.three}</button>
        <button className="button" onClick={evalLog}>{inv.four}</button>
        <button className="button digit" onClick={() => updateOutput('4')}>4</button>
        <button className="button digit" onClick={() => updateOutput('5')}>5</button>
        <button className="button digit" onClick={() => updateOutput('6')}>6</button>
        <button className="button" onClick={() => updateOutput('*')}>*</button>

        <button className="button" onClick={() => updateOutput('e')}>e</button>
        <button className="button" onClick={evalTan}>{inv.five}</button>
        <button className="button" onClick={evalSq}>{inv.six}</button>
        <button className="button digit" onClick={() => updateOutput('7')}>7</button>
        <button className="button digit" onClick={() => updateOutput('8')}>8</button>
        <button className="button digit" onClick={() => updateOutput('9')}>9</button>
        <button className="button" onClick={() => updateOutput('-')}>-</button>

        <button className="button" onClick={evalANS}>{inv.seven}</button>
        <button className="button" onClick={() => updateOutput('(')}>EXP</button>
        <button className="button" onClick={() => updatePow('(')}>{inv.eight}</button>
        <button className="button digit" onClick={() => updateOutput('.')}>.</button>
        <button className="button digit" onClick={() => updateOutput('0')}>0</button>
        <button className="button submit" onClick={() => evaluate()}>=</button>
        <button className="button" onClick={() => updateOutput('+')}>+</button>
      </div>
    </div>

  </>);
}