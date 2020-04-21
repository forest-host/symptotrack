import React, { Component } from 'react';

/* Create new context */
const AppContext = React.createContext();

/* Create provider Component */
class AppProvider extends Component {
  state = {
    questionnaires: {},
  };

  static getDerivedStateFromProps(props) {
    const update = {};

    if (props.questionnaires) {
      update.questionnaires = props.questionnaires;
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
