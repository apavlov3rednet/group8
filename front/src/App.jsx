import Header from './components/header/Header.jsx';
import Table from './components/table/Table.jsx';
import Form from './components/form/Form.jsx';
import './App.css';

//const serverAddr = 'http://localhost:8000/';
//const PORT = 3000;

function App() {
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState({
  //   menu: {},
  //   table: {},
  //   form: {}
  // });

  // const serverResponse = useCallback(async () => {
  //   setLoading(true);
  //   const response = await fetch(serverAddr);
  //   const srData = await response.json();

  //   setData(srData);
  //   setLoading(false);
  // }, []);

  // useEffect(() => {
  //   serverResponse();
  //   }, [serverResponse]
  // )

  return (
    <div className="App">
      <Header />

      <div className='container'>
        <Form nameForm='Brands'/>
        <Table nameTable='Brands'/>
      </div>
      
    </div>
  );
}

export default App;
