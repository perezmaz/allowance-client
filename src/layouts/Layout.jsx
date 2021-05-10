/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  BrowserRouter,
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

const Layout = () => {
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
    if (user) {
      return <PrivateHeader />;
    }
    return <PublicHeader />;
  };

  const Footer = () => {
    if (user) {
      return <PrivateFooter />;
    }
    return <PublicFooter />;
  };

  return (
    <BrowserRouter>
      <div className={auth ? baseMainStyle : `${baseMainStyle} background`}>
        <Header />
        <main className={auth ? `${baseContentStyle} main-content` : baseContentStyle}>
          <Switch>
            {routes.filter(item => item.type !== 'divider').map(route => {
              if (!user || (user && route.roles.includes(user.role))) {
                return (
                  <MainRoute
                    key={`route-${route.path}`}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    isPrivate={route.isPrivate}
                    isAuth={auth}
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
    </BrowserRouter>
  );
};

export default Layout;
