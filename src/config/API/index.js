import Post from './Post'
import { GetHeadersOnly, GetWithData } from './Get'
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
const getAllCampaign = () => GetHeadersOnly('campaigns')
const getCampaignById = (data) => GetWithData('campaigns', data)
const getCampaignProposal = () => GetHeadersOnly('admin/proposals')

// PUT

// DELETE
const API = {
    createCampaign,
    register,
    login,
    refresh,
    getCurrentUser,
    getAllCampaign,
    getCampaignById,
    getCampaignProposal,
    topUp,
    getUserTopUpList
}

export default API;

