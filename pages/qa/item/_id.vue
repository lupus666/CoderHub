<template>
  <div class="wrapper qa-content">

    <div class="qa-title">
      <div class="fl title">
        <h2>{{problem.title}}</h2>
        <p>
          <span class="author">{{problem.nickname}}</span>
        </p>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="fl left-list">
      <div class="problem-detail">
        <div class="title-intro">
          <div class="sidebar">

            <button type="button" class="like" data-placement="right" data-toggle="tooltip"
                    title="问题对人有帮助，内容完整，我也想知道答案"><i class="fa fa-caret-up" aria-hidden="true"></i></button>
            <span class="count">{{problem.thumbup}}</span>
            <button type="button" class="hate" data-placement="right" data-toggle="tooltip"
                    title="问题没有实际价值，缺少关键内容，没有改进余地"><i class="fa fa-caret-down" aria-hidden="true"></i></button>

          </div>
          <div class="title">
            <div class="detail" v-html="problem.content">
              {{problem.content}}
            </div>
            <div class="clearfix"></div>
          </div>

        </div>
        <div class="answer-intro">
          <h4 class="answer-num">{{replies.length}}个回答</h4>

          <ul class="title">
            <li v-for="(item,index) in replies" :key="index">
              <p v-html="item.content">{{item.content}}</p>
              <div class="operate">
                <div class="tool pull-left">
                  <span class="time">回答时间:{{item.createtime}}</span>
                </div>
              </div>
              <hr>
            </li>

          </ul>


          <div class="clearfix"></div>
        </div>
        <div class="edit-answer">
          <h4>撰写答案</h4>
          <div class="editor">
            <div class="quill-editor"
                 :content="content"
                 @change="onEditorChange($event)"
                 v-quill:myQuillEditor="editorOption">
            </div>
            <div class="btns">
              <button class="sui-btn btn-danger btn-release" @click="submit">发布</button>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
    import '~/assets/css/page-sj-qa-detail.css'
    import axios from 'axios'
    import replyApi from "@/api/reply";
    import authApi from "@/utils/auth"
    import problemApi from "@/api/problem";
    import userApi from "@/api/user";

    export default {
        name: "_id",
        data() {
            return {
                content: "",
            }
        },
        asyncData({params}) {
            return axios.all([problemApi.getProblem(params.id), replyApi.getReplies(params.id)]).then(
                axios.spread((res1, res2) => {
                    console.log(res2.data.data.rows);
                    return {
                        problem: res1.data.data,
                        replies: res2.data.data.rows,
                        problemId: params.id
                    }
                })
            )
        },
        methods: {//TODO: Add scorll function
            onEditorChange({editor, html, text}) {
                console.log('editor change!', editor, html, text);
                this.content = html;
            },
            submit() {
                console.log(new Date().format("yyyy-MM-dd hh:mm:ss"));
                if (authApi.getUser().name === undefined){
                    this.$message({
                        message: "请先登录再回答",
                        type: "error"
                    });
                    return
                }
                if (this.content) {
                    userApi.getMyInfo().then(res => {
                      replyApi.submit({
                            content: this.content,
                            problemid: this.problemId,
                            createtime: new Date().format("yyyy-MM-dd hh:mm:ss"),
                            userid: res.data.data.id,
                            nickname: res.data.data.nickname
                      }).then(response => {
                            this.$message({
                              message: response.data.message,
                              type: (response.data.flag ? 'success' : 'error')
                          });
                          if (response.data.flag) {
                            this.content="";
                            this.$router.go(0);
                          }
                        })
                    })
                } else {
                    this.$message({
                        message: "必须写点什么",
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
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
