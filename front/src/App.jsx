import Header from './components/header/Header.jsx';
import './App.css';
import Container from './components/container/Container.jsx';

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

      <Container></Container>
      
    </div>
  );
}

export default App;
