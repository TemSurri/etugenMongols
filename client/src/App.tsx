import AppProviders from "./app/AppProviders";
import AppRoutes from "./app/AppRoutes";
import ScrollToTop from "./app/ScrollToTop";

function App() {
  return (
    <AppProviders>
      <ScrollToTop />
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
