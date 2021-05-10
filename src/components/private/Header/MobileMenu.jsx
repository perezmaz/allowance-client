/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import {
  IoNotificationsOutline,
  IoLogOut,
} from 'react-icons/io5';
import routes from '../../../config/routes';
import Logo from '../../../assets/img/log_4.svg';
import useLanguage from '../../../hooks/useLanguage';
import useWebSocket from '../../../hooks/useWebSocket';
import useNotification from '../../../hooks/useNotification';
import useAuth from '../../../hooks/useAuth';

const MobileMenu = ({ languageTitle, logoutUser }) => {
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

  const [openMenu, setOpenMenu] = useState(false);

  const openCloseMenu = () => {
    setOpenMenu(!openMenu);
  };

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
    <Navbar
      bg="primary"
      expand="md"
      variant="dark"
      className="main-header d-block d-md-none"
      expanded={openMenu}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src={Logo}
              alt="Logo"
            />
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="main-navbar ml-auto">
          <NavDropdown
            title={languageTitle}
            className="hide-caret mr-3 language-select"
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
            className="hide-caret mr-3 notification-select"
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
          <Navbar.Toggle onClick={openCloseMenu} />
        </Nav>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-block d-md-none mt-3">
            {routes.filter(item => !item.responsive && item.type === 'link').map(route => {
              if (route.roles.includes(user.role)) {
                return (
                  <LinkContainer
                    to={route.path}
                    key={`mobile-route-${route.path}`}
                    onClick={openCloseMenu}
                  >
                    <Nav.Link className="mr-2">
                      {route.icon}
                      {t(route.text)}
                    </Nav.Link>
                  </LinkContainer>
                );
              }
              return '';
            })}
            <NavDropdown.Divider />
            {routes.filter(item => item.responsive && item.type === 'link').map(route => {
              if (route.roles.includes(user.role)) {
                return (
                  <LinkContainer
                    to={route.path}
                    key={`mobile-route-${route.path}`}
                    onClick={openCloseMenu}
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
            <Nav.Link onClick={logoutUser}>
              <IoLogOut className="icon mr-2" />
              {t('menu.logout')}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MobileMenu;
