import { useContext } from 'react';
import { WebSocketContext } from '../providers/WebSocketProvider';

const useWebSocket = () => useContext(WebSocketContext);
export default useWebSocket;
