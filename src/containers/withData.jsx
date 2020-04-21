import React from 'react';
import { getLocale } from '../utils';

const isServer = !process.browser;
const clientStore = isServer ? null : {};

async function fetchGlobalData() {
  const symptotrack = require('@symptotrack/questions');
  const questionnaires = {};
  const types = ['basic'];
  const langs = ['en', 'nl'];

  types?.map((type) => {
    const questionnaire = symptotrack.get_questionaire(type) || {};
    const questionnaireRecurring = symptotrack.get_questionaire(type, true) || {};
    const translation = {};

    langs?.map((lang) => {
      const questionnaireTranslation =
        symptotrack.get_questionaire_translations(type, getLocale(lang)) || {};
      const translatedErrors = symptotrack.get_error_translations(getLocale(lang)) || {};

      translation[lang] = { questionnaireTranslation, translatedErrors };
    });

    questionnaires[type] = {
      questionnaire,
      questionnaireRecurring,
      translation,
    };
  });

  return { questionnaires };
}

const withData = (Page) => {
  const withDataWrapper = (props) => <Page {...props} />;
  withDataWrapper.getInitialProps = async (context) => {
    const appData = clientStore ? clientStore.appData : await fetchGlobalData();

    if (clientStore && !clientStore.appData) {
      clientStore.appData = appData;
    }

    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
      appData,
    };
  };

  return withDataWrapper;
};

export default withData;
