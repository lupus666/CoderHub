<template>
    <div class="right-content">
        <div class="fl middle">
        <div class="carousel">
            <div id="myCarousel" data-ride="carousel" data-interval="4000" class="sui-carousel slide">
            <ol class="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="active item">
                <img :src="this.img[2]"/>
                </div>
                <div class="item">
                <img src="~/assets/img/widget-banner02.png"/>
                </div>
                <div class="item">
                <img src="~/assets/img/widget-banner01.png"/>
                </div>
            </div>
            </div>
        </div>
        <div class="data-list">
            <ul class="headline fixed" id="headline">
            <li class="headline-item" v-for="(item,index) in articles" :key="index">
                <div class="fl indexImg">
                    <img :src="item.image"/>
                </div>
                <nuxt-link :to="`/article/item/${item.articleid}`">
                    <div class="words">
                        <h3>{{item.articletitle}} <span><img src="" class="vip"/></span></h3>
                        <!--
                        <h5 class="author">
                        <div class="fl">
                            <span class="authorName"> {{item.thumbup}}人赞了这篇文章 </span>
                            <span>{{item.createtime}}</span>
                        </div>
                        </h5>
                        -->
                    </div>
                </nuxt-link>
                <!--
                <p class="content">
                {{item.content}}</p>
                -->
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

    export default {
        data(){
            return{
                curPage: 1,
                busy: false,
            }
        },
        mounted(){
            window.addEventListener('scroll', this.handleScroll, true)
        },
        asyncData(){
            return axios.all([recommendApi.getRecommends(), imageApi.getImgs()]).then(
                axios.spread((res1, res2) => {
                    return {
                        articles: res1.data.data,
                        img: res2.data.data
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