import Post from './Post'
import { GetHeadersOnly, GetWithData } from './Get'
import Put from './Put'
import Delete from './Delete'

// POST
const register = (body, headers) => Post("register", body, headers)
const login = (body, headers) => Post("login", body)
const refresh = (data) => Post("refresh", data)
const createCampaign = (data, headers) => Post('campaigns', data, headers)

// GET
const getCurrentUser = (headers) => GetHeadersOnly('me', headers)
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
}

export default API;

