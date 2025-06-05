import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Aula from './components/Aula';
import Sede from './components/Sede';
import SeleccionPiso from './components/SeleccionPiso';

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
                <Route path="/sede/:sede" element={<ProtectedRoute><SeleccionPiso /></ProtectedRoute>} />
                <Route path="/aula/:aulaId" element={<ProtectedRoute><Aula /></ProtectedRoute>} />
                <Route path="/piso/:sede/:pisoId" element={<ProtectedRoute><Aula /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
