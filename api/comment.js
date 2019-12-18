import request from '@/utils/request'

const group_name = 'article';
const api_name = 'comment';

export default{
    getComments(articleId){
        return request({
            url: `${group_name}/${api_name}/${articleId}`,
            method: 'get',
        })
    },
    submitComment(pojo){
        return request({
            url: `/${group_name}/${api_name}`,
            method: `post`,
            data: pojo
        })
    },
    deleteComment(commentId){
        return request({
            url: `/${group_name}/${api_name}/${commentId}`,
            method: `delete`,
        })
    },
    updateComment(commentId, pojo){
        return request({
            url: `/${group_name}/${api_name}/${commentId}`,
            method: 'put',
            data: pojo
        })
    }
}

