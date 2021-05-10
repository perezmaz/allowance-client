import { useContext } from 'react';
import { MessageContext } from '../providers/MessageProvider';

const useMessage = () => useContext(MessageContext);
export default useMessage;
