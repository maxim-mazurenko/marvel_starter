import { Component } from "react";
import ErrorMasseg from "../errorMessag/ErrorMasseg";

class ErrorBoundery extends Component {
  state = {
    error: false,
  };

  componentDidCatch(err, info) {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMasseg />;
    }

    return this.props.children;
  }
}

export default ErrorBoundery;
