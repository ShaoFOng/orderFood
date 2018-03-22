<template>
    <div class="restContainer">
        <head-top headTitle="我的订单" :searboxShow='false'></head-top>
            <div class="container">
                <p v-if="no_order" class="order_tip">您还没有订单！</p>
                <div class="order_wrapper">
                    <ul class="order_list">
                        <li v-for="item in this.orders" class="item-order-li" @click="toOrderDetails(item,$event)">
                            <a class="item-shop">
                                <i class="shop-icon"></i>
                                <span class="shop-name">{{item.type}}</span>
                                <i class="enter-icon"></i>
                            </a>
                            <div class="item-order">
                                <div class="list-img">
                                    <img class="lazy-load" src="//map.baidu.com/maps/services/thumbnails?width=172&amp;height=172&amp;quality=60&amp;src=https://img.waimai.baidu.com/pb/15de40811195db0c880a2506191b121632&amp;align=center%2Ccenter" data-url="//map.baidu.com/maps/services/thumbnails?width=172&amp;height=172&amp;quality=60&amp;src=https://img.waimai.baidu.com/pb/15de40811195db0c880a2506191b121632&amp;align=center%2Ccenter" data-loaded="1" style="opacity: 1;">
                                </div>
                                <div class="list-content">
                                    <div class="order-detail">
                                        <p class="time">{{item.odate | formatDate}}</p>
                                        <p class="desc">总价：￥{{item.price}}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        <footer-box index="2"></footer-box>
    </div>
</template>

<script>
    import main_head from 'components/header/main_head';
    // import alertTip from 'components/errorTip/errorTip';
    import footer from 'components/footer/footer';
    import {getCookie} from '../../assets/js/cookie.js'
    // import {formatDate} from '../../../static/js/filters.js'

    export default {
        data(){
            return {
                no_order:false,
                orders:[],
                user_name:'',
                url:'queryOrderByAccount',//获取订单接口
                detailUrl:'queryOrderByOid',//查询订单详细
                oid:''
            }
        },
        created(){
            this.getOrder();
        },
        components: {
            'head-top': main_head,
            'footer-box':footer
        },
        filters:{
            formatDate(time){
                var data = new Date(time);
                return formatDate(data,'yyyy-MM-dd hh:mm:ss');
            }
       },
        methods: {
            //获取订单信息
            getOrder(){
                this.user_name = getCookie("user_name");
                var data = {
                    'account':this.user_name
                };
                let myurl = publicDom.base_url+this.url;
                this.$http.post(myurl,data,{emulateJSON:true}).then((res) =>{
                    let list = res.data;
                    if (list.code == 200) {
                        if(list.object.length == 0){
                            this.no_order = !this.no_order;
                        }
                        this.orders = list.object;
                        // for (var i = 0; i < list.object.length; i++) {

                        // }
                        // this.showAlert = true;
                        // this.alertText = '密码修改成功!';
                        // setTimeout(function(){
                        //       this.showAlert = false;
                        //       this.$router.push('/login');
                        //   }.bind(this),500);
                    }
                    else {
                        this.no_order = true;
                        // this.showAlert = true;
                        // this.alertText = list.msg;
                    }
                })
            },
            toOrderDetails(item,event){
                if (event._constructed) {
                  return;
                }
                this.$router.push({"name":"orderDetail","params":{'orderInfo':item}});
            }
        },
        watch: {
            '$route':'getOrder'
        }
    }


</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixin.styl"
.order-list {
    width: 100%;
}
ul, li {
    list-style: none;
}
.order_list li {
    background-color: #f9fdff;
    margin-bottom: 10px;
    border-bottom: 1px solid #dbdcde;
}
.item-shop {
    border-bottom: 1px solid #dbdcde;
    display: block;
    color: #4d4d4d;
    padding: 9px 10px;
    font-size: 16px;
}
.shop-icon {
    background: url(../../../static/img/orderShop.png) no-repeat center center transparent;
    background-size: 100%;
    display: inline-block;
    width: 0.79rem;
    height: 1.5em;
    vertical-align: middle;
}
.enter-icon {
    background: url(../../../static/img/leftArrow.png) no-repeat center center transparent;
    background-size: 100%;
    display: inline-block;
    width: 8px;
    height: 1.5em;
    vertical-align: middle;
}
.item-order {
    position: relative;
    padding: 9px 10px;
    height: 66px;
}
.list-img {
    position: absolute;
    left: 10px;
    top: 10px;
}
.list-img img {
    display: block;
    width: 100px;
    height: 62px;
    background-size: 100px 62px;
}
.list-content {
    position: relative;
    margin-left: 110px;
}
.order-detail {
    color: #999;
}
.order-detail .time {
    font-size: 12px;
    line-height: 1.4;
    margin-top: 4px;
}
.order-detail .desc {
    font-size: 16px;
    line-height: 1.4;
    margin-top: 5px;
    color: #4d4d4d;
}
.container{
    margin-bottom:2.1rem;
}
.order_tip{
    padding:15px;
}
</style>
