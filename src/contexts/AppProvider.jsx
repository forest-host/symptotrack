import React, { Component } from 'react';

/* Create new context */
const AppContext = React.createContext();

/* Create provider Component */
class AppProvider extends Component {
  state = {
    basicQuestionnaire: {},
    translatedQuestionnaire: {},
    translatedErrors: {},
  };

  static getDerivedStateFromProps(props) {
    const update = {};

    if (props.basicQuestionnaire) {
      update.basicQuestionnaire = props.basicQuestionnaire;
    }
    if (props.translatedQuestionnaire) {
      update.translatedQuestionnaire = props.translatedQuestionnaire;
    }
    if (props.translatedErrors) {
      update.translatedErrors = props.translatedErrors;
    }
    return update;
  }

  render() {
    return (
      <AppContext.Provider value={{ ...this.state }}>{this.props.children}</AppContext.Provider>
    );
  }
}

/* Create Consumer */
const AppConsumer = AppContext.Consumer;

/* Context Hook */
const useApp = () => {
  const context = React.useContext(AppContext);
  return context;
};

export default AppProvider;
export { AppConsumer, AppContext, useApp };
