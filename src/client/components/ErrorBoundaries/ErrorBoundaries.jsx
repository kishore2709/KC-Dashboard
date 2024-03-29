import React from 'react';
import { userActions } from '_actions';
import { connect } from 'react-redux';
import { history } from '_helpers';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      // console.log('in Error boundaries');
      /*
      setTimeout(() => {
        // auto logout when get errors :v
        this.props.dispatch(userActions.logout());
        history.push('/login');
        window.location.reload();
      }, 2000);
      */
      return (
        <div>
          <h2>Gặp lỗi, bạn hãy thử Refresh lại trang web</h2>
          {/* <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details> */}
        </div>
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}

export default connect(
  null,
  null
)(ErrorBoundary);
