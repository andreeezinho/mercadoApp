import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Container from "./layout/Container.jsx";
import Navbar from "./layout/Navbar.jsx";
import Footer from "./layout/Footer.jsx";

import Home from './pages/Home.jsx';
import Carrinho from './pages/Carrinho.jsx';

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
          
          <Container customClass="min-height">
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/carrinho' element={<Carrinho />} />
            </Routes>
          </Container>

          <Footer />
        </Router>
    </div>
  );
}

export default App;
