










<script>
    import '@/assets/css/page-headline-logined.css'
    import articleApi from "@/api/article";
    import imageApi from "@/api/image";
    import axios from 'axios'

    export default {
        name: "_id",
        data() {
            return {
                curPage: 1,
                busy: false,
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true)
        },
        asyncData({params}) {
            let searchmap={};
            if (params.id == 0) {
                searchmap = {"istop": "1"}
            } else {
                searchmap = {"channelid": params.id.toString()}
            }
            return axios.all([articleApi.getList(1, 10, searchmap), imageApi.getImgs()]).then(
                axios.spread((res, res2) => {
                    return {
                        articles: res.data.data.rows,
                        channelId: params.id,
                        img: res2.data.data
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
                let searchmap={};
                if (this.channelId == 0) {
                    searchmap = {"istop": "1"}
                } else {
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