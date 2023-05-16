import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import StartPage from './Routes/StartPage/StartPage'
import ChatPage from './Routes/Chatbot/ChatPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<StartPage />} />
        <Route exact path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
