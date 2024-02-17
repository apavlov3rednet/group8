import React, { useEffect, useState } from 'react'; //react and hooks
import Header from './components/header/Header';
//import './css/style.css';

const serverAddr = 'http://localhost:8000/';
//const PORT = 3000;

function App() {
  const [data, setData] = useState(null);

  useEffect(
    () => {
      fetch(serverAddr)
      .then(response => response.json())
      .then(
        (response) => {
          console.log(response);
          setData(response);
        },
        (error) => {
          console.error(error);
        }
      )
    }
  )

  return (
    <div className="App">
      <Header />
      {data}
    </div>
  );
}

export default App;
