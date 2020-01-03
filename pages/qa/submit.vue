<template>
  <div class="wrapper">
  <div class="qa-submit-form">
    <form action="" class="sui-form">
      <div class="input-title">
        <input v-model="title" type="text" placeholder="标题：一句话说清问题，用问号结尾" class="input-xfat input-xxlarge title">
      </div>
      <div class="tags-area">
        <div class="input-tags">
          <input v-model="labellist" type="text" placeholder="标签，如:java可使用逗号，分号； 来分隔" class="input-xfat input-xxlarge" id="tags">
        </div>
        <div class="tags-box">
          <ul class="sui-tag tag-bordered">
            <li class="tag-item">javascript</li>
            <li class="tag-item">php</li>
            <li class="tag-item">css</li>
            <li class="tag-item">html</li>
            <li class="tag-item">java</li>
            <li class="tag-item">python</li>
            <li class="tag-item">html5</li>
            <li class="tag-item">node.js</li>
            <li class="tag-item">c++</li>
          </ul>
        </div>
      </div>

      <div class="editor">
        <div class="quill-editor"
             :content="content"
             @change="onEditorChange($event)"
             v-quill:myQuillEditor="editorOption">
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="submit">
        <span>已保存草稿</span>
        <span><a class="sui-btn btn-release" @click="submit">发布问题</a></span>
      </div>
      <div class="clearfix"></div>
    </form>
  </div>
  </div>
</template>

<script>
  import problemApi from "@/api/problem";
  import '@/assets/css/page-sj-qa-submit.css'
  import authApi from "@/utils/auth";
    export default {
        name: "submit",
        data(){
            return {
                content: "",
                title: "",
                labellist:""
            }
        },
        methods:{
            onEditorChange({ editor, html, text }) {
                this.content=html;
            },
            submit(){
                if (authApi.getUser().name===undefined){
                    this.$message({
                        message:"登陆后才能发布问题嗷~",
                        type: "error"
                    })
                    return
                }
                if (this.content){//TODO: Add label match
					userApi.getMyInfo().then(res => {
						problemApi.submit({
								title: this.title, 
								content: this.content, 
								labellist: this.labellist,
								createtime: new Date().format("yyyy-MM-dd hh:mm:ss"),
								userid: res.data.data.id,
								nickname: res.data.data.nickname,
							}).then(response => {
								this.$message({
									message: response.data.message,
									type: (response.data.flag ? 'success' : 'error')
								});
							if (response.data.flag){
								this.$router.push("/qa");
							}
						})
					})
                }else {
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
    max-height: 800px;
    overflow-y: auto;
  }
</style>
