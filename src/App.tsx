import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { toast } from "react-toastify";
import Routes from "./Routes";
import theme from "./theme";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

import "react-toastify/dist/ReactToastify.css";

const store = configureStore();
toast.configure();

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
