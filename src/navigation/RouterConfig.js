import React from "react";
import { Switch, Route } from "react-router-dom";

//Path
import {
    ROOT,
    LOGIN,
    REGDONOR,
    REGFUND,
    CAMPAIGN,
    DASHFUND,
    DASHDONOR,
    ADMIN,
    FUNDRAISERREQUEST,
    FUNDRAISERREQUESTBYID
} from './CONSTANTS'

//Pages
import DashboardFundraiser from "../pages/DashboardFundraiser";
import DashboardDonor from "../pages/DashboardDonor";
import CampaignDetails from "../pages/CampaignDetails";
import RegisterDonor from "../pages/RegisterDonor";
import RegisterFundraiser from "../pages/RegisterFundraiser";
import NavbarM from "../components/Navbar/NavbarM";
import Footer from "../components/Footer/Footer";
import Login from "../pages/Login";
import Home from "../pages/Home";
import FundraiserVerifier from "../containers/Admin/FundraiserVerifier";
import CheckAdmin from "../containers/Admin/CheckAdmin";
import AdminFundraiserDetails from "../pages/Admin/AdminFundraiserDetails";

export const RouterConfig = () => {
    return (
        <div>
            <NavbarM/>
            <Route path={ADMIN}>
                <CheckAdmin/>
            </Route>
            <Switch>
                <Route path={DASHFUND}>
                    <DashboardFundraiser />
                </Route>
                <Route path={DASHDONOR}>
                    <DashboardDonor />
                </Route>
                <Route path={CAMPAIGN}>
                    <CampaignDetails />
                </Route>
                <Route path={LOGIN}>
                    <Login />
                </Route>
                <Route path={REGDONOR}>
                    <RegisterDonor />
                </Route>
                <Route path={REGFUND}>
                    <RegisterFundraiser />
                </Route>
                <Route exact path={ROOT}>
                    <Home />
                </Route>
                <Route exact path={FUNDRAISERREQUEST}>
                    <FundraiserVerifier />
                </Route>
                <Route exact path={FUNDRAISERREQUESTBYID}>
                    <AdminFundraiserDetails/>
                </Route>
                {/* <Route path="*">
                    <NotFound />
                </Route> */}
            </Switch>
            <Footer/>
        </div>
    );
};
