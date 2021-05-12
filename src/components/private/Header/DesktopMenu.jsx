/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoNotificationsOutline } from 'react-icons/io5';
import routes from '../../../config/routes';
import Logo from '../../../assets/img/log_3.svg';
import UserPhoto from '../../../assets/img/user.png';
import useLanguage from '../../../hooks/useLanguage';
import useWebSocket from '../../../hooks/useWebSocket';
import useNotification from '../../../hooks/useNotification';
import useAuth from '../../../hooks/useAuth';
import api from '../../../config/api';

const DesktopMenu = ({ languageTitle, logoutUser }) => {
  const { onChangeLanguage } = useLanguage();

  const { notificationsCount } = useWebSocket();

  const {
    notifications,
    openNotification,
    showNotifications,
  } = useNotification();

  const { user } = useAuth();

  const { t } = useTranslation();

  const { pathname } = useLocation();

  const profileTile = (
    <>
      <img
        src={user.avatar ? `${api.HOST}:${api.PORT}/avatar/${user.avatar}` : UserPhoto}
        alt="Usuario"
        className="photo mr-2"
      />
      {user.name === 'No Name' ? t('No Name') : user.name}
    </>
  );

  const notificationTitle = (
    <>
      <IoNotificationsOutline
        className="icon"
        title={t('notification.title')}
      />
      {notificationsCount > 0
        && (
          <div
            className={notificationsCount < 10
              ? 'notification-number pl6'
              : 'notification-number pl3'}
          >
            {notificationsCount}
          </div>
        )}
    </>
  );

  return (
    <>
      <Navbar
        bg="primary"
        expand="md"
        variant="dark"
        className="main-header d-none d-md-block"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={Logo}
                alt="Logo"
                className="logo"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="main-navbar ml-auto">
            <NavDropdown
              title={languageTitle}
              className="hide-caret mr-2"
            >
              <NavDropdown.Item onClick={() => { onChangeLanguage('Español'); window.location.reload(); }}>
                Español
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => { onChangeLanguage('English'); window.location.reload(); }}>
                English
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={notificationTitle}
              className="hide-caret mr-2 notification-select"
              alignRight
              onClick={showNotifications}
            >
              <NavDropdown.Header className="m0 p0 ml-4">
                {t('notification.title')}
              </NavDropdown.Header>
              <NavDropdown.Divider />
              {notifications.length > 0 && notifications.map(notification => (
                <NavDropdown.Item
                  key={notification._id}
                  onClick={() => openNotification(notification._id, notification.linkId)}
                >
                  <div className="mb-2">
                    <div className="text-primary m0 p0 fs-13">
                      {notification.name}
                    </div>
                    <div className="m0 p0">
                      {notification.message}
                      <div className="text-gray m0 p0 fs-13">
                        {notification.timeLeft}
                      </div>
                    </div>
                  </div>
                </NavDropdown.Item>
              ))}
              {notifications.length === 0
                && (
                  <NavDropdown.Item>
                    <div className="text-gray m0 p0 fs-13">
                      No existen notificaciones
                    </div>
                  </NavDropdown.Item>
                )}
              {notifications.length > 0
                && (
                  <>
                    <NavDropdown.Divider />
                    <LinkContainer to="/notifications">
                      <NavDropdown.Item
                        className="m0 p0 text-center text-primary fs-13"
                      >
                        {t('notification.load')}
                      </NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}
            </NavDropdown>
            <NavDropdown
              title={profileTile}
              className="hide-caret"
            >
              <LinkContainer to="/profile">
                <NavDropdown.Item>
                  {t('menu.profile')}
                </NavDropdown.Item>
              </LinkContainer>
              {user.role === 'parent'
                && (
                  <LinkContainer to="/child">
                    <NavDropdown.Item>
                      {t('menu.children')}
                    </NavDropdown.Item>
                  </LinkContainer>
                )}
              <NavDropdown.Item onClick={logoutUser}>
                {t('menu.logout')}
              </NavDropdown.Item>
            </NavDropdown>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Nav>
        </Container>
      </Navbar>
      <Navbar
        bg="primary"
        expand="md"
        variant="light"
        className="secondary-header"
      >
        <Container>
          <Nav className="secondary-navbar">
            {routes.filter(aux => !aux.responsive && aux.type === 'link').map(route => {
              if (route.roles.includes(user.role)) {
                return (
                  <LinkContainer
                    to={route.path}
                    key={`desktop-route-${route.path}`}
                  >
                    <Nav.Link
                      className="mr-2"
                      active={route.path === pathname}
                    >
                      {route.icon}
                      {t(route.text)}
                    </Nav.Link>
                  </LinkContainer>
                );
              }
              return '';
            })}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default DesktopMenu;
