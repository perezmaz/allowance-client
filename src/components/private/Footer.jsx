/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="bg-dark text-center text-light footer mt-3">
        {t('footer.text')}
      </div>
    </footer>
  );
};

export default Footer;
