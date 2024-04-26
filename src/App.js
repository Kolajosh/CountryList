import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <Router>
          <AppRoutes />
        </Router>
      </div>
    </HelmetProvider>
  );
}

export default App;
