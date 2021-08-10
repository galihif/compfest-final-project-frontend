import Post from './Post'
import {GetOnly,GetWithData} from './Get'
import Put from './Put'
import Delete from './Delete'

// POST
const register = (body) => Post("register", body)
const login = (data) => Post("login", data) 
const refresh = (data) => Post("refresh", data)
const createCampaign = (data,headers) => Post('campaigns', data, headers)

// GET
const getCurrentUser = (data) => GetOnly('me')
const getAllCampaign = () => GetOnly('campaigns')
const getCampaignById = (data) => GetWithData('campaigns',data)
const getCampaignProposal = () => GetOnly('admin/proposals')
const getExampleById = (data) => GetWithData('todos',data)
const getExampleAll = () => GetOnly('todos')

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
    getExampleById,
    getExampleAll
}

export default API;

