<template>
  <div>
  </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                query:{}
            }
        },
        created() {
            this.query = this.$route.query;
            this.$router.push({path:"/qa/label/0", query:this.query})
        }
    }
</script>

<style scoped>

</style>
