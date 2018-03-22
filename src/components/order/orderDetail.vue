<template>
        <div id="orderDetail_wrapper">
            <div id="order_0">
                <div class="order_head">
                    <div class="left-slogan">
                        <i @click="$router.go(-1)" class="icon-arrow_lift left_arrow"></i>
                    </div>
                    <div class="center-title">
                        <a href="javascript:void(0)">{{this.orderInfo.type}}</a>
                    </div>
                    <div class="right-slogan">
                        <img src="../../../static/img/phone.png"></img>
                    </div>
                </div>
            </div>
            <div id="order_1">
                <div class="order_widget">
                    <ul class="order_info">
                        <li>
                            <span class="order_left_span menu_title">菜单详情</span>
                            <span class="order_right_span menu_total">总计：￥{{this.orderInfo.price}}</span>
                        </li>
                        <li v-for="item in this.orderDetails">
                            <span class="order_left_span">{{item.name}}</span>
                            <div class="order_right_span">
                                <span>x{{item.number}}&nbsp&nbsp</span>
                                <span>￥{{item.price }}</span>
                                <button class="order_commend" @click="toCommend(item,$event)">评价</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
</template>

<script>
import loading from 'components/loading/loading_svg';
    export default {
    	data(){
            return{
                orderInfo: {},//获取order.vue传过来的order信息
                orderDetailUrl: 'queryOrderDetail',//订单详情接口
                orderDetails:[],//存储订单详情数据
            }
        },
        created(){
           
        },
        mounted(){
            this.getOrderInfo();
        },
        computed: {
        },
        methods: {
            //获取order.vue传过来的order信息
            getOrderInfo(){
                this.orderInfo = this.$route.params.orderInfo;
                this.getOrderDetails();
            },
            //获取订单详情
            getOrderDetails(){
                this.loadingShow = true;
                let detailUrl = publicDom.base_url+this.orderDetailUrl;
                var oid = {
                    'oid': this.orderInfo.oid
                }
                console.log(oid);
                this.$http.post(detailUrl,oid,{emulateJSON:true}).then((res) =>{
                    let list = res.data;
                    this.loadingShow = false;
                    if (list.code == 200) {
                        this.orderDetails = list.object;
                    }
                    else {
                        // this.showAlert = true;
                        // this.alertText = list.msg;
                    }
                })
            },
            //跳转到commend.vue带参数
            toCommend(item,event){
                if (event._constructed) {
                  return;
                }
                this.$router.push({"name":"commend","params":{'orderDetailsInfo':item}});
            }

        },
        watch: {
            '$route' (to, from) {
                if (from.path === '/order') {
                    this.getOrderInfo()
                }
            }
        }

    }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixin.styl"
    #orderDetail_wrapper{
        background-color: #ebedf0;
        height: 100%;
    }
    .order_head{
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
    .right-slogan img{
        margin-top: 12px;
        width: 22px;
        height: 22px;
    }
    .order_widget .order_info{
        margin: 10px 0;
        background: #fff;
        padding: 0 15px;
    }
    .order_info li{
        height: auto;
        min-height: 45px;
        max-height: 55px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #4d4d4d;
        line-height: 46px;
        font-size: 14px;
        border-bottom: 1px solid #eee;
    }
    .order_left_span{
        max-width: 16em;
        position: absolute;
        max-width: 10em;
        height: 43px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .menu_title{
        font-weight: 700;
    }
    .order_right_span{
        padding-right: 0;
        display: block;
        text-align: right;
        font-size: 14px;
    }
    .menu_total{
        color: #fe2947;
    }
    .order_commend{
        background-color: #ff5339;
        border-color: #ff5339;
        color: #fff;
        height: 8.533333vw;
        width:50px;
        max-width: 28vw;
        white-space: nowrap;
        border-radius: .8vw;
        font-size: 14px;
        margin: 4vw .8vw 0;
        border: 1px solid #ccc;
    }
</style>
