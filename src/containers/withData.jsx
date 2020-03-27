import React from 'react';
import { getLocale } from '../utils';

const isServer = !process.browser;
const clientStore = isServer ? null : {};

async function fetchGlobalData(lang, name = 'basic') {
  const symptotrack = require('@symptotrack/questions');
  // const questionnaires = [];
  // const types = symptotrack.get_questionaires();

  /*
  types?.map((type) => {
    const questionnaire = symptotrack.get_questionaire(type) || {};
    const questionnaireTranslation =
      symptotrack.get_questionaire_translations(type, getLocale(lang)) || {};
    const questionnaireRecurring = symptotrack.get_questionaire(type, true) || {};
    const translatedErrors = symptotrack.get_error_translations(getLocale(lang)) || {};

    questionnaires[type] = {
      questionnaire,
      questionnaireTranslation,
      questionnaireRecurring,
      translatedErrors,
    };
  });
  */

  const basicQuestionnaire = symptotrack.get_questionaire(name);
  const translatedQuestionnaire = symptotrack.get_questionaire_translations(name, getLocale(lang));
  const basicQuestionnaireRecurring = symptotrack.get_questionaire(name, true);
  const translatedErrors = symptotrack.get_error_translations(getLocale(lang));

  return {
    basicQuestionnaire,
    translatedQuestionnaire,
    basicQuestionnaireRecurring,
    translatedErrors,
  };
}

const withData = (Page) => {
  const withDataWrapper = (props) => <Page {...props} />;
  withDataWrapper.getInitialProps = async (context) => {
    const { ctx } = context;

    const appData = clientStore
      ? clientStore.appData
      : await fetchGlobalData(ctx.req.language, ctx.req.params.name);

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
