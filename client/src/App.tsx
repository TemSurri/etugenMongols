import AppErrorBoundary from "./app/AppErrorBoundary";
import AppProviders from "./app/AppProviders";
import AppRoutes from "./app/AppRoutes";
import ScrollToTop from "./app/ScrollToTop";

function App() {
  return (
    <AppErrorBoundary>
      <AppProviders>
        <ScrollToTop />
        <AppRoutes />
      </AppProviders>
    </AppErrorBoundary>
  );
}

export default App;
