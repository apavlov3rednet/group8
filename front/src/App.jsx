import React, { useCallback, useEffect, useState } from 'react'; //react and hooks
import Header from './components/header/Header';
import Table from './components/table/Table';
//import './css/style.css';

const serverAddr = 'http://localhost:8000/';
//const PORT = 3000;

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    menu: {},
    table: {},
    form: {}
  });

  const serverResponse = useCallback(async () => {
    setLoading(true);
    const response = await fetch(serverAddr);
    const srData = await response.json();

    setData(srData);
    setLoading(false);
  }, []);

  useEffect(() => {
    serverResponse();
    }, [serverResponse]
  )

  return (
    <div className="App">
      <Header menu={ data.menu } />

      {loading && <p>Загрузка...</p>}

      {!loading && (
        <>
          <Table ndfnff='test'>
            {data.table}
          </Table>
        </>
      )}

    
    </div>
  );
}

export default App;
