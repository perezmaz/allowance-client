import { useContext } from 'react';
import { NotificationContext } from '../providers/NotificationProvider';

const useNotification = () => useContext(NotificationContext);
export default useNotification;
