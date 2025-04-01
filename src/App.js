import Navbar from './Navbar';
import Home from './Home';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  return (
    <div className="App">
      <Navbar onTaskCreated={handleRefresh} />
      <div className="content">
        <Home key={refreshKey} />
      </div>
    </div>
  );
}

export default App;
