import React from 'react';
import './assets/scss/main.scss';
import 'react-datetime/css/react-datetime.css';
import Layout from './layouts/Layout';
import WebSocketProvider from './providers/WebSocketProvider';
import AuthProvider from './providers/AuthProvider';
import LanguageProvider from './providers/LanguageProvider';
import MessageProvider from './providers/MessageProvider';
import ModalProvider from './providers/ModalProvider';
import NotificationProvider from './providers/NotificationProvider';

function App() {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <LanguageProvider>
          <ModalProvider>
            <MessageProvider>
              <NotificationProvider>
                <Layout />
              </NotificationProvider>
            </MessageProvider>
          </ModalProvider>
        </LanguageProvider>
      </WebSocketProvider>
    </AuthProvider>
  );
}

export default App;
