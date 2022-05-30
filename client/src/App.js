import './App.css';
import Auth from './pages/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main/:link" element={<Main />} />
        <Route path="/" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
