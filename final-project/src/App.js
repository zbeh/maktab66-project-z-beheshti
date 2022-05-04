import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './Routes/MyRoutes';
function App() {
  return (
    <div>
      <BrowserRouter>
        <MyRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
