//Library
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

//Config
import { store, persistor } from './config/Redux/store'

//Styles
import 'bootstrap/dist/css/bootstrap.min.css';

//Routing
import { RouterConfig } from "./navigation/RouterConfig";



function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <RouterConfig/>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
