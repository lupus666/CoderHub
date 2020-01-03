<template>
    <div>
    </div>
</template>

<script>
    export default {
        name: "index",
        created() {
            // console.log(this.$route.query);
            this.$router.push({path:"/search/section/articles", query:this.$route.query})
        }
    }
</script>

<style scoped>

</style>
