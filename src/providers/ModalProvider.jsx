/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    content: '',
    show: false,
    actions: [],
  });

  const handleClose = () => setModal({
    content: '',
    show: false,
    actions: [],
  });
  const handleShow = (content, actions) => setModal({
    content,
    show: true,
    actions,
  });

  const provider = {
    modal,
    handleShow,
    handleClose,
  };

  return (
    <ModalContext.Provider value={provider}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
