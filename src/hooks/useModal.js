import { useContext } from 'react';
import { ModalContext } from '../providers/ModalProvider';

const useModal = () => useContext(ModalContext);
export default useModal;
