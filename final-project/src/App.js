import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import "./Style/index.scss";
import { Provider } from "react-redux";
import store from "./Redux/Store/Store";
function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
