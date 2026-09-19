import { Component, type ErrorInfo, type ReactNode } from "react";

/** A render failure must not leave a blank, unrecoverable application. */
export default class AppErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application rendering failed", error, info.componentStack);
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-[#f4ecd9] text-[#27301d]">
          <button
            type="button"
            className="border border-current px-6 py-3"
            onClick={() => window.location.reload()}
          >
            Reload / Дахин ачаалах
          </button>
        </main>
      );
    }
    return this.props.children;
  }
}
