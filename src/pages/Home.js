
//Component
import FeaturedCard from "../components/FeaturedCard"
import Header from "../components/Header"
import CampaignCard from "../components/CampaignCard"
// import AdminFundraiserCard from "../components/AdminFundraiserCard"
// import AdminWithdrawCard from "../components/AdminWithdrawCard"
// import AdminUserCard from "../components/AdminUserPaymentCard"
// import AdminCampaignProposalCard from "../components/AdminCampaignProposalCard"

const Home = () => {
    return (
        <div>
            <Header/>
            <FeaturedCard title={'Featured Campaigns'}>
                <CampaignCard/>
            </FeaturedCard>
        </div>
    )
}

export default Home