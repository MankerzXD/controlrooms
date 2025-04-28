import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Aula from './components/Aula'; // Importamos Aula.jsx

import Sede from './components/Sede';
import './styles/global.scss';
import './styles/Login.scss';
import './styles/home.scss';
import './styles/sede.scss';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/sede/:sedeId" element={<ProtectedRoute><Sede /></ProtectedRoute>} />
                <Route path="/aula/:aulaId" element={<ProtectedRoute><Aula /></ProtectedRoute>} /> {/* Nueva ruta */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
