import React from 'react';
import { getLocale } from '../utils';

const isServer = !process.browser;
const clientStore = isServer ? null : {};

async function fetchGlobalData(lang) {
  const symptotrack = require('@symptotrack/questions');
  const basicQuestionnaire = symptotrack.get_questionaire('basic');
  const translatedQuestionnaire = symptotrack.get_questionaire_translations(
    'basic',
    getLocale(lang)
  );
  const translatedErrors = symptotrack.get_error_translations(getLocale(lang));

  return { basicQuestionnaire, translatedQuestionnaire, translatedErrors };
}

const withData = (Page) => {
  const withDataWrapper = (props) => <Page {...props} />;
  withDataWrapper.getInitialProps = async (context) => {
    const { ctx } = context;
    const appData = clientStore ? clientStore.appData : await fetchGlobalData(ctx.req.language);

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
