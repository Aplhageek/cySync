import { Component, ReactElement } from "react";
import Label from "../components/base/Label";
import Button from "../components/base/Button";
import { COMMON_EVENTS, commonCustomEvent } from "../services/customEvents";

interface ErrorBoundaryProps {
  children?: ReactElement;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidMount() {
    commonCustomEvent.on(COMMON_EVENTS.ERROR_OCCURRED, this.onErrorOccurred);
    commonCustomEvent.on(
      COMMON_EVENTS.NAVIGATION_TRIGGERED,
      this.onNavigationTriggered
    );
  }

  componentDidCatch() {
    /* Report error to analytics */
  }

  componentWillUnmount() {
    commonCustomEvent.remove(
      COMMON_EVENTS.ERROR_OCCURRED,
      this.onErrorOccurred
    );
    commonCustomEvent.remove(
      COMMON_EVENTS.NAVIGATION_TRIGGERED,
      this.onNavigationTriggered
    );
  }

  onNavigationTriggered = () => {
    this.setState({ hasError: false });
  };

  onErrorOccurred = () => {
    this.setState({ hasError: true });
  };

  render() {
    return this.state.hasError ? (
      <div
        className="column bg-white border-m border-radius-s shadow-s width-auto p-r"
        style={{
          margin: "auto",
          width: 370,
          maxWidth: "90%",
          minWidth: 300,
        }}
      >
        <Label
          text={"Oops! something went wrong."}
          //   className="row fw-m"
        />
        <Label
          text={
            "It looks like we are having some issue loading this page. Try reloading the page."
          }
          //   className="row mt-l"
        />
        <Button
          text="Reload Page"
          //   className="bg-transparent text-app mt-l fw-m align-self-end"
          onClick={() => window.location.reload()}
        />
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
