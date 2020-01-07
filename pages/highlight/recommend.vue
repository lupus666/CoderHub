<template>
    <div class="right-content">
        <div class="fl middle">
            <div class="block">
                <el-carousel height="400px">
                    <el-carousel-item v-for="item in this.imgList" :key="item">
                        <img :src="item"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="data-list">
                <ul class="headline fixed" id="headline">
                    <li class="headline-item" v-for="(item,index) in articles" :key="index">

                        <div class="fl indexImg">
<!--                            <img :src="item.image"/>-->
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
<!--                        {{item.content}}-->
                        </p>

                    </li>
                </ul>
                <ul id="loaded" class="headline">
                </ul>
            </div>
            <!-- <script src="~/assets/data-list.js" type="text/javascript"></script> -->
        </div>
    </div>
</template>

<script>
    import '@/assets/css/page-headline-logined.css';
    import recommendApi from "@/api/recommend";
    import imageApi from "@/api/image";
    import axios from 'axios';
    import articleApi from "@/api/article";

    export default {
        data(){
            return{
                curPage: 1,
                busy: false,
                imgList: {
                    img1: "http://q2tjj3jyx.bkt.clouddn.com/1.png",
                    img2: "http://q2tjj3jyx.bkt.clouddn.com/2.png",
                    img3: "http://q2tjj3jyx.bkt.clouddn.com/3.png"
                },
            }
        },
        mounted(){
            window.addEventListener('scroll', this.handleScroll, true)
        },
        asyncData(){
            let searchmap = {"istop": "1"};
            return axios.all([recommendApi.getRecommends(), imageApi.getImgs(), articleApi.getList(1, 10, searchmap)]).then(
                axios.spread((res1, res2, res3) => {
                    console.log(res3.data.data.length);
                    if (res1.data.data.length === 0){
                        return{
                            articles: res3.data.data.rows,
                            img: res2.data.data
                        }
                    }
                    if (res1.data.data.rows.length <= 5){
                        let articles = res1.data.data.rows.concat(res3.data.data.rows);
                        return {
                            articles: articles,
                            img: res2.data.data
                        }
                    }else{
                        return {
                            articles: res1.data.data.rows,
                            img: res2.data.data
                        }
                    }
                })
            )
        },
        created(){
        },
        methods:{
            handleScroll(){
            }
        }
    }
</script>>