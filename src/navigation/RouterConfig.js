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
    FUNDRAISERREQUESTBYID,
    CAMPAIGNPROPOSALS,
    CAMPAIGNPROPOSALSBYID,
    TOPUPREQUEST,
    WITHDRAWREQUEST
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
import CampaignProposals from "../containers/Admin/CampaignProposals";
// import AdminProposalCampaignDetails from "../pages/Admin/AdminProposalCampaignDetails";
// import UserPayments from "../containers/Admin/UserPayments";
// import WihtdrawVerifier from "../containers/Admin/WithdrawVerifier";
import AdminHeader from "../components/Header/AdminHeader";

import NotFound from "../pages/NotFound";

export const RouterConfig = () => {
    return (
        <div>
            <NavbarM/>
            <Route path={ADMIN}>
                {/* <CheckAdmin/> */}
                <AdminHeader/>
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
                {/* Admin */}
                <Route exact path={FUNDRAISERREQUEST}>
                    <FundraiserVerifier />
                </Route>
                <Route exact path={FUNDRAISERREQUESTBYID}>
                    <AdminFundraiserDetails/>
                </Route>
                <Route exact path={CAMPAIGNPROPOSALS}>
                    <CampaignProposals />
                </Route>
                {/* <Route exact path={CAMPAIGNPROPOSALSBYID}>
                    <AdminProposalCampaignDetails />
                </Route>
                <Route exact path={TOPUPREQUEST}>
                    <UserPayments /> 
                </Route>
                <Route exact path={WITHDRAWREQUEST}>
                    <WihtdrawVerifier/>
                </Route> */}
                <Route path="*">
                    <NotFound/>
                </Route>
            </Switch>
            <Footer/>
        </div>
    );
};
