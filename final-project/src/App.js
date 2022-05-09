import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import "./Style/index.scss";
import { Provider } from "react-redux";
import store from "./Redux/Store/Store";
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  typography: {
    fontFamily: [
      'main',
    ].join(','),
  },});
function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
         <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
      </ThemeProvider>
     
    </div>
  );
}

export default App;
