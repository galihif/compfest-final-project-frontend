import Post from './Post'
import { Get } from './Get'
import Put from './Put'
import Delete from './Delete'

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
const getListFundraiser = (headers) => Get('admin/fundraiser-requests', headers)
const getListCampaignProposal = (headers) => Get('admin/proposals', headers)

// const getCampaignProposal = () => Get('admin/proposals')
const getDonateHistoryDonor = (headers) => Get('donate',headers)
const getCampaignByIdFundraiser = (id, headers) => Get(`fundraiser/campaigns/${id}`,headers)
const getCampaignByIdDonor = (id, headers) => Get(`donor/campaigns/${id}`,headers)
const getFundraiserByIdAdmin = (id, headers) => Get(`admin/fundraiser-requests/${id}`,headers)
const getCampaignProposalById = (id, headers) => Get(`admin/proposals/${id}`,headers)

// PUT
const putAcceptFundraiser = (body, headers) => Put(`admin/fundraiser-requests`,body,headers);
const putAcceptCampaign = (id,body, headers) => Put(`admin/proposals/${id}`,body,headers);

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
    getListFundraiser,
    getFundraiserByIdAdmin,
    putAcceptFundraiser,
    getListCampaignProposal,
    getCampaignProposalById,
    putAcceptCampaign,
    // getCampaignProposal,
    getDonateHistoryDonor,
    topUp,
    getUserTopUpList,
    getWithdrawRequestList,
    getUserCampaignList,
    donateCampaignById,
    withdrawCampaignById,
    deleteCampaignById
}

export default API;

