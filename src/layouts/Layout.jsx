/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  HashRouter,
  Switch,
} from 'react-router-dom';
import MainRoute from '../components/MainRoute';
import routes from '../config/routes';
import PrivateHeader from '../components/private/Header';
import PrivateFooter from '../components/private/Footer';
import PublicHeader from '../components/public/Header';
import PublicFooter from '../components/public/Footer';
import NotificationPush from '../components/NotificationPush';
import Notification from '../components/Notification';
import DangerModal from '../components/DangerModal';
import useModal from '../hooks/useModal';
import useMessage from '../hooks/useMessage';
import useAuth from '../hooks/useAuth';
import useWebSocket from '../hooks/useWebSocket';
import { TUTORIAL } from '../config/localStorage';

const Layout = () => {
  const [tutorial, setTutorial] = useState('completed');

  useEffect(() => {
    const hasTutorial = localStorage.getItem(TUTORIAL);
    if (hasTutorial !== 'completed') {
      setTutorial(true);
    } else {
      setTutorial(false);
    }
  });

  const { notificationMessage } = useMessage();
  const { modal, handleClose } = useModal();
  const { notificationAlert } = useWebSocket();

  const baseMainStyle = 'd-flex flex-column min-vh-100';
  const baseContentStyle = 'mb-auto';

  const { user, isLoading } = useAuth();
  const auth = !!user;

  if (isLoading) {
    return null;
  }

  const Header = () => {
    if (user && (!tutorial || user.role === 'child')) {
      return <PrivateHeader />;
    }
    return <PublicHeader />;
  };

  const Footer = () => {
    if (user && (!tutorial || user.role === 'child')) {
      return <PrivateFooter />;
    }
    return <PublicFooter />;
  };

  return (
    <HashRouter>
      <div className={auth && (!tutorial || user.role === 'child') ? baseMainStyle : `${baseMainStyle} background`}>
        <Header />
        <main className={auth && (!tutorial || user.role === 'child') ? `${baseContentStyle} main-content` : baseContentStyle}>
          <Switch>
            {routes.map(route => {
              if (!user || (user && route.roles.includes(user.role))) {
                return (
                  <MainRoute
                    key={`route-${route.path}`}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    isPrivate={route.isPrivate}
                    isAuth={auth}
                    isTutorial={tutorial}
                  />
                );
              }
              return '';
            })}
          </Switch>
        </main>
        <Footer />
      </div>
      <Notification
        show={notificationMessage.show}
        message={notificationMessage.message}
        type={notificationMessage.type}
      />
      <DangerModal
        content={modal.content}
        show={modal.show}
        handleClose={handleClose}
        actions={modal.actions}
      />
      <NotificationPush
        show={notificationAlert.show}
        message={notificationAlert.message}
        user={notificationAlert.user}
      />
    </HashRouter>
  );
};

export default Layout;
