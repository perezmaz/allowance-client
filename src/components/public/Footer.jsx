/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="m0 p0 mb-5 mt-5 text-center text-white">
        {t('footer.text')}
      </div>
    </footer>
  );
};

export default Footer;
