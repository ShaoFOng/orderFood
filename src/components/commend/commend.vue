<template>
    <div id="commend_wrapper">
        <div id="commend_0">
            <div class="commend_head">
                <div class="left-slogan">
                    <i @click="$router.go(-1)" class="icon-arrow_lift left_arrow"></i>
                </div>
                <div class="center-title">
                    <a href="javascript:void(0)">评价</a>
                </div>
                <div class="right-slogan">
                    <span>发布</span>
                </div>
            </div>
        </div>
        <div id="commend_1">
            <div class="commend_widget">
                <span class="commend_widget_title">评价商品:</span>
                <span class="commend_goods">{{this.orderDetailsInfo.name}}</span>
            </div>
            <div class="content_wrapper">
                <textarea class="commend_content" placeholder="童鞋留下你对这道菜的评价吧^.^乐于分享才是一个好学生"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                orderDetailsInfo: {},//获取orderDetail.vue传过来的orderDetail信息
            }
        },
        created(){
           
        },
        mounted(){
            this.getOrderDetailsInfo();
        },
        computed: {
            
        },
        methods: {
            //获取orderDetail.vue传过来的orderDetail信息
            getOrderDetailsInfo(){
                this.orderDetailsInfo = this.$route.params.orderDetailsInfo;
            },
        },
        watch: {
            '$route' (to, from) {
                if (from.path === '/orderDetail') {
                    this.getOrderDetailsInfo()
                }
            }
        }

    }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixin.styl"
    #commend_wrapper{
        background-color: #ebedf0;
        height: 100%;
    }
    .commend_head{
        position: relative;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #f9fdff;
        border-bottom: 1px solid #d9e0ec;
        text-align: center;
        z-index: 9999;
        display: -webkit-box;
        display: flex;
    }
    .left-slogan{
        width: 15%;
        text-align: left;
        -webkit-box-flex: 1;
        flex: 1;
    }
    .left_arrow{
        color: #999;
        padding-left: 10px;
        font-size: 20px;
    }
    .center-title{
        position: relative;
        width: 70%;
        -webkit-box-flex: 8;
        flex: 8;
    }
    .center-title a {
        display: inline-block;
        line-height: 50px;
        color: #4d4d4d;
        font-size: 18px;
        max-width: 70%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .right-slogan{  
        width: 15%;
        text-align: right;
        margin-right: 10px;
        -webkit-box-flex: 1;
        flex: 1;
    }
    .right-slogan span{
        font-size: 18px;
        font-weight: bold;
        color: #ff5339;
        margin-top: 12px;
        width: 22px;
        height: 22px;
    }
    .commend_widget{
        background: #fff;
        padding: 10px 15px;
    }
    .commend_widget span{
        font-size: 16px;
        color: #4d4d4d;
    }
    .commend_widget .commend_widget_title{
        font-weight: bold;
    }
    .commend_goods{
        display: block;
        margin-top: 10px;
    }
    .content_wrapper{
        margin: 15px 0;
    }
    .commend_content{
        border: 0;
        width: 100%;
        display: block;
        box-sizing: border-box;
        height: 8.8em;
        text-indent: 0;
        padding: 10px 15px;
        line-height: 1.41;
        font-size: 18px;
        border-radius: .06rem;
    }
</style>
