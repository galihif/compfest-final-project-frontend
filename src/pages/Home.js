
//Component
// import FeaturedCard from "../components/FeaturedCard"
import Header from "../components/Header/Header"
// import CampaignCard from "../components/CampaignCard"
import FeaturedCampaign from "../containers/FeaturedCampaign"
// import AdminFundraiserCard from "../components/AdminFundraiserCard"
// import AdminWithdrawCard from "../components/AdminWithdrawCard"
// import AdminUserCard from "../components/AdminUserPaymentCard"

const Home = () => {
    return (
        <div>
            <Header/>
            {/* <FeaturedCard title={'Featured Campaigns'}>
                <CampaignCard/>
            </FeaturedCard> */}
            <FeaturedCampaign/>
        </div>
    )
}

export default Home