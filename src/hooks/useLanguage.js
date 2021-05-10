import { useContext } from 'react';
import { LanguageContext } from '../providers/LanguageProvider';

const useLanguague = () => useContext(LanguageContext);
export default useLanguague;
