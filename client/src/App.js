import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import StartPage from './Routes/StartPage/StartPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<StartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
