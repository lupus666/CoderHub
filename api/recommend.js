import request from '@/utils/request'
const group_name = 'user'
const api_name = 'recommend'
export default{
    getRecommends(userId){
        return request({
            url: `/${group_name}/${api_name}/${userId}`,
            method: `get`,
        })
    }
}