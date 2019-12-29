import React, {useEffect, useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import Title from './pipeline/titlePipe/pipe';

const App: React.FC = () => {
  let [title, settitle] = useState('not set yet');
  let [number, setNumber] = useState('0');
  let TitleInstance = Title.getInstance();
  useEffect(()=>{
    const titleSubject = TitleInstance.getTitle()
    titleSubject.subscribe(
      (t)=>settitle(t),
      (e)=>settitle(e),
      ()=>settitle('completed')
    )
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          title : {title}
        </p>
        <input type="number" onChange = {(e)=>{setNumber(e.target.value); e.preventDefault();}}/>
        <button onClick={()=>TitleInstance.callApi(parseInt(number))}>
          call api
        </button>
      </header>
    </div>
  );
};

export default App;
