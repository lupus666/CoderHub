<template>
    <div>
        <div class="wrapper qa-content">
            <div class="fl left-list">
                <div class="tab-content">
                    <div id="index" class="tab-pane active">
                        <div class="tab-bottom-line">
                            <ul class="sui-nav nav-tabs">
                                <li :class="'active'"><a data-toggle="tab">搜索结果</a></li>
                            </ul>
                            <div class="data-list">
                                <ul class="headline fixed" id="headline">
                                    <li class="headline-item" v-for="(item,index) in articles" :key="index">
                                        <div class="fl indexImg">
                                            <img :src="item.image"/>
                                        </div>
                                        <nuxt-link :to="`/article/item/${item.id}`">
                                            <div class="words">
                                                <h3>{{item.title}} <span><img src="" class="vip"/></span></h3>
                                                <h5 class="author">
                                                    <div class="fl">
                                                        <span class="authorName"> {{item.thumbup}}人赞了这篇文章 </span>
                                                        <span>{{item.createtime}}</span>
                                                    </div>
                                                </h5>
                                            </div>
                                        </nuxt-link>
                                        <p class="content">
                                            {{item.content}}</p></li>
                                </ul>
                                <ul id="loaded" class="headline">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--
            <div class="fl right-tag">
                <div class="block-btn">
                    <p>今天，有什么好东西要和大家分享么?</p>
                    <nuxt-link to="/qa/submit"><a class="sui-btn btn-block btn-share" target="_blank">发布问题</a></nuxt-link>
                </div>
                <div class="hot-tags">
                    <div class="head">
                        <h3 class="title">热门标签</h3>
                    </div>
                    <div class="tags">
                        <ul class="sui-tag">
                            <li>Php</li>
                            <li>Javascript</li>
                            <li>Gif</li>
                            <li>Java</li>
                            <li>C#</li>
                            <li>iOS</li>
                            <li>C++</li>
                        </ul>
                    </div>
                </div>
            </div>
            -->
            <div class="clearfix"></div>
        </div>
    </div>
</template>

<script>
    import '~/assets/css/page-sj-qa-logined.css'
    import problemApi from "@/api/problem";
    import articleApi from "@/api/article"
    import axios from 'axios'
    import search from "@/pages/search";
    export default {
        name: "_section",
        data(){
            return {
                busy: false,
                page_new: 1,
                keywords:''
            }
        },
        mounted () {
            window.addEventListener('scroll', this.handleScroll, true)
        },
        created() {
            // console.log(this.$route.query);
        },
        asyncData({params, query}){
            return axios.all([articleApi.getList(1, 10, {"title": query.keywords})])
                .then(axios.spread((res1)=>{
                    console.log(params);
                    console.log(query);
                    // console.log(this.$route.query);
                    return {
                        articles: res1.data.data.rows,
                        keywords: query.keywords
                    }
                }))
        },
        methods:{
            handleScroll(){
                let _self = this;
                if (window.scrollY >= document.body.scrollHeight - document.body.clientHeight - 20) {
                    if (!_self.busy) {
                        _self.busy = true;
                        _self.loadMore();
                    }
                }
            },
            loadMore(){
                this.page_new++;
                articleApi.getList(this.page_new, 10, {"title": this.keywords}).then(response=>{

                    this.articles=this.articles.concat(response.data.data.rows);
                    this.busy=false
                })
            }
        }
    }
</script>

<style scoped>

</style>
