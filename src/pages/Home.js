
//Component
import FeaturedCard from "../components/FeaturedCard"
import Header from "../components/Header"
import CampaignCard from "../components/CampaignCard"
import { useSelector } from "react-redux"
// import AdminFundraiserCard from "../components/Admin/AdminFundraiserCard"
// import AdminUserCard from "../components/AdminUserPaymentCard"
import AdminWithdrawCard from "../components/Admin/AdminWithdrawCard"
import AdminUserPaymentCard from "../components/Admin/AdminUserPaymentCard"

const Home = () => {
    const state = useSelector(state => state);    
    const isLogged = state.isLogged;
    return (
        <div>
            {isLogged ? "" : <Header/>} 
            <FeaturedCard title='Featured Campaigns'>
                <AdminUserPaymentCard
                    name='Joko widodo'
                    email='asdfa@gmail.com'
                    amount={10000000}
                    bankName='BCA'
                    accountNumber="1293048231"
                />
            </FeaturedCard>
        </div>
    )
}

export default Home