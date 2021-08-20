import Post from './Post'
import { Get } from './Get'
import Delete from './Delete'
import Put from './Put'

// POST
const register = (body, headers) => Post("register", body, headers)
const topUp = (body, headers) => Post("topup", body, headers)
const login = (body, headers) => Post("login", body)
const refresh = (data) => Post("refresh", data)
const createCampaign = (body, headers) => Post('fundraiser/campaigns', body, headers)
const donateCampaignById = (id,body, headers) => Post(`donor/campaigns/${id}`, body, headers)
const withdrawCampaignById = (id,body, headers) => Post(`fundraiser/campaigns/${id}`, body, headers)

// GET
const getCurrentUser = (headers) => Get('me', headers)
const getUserTopUpList = (headers) => Get('topup', headers)
const getUserCampaignList = (headers) => Get('fundraiser/campaigns', headers)
const getWithdrawRequestList = (headers) => Get('withdraw', headers)
const getAllCampaign = (headers) => Get('campaigns', headers)
// const getCampaignProposal = () => Get('admin/proposals')
const getDonateHistoryDonor = (headers) => Get('donate',headers)
const getCampaignByIdFundraiser = (id, headers) => Get(`fundraiser/campaigns/${id}`,headers)
const getCampaignByIdDonor = (id, headers) => Get(`donor/campaigns/${id}`,headers)



// DELETE
const deleteCampaignById = (id,headers) => Delete(`fundraiser/campaigns/${id}`,headers)

const API = {
    createCampaign,
    register,
    login,
    refresh,
    getCurrentUser,
    getAllCampaign,
    getCampaignByIdFundraiser,
    getCampaignByIdDonor,
    // getCampaignProposal,
    getDonateHistoryDonor,
    topUp,
    getUserTopUpList,
    getWithdrawRequestList,
    getUserCampaignList,
    donateCampaignById,
    withdrawCampaignById,
    deleteCampaignById,
}

export default API;

