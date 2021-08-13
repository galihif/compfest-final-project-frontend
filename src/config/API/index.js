import Post from './Post'
import { GetHeadersOnly, GetWithId } from './Get'
import Put from './Put'
import Delete from './Delete'

// POST
const register = (body, headers) => Post("register", body, headers)
const topUp = (body, headers) => Post("topup", body, headers)
const login = (body, headers) => Post("login", body)
const refresh = (data) => Post("refresh", data)
const createCampaign = (body, headers) => Post('fundraiser/campaigns', body, headers)

// GET
const getCurrentUser = (headers) => GetHeadersOnly('me', headers)
const getUserTopUpList = (headers) => GetHeadersOnly('topup', headers)
const getUserCampaignList = (headers) => GetHeadersOnly('fundraiser/campaigns', headers)
const getAllCampaign = (headers) => GetHeadersOnly('campaigns', headers)
const getCampaignProposal = () => GetHeadersOnly('admin/proposals')

const getCampaignByIdFundraiser = (id, headers) => GetWithId('fundraiser/campaigns', id,headers)
const getCampaignByIdDonor = (id, headers) => GetWithId('donor/campaigns', id,headers)

// PUT

// DELETE

const API = {
    createCampaign,
    register,
    login,
    refresh,
    getCurrentUser,
    getAllCampaign,
    getCampaignByIdFundraiser,
    getCampaignByIdDonor,
    getCampaignProposal,
    topUp,
    getUserTopUpList,
    getUserCampaignList
}

export default API;

