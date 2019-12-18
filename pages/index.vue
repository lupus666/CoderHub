<template>
  <div>
  </div>
</template>

<script>
import '~/assets/css/page-headline-logined.css'
import channelApi from "@/api/channel";
import problemApi from "@/api/problem";
import gatheringApi from "@/api/gathering";
import axios from 'axios'
import authApi from '@/utils/auth'
  export default {
      created() {
          if (authApi.getUser() === undefined){
              this.$router.push("/highlight")
          }
          else{
              this.$router.push("/recommend/")
          }
      }
  }
</script>

