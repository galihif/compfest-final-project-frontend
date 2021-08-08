import Post from './Post'
import Get from './Get'
import Put from './Put'
import Delete from './Delete'

// POST
const register = (data) => Post("register", data) 
const login = (data) => Post("login", data) 
const refresh = (data) => Post("refresh", data)
const createCampaign = (data,headers) => Post('campaigns', data, headers)

// GET
const getUser = (data) => Get('me')
const getAllCampaign = () => Get('campaigns')
const getCampaignById = (data) => Get('campaigns',data)
const getCampaignProposal = () => Get('admin/proposals')

// PUT

// DELETE
const API = {
    createCampaign,
    register,
    login,
    refresh,
    getUser,
    getAllCampaign,
    getCampaignById,
    getCampaignProposal
}

export default API;

