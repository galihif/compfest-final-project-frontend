
//Component
import FeaturedCard from "../components/FeaturedCard"
import Header from "../components/Header"
import CampaignCard from "../components/CampaignCard"
import AdminFundraiserCard from "../components/AdminFundraiserCard"
import AdminWithdrawCard from "../components/AdminWithdrawCard"

const Home = () => {
    return (
        <div>
            <Header/>
            <FeaturedCard>
                <AdminWithdrawCard/>
            </FeaturedCard>
            <FeaturedCard>
                <AdminFundraiserCard />
            </FeaturedCard>
            <FeaturedCard>
                <CampaignCard />
            </FeaturedCard>
        </div>
    )
}

export default Home