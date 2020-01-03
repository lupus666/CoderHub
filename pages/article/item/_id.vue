<template>
  <div class="wrapper headline-content">
    <div class="fl left-list">
      <div class="problem-detail">
        <!-- title area  -->
        <div class="title-intro">
          <h2>{{this.title}}</h2>
          <div class="operate">
            <span class="fl author">{{this.publisher}}发布　　<span class="time">{{this.createtime}}</span></span>
          </div>
          <div class="clearfix"></div>
          <div class="content">
            {{this.content}}
          </div>
        </div>
        <div class="answer-intro">
          <h4 class="answer-num">{{commentlist.length}}条评论</h4>

          <ul class="title">
            <li v-for="(item,index) in commentlist" :key="index">
              <p v-html="item.content">{{item.content}}</p>
              <div class="operate">
                <div class="tool pull-left">
                  <span class="time">评论时间:{{item.createtime}}</span>
                </div>
              </div>
              <hr>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        
        <div class="edit-answer">
          <h4>撰写评论</h4>
          <div class="editor">
            <div class="quill-editor"
              :content="comment"
              @change="onEditorChange($event)"
              v-quill:myQuillEditor="editorOption">
            </div>
            <div class="btns">
              <button class="sui-btn btn-danger btn-release" @click="submit">发表</button>
            </div>
          </div>
        </div>
        <!--
        <div class="comment-box">
          <form class="comment-form">
              <label>
                  <textarea v-model="comment" rows="1" placeholder="使用评论询问更多信息或提出修改意见，请不要在评论里回答问题"/>
              </label>
              <button class="sui-btn submit-comment" @click="submit">提交评论</button>
          </form>
        </div>
        -->
      </div>
    </div>
    <div class="fl right-tag">
      <div class="focus similar-problem">
        <div class="img-title">
          <div class="fl img">
            <img :src="this.avatar" alt="">
          </div>
          <div class="fl btn-focus">
            <button class="sui-btn btn-info btn-attention" @click="follow">关注</button>
            <span>{{this.publisher}}</span>
          </div>
          <div class="clearfix"></div>
        </div>
        <ul class="problem-list">
          <li class="list-item">
            {{this.interest}}
          </li>
        </ul>
      </div>
      <div class="similar-problem">
        <h3 class="title">热门吐槽</h3>
        <ul class="problem-list">
          <li class="list-item" v-for="(item,index) in spitlist" :key="index">
           <nuxt-link  :to="`/spit/item/${item.id}`"> <p class="list-title">{{item.content}}</p></nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
		import '@/assets/css/page-sj-headline-detail.css'
		import '~/assets/css/page-sj-qa-detail.css'
    import articleApi from "@/api/article";
    import commentApi from "@/api/comment";
    import userApi from "@/api/user";
    import spitApi from "@/api/spit";
    import axios from 'axios'
    import authApi from "@/utils/auth";

    export default {
        name: "_id",
        data() {
            return {
                content:"",
                comment:""
            }
        },
        // //publisher: res1.data.data.nickname,
        // avatar: res1.data.data.avatar,
        // interest: res1.data.data.interest,
        asyncData({params}) {
            return axios.all([articleApi.getArticle(params.id),spitApi.search(1, 5, {"state": 1}), commentApi.getComments(params.id)]).then(
                axios.spread((res,res1,res2)=>{
                    console.log(res2.data.data);
                    console.log(params.id);
                    return userApi.getUserInfo(res.data.data.userid).then(res3=>{
                        return {
                            publisher: res3.data.data.nickname,
                            avatar: res3.data.data.avatar,
                            interest: res3.data.data.interest,
                            title: res.data.data.title,
                            content: res.data.data.content,
                            createtime: res.data.data.createtime,
                            spitlist: res1.data.data.rows,
                            articleid: params.id,
                            commentlist: res2.data.data
                        }
                    })
                }))
        },
        methods:{
            onEditorChange({editor, html, text}) {
                console.log('editor change!', editor, html, text);
                this.comment = html;
            },
            follow(){
                if(authApi.getUser().name === undefined){
                    this.$message({
                        message: "请先登录再关注嗷~",
                        type: "error"
                    });
                    return
                }
                this.$message({
                    message: "已关注",
                    type: "success"
                })
						},
            submit() {
                if (authApi.getUser().name === undefined){
                    this.$message({
                        message: "请先登录再评论",
                        type: "error"
                    });
                    return
                }
                if (this.comment) {
                    userApi.getMyInfo().then(res => {
                        commentApi.submit({
                            content: this.comment,
                            articleid: this.articleid,
                            //userid: res.data.data.id,
                            nickname: res.data.data.nickname,
                            //publishdate: new Date().format("yyyy-MM-dd hh:mm:ss")
                        }).then(response => {
                            this.$message({
                                message: response.data.message,
                                type: (response.data.flag ? 'success' : 'error')
                            });
                            if (response.data.flag) {
                                this.comment = "";
                                this.$router.go(0);
                            }
                        })
                    })
                } else {
                    this.$message({
                        message: "评论不能为空",
                        type: 'error'
                  })
                }
            }
        }
    }
    Date.prototype.format = function(fmt) { 
      var o = { 
          "M+" : this.getMonth()+1,                 //月份 
          "d+" : this.getDate(),                    //日 
          "h+" : this.getHours(),                   //小时 
          "m+" : this.getMinutes(),                 //分 
          "s+" : this.getSeconds(),                 //秒 
          "q+" : Math.floor((this.getMonth()+3)/3), //季度 
          "S"  : this.getMilliseconds()             //毫秒 
      }; 
      if(/(y+)/.test(fmt)) {
              fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
      }
      for(var k in o) {
          if(new RegExp("("+ k +")").test(fmt)){
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          }
      }
      return fmt; 
    };
</script>

<style scoped>

</style>
