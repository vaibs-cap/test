import React from 'react';

function clearDataOnUnmount(Component) {
  return class extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
    componentWillUnmount() {
      this.props.actions.clearData();
    }
  };
}

export default clearDataOnUnmount;
