import request from '@/utils/request'
const group_name = 'user';
const api_name = 'recommend';

export default{
    getRecommends(){
        return request({
            url: `/${group_name}/user/${api_name}`,
            method: `get`,
        })
    }
}