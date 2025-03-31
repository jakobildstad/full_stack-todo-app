import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';

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
