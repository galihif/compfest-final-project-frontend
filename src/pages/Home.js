
//Component
import FeaturedCard from "../components/FeaturedCard"
import Header from "../components/Header"
import CampaignCard from "../components/CampaignCard"
import { useSelector } from "react-redux"
// import AdminFundraiserCard from "../components/Admin/AdminFundraiserCard"
// import AdminWithdrawCard from "../components/AdminWithdrawCard"
// import AdminUserCard from "../components/AdminUserPaymentCard"
import AdminCampaignProposalCard from "../components/Admin/AdminCampaignProposalCard"

const Home = () => {
    const state = useSelector(state => state);    
    const isLogged = state.isLogged;
    return (
        <div>
            {isLogged ? "" : <Header/>} 
            <FeaturedCard title='Featured Campaigns'>
                <AdminCampaignProposalCard 
                    title='Saving Live'
                    email='some@Qgma.com'
                    target={10000000}
                    name='jokowidoddo'
                    imageLink="https://www.islamic-relief.org/wp-content/uploads/2021/04/original--1024x683.jpg"
                />
            </FeaturedCard>
        </div>
    )
}

export default Home