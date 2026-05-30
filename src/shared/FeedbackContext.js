import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React, { createContext, useContext, useState } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [animation, setAnimation] = useState(null); // 'success', 'error' ou null

  const showSuccess = () => {
    setAnimation('success');
    setTimeout(() => setAnimation(null), 2000); // Some após 2 segundos
  };

  const showError = () => {
    setAnimation('error');
    setTimeout(() => setAnimation(null), 2000);
  };

  return (
    <FeedbackContext.Provider value={{ showSuccess, showError }}>
      {children}

      {/* Overlay com a animação no centro da tela */}
      {animation && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            {animation === 'success' && (
              <DotLottieReact
                src="https://lottie.host/bd97db22-321e-4215-8b9f-ebbb1271bec5/xchRAaQxCm.json" // URL de exemplo de Check (substitua pelo seu)
                autoplay
                loop={false}
              />
            )}
            {animation === 'error' && (
              <DotLottieReact
                src="https://lottie.host/b5f50c0e-b790-4616-ad0f-5aac7103cc0d/EKk94RyQfB.json" // URL de exemplo de Erro (substitua pelo seu)
                autoplay
                loop={false}
              />
            )}
          </div>
        </div>
      )}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => useContext(FeedbackContext);

// Estilos básicos inline para centralizar o feedback
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fundo escurecido suave
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999, // Garante que fica por cima de tudo
  backdropFilter: 'blur(4px)', // Efeito de desfoque no fundo
};

const modalStyle = {
  width: '250px',
  height: '250px',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};