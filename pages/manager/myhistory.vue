<template>
  <div class="right-content">
    <div class="answers">
      <h4><span>浏览记录</span></h4>
      <ul class="answer-list">
        <li v-for="(item,index) in histories" :key="index">
          <span class="title"><a :href="`/article/item/${item.articleid}`">{{item.articletitle}}</a></span>
          <span class="clearfix"></span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import '~/assets/css/page-sj-person-myhistory.css'
  import userApi from "@/api/user";

  export default {
    name: "myhistory",
    data() {
      return {
        histories: [],
        currentPage: 1,
        pageSize: 10,
      }
    },
    created() {
      userApi.getHistory(this.currentPage, this.pageSize).then(res1 => {
        console.log(res1.data.data);
        this.histories = res1.data.data.rows;
      })
    }
  }
</script>

<style scoped>

</style>
