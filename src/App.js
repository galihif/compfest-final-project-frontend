//Library
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

//Config
import { store, persistor } from './config/Redux/store'

//Styles
import 'bootstrap/dist/css/bootstrap.min.css';

//component
import Home from './pages/Home'
import NavbarM from "./components/NavbarM";
import Footer from "./components/Footer";
import RegisterDonor from "./pages/RegisterDonor";
import RegisterFundraiser from "./pages/RegisterFundraiser";
import Login from "./pages/Login";
import CampaignDetails from "./pages/CampaignDetails";
import DashboardDonor from "./pages/DashboardDonor";
import DashboardFundraiser from "./pages/DashboardFundraiser";



function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <NavbarM />
          <div>
            <Switch>
              <Route path="/dashboardfundraiser">
                <DashboardFundraiser/>
              </Route>
              <Route path="/dashboarddonor">
                <DashboardDonor/>
              </Route>
              <Route path="/campaign">
                <CampaignDetails/>
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/registerdonor">
                <RegisterDonor />
              </Route>
              <Route path="/registerfundraiser">
                <RegisterFundraiser />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </div>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
