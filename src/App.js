import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import { AnimatePresence } from 'framer-motion';
import { FeedbackProvider, useFeedback } from './shared/FeedbackContext';
import api, { setupInterceptors } from './utils/api';
import { useEffect } from 'react';

// Esse componente serve apenas para ligar o Axios ao Contexto
const AxiosInterceptorBridge = ({ children }) => {
  const { showSuccess, showError } = useFeedback();

  useEffect(() => {
    setupInterceptors(showSuccess, showError);
  }, [showSuccess, showError]);

  return children;
};

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <div>
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route index element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/home' element={<HomePage />} />
          </Routes>
        </AnimatePresence>
      
    </div>
  );
}

function App() {
  const testSuccess = async () => {
    // Simula um POST enviado com sucesso
    await api.post('https://jsonplaceholder.typicode.com/posts', { title: 'Teste' });
  };

  const testError = async () => {
    // Força um erro chamando uma rota que não existe
    try{
    await api.get('https://jsonplaceholder.typicode.com/rota-inexistente-404');
    } catch(e){
      
    }
  };
  return (
    <Router>
       <nav>
          <Link to={"/login"}>Login</Link>
          ----------
          <Link to={"/home"}>Home</Link>
        </nav>
      <AnimatedRoutes />
      <FeedbackProvider>
      <AxiosInterceptorBridge>
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h1>Testar Interceptors com Lottie</h1>
          <p>Clique nos botões abaixo para simular as respostas da API:</p>
          
          <button onClick={testSuccess} style={btnSuccess}>
            Simular Sucesso (POST)
          </button>
          
          <button onClick={testError} style={btnError}>
            Simular Erro (404)
          </button>
        </div>
      </AxiosInterceptorBridge>
    </FeedbackProvider>
    </Router>
  )
}

// Estilos dos botões de teste
const btnSuccess = { padding: '12px 24px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', marginRight: '10px', cursor: 'pointer' };
const btnError = { padding: '12px 24px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' };

export default App;
