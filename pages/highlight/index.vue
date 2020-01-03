<template>
  <div class="wrapper">

  </div>
</template>

<script>
    import '~/assets/css/page-headline-logined.css'
    import channelApi from "@/api/channel";
    import problemApi from "@/api/problem";
    import gatheringApi from "@/api/gathering";
    import axios from 'axios'
    export default {
        data(){
            return{
                query: {}
            }
        },
        created() {
            this.query = this.$route.query;
            this.$router.push({path:"/highlight/channel/0", query:this.query})
        }
    }
</script>

