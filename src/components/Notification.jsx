/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  AiFillWarning,
  AiFillInfoCircle,
} from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';

const Notification = ({ message, type, show }) => {
  const textColor = `text-${type}`;
  const borderColor = `border-color-${type}`;
  const nodeRef = React.useRef(null);

  return (
    <CSSTransition
      in={show}
      timeout={3000}
      classNames="alert"
      nodeRef={nodeRef}
    >
      <div
        ref={nodeRef}
        className={`notification-message ${borderColor}`}
      >
        {type === 'info'
          && <AiFillInfoCircle className={`icon mr-2 ${textColor}`} />}

        {type !== 'info'
          && <AiFillWarning className={`icon mr-2 ${textColor}`} />}

        {message}
      </div>
    </CSSTransition>
  );
};

export default Notification;
