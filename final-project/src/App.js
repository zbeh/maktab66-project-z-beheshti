import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import "./Style/index.scss";
import { Provider } from "react-redux";
import store from "./Redux/Store/Store";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./Components/Theme";
import { Toaster } from "react-hot-toast";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}

export default App;
