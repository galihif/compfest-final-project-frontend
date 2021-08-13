
//Component
import FeaturedCard from "../components/FeaturedCard"
import Header from "../components/Header"
import CampaignCard from "../components/CampaignCard"
import { useSelector } from "react-redux"
import AdminFundraiserCard from "../components/Admin/AdminFundraiserCard"
// import AdminWithdrawCard from "../components/AdminWithdrawCard"
// import AdminUserCard from "../components/AdminUserPaymentCard"
// import AdminCampaignProposalCard from "../components/AdminCampaignProposalCard"

const Home = () => {
    const state = useSelector(state => state);    
    const isLogged = state.isLogged;
    return (
        <div>
            {isLogged ? "" : <Header/>} 
            <FeaturedCard title={'Featured Campaigns'}>
                <AdminFundraiserCard 
                    title="jokowiddod"
                    email="jokowiddo@gmail.com"
                    description="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used demonstrate the visual ..."/>
                {/* <CampaignCard/> */}
            </FeaturedCard>
        </div>
    )
}

export default Home