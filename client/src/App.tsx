// import logo from './logo.svg';
// import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [text, setText] = useState("");

  useEffect(() =>  {
    fetch("/api/delicate").then(response => {
      response.text().then((data) => {
        setText(data)
      })
    })
  });

  console.log(text)

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div>
          {text}
        </div>
      </header>
    </div>
  );
}

export default App;
