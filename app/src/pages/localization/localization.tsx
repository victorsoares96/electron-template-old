import React from 'react';
import { useTranslation } from 'react-i18next';
import './localization.css';

function Localization() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <section className="section">
        <div className="container has-text-centered">
          <h1 className="title is-1">{t('Hello')}</h1>
          <div className="subtitle italics">
            Try changing the language in the menu bar!
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Localization;
