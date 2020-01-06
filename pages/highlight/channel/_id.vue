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
<!--              <img :src="author"/>-->
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
            <p class="content"></p>
          </li>
        </ul>
        <ul id="loaded" class="headline">
        </ul>
      </div>
      <!--       <script src="~/assets/data-list.js" type="text/javascript"></script>-->
    </div>
  </div>
</template>

<script>
  import '@/assets/css/page-headline-logined.css'
  import articleApi from "@/api/article";
  import imageApi from "@/api/image";
  import axios from 'axios';

  export default {
    name: "_id",
    data() {
      return {
        curPage: 1,
        busy: false,
        imgList: {
          img1: "http://q2tjj3jyx.bkt.clouddn.com/1.png",
          img2: "http://q2tjj3jyx.bkt.clouddn.com/2.png",
          img3: "http://q2tjj3jyx.bkt.clouddn.com/3.png"
        },
        // author: "http://q2tjj3jyx.bkt.clouddn.com/widget-myphoto.jpg"
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll, true)
    },
    asyncData({params, query}) {
      let searchmap = {};
      let arr = Object.keys(query)
      console.log(query !== undefined);
      console.log(query);
      if (params.id == 0) {
        if (arr.length !== 0) {
          // console.log(1)
          searchmap = {'title': query.keywords};
        } else {
          // console.log(2)
          searchmap = {"istop": "1"};
        }
      } else {
        if (arr.length !== 0) {
          // console.log(params.id.toString() + '1');
          searchmap = {'title': query.keywords};
        } else {
          // console.log(params.id.toString() + '2');
          searchmap = {"channelid": params.id.toString()}
        }
      }
      return axios.all([articleApi.getList(1, 10, searchmap), imageApi.getImgs()]).then(
        axios.spread((res, res2) => {
          return {
            articles: res.data.data.rows,
            channelId: params.id,
            img: res2.data.data,
            query: query
          }
        })
      )
    },
    methods: {
      handleScroll() {
        let _self = this;
        if (window.scrollY >= document.body.scrollHeight - document.body.clientHeight - 20) {
          if (!_self.busy) {
            _self.busy = true;
            _self.loadMore();
          }
        }
      },
      loadMore() {
        let searchmap = {};
        let arr = Object.keys(this.query)

        if (this.channelId == 0) {
          if (arr.length !== 0)
            searchmap = {'title': query.keywords};
          else
            searchmap = {"istop": "1"};
        } else {
          if (arr.length !== 0)
            searchmap = {'title': query.keywords};
          else
            searchmap = {"channelid": params.id.toString()}
        }
        this.curPage++;
        articleApi.getList(this.curPage, 10, searchmap).then(response => {
          this.articles = this.articles.concat(response.data.data.rows);
          this.busy = false
        })

      }
    }
  }
</script>

<style scoped>

</style>
