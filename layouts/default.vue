<template>
  <div>
    <header>
      <div class="wrapper">
      <div class="sui-navbar">
        <div class="navbar-inner">
          <a href="/" class="sui-brand"><img src="~/assets/img/logo.png" style="margin-top: 5px" width="165px" height="80px" alt="社交"/></a>
          <ul class="sui-nav">
            <nuxt-link tag="li" :to="{ path:'/highlight'}" active-class="active" @click.native="activeChannel='highlight'" ><a>文章</a></nuxt-link>
            <nuxt-link tag="li" :to="{ path:'/qa'}" active-class="active" @click.native="activeChannel='qa'"><a>问答</a></nuxt-link>
            <nuxt-link tag="li" :to="{ path:'/gathering'}" active-class="active" @click.native="activeChannel='gathering'"><a>活动</a></nuxt-link>
            <nuxt-link tag="li" :to="{ path:'/spit'}" active-class="active" @click.native="activeChannel='spit'"><a>吐槽</a></nuxt-link>
            <nuxt-link tag="li" :to="{ path:'/recruit'}" active-class="active" @click.native="activeChannel='recruit'"><a>招聘</a></nuxt-link>
          </ul>
          <form class="sui-form sui-form pull-left">
              <label>
                  <input type="text" placeholder="输入文章关键词..." v-model="keyword">
              </label>
              <span class="btn-search fa fa-search" @click="search"/>
          </form>
          <div class="sui-nav pull-right info" v-if="user.name !== undefined">
            <li><a href="/manager" target="_blank" class="notice">{{user.name}}</a></li>
            <li><a @click="logout" class="notice">退出登录</a></li>
            <li><a href="/manager" target="_blank" class="homego"><img :src="user.avatar" alt="用户头像"></a></li>
          </div>
          <div class="sui-nav pull-right info" v-if="user.name === undefined">
            <nuxt-link to="/login">请登录</nuxt-link>
          </div>
        </div>
      </div>
      </div>
    </header>
    <nuxt/>
    <footer>
      <div class="footer">
        <div class="wrapper">
          <div class="footer-bottom">
            <div class="link">
              <dl>
                <dt>小组成员</dt>
                <dd>wxn</dd>
                <dd>czd</dd>
                <dd>fxp</dd>
                <dd>pjr</dd>
              </dl>
              <dl>
                <dt>JavaEE</dt>
              </dl>
              <dl>
                <dt>联系我们</dt>
                <dd>暂不提供</dd>
              </dl>
              <dl>
                <dt>关注我们</dt>
                <dd>不给方式</dd>
              </dl>

              <div class="xuke">
                <h3>内容许可</h3>
                <p>无特殊要求</p>
              </div>
            </div>
            <p class="Copyright">Software engineering of Tongji University</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
  import  '~/assets/plugins/normalize-css/normalize.css'
  import  '~/assets/plugins/yui/cssgrids-min.css'
  import  '~/assets/plugins/sui/sui.min.css'
  import '~/assets/plugins/sui/sui-append.min.css'
  import '~/assets/plugins/font-awesome/css/font-awesome.min.css'
  import '~/assets/css/widget-base.css'
  import '~/assets/css/widget-head-foot.css'
  import Auth from "@/utils/auth";
    export default {
        data(){
          return {
              user: {},
              activeChannel:'highlight',
              keyword:''
          }
        },
        created() {
              this.user = Auth.getUser();
        },
        methods:{
            logout(){
                Auth.removeUser();
                location.href='/';
            },
            search(){
                console.log(this.activeChannel);
                if (this.keyword !== ''){
                    this.$router.push({path: '/highlight', query:{isvalid: "1", keywords: this.keyword}})
                }
            },
        }
    }
</script>


