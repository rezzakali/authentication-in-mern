import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
