<template>
    <div>
        <div class="tab-nav ">
            <div class="wrapper">
                <ul class="fl sui-nav nav-tabs navbar-dark">
                    <nuxt-link tag="li" to="/search/section/articles" active-class="active" exact><a>文章</a></nuxt-link>
                    <nuxt-link tag="li" to="/search/section/qa" active-class="active"><a>问答</a></nuxt-link>
                    <nuxt-link tag="li" to="/search/section/gathering" active-class="active"><a>活动</a></nuxt-link>
                    <nuxt-link tag="li" to="/search/section/spit" active-class="active"><a>吐槽</a></nuxt-link>
                    <nuxt-link tag="li" to="/search/section/recruit" active-class="active"><a>招聘</a></nuxt-link>
                </ul>
                <div class="clearfix"></div>
            </div>
        </div>
        <nuxt-child/>
    </div>
</template>

<script>
    import '~/assets/css/page-sj-qa-logined.css'
    export default {
        name: "index",
        asyncData({params}){
        }
    }
</script>

<style scoped>

</style>
