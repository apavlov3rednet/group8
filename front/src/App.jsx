import Header from './components/header/Header.jsx';
import Table from './components/table/Table.jsx';
//import './css/style.css';

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

      <Table />
    </div>
  );
}

export default App;
