/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React from 'react';
import { CSSTransition } from 'react-transition-group';

const NotificationPush = ({ user, message, show }) => {
  const nodeRef = React.useRef(null);

  return (
    <CSSTransition
      in={show}
      timeout={3000}
      nodeRef={nodeRef}
      classNames="alert"
    >
      <div
        ref={nodeRef}
        className="notification-push"
      >
        <div className="text-primary m0 p0 fs-13">
          {user}
        </div>
        <div className="m0 p0">
          {message}
        </div>
      </div>
    </CSSTransition>
  );
};

export default NotificationPush;
