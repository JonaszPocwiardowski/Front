import MyNavbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
//import Charts from './pages/Charts';
import { WeatherProvider } from './components/WeatherContext';

function App() {

  return (
    <Router>
      <div className='min-h-screen bg-gray-100'>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<WeatherProvider><Home /></WeatherProvider>} />
          {/* <Route path="/Charts" element={<Charts />}/> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;



