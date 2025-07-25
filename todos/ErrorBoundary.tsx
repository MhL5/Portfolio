"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: (props: { error: Error; onRetry: () => void }) => ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error: {
        ...error,
        message: error.message,
        name: error.name,
        cause: error.cause,
        stack: error.stack?.split("\n").slice(0, 3).join("\n"),
      },
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  handleRetry() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError && this.state.error)
      return this.props.fallback({
        error: this.state.error,
        onRetry: this.handleRetry,
      });

    return this.props.children;
  }
}
